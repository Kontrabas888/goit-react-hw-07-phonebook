import React, { useState, useEffect } from "react";
import axios from 'axios';
import ContactDetails from './ContactDetails';

function FilterInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/contacts');
      console.log(response.data);
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
        console.log(response.data);
        if (response.data.length === 0) {
          alert("Введенний вами контакт відсутній");
        } else {
          setSearchResult(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDetails = () => {
    setSearchResult(null);
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
      {searchResult && (
        <ContactDetails contact={searchResult} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default FilterInput;
