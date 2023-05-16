import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFilter, searchContacts } from "../redux/contactSlice";
import axios from 'axios';
import { deleteContact } from '../redux/operations';
import ContactList from './ContactList';

function FilterInput() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value;
    dispatch(updateFilter(searchTerm));
    setSearchTerm(searchTerm);
    if (searchTerm) {
      dispatch(searchContacts(searchTerm));
    } else {
      setContacts([]);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(`/contacts?search=${searchTerm}`);
        setContacts(response.data);
        if (response.data.length === 0) {
          alert("Такого контакту там нема)");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleContactDelete = async (id) => {
    try {
      await dispatch(deleteContact(id));
      const response = await axios.get('/contacts');
      setContacts(response.data);
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
