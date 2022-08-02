import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { useStore, actions } from '~/store';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { useGetRooms, useGetRoomStudents, usePostAttendance } from './hooks';
import { ArrowRightSVG, RadioSVG, RadioCheckedSVG, CheckboxSVG, CheckboxCheckedSVG } from './svgs';
import InputCustom from './InputCustom';

function Attendance() {
  console.log('Page: Attendance');

  const getRooms = useGetRooms();
  const getRoomStudents = useGetRoomStudents();
  const postAttendance = usePostAttendance();
  const [state, dispatch] = useStore();

  const [roomModal, setRoomModal] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [roomStudents, setRoomStudents] = useState(null);
  const [roomsStyle, setRoomStyle] = useState({});

  const postAttendanceHandle = () => {
    postAttendance.mutate(
      {
        body: roomStudents.map(({ id, status, comment}) => ({
          "student_id": id,
          "status": status === '0' ? '1' : '0',
          "note": comment
        }))
      },
      {
        onSuccess(data) {
          console.log(data);
          getRoomHandle();
          hideRoomHandle();
        }
      }
    )
  }

  const showRoomHandle = (id) => {
    getRoomStudents.mutate(
      { id },
      {
        onSuccess(data) {
          console.log(data);
          setRoomModal(true);
          setRoomStudents(data.data.map(elem => ({ ...elem, status: '0', comment: '' })));
        }
      }
    );
  }
  
  const hideRoomHandle = () => {
    setRoomStudents(null);
    setRoomModal(false);
  }

  function getRoomHandle() {
    getRooms.mutate(
      {},
      {
        onSuccess(data) {
          console.log(`getRooms:`, data);
          setRooms(data.data);
        }
      }
    );
  }

  useEffect(() => {
    getRoomHandle();
    if (window.screen.width < 600) {
      dispatch(actions.setIsOpenSidebar(false));
    }

    window.onresize = () => {
      if (window.screen.width > 900) {
        setRoomStyle({
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '0px 12px',
        });
      }
      else {
        setRoomStyle({});
      }
    }
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
            width: '100%',
            padding: '20px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold', 
            }}
          >ĐIỂM DANH KÝ TÚC XÁ</div>

          <div
            style={roomsStyle}
          >
            {rooms === null ? <>Loading...</> : rooms.map(({ id, name, count_student, is_finish }) => (
              <div 
                style={{ 
                  width: '100%', 
                  padding: '4px 8px', 
                  border: 'solid #D9D9D9 1px', 
                  margin: '4px 0px', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between', 
                  cursor: is_finish ? 'default' : 'pointer',
                }} 
                onClick={() => is_finish ? null : showRoomHandle(id)}
                key={id}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {is_finish
                    ? <CheckboxCheckedSVG style={{ width: '10px', height: '10px' }} />
                    : <CheckboxSVG style={{ width: '10px', height: '10px' }} />}
                  <div style={{ fontWeight: 'bold' }}>{name}</div>
                  <div style={{ padding: '1px 4px', backgroundColor: '#1C63EE', color: '#FFFFFF', fontSize: '8px' }}>{count_student}</div>
                </div>
                <div style={{ padding: '0px 12px', display: 'flex', alignItems: 'center', }}><ArrowRightSVG style={{ width: '6px', height: '10px' }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={roomModal} onHide={hideRoomHandle}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {roomStudents === null ? <>Loading...</> : roomStudents.map(({ id, is_check, name, student_card_id, status, comment }) => (
            <div>
              <div
                style={{
                  padding: '4px 8px', 
                  backgroundColor: status === '1'
                    ? '#D9D9D9'
                    : status === '2'
                    ? '#AFADAD'
                    : '#C6F9D7',
                  display: 'flex',
                  justifyContent: 'space-between', 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', }}>{name}</div>
                  <div
                    style={{
                      padding: '0px 40px',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto auto auto',
                      gap: '0px 16px',
                    }}
                  >
                    <div 
                      style={{ display: 'flex', alignItems: 'center', }}
                      onClick={() => setRoomStudents(roomStudents.map((elem) => ({
                        ...elem,
                        status: id === elem.id ? '1' : status,
                      })))}
                    >
                      {status === '1' 
                        ? <RadioCheckedSVG style={{ width: '10px', height: '10px' }} /> 
                        : <RadioSVG style={{ width: '10px', height: '10px' }} />}
                    </div>
                    <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', }}>Không phép</div>
                    <div 
                      style={{ display: 'flex', alignItems: 'center', }}
                      onClick={() => setRoomStudents(roomStudents.map((elem) => ({
                        ...elem,
                        status: id === elem.id ? '2' : status,
                      })))}
                    >
                      {status === '2' 
                        ? <RadioCheckedSVG style={{ width: '10px', height: '10px' }} /> 
                        : <RadioSVG style={{ width: '10px', height: '10px' }} />}
                    </div>
                  <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', }}>Có phép</div>
                </div>
              </div>
              
              {status === '0' ? <></> : (
                <div 
                  style={{ 
                    width: '100%', 
                    padding: '8px 16px', 
                    display: 'flex', 
                    gap: '16px', 
                  }}
                >
                  <div style={{ fontSize: '12px', }}>Lý do vắng:</div>
                  <div style={{ flexGrow: '1', }}><input 
                    style={{ 
                      width: '100%', 
                      height: '16px', 
                      borderStyle: 'none none solid none', 
                      borderColor: '#D9D9D9',
                      outline: 'none', 
                    }} 
                    value={comment}
                    onChange={e => setRoomStudents(roomStudents.map((elem) => ({
                      ...elem,
                      comment: id === elem.id ? e.target.value : comment,
                    })))}
                  /></div>
                </div>
              )}
            </div>
          ))}

          <div style={{ width: '100%', height: '20px' }}></div>

          <div
            style={{
              display: 'flex', 
              justifyContent: 'center'
            }}
          >
            <button
              style={{
                padding: '4px 48px', 
                border: 'solid #0B42AB 2px',
                backgroundColor: '#FFFFFF',
                color: '#0B42AB',
                fontWeight: 'bold', 
                textAlign: 'center', 
              }}
              onClick={postAttendanceHandle}
            >OK</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Attendance;