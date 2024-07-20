// // src/components/CartContent.js
// import React from "react";
// //import { useDispatch, useSelector } from "react-redux";
// //import { removeFromCart } from "../utils/slices/cartSlice";

// function CartContent() {
//   //const dispatch = useDispatch();
//   const cartItems = [
//     {
//       id: 1,
//       name: "Product 1",
//       description: "This is the description for product 1.",
//       image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       description: "This is the description for product 2.",
//       image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       description: "This is the description for product 3.",
//       image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
//     },
//     {
//       id: 4,
//       name: "Product 4",
//       description: "This is the description for product 4.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 5,
//       name: "Product 5",
//       description: "This is the description for product 5.",
//       image: "https://via.placeholder.com/150",
//     },
//   ];

//   //   const handleRemove = (id) => {
//   //     dispatch(removeFromCart(id));
//   //   };

//   return (
//     <div className="container mx-auto px-4 my-24">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Cart Content Column */}
//         <div className="col-span-2">
//           <div className="space-y-6">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="card bg-base-100 shadow-xl w-full md:w-[400px] lg:w-[500px]"
//               >
//                 <figure>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-48 h-48 object-cover"
//                   />
//                 </figure>
//                 <div className="card-body p-4">
//                   <h2 className="card-title text-xl font-semibold">
//                     {item.name}
//                   </h2>
//                   <p className="text-gray-600 mt-2">{item.description}</p>
//                   <div className="flex justify-between items-center mt-4">
//                     {/* <span className="text-xl font-bold">
//                       ${item.price.toFixed(2)}
//                     </span> */}
//                     <button
//                       className="btn btn-primary"
//                       //   onClick={() => handleRemove(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Cart Summary Column */}
//         <div className="col-span-1">
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="text-lg font-semibold">
//                   Subtotal ({cartItems.length} items)
//                 </h2>
//                 {/* <span className="text-xl font-bold">
//                   $
//                   {cartItems
//                     .reduce((acc, item) => acc + item.price, 0)
//                     .toFixed(2)}
//                 </span> */}
//               </div>
//               {/* List of Products with Prices */}
//               <div className="space-y-2 mt-4">
//                 <h3 className="text-lg font-semibold">Items:</h3>
//                 <ul className="list-disc pl-5 text-gray-700 space-y-1">
//                   {cartItems.map((item) => (
//                     <li key={item.id} className="flex justify-between">
//                       <span>{item.name}</span>
//                       {/* <span>${item.price.toFixed(2)}</span> */}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <button
//                 type="button"
//                 className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 mt-4"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartContent;

// src/components/CartContent.js
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart } from "../utils/slices/cartSlice";

function CartContent() {
  // const dispatch = useDispatch();
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1.",
      image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
      price: 19.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the description for product 2.",
      image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
      price: 29.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is the description for product 3.",
      image: "https://media.hintaseuranta.fi/prod/i36703073w800h465.jpg",
      price: 39.99,
      quantity: 3,
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is the description for product 4.",
      image: "https://via.placeholder.com/150",
      price: 49.99,
      quantity: 1,
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is the description for product 5.",
      image: "https://via.placeholder.com/150",
      price: 59.99,
      quantity: 2,
    },
  ];

  //   const handleRemove = (id) => {
  //     dispatch(removeFromCart(id));
  //   };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 my-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cart Content Column */}
        <div className="col-span-2">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-xl w-full md:w-[400px] lg:w-[500px]"
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-48 h-48 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-xl font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                    <button
                      className="btn btn-primary"
                      //   onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary Column */}
        <div className="col-span-1">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">
                  Subtotal ({cartItems.length} items)
                </h2>
                <span className="text-xl font-bold">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              {/* List of Products with Prices */}
              <div className="space-y-2 mt-4">
                <h3 className="text-lg font-semibold">Items:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.name} (${item.price.toFixed(2)} x {item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartContent;
