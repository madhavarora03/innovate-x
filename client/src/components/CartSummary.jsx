function CartSummary() {
  return (
    <div className="flex justify-end mr-20">
      <div className="bg-white shadow-md rounded-lg p-4 w-1/4">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">
              Subtotal ({/* Insert item count here */} 0) items
            </h2>
            <span className="text-xl font-bold">
              {/* Insert subtotal amount here */} $0.00
            </span>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
