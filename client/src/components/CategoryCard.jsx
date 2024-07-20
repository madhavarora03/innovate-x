function CategoryCard() {
  return (
    <div className="carousel carousel-end justify-center mt-8 space-x-4">
      <div className="carousel-item w-40 h-40 rounded-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg">
        <img
          src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
          alt="Drink"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="carousel-item w-40 h-40 rounded-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="Drink"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="carousel-item w-40 h-40 rounded-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg">
        <img
          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
          alt="Drink"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="carousel-item w-40 h-40 rounded-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
          alt="Drink"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default CategoryCard;
