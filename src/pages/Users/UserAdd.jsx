import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API কল করে ইউজার যোগ করার লজিক বসাও
    alert(`User added: ${name}, ${email}, ${role}`);
    navigate("/users");
  };

  return (
    <div className="container my-4">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Add User</button>
      </form>
    </div>
  );
};

export default UserAdd;
