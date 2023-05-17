import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ContactList({ contacts, onContactDelete }) {
  const [contactList, setContactList] = useState(contacts);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  const handleContactDelete = (id) => {
    onContactDelete(id);
    setContactList(contactList.filter((contact) => contact.id !== id));
  };

  return (
    <ul>
      {contactList.map(({ id, name, phone }) => (
        <li key={id}>
          {name}: {phone}
          <button className="delete-contact" type="button" onClick={() => handleContactDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default ContactList;
