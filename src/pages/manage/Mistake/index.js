import { useState, useEffect, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Dropdown, Toast, ToastContainer, Modal } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

import MyInput from "~/components/MyInput";
import { useStore, actions } from "~/store";

import {
  useGetMistakes,
  useGetMistake,
  usePostMistake,
  usePutMistake,
  usePutFixMistake,
  useGetMistakeTypes,
  useGetFloors, 
  useGetBuildings
} from "./hooks";

import CustomToggle from './CustomToggle';
import MyNavbar from "~/components/MyNavbar";
import MySidebar from "~/components/MySidebar";
import MyTable from "~/components/MyTable";
import { CheckboxSVG, CheckboxTickSVG, CheckboxSelectedSVG, ArrowDownSVG } from './svgs';

function Mistake() {
  // console.log("Page: Mistake");

  const [state, dispatch] = useStore();
  const getFloors = useGetFloors();
  const getBuildings = useGetBuildings();
  const getMistakes = useGetMistakes();
  const getMistake = useGetMistake();
  const postMistake = usePostMistake();
  const putMistake = usePutMistake();
  const putFixMistake = usePutFixMistake();
  const getMistakeTypes = useGetMistakeTypes();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [buildings, setBuildings] = useState(null);
  const [floors, setFloors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [mistakeID, setMistakeID] = useState(null);
  const [mistake, setMistake] = useState(null);
  const [mistakes, setMistakes] = useState(false);
  const [mistakeAdd, setMistakeAdd] = useState(false);
  const [types, setTypes] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [mistakeDetail, setMistakeDetail] = useState(null);
  const [begin, setBegin] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [fixMistake, setFixMistake] = useState([
    { 
      id: '0', 
      title: 'Chưa sửa lỗi', 
      selected: false 
    },
    { 
      id: '1', 
      title: 'Đã sửa lỗi', 
      selected: false 
    },
  ]);
  const [confirmed, setConfirmed] = useState([
    { 
      id: '0', 
      title: 'Chưa xác nhận', 
      selected: false 
    },
    { 
      id: '1', 
      title: 'Đã xác nhận', 
      selected: false 
    },
  ]);
  const [time, setTime] = useState([
    { 
      id: 'today', 
      title: 'Hôm nay', 
      selected: true 
    },
    { 
      id: 'week_ago', 
      title: 'Tuần trước', 
      selected: false 
    },
    { 
      id: 'month_ago', 
      title: 'Tháng trước', 
      selected: false 
    },
    { 
      id: 'this_week', 
      title: 'Tuần này', 
      selected: false 
    },
    { 
      id: 'this_month', 
      title: 'Tháng này', 
      selected: false 
    },
    { 
      id: 'this_year', 
      title: 'Năm này', 
      selected: false 
    },
    { 
      id: 'custom', 
      title: 'Tự điền', 
      selected: false 
    },
  ]);

  function getMistakeHandle(id) {
    setLoading(true);
    getMistake.mutate(
      { id },
      {
        onSuccess(data) {
          // console.log(data);
          setMistakeDetail(data);
          setLoading(false);
        }
      }
    )
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div 
      style={{
        width: '140px',
        padding: '8px',
        border: 'solid #D9D9D9 1px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }} 
      onClick={onClick} 
      ref={ref}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 13px' }}>
        {value}
        <div>
          <ArrowDownSVG style={{ width: '13px', height: '9px' }} />
        </div>
      </div>
    </div>
  ));

  const submitMistake = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setLoading(true);

    if (edit) {
      putMistake.mutate(
        {
          body: {
            student_card_id: formData.get("student_card_id"),
            type: types.filter(type => type.selected)[0].number,
            content: ('' + types.filter(type => type.selected)[0].number) === '10' ? formData.get("content") : '',
            images: imgs,
          },
          id: mistake.id,
        },
        {
          onSuccess(data) {
            // console.log(data);
            getMistakesHandle();
            setMistake(null);
            setMistakeID(null);
            setImgs([]);
            setEdit(false);
          },
        }
      );
    } else {
      setLoading(true);
      postMistake.mutate(
        {
          student_card_id: formData.get("student_card_id"),
          type: types.filter(type => type.selected)[0].number,
          content: ('' + types.filter(type => type.selected)[0].number) === '10' ? formData.get("content") : '',
          images: imgs,
        },
        {
          onSuccess(data) {
            // console.log(data);
            if (data.status) {
              getMistakesHandle();
              setMistakeAdd(false);
              setImgs([]);
            } else {
              alert("Sai");
            }
          },
        }
      );
    }
  };

  const removeImg = (indexRm) => {
    setImgs(imgs.filter((elem, index) => index !== indexRm));
  };

  const change = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgs((imgs) => [...imgs, reader.result]);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  function fixMistakeHandle(id) {
    setLoading(true);
    putFixMistake.mutate(
      {
        body: {},
        id
      },
      {
        onSuccess(data) {
          setToast('Xác nhận sửa lỗi thành công');
          getMistakesHandle();
          setLoading(false);
        }
      }
    );
  }

  function getMistakesHandle() {
    getMistakes.mutate(
      {
        is_confirmed: confirmed?.filter(({ selected }) => selected)[0]?.id, 
        is_fix_mistake: fixMistake?.filter(({ selected }) => selected)[0]?.id, 
        building_id: buildings?.filter(({ selected }) => selected)[0]?.id,
        floor_id: floors?.filter(({ selected }) => selected)[0]?.id,
        time: time?.filter(({ selected }) => selected)[0]?.id === 'custom' 
          ? `${begin.getFullYear()}/${begin.getMonth() + 1}/${begin.getDate()}-${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()}`
          : time?.filter(({ selected }) => selected)[0]?.id
      },
      {
        onSuccess(data) {
          setMistakes(data.data);
          setLoading(false);
        },
      }
    );
  }

  useEffect(() => {
    const buildingId = buildings?.filter(({ selected }) => selected)[0]?.id;
    buildingId && getFloors.mutate(
      {
        buildingId
      },
      {
        onSuccess(data) {
          // console.log('getFloors:', data);
          setFloors(data.data.map(({ id, name }) => ({ 
            id: id, 
            title: `Tầng ${name}`, 
            selected: false 
          })));
        }
      }
    )
  }, [buildings]);

  useEffect(() => {
    setLoading(true);
    if (mistakeID !== null) {
      getMistake.mutate(
        { id: mistakeID },
        {
          onSuccess(data) {
            const type = data.type;
            // console.log(data);
            if (edit) {
              setImgs(data.images.map(({ source }) => source));
            }
            setMistake(data);
    
            getMistakeTypes.mutate(
              {},
              {
                onSuccess(data) {
                  // console.log(data);
                  setTypes(data.data.map(elem => ({ ...elem, selected: elem.content === type})));
                }
              }
            );
          },
        }
      );
    }
  }, [mistakeID]);

  useEffect(() => {
    setLoading(true);
    getMistakesHandle();
  }, [floors, buildings, end, begin, time, fixMistake, confirmed]);

  useEffect(() => {
    getMistakesHandle()
    
    getMistakeTypes.mutate(
      {},
      {
        onSuccess(data) {
          // console.log(data);
          setTypes(data.data.map((elem, index) => ({ ...elem, selected: index === 0})));
        }
      }
    );

    getBuildings.mutate(
      {},
      {
        onSuccess(data) {
          // console.log('getBuildings:', data);
          setBuildings(data.data.map(({ id, name }) => ({ 
            id: id, 
            title: `Tòa ${name}`, 
            selected: false 
          })));
        }
      }
    )
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

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        {mistakeAdd || edit ? (
          <div style={{ width: "100%", height: "100%" }}>
            <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                GHI LỖI KÝ TÚC XÁ
              </div>

              <form onSubmit={submitMistake}>
                <table cellPadding="8px">
                  <thead>
                    <tr>
                      <th width="120px"></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span style={{ color: "#0B42AB", fontWeight: "bold" }}>
                          MSSV
                        </span>
                      </td>
                      <td>
                        {edit ? (
                          mistake ? (
                            <MyInput
                              style={{
                                width: "100%",
                                paddingLeft: "8px",
                                borderStyle: "none none solid none",
                                borderRadius: "4px",
                                outline: "none",
                                margin: '8px 0px',
                              }}
                              type="text"
                              name="student_card_id"
                              initValue={mistake.student_card_id}
                              disabled={true}
                              placeholder="MSSV..."
                            />
                          ) : (
                            <></>
                          )
                        ) : (
                          <MyInput
                            style={{
                              width: "100%",
                              paddingLeft: "8px",
                              borderStyle: "none none solid none",
                              borderRadius: "4px",
                              outline: "none",
                              margin: '8px 0px',
                            }}
                            type="text"
                            name="student_card_id"
                            placeholder="MSSV..."
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style={{ color: "#0B42AB", fontWeight: "bold" }}>
                          Nội dung lỗi
                        </span>
                      </td>
                      <td>
                        {edit ? (
                          mistake ? (
                            <> 
                              <select
                                style={{
                                  width: "100%",
                                  paddingLeft: "8px",
                                  borderStyle: "none none solid none",
                                  borderRadius: "4px",
                                  outline: "none",
                                  margin: '8px 0px',
                                }}
                                onChange={e => setTypes(types.map(type => ({...type, selected: ('' + type.number) === ('' + e.target.value)})))}
                                value={('' + types.filter(type => type.selected)[0].number)}
                              >
                                {types && types.map(({ number, content }) => (
                                  <option value={number} key={number}>{content}</option>
                                ))}
                              </select>

                              <div>
                                <MyInput
                                  style={{
                                    width: "100%",
                                    paddingLeft: "8px",
                                    borderStyle: "none none solid none",
                                    borderRadius: "4px",
                                    outline: "none",
                                    margin: '8px 0px',
                                  }}
                                  type="text"
                                  name="content"
                                  initValue={mistake.content}
                                  hidden={('' + types.filter(type => type.selected)[0].number) !== '10'}
                                />
                              </div>
                            </>
                          ) : (
                            <></>
                          )
                        ) : (
                          <> 
                            <select
                              style={{
                                width: "100%",
                                paddingLeft: "8px",
                                borderStyle: "none none solid none",
                                borderRadius: "4px",
                                outline: "none",
                                margin: '8px 0px',
                              }}
                              onChange={e => setTypes(types.map(type => ({...type, selected: ('' + type.number) === ('' + e.target.value)})))}
                              value={('' + types.filter(type => type.selected)[0].number)}
                            >
                              {types && types.map(({ number, content }) => (
                                <option value={number} key={number}>{content}</option>
                              ))}
                            </select>

                            <div>
                              <MyInput
                                style={{
                                  width: "100%",
                                  paddingLeft: "8px",
                                  borderStyle: "none none solid none",
                                  borderRadius: "4px",
                                  outline: "none",
                                  margin: '8px 0px',
                                }}
                                type="text"
                                name="content"
                                hidden={('' + types.filter(type => type.selected)[0].number) !== '10'}
                              />
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style={{ color: "#0B42AB", fontWeight: "bold" }}>
                          Upload ảnh
                        </span>
                      </td>
                      <td>
                        <label
                          style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "4px",
                            margin: '8px 0px',
                            backgroundColor: "#EEEEEE",
                          }}
                          htmlFor="file"
                        >
                          <svg
                            style={{
                              width: "28px",
                              height: "28px",
                              marginRight: "12px",
                            }}
                            viewBox="0 0 32 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 17.25V21C22 21.8284 21.3284 22.5 20.5 22.5H11.5C10.6716 22.5 10 21.8284 10 21L10 17.25M19 13.5L16 10.5M16 10.5L13 13.5M16 10.5L16 19.5"
                              stroke="#001A72"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            style={{ fontWeight: "bold", marginRight: "12px" }}
                          >
                            Upload files
                          </span>
                        </label>
                        <input
                          onChange={change}
                          id="file"
                          type="file"
                          multiple
                          hidden
                        />
                        <div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "12px",
                            }}
                          >
                            {imgs.map((source, index) => (
                              <div style={{ position: "relative" }}>
                                <img
                                  style={{ height: "100px" }}
                                  src={source}
                                  alt={index}
                                  key={index}
                                />
                                <svg
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => removeImg(index)}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429L17.9857 0Z"
                                    fill="#06245E"
                                  />
                                </svg>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <button
                          style={{
                            padding: "4px 32px",
                            border: "none",
                            borderRadius: "4px",
                            margin: '8px 8px',
                            backgroundColor: "#0B42AB",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 4px #00000040",
                            color: "#FFFFFF",
                          }}
                          onClick={() => {
                            setMistakeAdd(false);
                            setEdit(false);
                            setMistake(null);
                            setMistakeID(null);
                            setImgs([]);
                          }}
                        >
                          Back
                        </button>
                        <button
                          style={{
                            padding: "4px 32px",
                            border: "none",
                            borderRadius: "4px",
                            margin: '8px 8px',
                            backgroundColor: "#0B42AB",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 4px #00000040",
                            color: "#FFFFFF",
                          }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        ) : mistakes ? (
          <div style={{ width: "100%", padding: "0px 20px" }}>
            <div
              className="button_container"
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginRight: "12px",
              }}
            >
              <button
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#0B42AB",
                  color: "#fff",
                  margin: "12px 0",
                }}
                onClick={() => setMistakeAdd(true)}
              >
                Tạo lỗi
              </button>{" "}
            </div>
    
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {buildings?.filter(({ selected }) => selected)[0]?.title || 'Tòa'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {buildings?.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setBuildings(buildings.map(building => ({...building, selected: building.title === title})))}
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
                  {floors?.filter(({ selected }) => selected)[0]?.title || 'Tầng'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {floors?.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setFloors(floors.map(floor => ({...floor, selected: floor.title === title})))}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    )) || 'Hãy chọn tòa trước'}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {fixMistake?.filter(({ selected }) => selected)[0]?.title || 'Sửa lỗi'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ width: '180px', padding: '0px 20px', margin: '0px auto' }}>
                    {fixMistake?.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setFixMistake(fixMistake.map(elem => ({...elem, selected: elem.title === title})))}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    )) || 'Loading...'}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {confirmed?.filter(({ selected }) => selected)[0]?.title || 'Xác nhận lỗi'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ width: '180px', padding: '0px 20px', margin: '0px auto' }}>
                    {confirmed?.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setConfirmed(confirmed.map(elem => ({...elem, selected: elem.title === title})))}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    )) || 'Loading...'}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {time?.filter(({ selected }) => selected)[0]?.title || 'Thời gian'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ width: '180px', padding: '0px 20px', margin: '0px auto' }}>
                    {time?.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setTime(time.map(elem => ({...elem, selected: elem.title === title})))}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    )) || 'Loading...'}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              
              {time?.filter(({ selected }) => selected)[0]?.id === 'custom' && (
                <>
                  <div style={{ width: '20px', display: 'flex', alignItems:'center' }}></div>

                  <div>
                    <DatePicker
                      selected={begin}
                      onChange={(date) => setBegin(date)}
                      dateFormat="yyyy/MM/dd"
                      customInput={<ExampleCustomInput />}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems:'center' }}>ĐẾN</div>

                  <div>
                    <DatePicker
                      selected={end}
                      onChange={(date) => setEnd(date)}
                      dateFormat="yyyy/MM/dd"
                      customInput={<ExampleCustomInput />}
                    />
                  </div>
                </>
              )}

              <div
                style={{
                  padding: '8px',
                  border: 'solid #D9D9D9 1px',
                  fontWeight: 'bold',
                  color: '#FF0000',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => window.location.reload()}
              >RESET</div>
            </div>

            <MyTable
              forms={mistakes.map(
                ({
                  id,
                  student_card_id,
                  student_name,
                  room_name,
                  teacher_name,
                  date,
                  is_confirmed,
                  is_fix_mistake
                }) => ({
                  id: {
                    title: "id",
                    content: "" + id,
                  },
                  student_card_id: {
                    title: "Mã thẻ sinh viên",
                    content: student_card_id,
                  },
                  student_name: {
                    title: "Tên sinh viên",
                    content: student_name,
                  },
                  room_name: {
                    title: "Phòng học",
                    content: room_name,
                  },
                  teacher_name: {
                    title: "Tên giảng viên",
                    content: teacher_name,
                  },
                  date: {
                    title: "Ngày tạo",
                    content: date,
                  },
                  is_confirmed: {
                    title: 'Xác nhận lỗi',
                    content: is_confirmed ? 'Đã xác nhận': 'Chưa xác nhận'
                  },
                  is_fix_mistake: {
                    title: 'Xác nhân sửa lỗi',
                    content: is_fix_mistake 
                      ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                          <CheckboxTickSVG style={{ width: '16px', height: '16px' }} /> 
                          Đã xác nhận
                        </div>
                      )
                      : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => fixMistakeHandle(id)}>
                          <CheckboxSVG style={{ width: '16px', height: '16px' }} />
                          Chưa xác nhận
                        </div>
                      )
                  },
                  controls: {
                    title: "",
                    content: (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              cursor: "pointer",
                              margin: "0 8px",
                            }}
                            onClick={() => getMistakeHandle(id)}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#1C63EE"
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

                          <svg
                            style={{
                              width: "16px",
                              height: "16px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEdit(true);
                              setMistakeID(id);
                            }}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                              fill="#1C63EE"
                              stroke="none"
                            >
                              <path
                                d="
                                  M4325 5100 c-98 -11 -199 -51 -280 -113 -57 -43 -2322 -2306 -2345
                                  -2342 -23 -38 -321 -1106 -322 -1156 -1 -75 56 -132 131 -131 49 1 1119 299
                                  1156 322 17 11 546 536 1177 1167 830 831 1157 1166 1187 1212 67 105 83 160
                                  89 296 4 110 2 126 -23 200 -14 44 -44 107 -65 140 -47 72 -255 279 -325 322
                                  -104 65 -249 97 -380 83z m200 -289 c34 -15 84 -57 167 -139 141 -142 163
                                  -180 163 -292 0 -103 -28 -161 -133 -270 l-81 -85 -298 297 -298 298 45 46
                                  c129 132 214 177 320 171 38 -2 86 -13 115 -26z m-1002 -1903 l-928 -928 -297
                                  297 -298 298 927 927 928 928 297 -297 298 -298 -927 -927z m-1193 -1049 c0
                                  -6 -622 -180 -627 -176 -1 2 37 145 85 320 l87 317 228 -228 c125 -125 227
                                  -229 227 -233z
                                "
                              />
                              <path
                                d="
                                  M500 4594 c-227 -48 -427 -242 -485 -469 -13 -52 -15 -280 -15 -1820
                                  0 -1748 0 -1761 21 -1835 57 -208 229 -381 444 -447 57 -17 144 -18 1965 -18
                                  l1905 0 80 28 c102 36 179 83 250 153 97 96 163 222 184 354 7 40 11 294 11
                                  665 0 581 -1 601 -20 633 -42 69 -120 90 -181 49 -71 -47 -69 -23 -69 -696 0
                                  -674 1 -659 -69 -762 -21 -29 -62 -70 -92 -91 -106 -74 52 -68 -2021 -66
                                  l-1863 3 -62 29 c-82 37 -161 120 -194 201 l-24 60 -3 1705 c-2 1246 0 1721 8
                                  1765 24 121 97 215 210 269 l65 31 630 5 c595 5 632 6 661 24 89 54 84 185 -9
                                  229 -32 15 -95 17 -649 16 -484 0 -627 -4 -678 -15z
                                "
                              />
                            </g>
                          </svg>
                        </div>
                      </>
                    ),
                  },
                })
              )}
              setMistake={setMistakeID}
              setEdit={setEdit}
              type={"mistake"}
            ></MyTable>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>

      <ToastContainer position="bottom-end">
        <Toast bg="dark"  onClose={() => setToast(null)} show={toast !== null} delay={3000} autohide>
          <Toast.Header>
            <div style={{ width: '100%' }}></div>
          </Toast.Header>
          <Toast.Body style={{ color: '#FFFFFF' }}>{toast}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#00000040',
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: '99999'
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

      <Modal show={mistakeDetail !== null} onHide={() => setMistakeDetail(null)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {mistakeDetail && <div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>MSSV</div>
              <div>{mistakeDetail.student_card_id}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>Tên học sinh</div>
              <div>{mistakeDetail.student_name}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>Tên giáo viên</div>
              <div>{mistakeDetail.teacher_name}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>Tên phòng</div>
              <div>{mistakeDetail.room_name}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 'bold' }}>Thời gian</div>
              <div>{mistakeDetail.date}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>Sinh viên xác nhận lỗi</div>
              <div 
                style={{ 
                  padding: '0px 8px',
                  backgroundColor: mistakeDetail.is_confirmed ? '#35D66C' : '#FF0000', 
                  color: '#FFFFFF',
                  fontSize: '12px'
                }}
              >{mistakeDetail.is_confirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}</div>
            </div>
            <div style={{ margin: '4px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>Sinh viên trả nợ lao động</div>
              <div
                style={{ 
                  padding: '0px 8px',
                  backgroundColor: mistakeDetail.is_fix_mistake ? '#35D66C' : '#FF0000', 
                  color: '#FFFFFF',
                  fontSize: '12px'
                }}
              >{mistakeDetail.is_fix_mistake ? 'Đã trả nợ' : 'Chưa trả nợ'}</div>
            </div>
            <div style={{ margin: '12px 0px' }}>
              <div style={{ margin: '8px 0px', fontWeight: 'bold' }}>Nội dung lỗi</div>
              <div style={{ padding: '8px', border: 'solid #D9D9D9 1px' }}>{mistakeDetail.content || mistakeDetail.type}</div>
            </div>
            <div style={{ margin: '12px 0px' }}>
              <div style={{ margin: '8px 0px', fontWeight: 'bold' }}>Minh chứng</div>
              <div style={{ height: '140px', overflowY: 'auto' }}>
                {mistakeDetail.images.map((image) => (
                  <img style={{ width: '100px', height: '120px', margin: '0px 8px 8px 0px' }} src={image.source} alt="" index={image.id} />
                ))}
              </div>
            </div>
          </div>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Mistake;
