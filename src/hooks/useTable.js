import { useState, useEffect } from "react";

// Custom hook for crypto table components

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const numPage = Math.ceil(data.length / rowsPerPage);
  for (let index = 1; index <= numPage; index++) {
    range.push(index);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    // Range
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    // Slice
    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;
