import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar container">
      {/* Productos */}
      <Link className="btn btn-secondary" to="/products">
        Listado Productos
      </Link>
      <Link className="btn btn-secondary" to="/products/new">
        Nuevo Producto
      </Link>

      {/* Usuarios */}
      <Link className="btn btn-secondary" to="/users">
        Listado Usuarios
      </Link>
      <Link className="btn btn-secondary" to="/users/new">
        Nuevo Usuario
      </Link>
    </nav>
  );
}
