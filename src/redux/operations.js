import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6460cfacca2d89f7e75f23cc.mockapi.io";


export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/username");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});


export const addContact = createAsyncThunk("contacts/add", async (contact) => {
  try {
    const response = await axios.post("/contacts", contact);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const searchContacts = createAsyncThunk("contacts/search", async (term) => {
  try {
    const response = await axios.get(`/contacts?search=${term}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteContact = createAsyncThunk("contacts/delete", async (id) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateContacts = (contacts) => {
  return {
    type: 'contacts/update',
    payload: contacts,
  };
};
