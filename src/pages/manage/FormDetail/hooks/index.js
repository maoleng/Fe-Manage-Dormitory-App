import axios from "axios";
import { useMutation } from "react-query";

export const useGetFormDetail = () => {
  const getFormDetail = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/form/${id}`, 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getFormDetail;
};