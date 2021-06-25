import { API_BASE } from "./Endpoints";
import axios from "axios";

export const GetAllData = async (endpoint) => {
  if (!endpoint) {
    return;
  }
  const response = await axios.get(`${API_BASE}/${endpoint}`);
  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const GetSingleData = async (endpoint, id) => {
  if (!endpoint) {
    return;
  }
  if (!id) {
    return;
  }
  const response = await axios.get(`${API_BASE}/${endpoint}/${id}`);
  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const PostData = async (endpoint, body) => {
  if (!endpoint) {
    return;
  }
  if (!body) {
    return;
  }
  const response = await axios.post(`${API_BASE}/${endpoint}`, body);
  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const PutData = async (endpoint, id, body) => {
  if (!endpoint) {    
    return;
  }
  if (!id || !body) {
    return;
  }

  const response = await axios.put(`${API_BASE}/${endpoint}/${id}`, body);

  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};

export const DeleteData = async (endpoint, id) => {
  if (!endpoint) {
    return;
  }

  if (!id) {
    return;
  }
  const response = await axios.delete(`${API_BASE}/${endpoint}/${id}`);
  return {
    data: response.data,
    messsage: response.message ? response.message : "",
  };
};
