import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "" }) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    if (keyword) {
      navigate(`/search/${keyword}/page/${newPage}`);
    } else {
      navigate(`/page/${newPage}`);
    }
  };

  return (
    pages > 1 && (
      <div className="flex justify-center mb-4">
        <div className="join">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => handlePageChange(x + 1)}
              className={`join-item btn ${x + 1 === page ? "btn-active" : ""}`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default Paginate;
