import axios from "axios";
import { useMutation } from "react-query";

export const useGetTag = () => {
  const getTag = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/tag',
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getTag;
};

export const usePostTag = () => {
  const postPost = useMutation(async ({ body }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/tag',
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

  return postPost;
};

export const usePostPost = () => {
  const postPost = useMutation(async ({ body }) => {
    console.log(body);
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/post',
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

  return postPost;
};