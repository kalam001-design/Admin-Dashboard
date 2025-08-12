import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setMobileView(true);
        setCollapsed(false);
      } else {
        setMobileView(false);
        setMobileSidebarOpen(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Dashboard", path: "/" },
    {
      label: "Product Management",
      path: "/products",
      submenu: [
        { label: "All Products", path: "/products" },
        { label: "Add Product", path: "/products/add" },
        { label: "Product Categories", path: "/products/categories" },
      ],
    },
    {
      label: "Category & Subcategory",
      path: "/categories",
      submenu: [
        { label: "Categories", path: "/categories" },
        { label: "Subcategories", path: "/categories/subcategories" },
      ],
    },
    {
      label: "Order Management",
      path: "/orders",
      submenu: [
        { label: "All Orders", path: "/orders" },
        { label: "Pending Orders", path: "/orders/pending" },
        { label: "Completed Orders", path: "/orders/completed" },
      ],
    },
    {
      label: "User Management",
      path: "/users",
      submenu: [
        { label: "All Users", path: "/users" },
        { label: "Add User", path: "/users/add" },
        { label: "User Roles", path: "/users/roles" },
      ],
    },
  ];

  function toggleSubmenu(label) {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }

  return (
    <>
      {mobileView && mobileSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`bg-dark border-end vh-100 position-fixed d-flex flex-column ${
          mobileView ? "top-0" : ""
        }`}
        style={{
          width: collapsed ? "4.5rem" : "18rem",
          zIndex: 1050,
          left: mobileView ? (mobileSidebarOpen ? 0 : "-18rem") : 0,
          transition: "width 0.2s ease, left 0.3s ease",
          backgroundColor: "#212529",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between p-3 border-bottom"
          style={{ backgroundColor: "#212529" }}
        >
          {!collapsed && <h5 className="mb-0 text-white">Admin Panel</h5>}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              mobileView
                ? setMobileSidebarOpen(false)
                : setCollapsed((c) => !c)
            }
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {mobileView ? "✕" : collapsed ? "☰" : "←"}
          </button>
        </div>

        <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
          {menuItems.map(({ label, path, submenu }) => (
            <li
              key={label}
              className="list-group-item p-1 border-0"
              style={{ backgroundColor: "#212529" }}
            >
              <div
                className="d-flex align-items-center justify-content-between"
                onClick={() => submenu && toggleSubmenu(label)}
                style={{ cursor: submenu ? "pointer" : "default" }}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    "d-flex align-items-center flex-grow-1 text-decoration-none px-2 py-2 rounded " +
                    (isActive ? "bg-primary text-white" : "text-light")
                  }
                  end={!submenu}
                  onClick={() => mobileView && setMobileSidebarOpen(false)}
                  style={{ whiteSpace: "nowrap" }}
                  data-bs-toggle={collapsed ? "tooltip" : ""}
                  data-bs-placement="right"
                  title={collapsed ? label : ""}
                >
                  {!collapsed && (
                    <span className="ms-2 small">{label}</span>
                  )}
                </NavLink>

                {!collapsed && submenu && (
                  <span
                    className="ms-2 text-muted"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: openMenus[label]
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    ▶
                  </span>
                )}
              </div>

              {!collapsed && submenu && openMenus[label] && (
                <ul className="list-group list-group-flush ms-4 mt-1">
                  {submenu.map(({ label: subLabel, path: subPath }) => (
                    <li
                      key={subPath}
                      className="list-group-item p-1 border-0"
                      style={{ backgroundColor: "#212529" }}
                    >
                      <NavLink
                        to={subPath}
                        className={({ isActive }) =>
                          "nav-link py-1 px-3 rounded " +
                          (isActive
                            ? "bg-primary text-white"
                            : "text-secondary")
                        }
                        end
                        onClick={() =>
                          mobileView && setMobileSidebarOpen(false)
                        }
                        data-bs-toggle={collapsed ? "tooltip" : ""}
                        data-bs-placement="right"
                        title={collapsed ? subLabel : ""}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {subLabel}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {mobileView && !mobileSidebarOpen && (
        <button
          className="btn btn-primary position-fixed top-3 start-3"
          style={{ zIndex: 1060 }}
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      <style>{`
        @media (min-width: 768px) {
          body > div > div {
            margin-left: ${collapsed ? "4.5rem" : "18rem"} !important;
            transition: margin-left 0.2s ease;
          }
        }
      `}</style>
    </>
  );
}
