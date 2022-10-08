import { useEffect } from "react";

const TablePagination = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, setPage, page]);
  return (
    <div className="inline-flex items-center space-x-1">
      {range.map((indexPage, index) => (
        <button
          key={index}
          className={`flex text-sm items-center justify-center rounded w-10 h-10
         border border-gray-300 ${
           page === indexPage
             ? `bg-violet-500 text-white border-violet-300
              hover:bg-violet-600`
             : `text-gray-500 bg-white hover:bg-violet-200`
         }`}
          onClick={() => setPage(indexPage)}
        >
          {indexPage}
        </button>
      ))}
    </div>
  );
};

export default TablePagination;
