import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap';

import { useStore, actions } from '~/store';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { ScheduleCheckedSVG, CheckboxSVG, CheckboxCheckedSVG } from './svgs';
import { useGetSchedules, useGetSelected, usePostSchedules } from './hooks';

function weekdayMapping(en) {
  return (
    en === 'Monday' ? 'Thứ 2'
      : en === 'Tuesday' ? 'Thứ 3'
      : en === 'Wednesday' ? 'Thứ 4'
      : en === 'Thursday' ? 'Thứ 5'
      : en === 'Friday' ? 'Thứ 6'
      : en === 'Saturday' ? 'Thứ 7'
      : en === 'Sunday' ? 'Chủ nhật'
      : 'Err'
  )
}

function ScheduleRegister() {
  // console.log('Page: Schedule');

  const [state, dispatch] = useStore();
  const getSchedules = useGetSchedules();
  const getSelected = useGetSelected();
  const postSchedules = usePostSchedules();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');
  // if ((new Date()).getDay() !== 0) navigate('/sinh-vien/lich-truc');

  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [available, setAvailable] = useState([]);
  const [scheduleIDs, setScheduleIDs] = useState([]);
  const [schedules, setSchedules] = useState(null);

  const addScheduleIDsHandle = (id) => {
    if (scheduleIDs.includes(id)) {
      const newScheduleIDs = scheduleIDs.filter(elem => elem !== id);
      if (!available.includes(id) || newScheduleIDs.every(elem => available.includes(elem))) {
        setScheduleIDs(newScheduleIDs);
      }
      else {
        alert('Phải hủy đăng kí những ca có nhiều người đăng kí trước');
      }
    }
    else {
      setScheduleIDs([...scheduleIDs, id]);
    }
  } 

  const postSchedulesHandle = () => {
    if (scheduleIDs.length > 1 && scheduleIDs.length < 4) {
      postSchedules.mutate(
        { body: { schedule_ids: scheduleIDs}},
        {
          onSuccess(data) {
            console.log(data);
            getSchedulesHandle();
            setConfirmModal(false);
          }
        }
      );
    }
    else {
      alert('Chỉ đăng kí 2 hoặc 3 ca');
    }
  }

  function getSchedulesHandle() {
    getSchedules.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          const min = Math.min(...(data.data.map(elem => Math.min(...(elem.schedules.map(elem => elem.students ? elem.students.length : 0))))));
          setSchedules(data.data);
          setAvailable(data.data.reduce((res, curr) => {
            const ids = curr.schedules.reduce((res, curr) => {
              if (curr.students) {
                if (curr.students.length > min) {
                  return res;
                }
                else {
                  return [...res, curr.id];
                }
              }
              else {
                return [...res, curr.id];
              }
            }, []);

            return [...res, ...ids];
          }, []))
          getSelected.mutate(
            {},
            {
              onSuccess(data) {
                // console.log(data);
                setScheduleIDs(data.data.schedule_ids);
                setLoading(false);
              }
            }
          );
        }
      }
    );
  }

  useEffect(() => {
    setLoading(true);
    getSchedulesHandle();
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
            width: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '8px',
              fontSize: '24px',
              fontWeight: 'bold',
              position: 'absolute',
              right: '20px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/sinh-vien/lich-truc', { replace: true })}
          >X</div>

          <div
            style={{
              color: '#001A72',
              textAlign: 'center',
              fontSize: '32px',
              fontWeight: 'bold'
            }}
          >LỊCH TRỰC TUẦN</div>

          <div style={{ width: '100%', height: '20px' }}></div>

          {schedules === null ? <>Loading...</> : (
            <>
              <div
                style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(8, 1fr)'
                }}
              >
                <div
                  style={{  
                    padding: '4px',
                    border: 'solid #D9D9D9 1px',
                    backgroundColor: '#001A72',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >Ca trực/Ngày trức</div>

                {schedules[0].schedules.map(({ day, date}, index) => (
                  <div
                    style={{
                      padding: '4px',
                      border: 'solid #D9D9D9 1px',
                      backgroundColor: '#001A72',
                      color: '#FFFFFF',
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    key={`${day}-${index}`}
                  >
                    <div
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <div>{weekdayMapping(day)}</div>
                      <div>{date}</div>
                    </div>
                  </div>
                ))}

                {schedules.map(elem => (
                  <>
                    <div
                      style={{
                        padding: '4px',
                        border: 'solid #D9D9D9 1px',
                        backgroundColor: '#84B4FC',
                        color: '#000000',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >{elem.period_detail}</div>

                    {elem.schedules.map(({ id, period, students }) => (
                      <div
                        style={{
                          padding: '4px',
                          border: 'solid #D9D9D9 1px'
                        }}
                        key={period}
                      >
                        {students ? students.map((student, index) => (
                            <div
                              key={`${student.id}-${index}`}
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    <div>Tên: {student.name}</div>
                                    <div>Phòng: {student.room}</div>
                                  </Tooltip>
                                }
                              >
                                <Button 
                                  style={{ 
                                    padding: '0px', 
                                    border: 'none', 
                                    backgroundColor: '#FFFFFF', 
                                    color: '#000000', 
                                    boxShadow: 'none', 
                                    cursor: 'default' 
                                  }}
                                >{student.student_card_id}</Button>
                              </OverlayTrigger>
                            </div>
                          )
                        ) : <></>}

                        {(available.every(elem => scheduleIDs.includes(elem)) || available.includes(id)) && (
                          <div
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={() => addScheduleIDsHandle(id)}
                          >
                            {scheduleIDs.includes(id) 
                              ? <CheckboxCheckedSVG style={{ width: '12px', height: '12px' }} /> 
                              : <CheckboxSVG style={{ width: '12px', height: '12px' }} />}
                            <span style={{ fontSize: '12px' }}> Đăng kí</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </>
          )}

          <div style={{ width: '100%', height: '20px' }}></div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                padding: '8px 32px',
                margin: '0px auto',
                backgroundColor: '#1C63EE', 
                color: '#FFFFFF',
                display: 'inline-block',
                cursor: 'pointer'
              }}
              onClick={() => setConfirmModal(true)}
            >
              <ScheduleCheckedSVG style={{ width: '23px', height: '26px', marginRight: '20px' }} />
              <span style={{ fontWeight: 'bold' }}>Đăng ký</span>
            </div>
          </div>
        </div>
      </div>

      <Modal size="lg" show={confirmModal} onHide={() => setConfirmModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Xác nhận đăng kí!</Modal.Body>
        <Modal.Footer>
          <button
            style={{
              border: "solid #28a745 1px",
              backgroundColor: " #28a745",
              color: "#FFF",
              padding: "4px",
            }}
            onClick={postSchedulesHandle}
          >
            Xác nhận
          </button>
        </Modal.Footer>
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

export default ScheduleRegister;