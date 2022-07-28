import axios from "axios";
import { useMutation } from "react-query";

export const useGetElectricityWaterDetail = () => {
  const mutation = useMutation(async ({ id }) => {
    console.log(process.env.REACT_APP_API_ENDPOINT + `/mng/electricity_water/${id}`);

    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/electricity_water/${id}`, 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return mutation;
};