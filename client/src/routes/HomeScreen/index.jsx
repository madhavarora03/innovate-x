import { useParams, Link } from "react-router-dom";
import Product from "../../components/Product";
import { useGetProductsQuery } from "../../utils/slices/productsApiSlice";
import { Loader } from "lucide-react";
import Paginate from "../../components/Paginate";
import ImageSlider from "../../components/ImageSlider";

const HomeScreen = () => {
  const { pageNumber = 1, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ImageSlider />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Latest Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.products.map((product) => (
              <div
                key={product._id}
                className="card shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
