import React, { useState, useEffect } from "react";
import axios from 'axios';
import ContactList from './ContactList';

function FilterInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

 useEffect(() => {
  fetchContacts();
}, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(`/contacts?search=${searchTerm}`);
        setContacts(response.data);
        if (response.data.length === 0) {
          alert("Введений вами контакт відсутній");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

const handleContactDelete = async (id) => {
  try {
    await axios.delete(`/contacts/${id}`);
    const response = await axios.get('/contacts');
    const updatedContacts = response.data.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <label>
        Filter contacts:
        <input
          type="text"
          onChange={handleFilterChange}
          onKeyPress={handleKeyPress}
          value={searchTerm}
        />
      </label>
      <ContactList contacts={contacts} onContactDelete={handleContactDelete} />
    </div>
  );
}

export default FilterInput;
