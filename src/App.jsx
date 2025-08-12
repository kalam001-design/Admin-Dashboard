import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashboard';

import Products from './pages/Products/ProductList';
import ProductDetails from './pages/Products/ProductDetails';
import ProductAdd from './pages/Products/Productadd';

import OrdersList from './pages/Orders/OrdersList';
import OrderDetails from './pages/Orders/OrderDetails';
import OrderAdd from './pages/Orders/OrderAdd';
import OrderEdit from './pages/Orders/OrderEdit'; 

import CouponList from './pages/Coupons/CouponList';
import CouponAdd from './pages/Coupons/CouponAdd';
import CouponEdit from './pages/Coupons/CouponEdit';

import UserList from './pages/Users/UserList';
import UserAdd from './pages/Users/UserAdd';  
import UserEdit from './pages/Users/UserEdit';

import ReviewList from './pages/Review/ReviewList';
import ReviewSummaryChart from './pages/Review/ReviewSummaryChart';

import FacebookPixel from './pages/AnalyticsSettings/FacebookPixel';
import GoogleAnalytics from './pages/AnalyticsSettings/GoogleAnalytics';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

import CategoryList from './pages/category/CategoryList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute roles={['Admin', 'Manager']}>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                  <TopNavbar />
                  <div className="p-3">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="users" element={<UserList />} />
                      <Route path="users/add" element={<UserAdd />} />
                      <Route path="users/edit/:id" element={<UserEdit />} />
                      <Route path="users/block-unblock/:id" element={<UserEdit />} />
                      <Route path="products" element={<Products />} />
                      <Route path="products/add" element={<ProductAdd />} />
                      <Route path="products/:id" element={<ProductDetails />} />
                      <Route path="products/edit/:id" element={<ProductAdd />} />
                      <Route path="orders" element={<OrdersList />} />
                      <Route path="orders/add" element={<OrderAdd />} />
                      <Route path="orders/:id" element={<OrderDetails />} />
                      <Route path="orders/edit/:id" element={<OrderEdit />} />
                      <Route path="coupons" element={<CouponList />} />
                      <Route path="coupons/add" element={<CouponAdd />} />
                      <Route path="coupons/edit/:id" element={<CouponEdit />} />
                      <Route path="categories" element={<CategoryList />} />
                      <Route path="reviews" element={<ReviewList />} />
                      <Route path="reviews/summary" element={<ReviewSummaryChart />} />
                      <Route path="analytics/facebook-pixel" element={<FacebookPixel />} />
                      <Route path="analytics/google-analytics" element={<GoogleAnalytics />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
