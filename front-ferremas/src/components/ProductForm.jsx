import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../api/products';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    if (isEdit) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await getProduct(id);
      console.log(res)
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, form);
      } else {
        await createProduct(form);
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Editar' : 'Nuevo'} Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
