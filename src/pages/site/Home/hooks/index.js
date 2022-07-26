import axios from "axios";
import { useMutation } from "react-query";

export const useGetPostsNew = () => {
  const mutate = useMutation(async ({ category }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/std/post/new?category=${category}`, 
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
