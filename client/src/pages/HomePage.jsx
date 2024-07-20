// // import ProdCard from "../components/ProdCard";
import CategoryCard from "../components/CategoryCard";
import ImageSlider from "../components/ImageSlider";
// import CategoryCard from "../components/CategoryCard";
// import Category from "../components/Category";
// import Latest from "../components/Latest";

// // Sample data for products
// // const products = [
// //   {
// //     id: 1,
// //     name: "Product 1",
// //     image: "https://via.placeholder.com/150",
// //     price: "$10.00",
// //     description: "This is a description for product 1.",
// //   },
// //   {
// //     id: 2,
// //     name: "Product 2",
// //     image: "https://via.placeholder.com/150",
// //     price: "$20.00",
// //     description: "This is a description for product 2.",
// //   },
// //   // Add more products as needed
// // ];

// const Home = () => {
//   return (
//     <div>
//       <ImageSlider />
//       <div>

//       </div>
//     </div>
//   );
// };

// export default Home;
// {
//   /* <div className="flex justify-center margin-top mb-5">
//           <CategoryCard />
//         </div>
//         <div className="flex justify-center margin-top mb-5">
//           <Category />
//         </div>
//         <div className="flex justify-center margin-top mb-5">
//           <Category />
//         </div>
//         <div className="flex justify-center margin-top mb-5">
//           <Category />
//         </div>
//         <div className="flex justify-center margin-top">
//           <Category />
//         </div> */
// }
import { Link } from "react-router-dom";

const dummyData = {
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is the description for product 4.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is the description for product 5.",
      image: "https://via.placeholder.com/150",
    },
  ],
};
function HomePage() {
  return (
    <>
      <ImageSlider />
      <div className="card bg-base-100 w-full shadow-xl p-4">
        <CategoryCard />
      </div>
    </>
  );
}

export default HomePage;
