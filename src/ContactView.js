import React from "react";
import Card from "react-bootstrap/Card";
import ContactList from "./data.json";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { FcAddImage} from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditContactModal from "./EditContactModal";


const ContactView = () => {

    const[contactListState, setContactListState] = useState(ContactList)
    const[modalDetails,setmodalDetails] = useState([])

    //Contact Details Show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const showDetails = (id) => {
    setShow(true)
      let filteredList = contactListState.filter(item => item.id===id)
      console.log(filteredList)
      setmodalDetails(filteredList)
  }



// Search a Contact
const [search, setSearch] = useState("");



//Add a new contact
const [showadd, setShowadd] = useState(false);
const handleCloseadd = () => setShowadd(false);
const handleShowadd = () => setShowadd(true);
const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    mobile: '',
    email: '',
    address: ''
  });
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const [lastAssignedId, setLastAssignedId] = useState(2);
  const handleAddUser = () => {
   
    if (
      newUser.name.trim() === '' ||
      newUser.mobile.trim() === '' ||
      newUser.email.trim() === '' ||
      newUser.address.trim() === ''
    ) {
      alert('Please fill in all the required fields');
      return; 
    }
    const newId = lastAssignedId + 1;
    
    setContactListState([...contactListState,{ ...newUser,id: newId}]);
  
    setLastAssignedId(newId);
    setNewUser({
      id: '',
      name: '',
      mobile: '',
      email: '',
      address: ''
    });
    handleCloseadd()
  };
  



//Delete a User
const handleDeleteUser = (id) => {
    const filteredUsers = contactListState.filter((user) => user.id !== id);
    setContactListState(filteredUsers);
  };



//Edit a User
const [showEdit, setShowEdit] = useState(false);
const [editIndex, setEditIndex] = useState(null);
const [editedName, setEditedName] = useState('');
const [editedMobile, setEditedMobile] = useState('');
const [editedEmail, setEditedEmail] = useState('');
const [editedAddress, setEditedAddress] = useState('');



const handleCloseEditModal = () => {
  setShowEdit(false);
};
const handleUpdateContact = () => {
  const updatedContacts = contactListState.map((contact) => {
    if (contact.id === editIndex) {
      return {
        ...contact,
        name: editedName,
        mobile: editedMobile,
        email: editedEmail,
        address: editedAddress,
      };
    }
    return contact;
  });
  setContactListState(updatedContacts);
  handleCloseEditModal();
};

const handleOpenEditModal = (id) => {
  setEditIndex(id);
  const contact = contactListState.find((item) => item.id === id);
  console.log(contact);
  if (contact) {
    setEditedName(contact.name);
    setEditedMobile(contact.mobile);
    setEditedEmail(contact.email);
    setEditedAddress(contact.address);
    setShowEdit(true);
  }
};





  return (
    <div>
      <div className="container">
        <div className="main">
          <h1 className="main-head">All Contacts</h1>
          <p className="add-click" >
            <FcAddImage onClick={handleShowadd} />
          </p>
        </div>
        <div className="search">
          <input
            placeholder="Search"
            className="search-contact"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {contactListState.filter((val) => {
            if (
              val.name.toLowerCase().includes(search.toLocaleLowerCase())||
              val.mobile.includes(search)
            ) {
              return val;
            } else if (search == "") {
              return val;
            }
          }).map((user) => (
        <Card key={user.id} className="card-views">
          <div className="card-container">
            <div className="id">
              <p>{user.id}</p>
            </div>
            <div className="profile">
              <BiUserCircle />
            </div>
            <div className="name-mobile">
              <span>{user.name}</span>
              <br/>
              <span>{user.mobile}</span>
            </div>
            <div className="show-edit-delete">
              <p>
                <BiSolidShow onClick={() => showDetails(user.id)} className="show-details" />
              </p>
              <p>
                <BiEdit onClick={() => handleOpenEditModal(user.id)} className="edit" />
              </p>
              <p>
                <MdDelete onClick={() => handleDeleteUser(user.id)} className="delete" />
              </p>
            </div>
          </div>
        </Card>
      ))}
   
       {/* Show the details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="list-style">
        {modalDetails.map(user => (
            <Card>
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Mobile: {user.mobile}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
          </li>
          </Card>
        ))}
      </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

     {/* Add a User */}
      <Modal
        show={showadd}
        onHide={handleCloseadd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h6>Name</h6>
      <input
    type="text"
    name="name"
    value={newUser.name}
    onChange={handleInputChange}
    placeholder="Name"
  />
  <br/>
  <h6>Mobile Number</h6>
  <input
    type="text"
    name="mobile"
    value={newUser.mobile}
    onChange={handleInputChange}
    placeholder="Mobile"
  />
  <br/>
  <h6>Email</h6>
  <input
    type="text"
    name="email"
    value={newUser.email}
    onChange={handleInputChange}
    placeholder="Email"
  />
  <br/>
  <h6>Address</h6>
   <input
    type="text"
    name="address"
    value={newUser.address}
    onChange={handleInputChange}
    placeholder="Address"
  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseadd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>Submit</Button>
        </Modal.Footer>
      </Modal>


      {/* EDit a Contact */}
      {/* <Modal
        show={showedit}
        onHide={handleCloseedit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h6>Name</h6>
      <input
    type="text"
    name="name"
   
    placeholder="Name"
  />
  <br/>
  <h6>Mobile Number</h6>
  <input
    type="text"
    name="mobile"

    placeholder="Mobile"
  />
  <br/>
  <h6>Email</h6>
  <input
    type="text"
    name="email"
  
    placeholder="Email"
  />
  <br/>
  <h6>Address</h6>
   <input
    type="text"
    name="address"

    placeholder="Address"
  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseedit}>
            Close
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal> */}
   <EditContactModal contacts={contactListState} setContacts={setContactListState}  handleOpenEditModal={ handleOpenEditModal} handleCloseEditModal={handleCloseEditModal} handleUpdateContact={handleUpdateContact} showEdit={showEdit} editedName={editedName} setEditedName={setEditedName} editedMobile={editedMobile}  editedEmail={editedEmail} setEditedEmail={setEditedEmail} editedAddress={editedAddress} setEditedAddress={setEditedAddress}/>
    </div>
  );
};

export default ContactView;
