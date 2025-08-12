import { useState } from "react";

export default function TopNavbar() {
  const [showLogoutTip, setShowLogoutTip] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-3">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Dashboard</span>
        <div className="d-flex align-items-center">
          <span className="me-3">Hello, Admin</span>

          {/* Tooltip Wrapper */}
          <div
            className="position-relative"
            onMouseEnter={() => setShowLogoutTip(true)}
            onMouseLeave={() => setShowLogoutTip(false)}
          >
            <button className="btn btn-outline-danger btn-sm">Logout</button>

            {showLogoutTip && (
              <div
                className="position-absolute bg-dark text-white px-2 py-1 rounded"
                style={{
                  fontSize: "0.75rem",
                  top: "110%",
                  right: 0,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                Click to logout
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
