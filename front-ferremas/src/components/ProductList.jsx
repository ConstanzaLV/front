import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../api/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Productos</h1>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/products/new')}
      >
        Nuevo producto
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No hay productos aún.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
