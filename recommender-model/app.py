import pandas as pd
import numpy as np
from flask import Flask, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from collections import defaultdict
import config

app = Flask(__name__)
app.config.from_object(config)

# MongoDB connection
client = MongoClient(app.config["MONGODB_URI"])
db = client.get_default_database()

# MongoDB collections
products_collection = db["products"]
users_collection = db["users"]
orders_collection = db["orders"]
reviews_collection = db["reviews"]


# Helper function to fetch user interactions from MongoDB
def fetch_user_interactions():
    interactions = []

    # Fetch orders
    orders = orders_collection.find()
    for order in orders:
        user_id = str(order["user"])
        for product in order["products"]:
            product_id = str(product["product"])
            quantity = product["quantity"]
            interactions.append(
                {
                    "user_id": user_id,
                    "product_id": product_id,
                    "rating": quantity,
                    "source": "order",
                }
            )

    # Fetch reviews
    reviews = reviews_collection.find()
    for review in reviews:
        user_id = str(review["user"])
        product_id = str(review["product"])
        rating = review["rating"]
        interactions.append(
            {
                "user_id": user_id,
                "product_id": product_id,
                "rating": rating,
                "source": "review",
            }
        )

    df = pd.DataFrame(interactions)

    # Debugging: Print columns and first few rows
    print("Columns in DataFrame:", df.columns)
    print("First few rows in DataFrame:", df.head())

    # Combine ratings if multiple sources exist (e.g., average rating)
    if (
        "user_id" in df.columns
        and "product_id" in df.columns
        and "rating" in df.columns
    ):
        df = (
            df.groupby(["user_id", "product_id"])
            .agg(
                {"rating": lambda x: x.mean()}  # Average rating from different sources
            )
            .reset_index()
        )
    else:
        raise ValueError("DataFrame does not contain required columns")

    return df


# Generate and load data from MongoDB
data = fetch_user_interactions()
reader = Reader(rating_scale=(1, 5))
print(data.columns)
print(data.head())

dataset = Dataset.load_from_df(data[["user_id", "product_id", "rating"]], reader)

# Split the dataset into train and test sets
trainset, testset = train_test_split(dataset, test_size=0.25)

# Build the model
model = SVD()
model.fit(trainset)


def get_top_n(predictions, n=1):
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]
    return top_n


# Precompute the predictions for the test set
predictions = model.test(testset)
top_n_recommendations = get_top_n(predictions, n=10)


@app.route("/recommend/<string:user_id>", methods=["GET"])
def recommend(user_id):
    if user_id in top_n_recommendations:
        recommendations = top_n_recommendations[user_id]
        return jsonify(
            {
                "user_id": user_id,
                "recommendations": [
                    {"product_id": product_id, "predicted_rating": rating}
                    for product_id, rating in recommendations
                ],
            }
        )
    else:
        return jsonify({"message": "No recommendations available for this user."}), 404


if __name__ == "__main__":
    app.run(debug=True)
