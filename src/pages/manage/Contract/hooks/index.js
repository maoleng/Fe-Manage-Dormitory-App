import axios from "axios";
import { useMutation } from "react-query";

export const useGetContracts = () => {
  const getContracts = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract/forms', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getContracts;
};

export const useGetConfirmContracts = () => {
  const getConfirmContracts = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getConfirmContracts;
};

export const usePostConfirmContracts = () => {
  const postConfirmContracts = useMutation(async ({ body,  id }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract/form_confirm/' + id, 
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

  return postConfirmContracts;
};

export const usePostPickRoom = () => {
  const postPickRoom = useMutation(async (body, id) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract/pick_room/' + id, 
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

  return postPickRoom;
};