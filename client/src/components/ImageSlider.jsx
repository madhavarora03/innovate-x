import { useEffect, useState } from "react";
import "./ImageSlider.css"; // Add styling for the slider
import { useGetTopProductsQuery } from "../utils/slices/productsApiSlice";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: topProducts = [] } = useGetTopProductsQuery(); // Default to empty array

  useEffect(() => {
    if (topProducts.length === 0) return; // No products to display

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [topProducts.length]);

  if (topProducts.length === 0) {
    return <p>No products available</p>; // Handle the case when there are no products
  }

  return (
    <div className="slider bg-base-300">
      <div
        className="slider-images"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {topProducts.map((product) => (
          <div
            key={product._id}
            className="slide relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={product.imageUrl}
              alt={`Slide ${product._id}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full to-transparent p-4 text-center">
              <h1 className="text-white text-2xl font-bold">{product.name}</h1>
              <p className="text-white text-sm mt-1">{product.description}</p>
              <p className="text-white text-lg font-semibold mt-2">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
