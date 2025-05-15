import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../api/users';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Usuarios</h1>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/users/new')}
      >
        Nuevo usuario
      </button>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map(u => (
              <tr key={u.id}>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/users/edit/${u.id}`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(u.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                No hay usuarios aún.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
