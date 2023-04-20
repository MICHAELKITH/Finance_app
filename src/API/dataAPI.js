import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  URL, Company, Companies, Sectors,
} from './data';

const fetchCompanies = createAsyncThunk(
  'companies/getCompanies',
  async (sector) => {
    const baseUrl = `${URL}${Companies}?sector=${sector}&apikey=${process.env.REACT_APP_FINANCE_API_KEY} `;
    const response = await axios.get(baseUrl);
    return response.data;
  },
);
const fetchCompany = createAsyncThunk(
  'company/fetchCompany',
  async (symbol) => {
    const baseUrl = `${URL}${Company}${symbol}?apikey=${process.env.REACT_APP_FINANCE_API_KEY}} `;
    const response = await axios.get(baseUrl);
    return response.data[0];
  },
);
const fetchSectors = createAsyncThunk(
  'sectors/fetchSectors',
  async () => {
    const baseUrl = `${URL}${Sectors}?apikey=${process.env.REACT_APP_FINANCE_API_KEY}} `;
    const response = await axios.get(baseUrl);
    return response.data;
  },
);
export default fetchCompanies;
export { fetchCompany, fetchSectors };
