import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />

        {/* Productos */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />

        {/* Usuarios */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}
