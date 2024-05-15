import React from "react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import ListStudents from "./components/ListStudents";
import StudentPlacement from "./components/StudentPlacement";
import SearcStudent from "./components/SearcStudent";
import Pagination from "./components/Pagination";

export default function App() {
  return (
    <>
      <AddStudent></AddStudent>
      <div style={{ display: "flex", justifyContent: "end", gap: "15px" }}>
        <StudentPlacement></StudentPlacement>
        <SearcStudent></SearcStudent>
      </div>
      <ListStudents></ListStudents>
      <Pagination></Pagination>
    </>
  );
}
