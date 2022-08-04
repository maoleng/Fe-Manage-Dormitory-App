import { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

import { useStore, actions } from '~/store';
import { useGetMistakes, usePutRegister } from './hook';
import { CheckboxSVG, CheckboxTickSVG } from "./svgs";
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import MyTable from '~/components/MyTable';

function Mistake() {
  console.log('Page: Mistake');

  const [state, dispatch] = useStore();
  const getMistakes = useGetMistakes();
  const putRegister = usePutRegister();

  const [toast, setToast] = useState(null);
  const [loadedMistakes, setLoadedMistakes] = useState(false);
  const [mistakes, setMistakes] = useState(null);

  const mistakeConfirm = (id) => {
    console.log('hello');

    putRegister.mutate(
      {body: {}, id},
      {
        onSuccess(data) {
          console.log(data);
          getMistakes.mutate({},{onSuccess: (data) => setMistakes(data.data)});
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
            <MyTable forms={mistakes.map(({ id, teacher_name, content, room_name, is_confirmed, is_fix_mistake, date }) => ({
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
                content: content
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
                content: is_fix_mistake
                ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <CheckboxTickSVG style={{ width: '16px', height: '16px' }} /> 
                    Đã sửa lỗi
                  </div>
                )
                : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <CheckboxSVG style={{ width: '16px', height: '16px' }} /> 
                    Chưa sửa lỗi
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
    </>
  );
}

export default Mistake;