import React from "react";

const OrderTimeline = ({ timeline }) => {
  /*
    timeline = [
      { status: "Order Placed", date: "2024-08-01 10:00 AM" },
      { status: "Processing", date: "2024-08-02 02:00 PM" },
      { status: "Shipped", date: "2024-08-03 09:30 AM" },
      { status: "Out for Delivery", date: "2024-08-04 08:00 AM" },
      { status: "Delivered", date: "2024-08-04 03:45 PM" },
    ]
  */

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">Order Timeline</h5>
      </div>
      <div className="card-body">
        <ul className="timeline">
          {timeline.map(({ status, date }, index) => (
            <li key={index} className="mb-4">
              <div className="d-flex align-items-center mb-1">
                <span
                  className="rounded-circle bg-primary"
                  style={{ width: "12px", height: "12px", display: "inline-block", marginRight: "10px" }}
                ></span>
                <strong>{status}</strong>
              </div>
              <small className="text-muted">{date}</small>
              {index !== timeline.length - 1 && (
                <hr className="my-3" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .timeline {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default OrderTimeline;
