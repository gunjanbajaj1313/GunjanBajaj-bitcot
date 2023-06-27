import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditContactModal = ({ contacts, setContacts,handleCloseEditModal,handleUpdateContact,setEditedAddress,showEdit,editedEmail,editedMobile,editedAddress,setEditedMobile,setEditedEmail,editedName,setEditedName }) => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedName, setEditedName] = useState('');
//   const [editedMobile, setEditedMobile] = useState('');
//   const [editedEmail, setEditedEmail] = useState('');
//   const [editedAddress, setEditedAddress] = useState('');

//   const handleOpenEditModal = (index) => {
//     setEditIndex(index);
//     const contact = contacts[index];
//     setEditedName(contact.name);
//     setEditedMobile(contact.mobile);
//     setEditedEmail(contact.email);
//     setEditedAddress(contact.address);
//     setShowEdit(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowEdit(false);
//   };

//   const handleUpdateContact = () => {
//     const updatedContacts = [...contacts];
//     updatedContacts[editIndex] = {
//       ...updatedContacts[editIndex],
//       name: editedName,
//       mobile: editedMobile,
//       email: editedEmail,
//       address: editedAddress,
//     };
//     setContacts(updatedContacts);
//     handleCloseEditModal();
//   };

  return (
    <>
    

      <Modal show={showEdit} onHide={handleCloseEditModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Name</h6>
          <input
            type="text"
            name="name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Name"
          />
          <br />
          <h6>Mobile Number</h6>
          <input
            type="text"
            name="mobile"
            value={editedMobile}
            onChange={(e) => setEditedMobile(e.target.value)}
            placeholder="Mobile"
          />
          <br />
          <h6>Email</h6>
          <input
            type="text"
            name="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <h6>Address</h6>
          <input
            type="text"
            name="address"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            placeholder="Address"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateContact}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default EditContactModal;