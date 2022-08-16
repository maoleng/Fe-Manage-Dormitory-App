import axios from "axios";
import { useMutation } from "react-query";

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

export const useGetMistakes = () => {
  const getMistakes = useMutation(async ({ building_id, floor_id, is_fix_mistake, is_confirmed, time = '' }) => {
    const params = [
      ...(building_id === undefined ? [] : [`building_id=${building_id}`]), 
      ...(floor_id === undefined ? [] : [`floor_id=${floor_id}`]), 
      ...(is_fix_mistake === undefined ? [] : [`is_fix_mistake=${is_fix_mistake}`]), 
      ...(is_confirmed === undefined ? [] : [`is_confirmed=${is_confirmed}`]), 
      ...(is_confirmed === undefined ? [] : [`is_confirmed=${is_confirmed}`]), 
      ...(time === undefined ? [] : [`time=${time}`]), 
    ].join('&');

    console.log(process.env.REACT_APP_API_ENDPOINT + `/mng/mistake${params && `?${params}`}`);

    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/mistake${params && `?${params}`}`, 
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

export const useGetMistakeTypes = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/mistake_type', 
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

export const useGetMistake = () => {
  const getMistake = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/' + id, 
      {
        'headers': {
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
    );

    return data;
  });

  return getMistake;
};

export const usePostMistake = () => {
  const postMistake = useMutation(async (body) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake', 
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

  return postMistake;
};

export const usePutMistake = () => {
  const putMistake = useMutation(async ({ body, id }) => {
    console.log(body);
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/' + id, 
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

  return putMistake;
};

export const usePutFixMistake = () => {
  const usePutFixMistake = useMutation(async ({ body, id }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/mistake/fix_mistake/' + id, 
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

  return usePutFixMistake;
};