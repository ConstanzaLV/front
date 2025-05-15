import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../api/users';

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    full_name: '',
    password: '',
  });

  useEffect(() => {
    if (isEdit) loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const res = await getUser(id);
      setForm({
        email: res.data.email,
        full_name: res.data.full_name,
        password: '', // no mostramos la contraseña actual
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await updateUser(id, payload);
      } else {
        console.log(form)
        await createUser(form);

      }
      navigate('/users');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Editar' : 'Nuevo'} Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{isEdit ? 'Nueva contraseña' : 'Contraseña'}</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            {...(!isEdit && { required: true })}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/users')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
