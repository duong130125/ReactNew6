import React from "react";

export default function Pagination() {
  return (
    <div className="page-list">
      <div className="page-item">
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div className="page-item active">1</div>
      <div className="page-item">2</div>
      <div className="page-item">3</div>
      <div className="page-item">4</div>
      <div className="page-item">
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
}
