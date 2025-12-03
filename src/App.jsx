import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';

import WelcomePage from "./pages/auth/WelcomePage";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'; 

import ManagerDashboard from './pages/manager/ManagerDashboard'; 
import ReportsPage from './pages/manager/ReportsPage';

import OrdersPage from './pages/orders/OrdersPage';
import OrderDetailPage from './pages/orders/OrderDetailPage';
import CreateOrderPage from './pages/orders/CreateOrderPage';
import MyOrdersPage from './pages/orders/MyOrdersPage';

import CategoryListPage from './pages/menu/CategoryListPage';
import ItemListPage from './pages/menu/ItemListPage';
import ItemDetailPage from './pages/menu/ItemDetailPage';

import CustomerDashboard from "./pages/customer/CustomerDashboard";

import ManagerMenuPage from './pages/manager/ManagerMenuPage';
import AddMenuItemPage from './pages/manager/AddMenuItemPage';
import EditMenuItemPage from './pages/manager/EditMenuItemPage';

import ProfilePage from './pages/auth/ProfilePage'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ minHeight: '80vh' }}> { }
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/reports" element={<ReportsPage />} />
            <Route path="/manager/orders" element={<OrdersPage />} />

            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/create" element={<CreateOrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />

            <Route path="/my-orders" element={<MyOrdersPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/menu" element={<CategoryListPage />} />
            <Route path="/menu/items/:categoryId" element={<ItemListPage />} />

            <Route path="/menu/detail/:categoryId/:itemId" element={<ItemDetailPage />} />

            <Route path="/customer" element={<CustomerDashboard />} />

            <Route path="/manager/menu" element={<ManagerMenuPage />} />
            <Route path="/manager/menu/add" element={<AddMenuItemPage />} />
            <Route path="/manager/menu/edit/:categoryId/:itemId" element={<EditMenuItemPage />} />

          </Routes>
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;