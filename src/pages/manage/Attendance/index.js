import { useState, useEffect, forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomToggle from './CustomToggle';
import { useStore, actions } from '~/store';
import MyTable from '~/components/MyTable';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { useGetAttendances, useGetRooms, useGetFloors, useGetBuildings, useGetAttendance } from './hooks';
import { SearchSVG, CheckboxSVG, CheckboxSelectedSVG, ArrowDownSVG, EyeSVG } from './svgs';

function Attendance() {
  console.log('Page: Mistake');

  const [state, dispatch] = useStore();
  const getAttendances = useGetAttendances();
  const getRooms = useGetRooms();
  const getFloors = useGetFloors();
  const getBuildings = useGetBuildings();
  const getAttendance = useGetAttendance();

  const [roomCurr, setRoomCurr] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [attendances, setAttendances] = useState(null);
  const [time, setTime] = useState(new Date());
  const [buildings, setBuildings] = useState(null);
  const [floors, setFloors] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [status, setStatus] = useState([
    { 
      id: '0', 
      title: 'Vắng', 
      selected: false 
    },
    { 
      id: '1', 
      title: 'Có phép', 
      selected: false 
    },
    { 
      id: '2', 
      title: 'Không phép', 
      selected: false 
    },
  ]);

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

  function getAttendanceHandle(id, roomName) {
    setRoomCurr(roomName);

    getAttendance.mutate(
      { id },
      {
        onSuccess(data) {
          console.log(data);
          setAttendance(data.data);
        }
      }
    )
  }

  function getAttendancesHandle() {
    getAttendances.mutate(
      {
        time: `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`, 
        status: status?.filter(({ selected }) => selected)[0]?.id, 
        buildingId: buildings?.filter(({ selected }) => selected)[0]?.id,
        floorId: floors?.filter(({ selected }) => selected)[0]?.id,
        roomId: rooms?.filter(({ selected }) => selected)[0]?.id
      },
      {
        onSuccess(data) {
          console.log('getAttendances:', data);
          setAttendances(data.data);
        }
      }
    );
  }

  useEffect(() => {
    const floorId = floors?.filter(({ selected }) => selected)[0]?.id;
    floorId && getRooms.mutate(
      {
        buildingId: buildings.filter(({ selected }) => selected)[0].id,
        floorId
      },
      {
        onSuccess(data) {
          // console.log('getFloors:', data);
          setRooms(data.data.map(({ id, name }) => ({ 
            id: id, 
            title: `Phòng ${name}`, 
            selected: false 
          })));
        }
      }
    )
  }, [floors]);

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
    getAttendancesHandle();
  }, [status, rooms, floors, buildings, time]);

  useEffect(() => {
    getAttendancesHandle();

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

  console.log(attendance);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg style={{ width: '24px', height: '24px', margin: '0px 16px', cursor: 'pointer' }} onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            padding: '20px',
            width: '100%'
          }}
        >
          {attendance ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div></div>
                
                <svg style={{ width: '32px', height: '32px', cursor: 'pointer' }} onClick={() => setAttendance(null)} viewBox="0 0 512.000000 512.000000">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
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

              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ width: '180px' }}>
                  <div>MSSV</div>
                  <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{attendance.student.student_card_id}</div>
                </div>

                <div style={{ width: '180px' }}>
                  <div>Họ và tên</div>
                  <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{attendance.student.name}</div>
                </div>

                <div style={{ width: '180px' }}>
                  <div>Phòng</div>
                  <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{roomCurr}</div>
                </div>

                <div style={{ width: '180px' }}>
                  <div>Số lần vắng có phép</div>
                  <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{attendance.student.attendance_permission_count}</div>
                </div>

                <div style={{ width: '180px' }}>
                  <div>Số lần vắng ko phép</div>
                  <div style={{ padding: '8px', backgroundColor: '#EEEEEE' }}>{attendance.student.attendance_no_permission_count}</div>
                </div>
              </div>

              <MyTable 
                forms={attendance.attendance.map(({ date, status, note, guard_student }) => ({
                  date: {
                    title: 'Ngày',
                    content: '' + date
                  },
                  status: {
                    title: 'Trạng thái',
                    content: status
                  },
                  note: {
                    title: 'Ghi chú',
                    content: note
                  },
                  guard_student: {
                    title: 'Sinh viên điểm danh',
                    content: guard_student.name
                  }
                }))}
              />
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center' }}>
                <h1>{attendances?.title || 'Loading...'}</h1>
              </div>
    
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    {status?.filter(({ selected }) => selected)[0]?.title || 'Trạng thái'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div style={{ width: '180px', padding: '0px 20px', margin: '0px auto' }}>
                      {status?.map(({ title, selected }) => (
                        <div 
                          style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                          onClick={() => setStatus(status.map(elem => ({...elem, selected: elem.title === title})))}
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
                    {rooms?.filter(({ selected }) => selected)[0]?.title || 'Phòng'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div style={{ width: '180px', padding: '0px 20px', margin: '0px auto' }}>
                      {rooms?.map(({ title, selected }) => (
                        <div 
                          style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                          onClick={() => setRooms(rooms.map(room => ({...room, selected: room.title === title})))}
                        >
                          {selected 
                            ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                            : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                          {title}
                        </div>
                      )) || 'Hãy chọn tầng trước'}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                
                <DatePicker
                  selected={time}
                  onChange={(date) => setTime(date)}
                  dateFormat="yyyy/MM/dd"
                  customInput={<ExampleCustomInput />}
                />
              </div>
                
              {attendances && (
                <MyTable 
                  forms={attendances.students.map(({ id, student_card_id, name, room, status, note }) => ({
                    student_card_id: {
                      title: 'MSSV',
                      content: '' + student_card_id
                    },
                    name: {
                      title: 'Tên sinh viên',
                      content: name
                    },
                    room: {
                      title: 'Phòng',
                      content: room
                    },
                    status: {
                      title: 'Trạng thái',
                      content: status
                    },
                    note: {
                      title: 'Ghi chú',
                      content: note
                    },
                    controls: {
                      title: '',
                      content: (
                        <div onClick={() => getAttendanceHandle(id, room)}>
                          <EyeSVG style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                        </div>
                      )
                    }
                  }))}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Attendance;