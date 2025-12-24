import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import CartPage from "./pages/CartPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import PayPage from "./pages/PayPage.jsx";
import PaymentMockPage from "./pages/PaymentMockPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage.jsx";
import AdminProductsPage from "./pages/admin/AdminProductsPage.jsx";
import AdminProductCreatePage from "./pages/admin/AdminProductCreatePage.jsx";
import AdminProductEditPage from "./pages/admin/AdminProductEditPage.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import "aos/dist/aos.css";

function App() {
  return (
    <>
      <Toaster richColors />

      <div id="root-wrapper" className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* ===== AUTH REQUIRED ===== */}
            <Route
              path="/pay"
              element={
                <AuthGuard>
                  <PayPage />
                </AuthGuard>
              }
            />

            <Route
              path="/payment/:id"
              element={
                <AuthGuard>
                  <PaymentMockPage />
                </AuthGuard>
              }
            />

            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/orders" element={<MyOrdersPage />} />

            <Route
              path="/orders/:id"
              element={
                <AuthGuard>
                  <OrderDetailPage />
                </AuthGuard>
              }
            />

            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />

            {/* ===== ADMIN ===== */}
            <Route
              path="/admin/orders"
              element={
                <AuthGuard>
                  <AdminOrdersPage />
                </AuthGuard>
              }
            />

            <Route
              path="/admin/orders/:id"
              element={
                <AuthGuard>
                  <AdminOrderDetailPage />
                </AuthGuard>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProductsPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products/new"
              element={
                <AdminRoute>
                  <AdminProductCreatePage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminRoute>
                  <AdminProductEditPage />
                </AdminRoute>
              }
            />

            {/* ===== NOT FOUND (LUÔN CUỐI) ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
