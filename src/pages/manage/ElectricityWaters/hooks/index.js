import axios from "axios";
import { useMutation } from "react-query";

export const useGetBuildings = () => {
  const mutation = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/building', 
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
}

export const useGetFloors = () => {
  const mutation = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/floor', 
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
}

export const useGetYears = () => {
  const mutation = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/subscription/year_range/hop_dong', 
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
}

export const usePutBill = () => {
  const mutation = useMutation(async ({ body, id }) => {
    const { data } = await axios.put(
      process.env.REACT_APP_API_ENDPOINT + `/mng/subscription/${id}`,
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

  return mutation;
}

export const usePostDownload = () => {
  const mutation = useMutation(async ({ body }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + `/mng/subscription/download`,
      body,
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        'redirect': 'follow', // manual, *follow, error
        'referrerPolicy': 'no-referrer',
        'mode': 'cors', // no-cors, *cors, same-origin
        'cache': 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        'credentials': 'same-origin',
        'responseType': 'blob'
      }
    );

    return data;
  });

  return mutation;
}

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
      ...(buildingID === undefined ? [] : [`building_id=${buildingID}`]), 
      ...(floorID === undefined ? [] : [`floor_id=${floorID}`]), 
      ...(year === undefined ? [] : [`year=${year}`]), 
      ...(month === undefined ? [] : [`month=${month}`]), 
      ...(isPaid === undefined ? [] : [`is_paid=${isPaid}`]), 
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