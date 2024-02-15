import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from './axiosConfig';

interface User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterUser: React.FC = () => {

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(user)
    try {
      const csrf = () => axios.get('/sanctum/csrf-cookie')
      await csrf()
      const response = await axios.post('/register', user);
      const userData = await axios.get('/api/user');
      console.log(userData)
      console.log('Registro exitoso', response.data);
      setUser({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });

    } catch (error) {
      console.error('Error al registrar usuario', error.response.data);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterUser