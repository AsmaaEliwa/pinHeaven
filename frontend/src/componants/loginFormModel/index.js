import React, { useState } from 'react';
import LoginFormPage from '../LoginFormPage/index';
import Modal from '../context/model';
import "./login.css"
function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="log_in">Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;