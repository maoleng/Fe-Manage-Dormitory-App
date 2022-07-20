import { useState, useEffect } from 'react';

import { useStore, actions } from '~/store';

import { useGetMistakes, usePutRegister } from './hook';

import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import MyTable from '~/components/MyTable';

function Mistake() {
  console.log('Page: Mistake');

  const [loadedMistakes, setLoadedMistakes] = useState(false);
  const [mistakes, setMistakes] = useState(null);

  const [state, dispatch] = useStore();

  const getMistakes = useGetMistakes();
  const putRegister = usePutRegister();

  const mistakeConfirm = (id) => {
    putRegister.mutate(
      {body: {}, id},
      {
        onSuccess(data) {
          getMistakes.mutate({},{onSuccess: (data) => setMistakes(data.data)})
        }
      }
    )
  }

  useEffect(() => {
    getMistakes.mutate(
      {},
      {
        onSuccess(data) {
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
                title: 'Xác nhận',
                content: is_confirmed
              },
              is_fix_mistake: {
                title: 'Sửa lỗi',
                content: is_fix_mistake
              },
              date: {
                title: 'Ngày tạo',
                content: date
              },
              controls: {
                title: '',
                content: (
                  <>
                    <button onClick={() => mistakeConfirm(id)}>Xác nhận</button>
                  </>
                )
              }
            }))}></MyTable>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </>
  );
}

export default Mistake;