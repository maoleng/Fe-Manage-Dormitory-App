import axios from "axios";
import { useMutation } from "react-query";

export const useGetForm = () => {
  const getForm = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/contract/form', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getForm;
};

export const usePostRegister = () => {
  const postRegister = useMutation(async (body) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/std/contract/register', 
      body,
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return postRegister;
};

export const useGetRegistration = () => {
  const getRegistration = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/contract/registration', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getRegistration;
};