import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from 'react-bootstrap';

import { useStore, actions } from '~/store';
import { useGetMistakes, usePutRegister } from './hook';
import { CheckboxSVG, CheckboxTickSVG } from "./svgs";
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import MyTable from '~/components/MyTable';

function Mistake() {
  // console.log('Page: Mistake');

  const [state, dispatch] = useStore();
  const getMistakes = useGetMistakes();
  const putRegister = usePutRegister();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadedMistakes, setLoadedMistakes] = useState(false);
  const [mistakes, setMistakes] = useState(null);

  const mistakeConfirm = (id) => {
    setLoading(true);
    putRegister.mutate(
      {body: {}, id},
      {
        onSuccess(data) {
          console.log(data);
          getMistakes.mutate({},{onSuccess: (data) => {setMistakes(data.data); setLoading(false);}});
          setToast('Xác nhận lỗi thành công');
          
        }
      }
    )
  }

  useEffect(() => {
    getMistakes.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          setMistakes(data.data);
          setLoadedMistakes(true);
        }
      }
    )
  }, [])

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
            width: '100%'
          }}
        >
          {loadedMistakes ? (
            <MyTable forms={mistakes.map(({ id, teacher_name, content, room_name, is_confirmed, is_fix_mistake, date, type }) => ({
              id: {
                title: 'ID',
                content: id
              },
              teacher_name: {
                title: 'Tên giáo viên',
                content: teacher_name
              },
              content: {
                title: 'Nội dung',
                content: content || type
              },
              room_name: {
                title: 'Phòng',
                content: room_name
              },
              is_confirmed: {
                title: 'Xác nhận lỗi',
                center: 'true',
                content: is_confirmed
                  ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <CheckboxTickSVG style={{ width: '16px', height: '16px' }} /> 
                      Đã xác nhận
                    </div>
                  )
                  : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => mistakeConfirm(id)}>
                      <CheckboxSVG style={{ width: '16px', height: '16px' }} />
                      Chưa xác nhận
                    </div>
                  )
              },
              is_fix_mistake: {
                title: 'Sửa lỗi',
                center: 'true',
                content: (
                  <div style={{ textAlign: 'center' }}>{is_fix_mistake
                    ? 'Đã sửa lỗi'
                    : 'Chưa sửa lỗi'}
                  </div>
                )
              },
              date: {
                title: 'Ngày tạo',
                content: date
              }
            }))}></MyTable>
          ) : (
            <>Loading...</>
          )}
          
        </div>
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

export default Mistake;