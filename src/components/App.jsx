import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import FilterInput from "./FilterInput";
import { fetchContacts, addContact, searchContacts, deleteContact } from "../redux/operations";
import "../redux/style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { items: contacts = [], filter } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = async (contact) => {
    try {
      await dispatch(addContact(contact));
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await dispatch(deleteContact(id));
      dispatch(searchContacts(filter));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchContacts = (term) => {
    dispatch(searchContacts(term));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Contact"}
      </button>
      {showForm && <ContactForm onContactSubmit={handleAddContact} />}
      <h2>Contacts</h2>
      <FilterInput onFilterChange={handleSearchContacts} />
      <ContactList contacts={contacts} onContactDelete={handleDeleteContact} />
    </div>
  );
}

export default App;
