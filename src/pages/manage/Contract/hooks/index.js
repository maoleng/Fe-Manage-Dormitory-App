import axios from "axios";
import { useMutation } from "react-query";

export const useGetContracts = () => {
  const mutate = useMutation(async () => {
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

  return mutate;
};

export const useGetConfirmContracts = () => {
  const mutate = useMutation(async () => {
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

  return mutate;
};

export const usePostConfirmContracts = () => {
  const mutate = useMutation(async ({ body,  id }) => {
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

  return mutate;
};

export const usePostPickRoom = () => {
  const mutate = useMutation(async ({ body, id }) => {
    console.log(process.env.REACT_APP_API_ENDPOINT + `/mng/contract/pick_room/${id}`);
    console.log(body);
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + `/mng/contract/pick_room/${id}`, 
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

  return mutate;
};

export const useGetRooms = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/room',
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return mutate;
};