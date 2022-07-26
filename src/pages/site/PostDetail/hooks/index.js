import axios from "axios";
import { useMutation } from "react-query";

export const useGetPost = () => {
  const mutate = useMutation(async ({ id }) => {
    console.log(process.env.REACT_APP_API_ENDPOINT + `/std/post/${id}`);
    
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/std/post/${id}`, 
      {},
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

export const useGetPostRelated = () => {
  const mutate = useMutation(async ({ category }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/std/post?category=${category}`, 
      {},
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

