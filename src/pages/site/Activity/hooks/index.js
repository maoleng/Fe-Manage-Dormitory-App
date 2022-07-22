import axios from "axios";
import { useMutation } from "react-query";

export const useGetPost = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/post?category=4', 
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
