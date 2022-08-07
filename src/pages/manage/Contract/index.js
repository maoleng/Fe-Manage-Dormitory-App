import { useState, useEffect } from "react";
import { Table, Modal, Toast, ToastContainer } from "react-bootstrap";

import MyNavbar from "~/components/MyNavbar";
import MyTable from "~/components/MyTable";
import MySidebar from "~/components/MySidebar";
import { useStore, actions } from "~/store";
import {
  useGetConfirmContracts,
  usePostPickRoom,
  useGetRooms,
  usePutBill,
} from "./hooks";
import { CheckboxSVG, CheckboxTickSVG } from "./svgs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
function Contract() {
  console.log("Page: Contract");

  const putBill = usePutBill();
  const getConfirmContracts = useGetConfirmContracts();
  const postPickRoom = usePostPickRoom();
  const getRooms = useGetRooms();

  const [toast, setToast] = useState(null);
  const [room, setRoom] = useState(false);
  const [roomDetailModal, setRoomDetailModal] = useState(false);
  const [pickRoomModal, setPickRoomModal] = useState(false);
  const [pickRoomID, setPickRoomID] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [contract, setContract] = useState(null);
  const [contracts, setContracts] = useState(false);
  const [state, dispatch] = useStore();
  const [pagenum, setPageNum] = useState(1);
  let arrNum = [];
  let arrNum1 = [];
  let arrNum2 = [];
  let arrNum3 = [];
  let arrre = [];
  let goForward = () => {
    if (!(pagenum === arrNum.length)) {
      setPageNum(pagenum + 1);
    }
  };
  let goBackward = () => {
    if (pagenum >= 2) {
      setPageNum(pagenum - 1);
    }
  };
  const showRoomDetail = (id) => {
    setRoomDetailModal(true);
    setRoom(rooms.find((elem) => elem.id === id));
  };

  const hideRoomDetail = () => {
    setRoomDetailModal(false);
    setRoom(null);
  };

  const showPickRoom = (id) => {
    getRooms.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          setRooms(data.data);
        },
      }
    );
    setPickRoomID(id);
    setPickRoomModal(true);
  };

  const putBillHandle = (id, isPaid) => {
    putBill.mutate(
      {
        body: {
          is_paid: isPaid,
        },
        id,
      },
      {
        onSuccess(data) {
          // console.log(data);
          setToast("Cập nhật thanh toán thành công!");
          getConfirmContractsHandle();
        },
      }
    );
  };

  const pickRoomHandle = (id) => {
    postPickRoom.mutate(
      {
        body: {
          room_id: id,
        },
        id: pickRoomID,
      },
      {
        onSuccess(data) {
          // console.log(data);
          setToast("Đã chọn phòng!");
          setPickRoomID(false);
          setPickRoomModal(false);
          getConfirmContractsHandle();
        },
      }
    );
  };

  const hidePickRoom = () => {
    setPickRoomModal(false);
  };

  function getConfirmContractsHandle() {
    getConfirmContracts.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          setContracts(data.data);
        },
      }
    );
  }

  useEffect(() => {
    getConfirmContractsHandle();
  }, []);

  if (rooms) {
    var roomtake = rooms.slice(pagenum * 12 - 12, pagenum * 12);
    for (let i = 1; i <= rooms.length / 12; i++) {
      arrNum.push(i);
    }
    if (rooms.length / 12 > arrNum.length) {
      arrNum.push(arrNum[arrNum.length - 1] + 1);
    }
    if (pagenum <= 2) {
      arrre = [1, 2, 3];
    } else {
      if (pagenum === arrNum.length) {
        arrre = [pagenum - 2, pagenum - 1, pagenum];
      } else {
        arrre = [pagenum - 1, pagenum, pagenum + 1];
      }
    }
  }
  if (roomtake) {
    arrNum1 = roomtake.slice(0, 4);
    arrNum2 = roomtake.slice(4, 8);
    arrNum3 = roomtake.slice(8, 12);
  }
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

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div style={{ width: "100%", padding: "20px" }}>
          {contract ? (
            <>
              <div
                style={{
                  padding: "0px 20px",
                  fontSize: "24px",
                  borderBottom: "solid #A9CBFE 8px",
                }}
              >
                THÔNG TIN ĐĂNG KÝ
              </div>
              <div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th style={{ width: "50%" }}></th>
                      <th style={{ width: "50%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>MSSV</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Họ và tên</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Khu vực đối tượng</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Thời gian nộp đơn</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Trạng thái</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>

                <div style={{ width: "100%", height: "40px" }}></div>

                <button
                  style={{
                    padding: "8px",
                    border: "none",
                    backgroundColor: "#0B42AB",
                    float: "left",
                  }}
                  onClick={() => setContract(null)}
                >
                  <span
                    style={{
                      margin: "0px 8px",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Trở lại
                  </span>
                </button>

                <button
                  style={{
                    padding: "8px",
                    border: "none",
                    backgroundColor: "#0B42AB",
                    float: "right",
                  }}
                >
                  <svg
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
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
                    }}
                  >
                    Hủy đơn đăng ký
                  </span>
                </button>

                <button
                  style={{
                    padding: "8px",
                    border: "none",
                    marginRight: "20px",
                    backgroundColor: "#0B42AB",
                    float: "right",
                  }}
                >
                  <span
                    style={{
                      margin: "0px 8px",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Duyệt
                  </span>
                </button>
              </div>
            </>
          ) : contracts ? (
            <MyTable
              responsive
              forms={contracts.map(
                ({
                  id,
                  student,
                  season,
                  room_id,
                  room,
                  subscription,
                  created_at,
                }) => ({
                  id: {
                    title: "id",
                    content: "" + id,
                  },
                  mssv: {
                    title: "MSSV",
                    content: student.student_card_id,
                  },
                  name: {
                    title: "Họ và tên",
                    content: student.name,
                  },
                  season: {
                    title: "Học kỳ",
                    content: season,
                  },
                  room: {
                    title: "Phòng",
                    content:
                      room === null ? (
                        <button
                          style={{
                            borderRadius: "4px",
                            border: "1px #0B42AB solid",
                            backgroundColor: " #0B42AB",
                            color: "#FFFFFF",
                            padding: "4px",
                          }}
                          onClick={() => showPickRoom(id)}
                        >
                          Chọn phòng
                        </button>
                      ) : (
                        room.name
                      ),
                  },
                  price: {
                    title: "Số tiền phải trả",
                    content: subscription.price,
                  },
                  ispay: {
                    title: "Xác nhận thanh toán",
                    center: true,
                    content: (
                      <div
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() =>
                          putBillHandle(subscription.id, !subscription.is_paid)
                        }
                      >
                        {subscription.is_paid ? (
                          <CheckboxTickSVG
                            style={{ width: "16px", height: "16px" }}
                          />
                        ) : (
                          <CheckboxSVG
                            style={{ width: "16px", height: "16px" }}
                          />
                        )}
                      </div>
                    ),
                  },
                  createdAt: {
                    title: "Duyệt vào lúc",
                    content: created_at,
                  },
                  control: {
                    title: "",
                    content: (
                      <>
                        <svg
                          style={{
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => setContract(id)}
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512.000000 512.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                          >
                            <path
                              d="
                              M2380 4214 c-663 -64 -1332 -428 -1979 -1075 -202 -202 -337 -359
                              -372 -434 -25 -51 -29 -72 -29 -145 0 -138 21 -173 272 -447 181 -198 427
                              -421 641 -581 448 -336 894 -537 1347 -609 146 -24 456 -23 605 0 531 84 1055
                              350 1581 802 245 210 586 571 642 680 21 40 27 68 30 142 4 86 2 96 -25 156
                              -37 79 -110 164 -327 385 -324 329 -596 549 -916 742 -130 78 -372 196 -504
                              245 -120 44 -335 100 -464 121 -96 15 -414 26 -502 18z m405 -335 c445 -54
                              946 -307 1434 -723 173 -146 581 -565 581 -595 0 -16 -175 -207 -324 -356
                              -247 -246 -486 -439 -736 -595 -648 -403 -1239 -484 -1854 -253 -497 187
                              -1031 583 -1484 1103 -45 52 -82 97 -82 101 0 30 405 446 581 595 447 382 884
                              615 1321 705 175 36 365 42 563 18z
                            "
                            />
                            <path
                              d="
                              M2410 3660 c-155 -22 -342 -94 -472 -181 -87 -58 -228 -198 -288
                              -285 -296 -428 -255 -1009 98 -1385 444 -474 1175 -476 1620 -5 312 329 387
                              816 192 1233 -55 117 -126 216 -227 314 -162 157 -331 248 -548 295 -86 19
                              -288 26 -375 14z m385 -354 c223 -76 405 -244 491 -456 151 -372 -17 -809
                              -381 -990 -448 -222 -989 35 -1106 525 -31 131 -24 295 18 417 91 261 290 446
                              558 519 107 29 311 22 420 -15z
                            "
                            />
                          </g>
                        </svg>
                      </>
                    ),
                  },
                })
              )}
              setContract={setContract}
              type={"contract"}
            ></MyTable>
          ) : (
            <>Khong co du lieu...</>
          )}
        </div>
      </div>

      <Modal fullscreen show={pickRoomModal} onHide={hidePickRoom}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f9f9f9" }}>
          {rooms === null ? (
            <>Loading...</>
          ) : roomtake ? (
            <Container fluid>
              <Row>
                {arrNum1.map((elem) => (
                  <Col sm={12} md={6} lg={3} style={{ margin: "12px 0px" }}>
                    {console.log(elem)}
                    <Container
                      fluid
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <Row>
                        <Col sm={8} md={8} lg={8}>
                          <p
                            style={{
                              marginTop: "10px",
                              color: "#0B42AB",
                              fontWeight: "700",
                            }}
                          >{`Phòng ${elem.name}`}</p>
                          <Row>
                            <Col sm={12} md={12} lg={2}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tòa`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.name[0]}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={3}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tầng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.floor_id}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={7}>
                              <p
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                {`Loại Phòng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.detail.max} Người
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          sm={4}
                          md={4}
                          lg={4}
                          style={{
                            borderLeft: "1px solid #D9D9D9",
                            paddingRight: "0",
                          }}
                        >
                          {elem.amount < elem.detail.max ? (
                            <div
                              className="room_not_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #0B42AB",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#0B42AB",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>
                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#0B42AB",
                                  color: "white",

                                  padding: "9px 13px",
                                }}
                                onClick={() => pickRoomHandle(elem.id)}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    display: "inline-block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.6665 12.5C3.3528 12.5 0.666504 9.81371 0.666504 6.5C0.666504 3.18629 3.3528 0.5 6.6665 0.5C9.98021 0.5 12.6665 3.18629 12.6665 6.5C12.6629 9.8122 9.97871 12.4964 6.6665 12.5ZM6.6569 11.3H6.6665C9.31653 11.2973 11.463 9.14763 11.4617 6.4976C11.4604 3.84757 9.31173 1.7 6.6617 1.7C4.01167 1.7 1.86303 3.84757 1.8617 6.4976C1.86038 9.14763 4.00688 11.2973 6.6569 11.3ZM7.2665 9.5H6.0665V5.798L4.5125 7.346L3.6665 6.5L6.6665 3.5L9.6665 6.5L8.8205 7.346L7.2665 5.798V9.5Z"
                                    fill="white"
                                  />
                                </svg>
                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  CHỌN
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div
                              className="room_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #FF0000",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#FF0000",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>

                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#FF0000",
                                  color: "white",

                                  padding: "9px 7px",
                                }}
                                onClick={() => pickRoomHandle(elem.id)}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.33379 12.5C3.9072 12.5014 1.71892 11.0398 0.790107 8.79734C-0.138701 6.55487 0.375053 3.9735 2.09162 2.25783C3.6072 0.741793 5.81621 0.149712 7.88653 0.704621C9.95685 1.25953 11.574 2.87712 12.1287 4.94807C12.6834 7.01902 12.0915 9.22869 10.576 10.7447C9.45302 11.8731 7.92545 12.5051 6.33379 12.5ZM1.53631 6.60446C1.56469 9.24461 3.71983 11.3659 6.3593 11.3518C8.99877 11.3375 11.131 9.19317 11.131 6.55287C11.131 3.91256 8.99877 1.7682 6.3593 1.75394C3.71983 1.73982 1.56469 3.86113 1.53631 6.50128V6.60446ZM4.78001 8.90074L3.93505 8.05493L5.48823 6.50128L3.93505 4.94763L4.78061 4.10182L6.33379 5.65547L7.88697 4.10182L8.73252 4.94763L7.17934 6.50128L8.73252 8.05493L7.88757 8.90074L6.33379 7.34709L4.78061 8.90074H4.78001Z"
                                    fill="white"
                                  />
                                </svg>

                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  ĐÃ ĐẦY
                                </span>
                              </button>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                ))}
              </Row>
              <Row>
                {arrNum2.map((elem) => (
                  <Col sm={12} md={6} lg={3} style={{ margin: "12px 0px" }}>
                    {console.log(elem)}
                    <Container
                      fluid
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <Row>
                        <Col sm={8} md={8} lg={8}>
                          <p
                            style={{
                              marginTop: "10px",
                              color: "#0B42AB",
                              fontWeight: "700",
                            }}
                          >{`Phòng ${elem.name}`}</p>
                          <Row>
                            <Col sm={12} md={12} lg={2}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tòa`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.name[0]}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={3}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tầng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.floor_id}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={7}>
                              <p
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                {`Loại Phòng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.detail.max} Người
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          sm={4}
                          md={4}
                          lg={4}
                          style={{
                            borderLeft: "1px solid #D9D9D9",
                            paddingRight: "0",
                          }}
                        >
                          {elem.amount < elem.detail.max ? (
                            <div
                              className="room_not_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #0B42AB",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#0B42AB",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>
                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#0B42AB",
                                  color: "white",

                                  padding: "9px 13px",
                                }}
                                onClick={() => pickRoomHandle(elem.id)}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    display: "inline-block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.6665 12.5C3.3528 12.5 0.666504 9.81371 0.666504 6.5C0.666504 3.18629 3.3528 0.5 6.6665 0.5C9.98021 0.5 12.6665 3.18629 12.6665 6.5C12.6629 9.8122 9.97871 12.4964 6.6665 12.5ZM6.6569 11.3H6.6665C9.31653 11.2973 11.463 9.14763 11.4617 6.4976C11.4604 3.84757 9.31173 1.7 6.6617 1.7C4.01167 1.7 1.86303 3.84757 1.8617 6.4976C1.86038 9.14763 4.00688 11.2973 6.6569 11.3ZM7.2665 9.5H6.0665V5.798L4.5125 7.346L3.6665 6.5L6.6665 3.5L9.6665 6.5L8.8205 7.346L7.2665 5.798V9.5Z"
                                    fill="white"
                                  />
                                </svg>
                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  CHỌN
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div
                              className="room_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #FF0000",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#FF0000",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>

                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#FF0000",
                                  color: "white",

                                  padding: "9px 7px",
                                }}
                                onClick={() => pickRoomHandle(elem.id)}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.33379 12.5C3.9072 12.5014 1.71892 11.0398 0.790107 8.79734C-0.138701 6.55487 0.375053 3.9735 2.09162 2.25783C3.6072 0.741793 5.81621 0.149712 7.88653 0.704621C9.95685 1.25953 11.574 2.87712 12.1287 4.94807C12.6834 7.01902 12.0915 9.22869 10.576 10.7447C9.45302 11.8731 7.92545 12.5051 6.33379 12.5ZM1.53631 6.60446C1.56469 9.24461 3.71983 11.3659 6.3593 11.3518C8.99877 11.3375 11.131 9.19317 11.131 6.55287C11.131 3.91256 8.99877 1.7682 6.3593 1.75394C3.71983 1.73982 1.56469 3.86113 1.53631 6.50128V6.60446ZM4.78001 8.90074L3.93505 8.05493L5.48823 6.50128L3.93505 4.94763L4.78061 4.10182L6.33379 5.65547L7.88697 4.10182L8.73252 4.94763L7.17934 6.50128L8.73252 8.05493L7.88757 8.90074L6.33379 7.34709L4.78061 8.90074H4.78001Z"
                                    fill="white"
                                  />
                                </svg>

                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  ĐÃ ĐẦY
                                </span>
                              </button>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                ))}
              </Row>
              <Row>
                {arrNum3.map((elem) => (
                  <Col sm={12} md={6} lg={3} style={{ margin: "12px 0px" }}>
                    {console.log(elem)}
                    <Container
                      fluid
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <Row>
                        <Col sm={8} md={8} lg={8}>
                          <p
                            style={{
                              marginTop: "10px",
                              color: "#0B42AB",
                              fontWeight: "700",
                            }}
                          >{`Phòng ${elem.name}`}</p>
                          <Row>
                            <Col sm={12} md={12} lg={2}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tòa`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.name[0]}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={3}>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  marginBottom: "0",
                                }}
                              >
                                {`Tầng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.floor_id}
                                </span>
                              </p>
                            </Col>
                            <Col sm={12} md={12} lg={7}>
                              <p
                                style={{ fontSize: "14px", fontWeight: "700" }}
                              >
                                {`Loại Phòng`}
                                <br></br>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {elem.detail.max} Người
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          sm={4}
                          md={4}
                          lg={4}
                          style={{
                            borderLeft: "1px solid #D9D9D9",
                            paddingRight: "0",
                          }}
                        >
                          {elem.amount < elem.detail.max ? (
                            <div
                              className="room_not_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #0B42AB",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#0B42AB",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>
                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#0B42AB",
                                  color: "white",

                                  padding: "9px 13px",
                                }}
                                onClick={() => pickRoomHandle(elem.id)}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    display: "inline-block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.6665 12.5C3.3528 12.5 0.666504 9.81371 0.666504 6.5C0.666504 3.18629 3.3528 0.5 6.6665 0.5C9.98021 0.5 12.6665 3.18629 12.6665 6.5C12.6629 9.8122 9.97871 12.4964 6.6665 12.5ZM6.6569 11.3H6.6665C9.31653 11.2973 11.463 9.14763 11.4617 6.4976C11.4604 3.84757 9.31173 1.7 6.6617 1.7C4.01167 1.7 1.86303 3.84757 1.8617 6.4976C1.86038 9.14763 4.00688 11.2973 6.6569 11.3ZM7.2665 9.5H6.0665V5.798L4.5125 7.346L3.6665 6.5L6.6665 3.5L9.6665 6.5L8.8205 7.346L7.2665 5.798V9.5Z"
                                    fill="white"
                                  />
                                </svg>
                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  CHỌN
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div
                              className="room_full"
                              style={{ paddingTop: "12px" }}
                            >
                              <div
                                className="Number_Des"
                                style={{
                                  border: " 4px solid #FF0000",
                                  padding: "4px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Số lượng
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    color: "#FF0000",
                                    marginBottom: "4px",
                                  }}
                                >
                                  {elem.amount} / {elem.detail.max}
                                </p>
                              </div>

                              <button
                                style={{
                                  display: "block",
                                  margin: "8px auto",
                                  borderRadius: "4px",
                                  border: "none",
                                  backgroundColor: "#FF0000",
                                  color: "white",
                                  padding: "9px 7px",
                                  cursor: "default",
                                }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 13 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    marginRight: "4px",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <path
                                    d="M6.33379 12.5C3.9072 12.5014 1.71892 11.0398 0.790107 8.79734C-0.138701 6.55487 0.375053 3.9735 2.09162 2.25783C3.6072 0.741793 5.81621 0.149712 7.88653 0.704621C9.95685 1.25953 11.574 2.87712 12.1287 4.94807C12.6834 7.01902 12.0915 9.22869 10.576 10.7447C9.45302 11.8731 7.92545 12.5051 6.33379 12.5ZM1.53631 6.60446C1.56469 9.24461 3.71983 11.3659 6.3593 11.3518C8.99877 11.3375 11.131 9.19317 11.131 6.55287C11.131 3.91256 8.99877 1.7682 6.3593 1.75394C3.71983 1.73982 1.56469 3.86113 1.53631 6.50128V6.60446ZM4.78001 8.90074L3.93505 8.05493L5.48823 6.50128L3.93505 4.94763L4.78061 4.10182L6.33379 5.65547L7.88697 4.10182L8.73252 4.94763L7.17934 6.50128L8.73252 8.05493L7.88757 8.90074L6.33379 7.34709L4.78061 8.90074H4.78001Z"
                                    fill="white"
                                  />
                                </svg>

                                <span
                                  style={{
                                    fontWeight: "700",
                                  }}
                                >
                                  ĐÃ ĐẦY
                                </span>
                              </button>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            console.log("Ko in")
          )}
        </Modal.Body>
        <div className="pagination" style={{ margin: "8px auto" }}>
          <a onClick={goBackward}>&laquo;</a>
          <a
            className={
              pagenum >= arrNum.length + 1 || pagenum < 3 || arrNum.length < 4
                ? "none"
                : ""
            }
            onClick={() => {
              setPageNum(1);
            }}
          >
            1
          </a>
          <a
            className={
              pagenum >= arrNum.length + 1 || pagenum < 4 || arrNum.length < 4
                ? "none"
                : ""
            }
          >
            ...
          </a>
          {arrre.map((value, key) => (
            <a
              id={key}
              onClick={() => {
                setPageNum(value);
              }}
              className={value === pagenum ? "active" : ""}
            >
              {value}
            </a>
          ))}
          <a
            className={
              pagenum >= arrNum.length - 1 ||
              (pagenum === 1 && arrNum.length < 4)
                ? "none"
                : ""
            }
          >
            ...
          </a>
          <a
            className={
              pagenum >= arrNum.length - 1 ||
              (pagenum === 1 && arrNum.length < 4)
                ? "none"
                : ""
            }
            onClick={() => {
              setPageNum(arrNum[arrNum.length - 1]);
            }}
          >
            {arrNum[arrNum.length - 1]}
          </a>
          <a onClick={goForward}>&raquo;</a>
        </div>
      </Modal>

      <Modal size="lg" show={roomDetailModal} onHide={hideRoomDetail}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {room === null ? <>Loading...</> : <div>{JSON.stringify(room)}</div>}
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-end">
        <Toast
          bg="dark"
          onClose={() => setToast(null)}
          show={toast !== null}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <div style={{ width: "100%" }}></div>
          </Toast.Header>
          <Toast.Body style={{ color: "#FFFFFF" }}>{toast}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Contract;
