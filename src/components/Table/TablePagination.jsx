import { useEffect } from "react";

const TablePagination = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, setPage, page]);
  return (
    <div className="inline-flex items-center space-x-2.5 md:space-x-1">
      {range.map((indexPage, index) => (
        <button
          key={index}
          className={`flex text-sm items-center justify-center rounded w-8 h-8
         border border-gray-300 md:w-10 md:h-10 ${
           page === indexPage
             ? `bg-violet-500 text-white border-violet-500
              hover:bg-violet-600`
             : `text-gray-500 bg-white hover:bg-violet-200 
             dark:bg-dark-800 dark:border-dark-700 dark:text-gray-300
             dark:hover:bg-dark-900/30`
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
