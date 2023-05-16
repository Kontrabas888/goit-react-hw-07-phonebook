import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import FilterInput from "./FilterInput";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import "../redux/style.css";
import { fetchAllUsers, addContact } from "../redux/operations";
import { deleteContact } from "../redux/contactSlice";

function App() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { items: contacts = [], filter } = useSelector((state) => state.contacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleAddContact = (contact) => {
    dispatch(addContact(contact));
    setShowForm(false);
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <h1>Phonebook</h1>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Hide Form" : "Add Contact"}
          </button>
          {showForm && <ContactForm onContactSubmit={handleAddContact} />}
          <h2>Contacts</h2>
          <FilterInput />
          <ContactList
            contacts={filteredContacts}
            onContactDelete={handleDeleteContact}
          />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
