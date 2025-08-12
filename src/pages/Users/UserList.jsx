import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // ডেমো ডাটা, তোমার API থেকে ডাটা নিয়ে আসো
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    ]);
  }, []);

  return (
    <div className="container my-4">
      <h2>User List</h2>
      <Link to="/users/add" className="btn btn-primary mb-3">
        Add New User
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/edit/${user.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => alert("Delete functionality not implemented")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
