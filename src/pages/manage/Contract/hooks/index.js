import axios from "axios";
import { useMutation } from "react-query";

export const useGetTypes = () => {
  const mutation = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/detail', 
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

export const useGetContracts = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract/forms', 
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

export const useGetConfirmContracts = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract', 
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

export const usePostConfirmContracts = () => {
  const mutate = useMutation(async ({ body,  id }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/mng/contract/form_confirm/' + id, 
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

  return mutate;
};

export const usePostPickRoom = () => {
  const mutate = useMutation(async ({ body, id }) => {
    console.log(process.env.REACT_APP_API_ENDPOINT + `/mng/contract/pick_room/${id}`);
    console.log(body);
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + `/mng/contract/pick_room/${id}`, 
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

  return mutate;
};

export const useGetRooms = () => {
  const mutate = useMutation(async ({ buildingID, floorID, detailID, status }) => {
    const params = [
      ...(buildingID === undefined ? [] : [`building_id=${buildingID}`]), 
      ...(floorID === undefined ? [] : [`floor_id=${floorID}`]), 
      ...(detailID === undefined ? [] : [`detail_id=${detailID}`]), 
      ...(status === undefined ? [] : [`status=${status}`]), 
    ].join('&');

    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/room${params && `?${params}`}`,
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

export const useGetstudent = () => {
  const mutation = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/mng/student/${id}`, 
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