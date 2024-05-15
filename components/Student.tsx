import React, { useState } from "react";

interface Student {
  id: string;
  name: string;
  dayOfBirth: string;
  email: string;
  status: boolean;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents ? JSON.parse(storedStudents) : [];
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleBlockClick = (id: string) => {
    setSelectedStudentId(id);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (selectedStudentId) {
      const updatedStudents = students.map((student) =>
        student.id === selectedStudentId ? { ...student, status: false } : student
      );
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setSelectedStudentId(null);
      setIsBlockModalOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedStudentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStudentId) {
      const updatedStudents = students.filter((student) => student.id !== selectedStudentId);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setSelectedStudentId(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditClick = (student: Student) => {
    setStudentToEdit(student);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (studentToEdit) {
      const { name, value } = e.target;
      setStudentToEdit({ ...studentToEdit, [name]: value });
    }
  };

  const handleConfirmEdit = () => {
    if (studentToEdit) {
      const updatedStudents = students.map((student) =>
        student.id === studentToEdit.id ? studentToEdit : student
      );
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setStudentToEdit(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      {students.map((student, index) => (
        <tr key={student.id}>
          <td>{index + 1}</td>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{new Date(student.dayOfBirth).toLocaleDateString()}</td>
          <td>{student.email}</td>
          <td>
            <button className={student.status ? "btn btn-success" : "btn btn-secondary"}>
              {student.status ? "Đang hoạt động" : "Ngừng hoạt động"}
            </button>
          </td>
          <td>
            <button onClick={() => handleBlockClick(student.id)} className="btn btn-warning">
              Chặn
            </button>
            <button onClick={() => handleEditClick(student)} className="btn btn-primary">
              Sửa
            </button>
            <button onClick={() => handleDeleteClick(student.id)} className="btn btn-danger">
              Xóa
            </button>
          </td>
        </tr>
      ))}

      {isBlockModalOpen && (
        <Modal
          title="Xác nhận"
          body="Bạn chắc chắn muốn chặn sinh viên này không?"
          onConfirm={handleConfirmBlock}
          onCancel={() => setIsBlockModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Xác nhận xóa"
          body="Bạn chắc chắn muốn xóa sinh viên này không?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isEditModalOpen && studentToEdit && (
        <EditModal
          student={studentToEdit}
          onChange={handleEditChange}
          onConfirm={handleConfirmEdit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

const Modal = ({ title, body, onConfirm, onCancel }: { title: string; body: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onCancel}></button>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EditModal = ({ student, onChange, onConfirm, onCancel }: { student: Student; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onConfirm: () => void; onCancel: () => void }) => (
  <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Cập nhật sinh viên</h5>
          <button type="button" className="btn-close" onClick={onCancel}></button>
        </div>
        <div className="modal-body">
          <form>
            <label htmlFor="id">Mã Sinh viên</label>
            <input id="id" name="id" value={student.id} onChange={onChange} type="text" readOnly />
            <label htmlFor="name">Tên sinh viên</label>
            <input id="name" name="name" value={student.name} onChange={onChange} type="text" />
            <label htmlFor="dayOfBirth">Ngày sinh</label>
            <input id="dayOfBirth" name="dayOfBirth" value={student.dayOfBirth} onChange={onChange} type="date" />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={student.email} onChange={onChange} type="email" />
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default StudentList;
