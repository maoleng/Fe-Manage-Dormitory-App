import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Modal, Toast, ToastContainer } from "react-bootstrap";

import CustomToggle from './CustomToggle';
import MyNavbar from "~/components/MyNavbar";
import MyTable from "~/components/MyTable";
import MySidebar from "~/components/MySidebar";
import { useStore, actions } from "~/store";
import { 
  useGetConfirmContracts, 
  usePostPickRoom, 
  useGetRooms, 
  usePutBill, 
  useGetFloors, 
  useGetBuildings, 
  useGetTypes,
  useGetstudent,
  useGetContract
} from "./hooks";
import { CheckboxSVG, CheckboxTickSVG, CheckboxSelectedSVG } from "./svgs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

function termMapping(code) {
  switch (code) {
    case 'ss1': return 'Học kỳ 1'
    case 'ss2': return 'Học kỳ 2'
    case '2ss': return 'Cả 2 học kỳ'
    case 'summer': return 'Học kỳ hè'
    default: return ''
  }
}

function Contract() {
  // console.log("Page: Contract");

  const putBill = usePutBill();
  const getConfirmContracts = useGetConfirmContracts();
  const postPickRoom = usePostPickRoom();
  const getRooms = useGetRooms();
  const getFloors = useGetFloors();
  const getBuildings = useGetBuildings();
  const getTypes = useGetTypes();
  const getstudent = useGetstudent();
  const getContract = useGetContract();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [toast, setToast] = useState(null);
  const [roomIDCurr, setRoomIDCurr] = useState(false);
  const [room, setRoom] = useState(false);
  const [roomDetailModal, setRoomDetailModal] = useState(false);
  const [pickRoomModal, setPickRoomModal] = useState(false);
  const [pickRoomID, setPickRoomID] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [contract, setContract] = useState(null);
  const [contracts, setContracts] = useState(false);
  const [state, dispatch] = useStore();
  const [pagenum, setPageNum] = useState(1);
  const [floors, setFloors] = useState(null);
  const [search, setSearch] = useState({
    buildings: null,
    floors: null,
    types: null,
    status: [
      { 
        id: 'con_trong_cho', 
        title: 'Còn trống', 
        selected: false 
      },
      { 
        id: 'da_het_cho', 
        title: 'Đã đầy', 
        selected: false 
      },
    ],
  });

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

  function getContractHandle(id) {
    setLoading(true);
    getContract.mutate(
      { id },
      {
        onSuccess(data) {
          console.log('getContract:', data);
          setContract(data.data);
          setLoading(false);
        }
      }
    )
  }

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
    setLoading(true);
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
          setLoading(false);
        },
      }
    );
  };

  function getstudentHandle(id) {
    setLoading(true);
    // console.log(id);
    getstudent.mutate(
      { id },
      {
        onSuccess(data) {
          // console.log(data);
          setStudent(data.data);
          setLoading(false);
        }
      }
    )
  }

  const hideRoomDetail = () => {
    setRoomDetailModal(false);
    setRoom(null);
  };

  function getRoomsHandle() {
    const buildingID = search.buildings?.filter(({ selected }) => selected)[0];
    const floorID = search.floors?.filter(({ selected }) => selected)[0];
    const typeID = search.types?.filter(({ selected }) => selected)[0];
    const status = search.status?.filter(({ selected }) => selected)[0];

    getRooms.mutate(
      {
        buildingID: buildingID?.id, 
        floorID: floorID?.id, 
        detailID: typeID?.id,
        status: status?.id,
      },
      {
        onSuccess(data) {
          // console.log(data);
          setRooms(data.data);
          setLoading(false);
        },
      }
    );
  }

  const pickRoomHandle = () => {
    postPickRoom.mutate(
      {
        body: {
          room_id: roomIDCurr,
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
          // console.log(data);
          setContracts(data.data);
        },
      }
    );
  }

  useEffect(() => {
    if (rooms !== null) {
      setLoading(true);
    }
    getRoomsHandle();

    const buildingID = search.buildings?.filter(({ selected }) => selected)[0];
    if (buildingID) {
      if (!search.floors) {
        setSearch(() => ({
          ...search, 
          floors: floors.filter(({ building_id }) => building_id === buildingID.id)
            .map(({ id, name, building_id }) => ({
               id: id, 
               buildingId: building_id,
               title: `Tầng ${name}`, 
               selected: false 
            }))
        }));
      }
      else if (search.floors[0].buildingId !== buildingID.id) {
        setSearch(() => ({
          ...search, 
          floors: floors.filter(({ building_id }) => building_id === buildingID.id)
            .map(({ id, name, building_id }) => ({
               id: id, 
               buildingId: building_id,
               title: `Tầng ${name}`, 
               selected: false 
            }))
        }));
      }
    }
  }, [search]);

  useEffect(() => {
    getConfirmContractsHandle();
    getBuildings.mutate(
      {},
      {
        onSuccess(data) {
          console.log('getBuildings:', data);
          setSearch((pre) => ({
            ...pre, 
            buildings: data.data.map(({ id, name }) => ({ 
              id: id, 
              title: `Tòa ${name}`, 
              selected: false 
            }))
          }));

          getTypes.mutate(
            {},
            {
              onSuccess(data) {
                console.log('getTypes:', data);
                setSearch((pre) => ({
                  ...pre, 
                  types: data.data.map(({ id, type }) => ({ 
                    id: id, 
                    title: type, 
                    selected: false 
                  }))
                }));
              }
            }
          );
        }
      }
    );

    getFloors.mutate(
      {},
      {
        onSuccess(data) {
          setFloors(() => data.data);
        }
      }
    );
    
  }, []);

  console.log(search);

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
                THÔNG TIN HỢP ĐỒNG
              </div>
              <div>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>MSSV</td>
                      <td>{contract.student_card_id}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Họ và tên</td>
                      <td>{contract.name}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Khu vực đối tượng</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Loại phòng</td>
                      <td>{contract.room_type}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Thời gian nộp đơn</td>
                      <td>{contract.start_date}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Tên phòng</td>
                      <td>{contract.room}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Thời gian duyệt hợp đồng</td>
                      <td>{contract.end_date}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Tình trạng thanh toán</td>
                      <td>{contract.is_accept ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
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
              </div>
            </>
          ) : contracts ? (
            <MyTable
              responsive
              forms={contracts.map(
                ({
                  id,
                  student_id,
                  student,
                  season,
                  room_id,
                  room,
                  subscription,
                  created_at,
                }) => ({
                  mssv: {
                    title: "MSSV",
                    content: student.student_card_id,
                  },
                  name: {
                    title: "Họ và tên",
                    content: (
                      <span 
                        style={{ cursor: 'pointer' }}
                        onClick={() => getstudentHandle(student_id)}
                      >{student.name}</span>
                    )
                  },
                  season: {
                    title: "Học kỳ",
                    content: termMapping(season),
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
                          <div>
                            <CheckboxTickSVG
                              style={{ width: "16px", height: "16px" }}
                            /> Đã thanh toán
                          </div>
                        ) : (
                          <div>
                            <CheckboxSVG
                              style={{ width: "16px", height: "16px" }}
                            /> Chưa thanh toán
                          </div>
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
                          onClick={() => getContractHandle(id)}
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
            <>Loading...</>
          )}
        </div>
      </div>

      <Modal fullscreen show={pickRoomModal} onHide={hidePickRoom}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f9f9f9" }}>
          <div
            style={{
              display: 'flex',
              gap: '20px'
            }}
          >
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {search.buildings?.filter(({ selected }) => selected)[0] 
                  ? search.buildings?.filter(({ selected }) => selected)[0].title 
                  : 'Tòa'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                  {search.buildings?.map(({ title, selected }) => (
                    <div 
                      style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                      onClick={() => setSearch({
                        ...search, 
                        buildings: search.buildings.map(building => ({...building, selected: building.title === title}))}
                      )}
                    >
                      {selected 
                        ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                        : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                          {title}
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {!search.floors 
                  ? 'Tầng'
                  : search.floors.filter(({ selected }) => selected)[0] 
                  ? search.floors.filter(({ selected }) => selected)[0].title 
                  : 'Tầng'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div 
                  style={{ 
                    width: '280px', 
                    padding: '0px 20px', 
                    margin: '0px auto',
                    display: 'grid', 
                    gridTemplateColumns: '50% 50%'
                  }}
                >
                  {search.floors === null ? <>Hãy chọn Tòa trước</> : search.floors.map(({ title, selected }) => (
                    <div 
                      style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                      onClick={() => setSearch({
                        ...search, 
                        floors: search.floors.map(floor => ({...floor, selected: floor.title === title}))}
                      )}
                    >
                      {selected 
                        ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                        : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                      {title}
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {search.types?.filter(({ selected }) => selected)[0] 
                  ? search.types?.filter(({ selected }) => selected)[0].title 
                  : 'Loại phòng'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                  {search.types?.map(({ title, selected }) => (
                    <div 
                      style={{ width: '140px', margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                      onClick={() => setSearch({
                        ...search, 
                        types: search.types.map(type => ({...type, selected: type.title === title}))}
                      )}
                    >
                      {selected 
                        ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                        : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                          {title}
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {search.status.filter(({ selected }) => selected)[0] 
                  ? search.status.filter(({ selected }) => selected)[0].title 
                  : 'Trạng thái'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                  {search.status.map(({ title, selected }) => (
                    <div 
                      style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                      onClick={() => setSearch({
                        ...search, 
                        status: search.status.map(elem => ({...elem, selected: elem.title === title}))}
                      )}
                    >
                      {selected 
                        ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                        : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                      {title}
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {rooms === null ? (
            <>Loading...</>
          ) : roomtake ? (
            <Container fluid>
              <Row>
                {arrNum1.map((elem) => (
                  <Col sm={12} md={6} lg={3} style={{ margin: "12px 0px" }}>
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
                                  border: roomIDCurr === elem.id ? "4px solid #35D66C" : "4px solid #0B42AB",
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
                                    color: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
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
                                  backgroundColor: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
                                  color: "white",

                                  padding: "9px 13px",
                                }}
                                onClick={() => setRoomIDCurr(elem.id)}
                              >
                                {roomIDCurr === elem.id ? (
                                  <>
                                    <svg
                                      style={{
                                        width: '12px',
                                        height: '9px',
                                        marginRight: "4px",
                                        display: "inline-block",
                                        marginBottom: "4px",
                                      }} 
                                      viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.00027 9L0 5.0624L1.1427 3.9376L4.00148 6.74841L4.00027 6.7496L10.8573 0L12 1.1248L5.14297 7.8752L4.00108 8.99921L4.00027 9Z" fill="white"/>
                                    </svg>

                                    <span
                                      style={{
                                        fontWeight: "700",
                                      }}
                                    >
                                      CHỌN
                                    </span>
                                  </>
                                ) : (
                                  <>
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
                                  </>
                                )}
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
                                  border: roomIDCurr === elem.id ? "4px solid #35D66C" : "4px solid #0B42AB",
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
                                    color: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
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
                                  backgroundColor: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
                                  color: "white",
                                  padding: "9px 13px",
                                }}
                                onClick={() => setRoomIDCurr(elem.id)}
                              >
                                {roomIDCurr === elem.id ? (
                                  <>
                                    <svg
                                      style={{
                                        width: '12px',
                                        height: '9px',
                                        marginRight: "4px",
                                        display: "inline-block",
                                        marginBottom: "4px",
                                      }} 
                                      viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.00027 9L0 5.0624L1.1427 3.9376L4.00148 6.74841L4.00027 6.7496L10.8573 0L12 1.1248L5.14297 7.8752L4.00108 8.99921L4.00027 9Z" fill="white"/>
                                    </svg>

                                    <span
                                      style={{
                                        fontWeight: "700",
                                      }}
                                    >
                                      CHỌN
                                    </span>
                                  </>
                                ) : (
                                  <>
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
                                  </>
                                )}
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
                                  border: roomIDCurr === elem.id ? "4px solid #35D66C" : "4px solid #0B42AB",
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
                                    color: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
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
                                  backgroundColor: roomIDCurr === elem.id ? "#35D66C" : "#0B42AB",
                                  color: "white",
                                  padding: "9px 13px",
                                }}
                                onClick={() => setRoomIDCurr(elem.id)}
                              >
                                {roomIDCurr === elem.id ? (
                                  <>
                                    <svg
                                      style={{
                                        width: '12px',
                                        height: '9px',
                                        marginRight: "4px",
                                        display: "inline-block",
                                        marginBottom: "4px",
                                      }} 
                                      viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4.00027 9L0 5.0624L1.1427 3.9376L4.00148 6.74841L4.00027 6.7496L10.8573 0L12 1.1248L5.14297 7.8752L4.00108 8.99921L4.00027 9Z" fill="white"/>
                                    </svg>

                                    <span
                                      style={{
                                        fontWeight: "700",
                                      }}
                                    >
                                      CHỌN
                                    </span>
                                  </>
                                ) : (
                                  <>
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
                                  </>
                                )}
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
              <Row>
                <Col
                  sm={{ span: 4, offset: 4 }}
                  md={{ span: 4, offset: 4 }}
                  lg={{ span: 2, offset: 10 }}
                >
                  <button
                    className="Confirm"
                    style={{
                      padding: "12px",
                      backgroundColor: "#1C63EE",
                      color: "#fff",
                      borderRadius: "4px",
                      border: "none",
                      marginLeft: "12%",
                    }}
                    onClick={pickRoomHandle}
                  >
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "8px", marginBottom: "4px" }}
                    >
                      <path
                        d="M0 7.22063L6.96975 0.220545C7.26263 -0.0735151 7.73737 -0.0735151 8.03025 0.220545L15 7.22063H13.5V13.2467C13.5 13.6628 13.1642 14 12.75 14H9V8.72715H6V14H2.25C1.83579 14 1.5 13.6628 1.5 13.2467V7.22063H0Z"
                        fill="white"
                      />
                    </svg>
                    Xác nhận phòng
                  </button>
                </Col>
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

      <Modal show={student !== null} size="lg">
        <div
          style={{
            padding: '4px 12px',
            backgroundColor: '#001A72',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>THÔNG TIN SINH VIÊN</div>

          <svg style={{ width: '16px', height: '16px', cursor: 'pointer' }} onClick={() => setStudent(null)} viewBox="0 0 512.000000 512.000000">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
              <path d="M197 5106 c-84 -31 -152 -99 -183 -183 -7 -21 -13 -69 -13 -108 -1
              -137 -66 -64 1087 -1217 l1037 -1038 -1041 -1042 c-1174 -1176 -1090 -1081
              -1082 -1233 5 -91 27 -143 83 -200 57 -56 109 -78 200 -83 152 -8 57 -92 1233
              1082 l1042 1041 1043 -1041 c1175 -1174 1080 -1090 1232 -1082 91 5 143 27
              200 83 56 57 78 109 83 200 8 152 92 57 -1082 1233 l-1041 1042 1041 1043
              c1174 1175 1090 1080 1082 1232 -5 91 -27 143 -83 200 -57 56 -109 78 -200 83
              -152 8 -57 92 -1233 -1082 l-1042 -1041 -1038 1037 c-1153 1153 -1080 1088
              -1217 1087 -38 0 -87 -6 -108 -13z"/>
            </g>
          </svg>
        </div>
        
        {student && (
          <div
            style={{
              padding: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ width: '360px' }}>
              <div>Họ và tên</div>
              <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{student.name}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>MSSV</div>
              <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{student.student_card_id}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Giới tính</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.gender ? 'Nam' : 'Nữ'}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Ngày sinh</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.birthday}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>CMND/CCCD</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.identify_card}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Dân tộc</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.ethnic}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Tôn giáo</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.religion}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Khu vực</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.area}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Số điện thoại</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.phone}</div>
            </div>
            
            <div style={{ width: '100%' }}>
              <div>Địa chỉ</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{student.information.address}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Phòng</div>
              <div 
                style={{ padding: '8px', backgroundColor: '#EEEEEE' }}
              >{room}</div>
            </div>
            
            <div style={{ width: '172px' }}>
              <div>Tổng số lỗi học kì này</div>
              <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{student.mistakes_count}</div>
            </div>
          </div>
        )}
      </Modal>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#00000040',
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: '9999999999999999999999'
        }}
        hidden={!loading}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg style={{ width: '100px', height: '100px', animation: 'rotation 1s linear infinite' }} viewBox="0 0 512.000000 512.000000">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path d="M2496 4690 c-136 -41 -197 -208 -119 -327 48 -75 112 -103 233 -103
              92 0 253 -23 359 -50 490 -125 896 -454 1117 -905 320 -655 190 -1429 -326
              -1945 -525 -526 -1325 -650 -1979 -309 -854 446 -1172 1495 -706 2334 83 149
              91 219 33 313 -42 69 -155 107 -245 81 -76 -21 -119 -73 -210 -255 -303 -607
              -308 -1298 -14 -1899 215 -439 550 -774 986 -985 159 -78 264 -117 415 -154
              488 -119 992 -69 1435 143 447 214 789 553 1006 996 393 804 244 1756 -378
              2416 -283 299 -704 531 -1116 613 -194 39 -424 56 -491 36z"/>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Contract;
