import axios from "axios";
import { useMutation } from "react-query";

export const useGetForms = () => {
  const getForms = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/form', 
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