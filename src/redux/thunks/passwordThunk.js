
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Base URL
const API = 'http://localhost:3001/passwords'

export const fetchPasswords = createAsyncThunk('passwords/fetch', async () => {
  const res = await axios.get(API)
  return res.data
})

export const addPasswordAsync = createAsyncThunk('passwords/add', async (password) => {
  const res = await axios.post(API, password)
  return res.data
})

export const deletePasswordAsync = createAsyncThunk('passwords/delete', async (id) => {
  await axios.delete(`${API}/${id}`)
  return id
})

export const updatePasswordAsync = createAsyncThunk('passwords/update', async ({ id, updatedData }) => {
    const res = await axios.put(`${API}/${id}`, updatedData)
  return res.data
})