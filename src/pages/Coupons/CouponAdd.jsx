import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponAdd = ({ addCoupon }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCoupon({ code, discount, expiry });
    alert(`Coupon added: ${code}, ${discount}, ${expiry}`);
    navigate("/coupons");
  };

  return (
    <div className="container my-4">
      <h2>Add New Coupon</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Coupon Code</label>
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discount</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. 10% or 500"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            className="form-control"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponAdd;
