import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ডেমো ডাটা (API থেকে আনবে)
  const usersData = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");

  useEffect(() => {
    const user = usersData.find((u) => u.id === id);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      alert("User not found");
      navigate("/users");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API কল করে ইউজার আপডেট করবে
    alert(`User updated: ${name}, ${email}, ${role}`);
    navigate("/users");
  };

  return (
    <div className="container my-4">
      <h2>Edit User</h2>
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
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default UserEdit;
