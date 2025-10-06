import React, { useState } from 'react';
import { CCard, CCardBody, CForm, CFormInput, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, redirect to login after registration
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <CCard style={{ width: '400px' }}>
        <CCardBody>
          <h2 className="text-center">Register</h2>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              placeholder="Name"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <CFormInput
              type="email"
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CFormInput
              type="password"
              placeholder="Password"
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CButton color="success" type="submit" className="w-100">Register</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Register;
