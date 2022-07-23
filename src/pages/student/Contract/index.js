import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useStore, actions } from "~/store";
import { useGetForm, usePostRegister, useGetRegistration } from "./hooks";

import MyNavbar from "~/components/MyNavbar";
import MySidebar from "~/components/MySidebar";

let session;

function Contract() {
  console.log("Page: Contract");

  const [registration, setRegistration] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [roomMax, setRoomMax] = useState(null);

  const [state, dispatch] = useStore();

  const getForm = useGetForm();
  const postRegister = usePostRegister();
  const getRegistration = useGetRegistration();

  function submitRoomRegister() {
    if (roomMax) {
      postRegister.mutate(
        {
          season_time: session,
          room_type: roomMax,
        },
        {
          onSuccess(data) {
            if (data.status) {
              getRegistration.mutate(
                {},
                {
                  onSuccess(data) {
                    console.log(data);
                    if (data.status) {
                      setRegistration(data.data);
                    }
                  },
                }
              );

              alert("Đăng ký thành công");
            }
          },
        }
      );
    } else {
      alert("Hãy chọn phòng trước");
    }
  }

  useEffect(() => {
    getRegistration.mutate(
      {},
      {
        onSuccess(data) {
          if (data.status) {
            setRegistration(data.data);
          } else {
            getForm.mutate(
              {},
              {
                onSuccess(data) {
                  console.log(data)
                  session = data.register_time;
                  setRooms(data.room_types);
                },
              }
            );
          }
        },
      }
    );
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", userSelect: "none" }}
      >
        <div>
          <svg
            style={{
              width: "24px",
              height: "24px",
              margin: "0px 16px",
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))
            }
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z"
              fill="#06245E"
            />
          </svg>
        </div>
        <div style={{ width: "100%" }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "1px solid rgb(217, 217, 217)",
          marginTop: "20px",
        }}
      >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        {registration ? (
          <div style={{ width: "100%", padding: "20px" }}>
            <div
              style={{
                padding: "0px 4px",
                fontSize: "24px",
                borderBottom: "solid #A9CBFE 3px",
                width: "25%",
              }}
            >
              THÔNG TIN ĐĂNG KÝ
            </div>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}></th>
                    <th style={{ width: "50%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>MSSV</td>
                    <td>{registration.student_id}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Họ và tên</td>
                    <td>{registration.name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Thời gian nộp đơn</td>
                    <td>{registration.register_time}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Trạng thái</td>
                    <td>{registration.registration_status}</td>
                  </tr>
                </tbody>
              </Table>

              <div style={{ width: "100%", height: "40px" }}></div>

              <button
                style={{
                  padding: "8px",
                  border: "none",
                  backgroundColor: "#0B42AB",
                  float: "right",
                }}
              >
                <svg
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.75 8.5C7.75 8.08579 7.41421 7.75 7 7.75C6.58579 7.75 6.25 8.08579 6.25 8.5H7.75ZM6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25C7.41421 15.25 7.75 14.9142 7.75 14.5H6.25ZM11.75 8.5C11.75 8.08579 11.4142 7.75 11 7.75C10.5858 7.75 10.25 8.08579 10.25 8.5H11.75ZM10.25 14.5C10.25 14.9142 10.5858 15.25 11 15.25C11.4142 15.25 11.75 14.9142 11.75 14.5H10.25ZM15.75 4.5C15.75 4.08579 15.4142 3.75 15 3.75C14.5858 3.75 14.25 4.08579 14.25 4.5H15.75ZM3.75 4.5C3.75 4.08579 3.41421 3.75 3 3.75C2.58579 3.75 2.25 4.08579 2.25 4.5H3.75ZM1 3.75C0.585786 3.75 0.25 4.08579 0.25 4.5C0.25 4.91421 0.585786 5.25 1 5.25V3.75ZM17 5.25C17.4142 5.25 17.75 4.91421 17.75 4.5C17.75 4.08579 17.4142 3.75 17 3.75V5.25ZM11.25 4.5C11.25 4.91421 11.5858 5.25 12 5.25C12.4142 5.25 12.75 4.91421 12.75 4.5H11.25ZM5.25 4.5C5.25 4.91421 5.58579 5.25 6 5.25C6.41421 5.25 6.75 4.91421 6.75 4.5H5.25ZM6.25 8.5V14.5H7.75V8.5H6.25ZM10.25 8.5V14.5H11.75V8.5H10.25ZM14.25 4.5V16.5H15.75V4.5H14.25ZM13 17.75H5V19.25H13V17.75ZM3.75 16.5V4.5H2.25V16.5H3.75ZM5 17.75C4.30964 17.75 3.75 17.1904 3.75 16.5H2.25C2.25 18.0188 3.48122 19.25 5 19.25V17.75ZM14.25 16.5C14.25 17.1904 13.6904 17.75 13 17.75V19.25C14.5188 19.25 15.75 18.0188 15.75 16.5H14.25ZM1 5.25H17V3.75H1V5.25ZM12.75 4.5V3.5H11.25V4.5H12.75ZM10 0.75H8V2.25H10V0.75ZM5.25 3.5V4.5H6.75V3.5H5.25ZM8 0.75C6.48122 0.75 5.25 1.98122 5.25 3.5H6.75C6.75 2.80964 7.30964 2.25 8 2.25V0.75ZM12.75 3.5C12.75 1.98122 11.5188 0.75 10 0.75V2.25C10.6904 2.25 11.25 2.80964 11.25 3.5H12.75Z"
                    fill="white"
                  />
                </svg>
                <span
                  style={{
                    margin: "0px 8px",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "12px",
                    height: "40px",
                    lineHeight: "20px",
                  }}
                >
                  Hủy đơn đăng ký
                </span>
              </button>
            </div>
          </div>
        ) : rooms ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: "1200px",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <h1 style={{ margin: "50px auto" }}>Đăng ký Ký túc xá</h1>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {rooms.map(({ max, price_per_month, description }) => (
                  <div
                    style={{
                      width: "200px",
                      border: "solid #84B4FCFF 1px",
                      outline: roomMax === max ? "solid #35D66CFF 3px" : "none",
                      padding: "25px",
                      margin: "30px",
                      textAlign: "left",
                      position: "relative",
                    }}
                    onClick={() => setRoomMax(max)}
                    key={max}
                  >
                    <img
                      src="/imgs/icons/room-icon.png"
                      style={{ width: "100%" }}
                      alt="room-icon"
                    />
                    <b>{description}</b>
                    <p>Giá: {price_per_month}/tháng</p>
                    <Link to="/">Xem chi tiết</Link>

                    {roomMax === max ? (
                      <svg
                        style={{
                          width: "32px",
                          height: "32px",
                          position: "absolute",
                          top: "-16px",
                          right: "-16px",
                          backgroundColor: "#FFFFFF",
                        }}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0016 32C7.16818 31.9903 0.00970076 24.8325 0 16V15.68C0.175908 6.88727 7.41608 -0.115241 16.2107 0.00143715C25.0053 0.118115 32.0571 7.31024 31.9997 16.1046C31.9422 24.8989 24.797 31.9982 16.0016 32ZM8.65686 15.344L6.40064 17.6L12.8013 24L25.6026 11.2L23.3463 8.92802L12.8013 19.472L8.65686 15.344Z"
                          fill="#35D66C"
                        />
                      </svg>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>

              <button
                style={{
                  margin: "50px auto",
                  backgroundColor: "#3E88F6FF",
                  color: "#FFFFFFFF",
                  border: "none",
                  outline: "none",
                  padding: "10px 50px",
                  fontWeight: "bold",
                }}
                onClick={submitRoomRegister}
              >
                Đăng ký
              </button>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
}

export default Contract;
