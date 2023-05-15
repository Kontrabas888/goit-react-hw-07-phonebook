import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/operations";

function ContactForm({ onContactSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = { name, phone };
    dispatch(addContact(newContact));
    onContactSubmit(newContact);
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
