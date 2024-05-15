import React from "react";

export default function StudentPlacement() {
  return (
    <div>
      <select>
        <option selected>Sắp xếp theo tuổi</option>
        <option value="tăng">Tăng dần</option>
        <option value="giảm">Giảm dần</option>
      </select>
    </div>
  );
}
