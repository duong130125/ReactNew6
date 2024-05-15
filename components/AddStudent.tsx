import React, { useState } from "react";

interface Student {
  id: string;
  name: string;
  dayOfBirth: string;
  email: string;
  status: boolean;
}

interface AddStudentProps {
  onAdd: () => void;
}

export default function AddStudent({ onAdd }: AddStudentProps) {
  const [student, setStudent] = useState<Student>({
    id: "",
    name: "",
    dayOfBirth: "",
    email: "",
    status: true,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    const { id, name, email } = student;
    if (!id || !name || !email) {
      setError("Mã sinh viên, Tên sinh viên và Email không được để trống.");
      return;
    }

    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    if (storedStudents.some((s: Student) => s.id === id)) {
      setError("Mã sinh viên không được phép trùng.");
      return;
    }

    if (storedStudents.some((s: Student) => s.email === email)) {
      setError("Email không được phép trùng.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không đúng định dạng.");
      return;
    }

    storedStudents.push(student);
    localStorage.setItem("students", JSON.stringify(storedStudents));
    setSuccess("Thêm tài khoản thành công");
    onAdd();

    // Resetting the form fields
    setStudent({
      id: "",
      name: "",
      dayOfBirth: "",
      email: "",
      status: true,
    });
    setError(null);  // Resetting the error state
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Quản lý sinh viên</h3>
        <div className="add-student">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Thêm sinh viên
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Thêm mới sinh viên
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <form>
                    <label htmlFor="id">Mã Sinh viên</label>
                    <input
                      id="id"
                      name="id"
                      onChange={handleChange}
                      type="text"
                      value={student.id}
                    />
                    <label htmlFor="name">Tên sinh viên</label>
                    <input
                      id="name"
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={student.name}
                    />
                    <label htmlFor="dayOfBirth">Ngày sinh</label>
                    <input
                      id="dayOfBirth"
                      name="dayOfBirth"
                      onChange={handleChange}
                      type="date"
                      value={student.dayOfBirth}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      value={student.email}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    data-bs-dismiss="modal"
                  >
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
