import React from "react";

function SearchFilter({ filterData }) {
  const displayData = filterData.slice(0, 4);
  const totalFilters = filterData.length;
  const displayText =
    totalFilters > 4
      ? `DISPLAYING 4 OF ${totalFilters} RESULTS SEE ALL RESULTS`
      : `DISPLAYING ${totalFilters} RESULTS SEE ALL RESULTS`;
  return (
    <div className="wrapper">
      <p className="text">{displayText}</p>
      <hr />
      <div className="row text-center">
        {displayData.map((value) => (
          <div className="col" key={value.id}>
            <img src={value.picture} />
            <div className="title mb-2 mt-2">{value.name}</div>
            <div className="subTitle fw-bold mb-1">${value.price}</div>
            <div className="subTitle">{value.about}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
