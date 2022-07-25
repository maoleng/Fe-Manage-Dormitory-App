import axios from "axios";
import { useMutation } from "react-query";

export const useGetPost = () => {
  const mutate = useMutation(async ({ id }) => {
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
