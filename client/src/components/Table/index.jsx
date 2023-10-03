import React, { useState } from 'react';
import "./style.css"

const Table = ({ data, columns, pageLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(data.length / pageLimit);
  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;
  const currentData = data.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div className='AAp'>
      <table className='tb_'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: "270px" }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='page_btn'>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className='pagi'
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
