import axios from "axios";
import { useMutation } from "react-query";

export const useGetSchedules = () => {
  const getMistakes = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/std/schedule?current_week=1', 
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