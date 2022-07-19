import axios from "axios";
import { useMutation } from "react-query";

export const useGetForms = () => {
  const getForms = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/form', 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getForms;
};

export const useGetForm = () => {
  const getForm = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/std/form/${id}`, 
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

export const usePostForm = () => {
  const postForm = useMutation(async ({ body }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/std/form', 
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

  return postForm;
};

export const usePostFormComment = () => {
  const postFormComment = useMutation(async ({ body }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/std/form/answer', 
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

  return postFormComment;
};