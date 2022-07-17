import axios from "axios";
import { useMutation } from "react-query";

export const useGetMistakes = () => {
  const getMistakes = useMutation(async ({time = ''}) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake' + (time ? '?time='+ time : ''), 
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

export const useGetMistake = () => {
  const getMistake = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/' + id, 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getMistake;
};

export const usePostMistake = () => {
  const postMistake = useMutation(async (body) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake', 
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

  return postMistake;
};

export const usePutMistake = () => {
  const putMistake = useMutation(async (body, id) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/' + id, 
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

  return putMistake;
};

export const usePutFixMistake = () => {
  const usePutFixMistake = useMutation(async (body, id) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/fix_mistake/' + id, 
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

  return usePutFixMistake;
};