import React, { useState } from 'react';
import SignupFormPage from "../SignupFormPage/index";
import Modal from '../context/model';
import "./signup.css"
function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="sign_up">Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          < SignupFormPage/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;