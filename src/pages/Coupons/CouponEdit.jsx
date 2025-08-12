import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CouponEdit = ({ coupons, updateCoupon }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    const coupon = coupons.find((c) => c.id === id);
    if (coupon) {
      setCode(coupon.code);
      setDiscount(coupon.discount);
      setExpiry(coupon.expiry);
    } else {
      alert("Coupon not found");
      navigate("/coupons");
    }
  }, [id, coupons, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoupon({ id, code, discount, expiry });
    alert(`Coupon updated: ${code}, ${discount}, ${expiry}`);
    navigate("/coupons");
  };

  return (
    <div className="container my-4">
      <h2>Edit Coupon</h2>
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
        <button type="submit" className="btn btn-primary">
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default CouponEdit;
