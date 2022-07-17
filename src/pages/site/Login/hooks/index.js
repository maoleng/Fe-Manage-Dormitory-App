import axios from "axios";
import { useMutation } from "react-query";
import { DeviceUUID } from "device-uuid";

export const useLogin = () => {
  const login = useMutation(async (body) => {
    const bodyWrap = { ...body, device_id: new DeviceUUID().get() };

    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + (bodyWrap.username.includes("student") ? '/std' : '/mng') + '/login', 
      bodyWrap
    );

    return data;
  });

  return login;
};
