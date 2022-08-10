import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Modal } from 'react-bootstrap';

import CustomToggle from './CustomToggle';
import { useStore, actions } from '~/store';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import MyTable from '~/components/MyTable';
import { 
  useGetRooms, 
  useGetTypes, 
  useGetBuildings, 
  useGetFloors, 
  useGetstudents, 
  useGetstudent,
  usePutstudent
} from './hooks';
import { EyeSVG, CheckboxSVG, CheckboxSelectedSVG, ArrowDownSVG } from './svgs';

function Rooms() {
  // console.log('Page: Rooms');

  const [state, dispatch] = useStore();
  const getRooms = useGetRooms();
  const getTypes = useGetTypes();
  const getBuildings = useGetBuildings();
  const getFloors = useGetFloors();
  const getstudents = useGetstudents();
  const getstudent = useGetstudent();
  const putstudent = usePutstudent();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState(null);
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState(null);
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

  function putstudentHandle(id, role) {
    setLoading(true);
    putstudent.mutate(
      {
        body: {
          role
        },
        id
      },
      {
        onSuccess(data) {
          setLoading(false);
        }
      }
    )
  }

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

  function getstudentsHandle(id, roomName) {
    setLoading(true);
    getstudents.mutate(
      { id },
      {
        onSuccess(data) {
          // console.log(data);
          setRoom(roomName);
          setStudents(data.data);
          setLoading(false);
        }
      }
    )
  }

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
    getRoomsHandle();
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
          setFloors(data.data);
        }
      }
    );
    
  }, []);

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
          {students !== null ? (
            <>
              <div 
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <span
                  style={{
                    padding: '20px',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setStudents(null)}
                >X</span>
              </div>

              <MyTable forms={students.map(({
                id,
                student_card_id,
                name,
                role
              }) => ({
                student_card_id: {
                  title: 'ID',
                  content: student_card_id
                },
                name: {
                  title: 'Tên',
                  content: name
                },
                role: {
                  title: 'Vai Trò',
                  content: role
                },
                controls: {
                  title: '',
                  content: (
                    <div onClick={() => getstudentHandle(id)}>
                      <EyeSVG 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          cursor: 'pointer' 
                        }} 
                      />
                    </div>
                  )
                }
              }))} />
            </>
          ) : rooms === null ? (
            <>Loading</>
          ) : (
            <>
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

              <MyTable forms={rooms.map(({
                id,
                name,
                amount,
                detail,
                status
              }) => ({
                id: {
                  title: 'ID',
                  content: id
                },
                name: {
                  title: 'Tên',
                  content: name
                },
                amount: {
                  title: 'Số lượng sinh viên',
                  center: true,
                  content: <div style={{ textAlign: 'center' }}>{amount} / {detail.max}</div>
                },
                status: {
                  title: 'Số lượng sinh viên',
                  content: status
                },
                controls: {
                  title: '',
                  content: (
                    <div onClick={() => getstudentsHandle(id, name)}>
                      <EyeSVG 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          cursor: 'pointer' 
                        }} 
                      />
                    </div>
                  )
                }
              }))} />
            </>
          )}
        </div>
      </div>

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

export default Rooms;