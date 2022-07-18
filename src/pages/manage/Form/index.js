import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useStore, actions } from '~/store';
import { useGetForms } from './hooks';

import MyNavbar from '~/components/MyNavbar';
import MyTable from '~/components/MyTable';
import MySidebar from '~/components/MySidebar';

function Form() {
  console.log('Page: Form');

  const [loaded, setLoaded] = useState(false);
  const [forms, setForms] = useState(null);
  const [state, dispatch] = useStore();

  const getForms = useGetForms();

  useEffect(() => {
    getForms.mutate(
      {},
      {
        onSuccess(data) {
          setForms(data.data);
          
          setLoaded(true);
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
            width: '100%',
            padding: '40px',
          }}
        >
          <button
            style={{
              padding: '4px 16px',
              border: 'none',
              backgroundColor: '#0B42AB', 
              color: '#FFFFFF',
              float: 'right'
            }}
          >
            <svg 
              style={{ width: '12px', height: '12px', marginRight: '16px' }}
              version="1.0" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                <path 
                  d="
                    M2240 4000 l0 -1120 -1120 0 -1120 0 0 -320 0 -320 1120 0 1120 0 0
                    -1120 0 -1120 320 0 320 0 0 1120 0 1120 1120 0 1120 0 0 320 0 320 -1120 0
                    -1120 0 0 1120 0 1120 -320 0 -320 0 0 -1120z
                  "
                />
              </g>
            </svg>
            Tạo đơn
          </button>
          {loaded ? forms ? (
            
            <>
              <MyTable 
                forms={forms.map(({ id, student_card_id, name, title, content, child_answer_count, created_at }) => ({
                  id: {
                    title: 'Mã đơn',
                    content: '' + id
                  },
                  student_card_id: {
                    title: 'Mã sinh viên',
                    content: student_card_id
                  },
                  name: {
                    title: 'Tên sinh viên',
                    content: name
                  },
                  title: {
                    title: 'Tiêu đề',
                    content: title
                  },
                  child_answer_count: {
                    title: 'Số câu trả lời',
                    content: child_answer_count
                  },
                  created_at: {
                    title: 'Ngày tạo',
                    content: created_at
                  },
                  test: {
                    title: '', 
                    content: (
                      <>
                        <td valign="middle">
                          <Link
                            style={{
                              padding: '4px 8px',
                              border: 'none',
                              backgroundColor: '#1C63EE',
                              color: '#FFFFFF'
                            }}
                            to={`/quan-ly/don-khieu-nai/${id}`}
                          >
                            <svg
                              style={{ width: '16px', height: '16px', marginRight: '8px' }}
                              version="1.0" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                                <path 
                                  d="
                                    M1155 4689 c-343 -50 -616 -296 -707 -639 l-23 -85 0 -1405 0 -1405
                                    23 -85 c83 -313 309 -539 622 -622 l85 -23 1405 0 1405 0 85 23 c311 82 535
                                    305 622 617 22 78 22 96 26 690 3 660 3 665 -50 729 -82 100 -240 104 -330 9
                                    -54 -57 -53 -43 -58 -698 -5 -603 -5 -611 -27 -665 -49 -120 -151 -214 -273
                                    -251 -64 -19 -95 -19 -1420 -17 l-1355 3 -55 22 c-120 49 -213 150 -250 271
                                    -20 63 -20 97 -20 1402 0 1305 0 1339 20 1402 37 121 130 222 250 271 54 22
                                    62 22 665 27 429 4 618 8 636 17 14 6 40 23 58 38 95 80 97 239 4 327 -61 58
                                    -62 58 -697 57 -319 -1 -608 -5 -641 -10z
                                  "
                                />
                                <path 
                                  d="
                                    M3138 4690 c-52 -16 -98 -52 -126 -98 -22 -38 -27 -59 -27 -112 0
                                    -85 34 -147 103 -187 l47 -28 404 -3 405 -3 -781 -782 c-430 -430 -789 -798
                                    -799 -817 -24 -45 -25 -153 -2 -195 21 -39 64 -82 103 -103 42 -23 150 -22
                                    195 2 19 10 387 369 817 799 l782 781 3 -405 3 -404 28 -47 c40 -69 102 -103
                                    187 -103 71 1 108 15 154 61 65 65 61 18 61 794 l0 705 -28 47 c-18 31 -44 57
                                    -75 75 l-47 28 -690 2 c-379 1 -702 -2 -717 -7z
                                  "
                                />
                              </g>
                            </svg>
                            chat
                          </Link>
                        </td>
                      </>
                    )
                  }
                }))}
                type={'form'}
              ></MyTable>
            </>
          ) : (
            <>Không có dữ liệu</>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;