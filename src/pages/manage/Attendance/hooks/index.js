import axios from "axios";
import { useMutation } from "react-query";

export const useGetRooms = () => {
  const mutation = useMutation(async ({ buildingId, floorId }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/room?building_id=${buildingId}&floor_id=${floorId}`, 
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

export const useGetFloors = () => {
  const mutation = useMutation(async ({ buildingId }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/floor?building_id=${buildingId}`, 
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

export const useGetBuildings = () => {
  const mutation = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/building`, 
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

export const useGetAttendances = () => {
  const mutation = useMutation(async ({ time, status, buildingId, floorId, roomId }) => {
    const params = [
      ...(time === undefined ? [] : [`time=${time}`]), 
      ...(status === undefined ? [] : [`status=${status}`]), 
      ...(buildingId === undefined ? [] : [`building_id=${buildingId}`]), 
      ...(floorId === undefined ? [] : [`floor_id=${floorId}`]), 
      ...(roomId === undefined ? [] : [`room_id=${roomId}`]), 
    ].join('&');

    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/attendance${params && `?${params}`}`, 
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

export const useGetAttendance = () => {
  const mutation = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/attendance/${id}`, 
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



