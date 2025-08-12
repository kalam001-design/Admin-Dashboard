import React, { useState } from "react";
import { Link } from "react-router-dom";

const CouponList = ({ coupons, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry >= today ? "Active" : "Expired";
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const searchMatch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.discount.toLowerCase().includes(searchTerm.toLowerCase());

    const status = getStatus(coupon.expiry);
    const statusMatch = filterStatus === "all" || filterStatus === status;

    return searchMatch && statusMatch;
  });

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (onDelete && deleteId != null) {
      onDelete(deleteId);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="container my-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-3 mb-md-0">কুপন তালিকা</h1>
        <Link to="/coupons/add" className="btn btn-primary">
          নতুন কুপন যোগ করুন
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <input
            type="search"
            className="form-control"
            placeholder="কুপন কোড বা ডিসকাউন্ট অনুসন্ধান করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">সব স্ট্যাটাস</option>
            <option value="Active">সক্রিয়</option>
            <option value="Expired">মেয়াদোত্তীর্ণ</option>
          </select>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover mb-0">
          <thead className="table-primary">
            <tr>
              <th>কুপন কোড</th>
              <th>ডিসকাউন্ট</th>
              <th>মেয়াদ শেষ</th>
              <th>স্ট্যাটাস</th>
              <th className="text-center" style={{ width: "130px" }}>
                একশনস
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.length ? (
              filteredCoupons.map((coupon) => {
                const status = getStatus(coupon.expiry);
                return (
                  <tr key={coupon.id}>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.expiry}</td>
                    <td>
                      <span
                        className={`badge ${
                          status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {status === "Active" ? "সক্রিয়" : "মেয়াদোত্তীর্ণ"}
                      </span>
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/coupons/edit/${coupon.id}`}
                        className="btn btn-sm btn-info me-2"
                        title="সম্পাদনা"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        title="মুছুন"
                        onClick={() => confirmDelete(coupon.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  কোন কুপন পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header">
                <h5 className="modal-title">মুছে ফেলার নিশ্চিতকরণ</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                আপনি কি এই কুপনটি মুছে ফেলতে চান?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  বাতিল করুন
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  মুছুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponList;
