import React from "react";
import Student from "./Student";
export default function ListStudents() {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã sinh viên</th>
            <th scope="col">Tên sinh viên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Email</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <Student></Student>
        </tbody>
      </table>
    </>
  );
}
