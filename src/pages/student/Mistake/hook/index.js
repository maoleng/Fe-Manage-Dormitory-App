import axios from "axios";
import { useMutation } from "react-query";

export const useGetMistakes = () => {
  const getMistakes = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/mistake', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getMistakes;
};

export const usePutRegister = () => {
  const putRegister = useMutation(async (body, id) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/std/mistake/' + id, 
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

  return putRegister;
};