import React from "react";
import PropTypes from "prop-types";

function ContactDetails({ contact, onClose }) {
  const { name, phone } = contact;

  return (
    <div className="contact-details">
      <h2>Контакт пошуку</h2>
      <p>Name: {name}</p>
      <p>Phone: {phone}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

ContactDetails.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactDetails;
