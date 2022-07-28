import axios from "axios";
import { useMutation } from "react-query";

export const useGetElectricityWater = () => {
  const mutation = useMutation(async ({ id }) => {
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

export const useGetElectricityWaters = () => {
  const mutation = useMutation(async ({ buildingID, floorID, year, month, isPaid }) => {
    const params = [
      ...(!buildingID ? [] : [`building_id=${buildingID}`]), 
      ...(!floorID ? [] : [`floor_id=${floorID}`]), 
      ...(!year ? [] : [`year=${year}`]), 
      ...(!month ? [] : [`month=${month}`]), 
      ...(!isPaid ? [] : [`is_paid=${isPaid}`]), 
    ].join('&');

    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/electricity_water${params && `?${params}`}`, 
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