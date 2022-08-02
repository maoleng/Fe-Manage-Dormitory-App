import axios from "axios";
import { useMutation } from "react-query";

export const useGetRooms = () => {
  const mutate = useMutation(async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/std/attendance/get_rooms",
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  });

  return mutate;
};

export const useGetRoomStudents = () => {
  const mutate = useMutation(async ({ id }) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/std/attendance/get_students/${id}`,
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  });

  return mutate;
};

export const usePostAttendance = () => {
  const mutate = useMutation(async ({ body, id }) => {
    const { data } = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + '/std/attendance/check_attendance',
      body,
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  });

  return mutate;
};