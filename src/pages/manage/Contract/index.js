import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

import { useStore, actions } from '~/store';

import MyNavbar from '~/components/MyNavbar';
import MyTable from '~/components/MyTable';
import MySidebar from '~/components/MySidebar';

import { useGetConfirmContracts } from './hooks';

function Contract() {
  console.log('Page: Contract');

  const [contract, setContract] = useState(null);
  const [contracts, setContracts] = useState(false);
  const [state, dispatch] = useStore();

  const getConfirmContracts = useGetConfirmContracts();

  useEffect(() => {
    getConfirmContracts.mutate({},
      {
        onSuccess(data) {
          if (data.status) {
            setContracts(data.data);
          }
          else {
            alert('Lỗi lấy dữ liệu');
          }
        }
      }
    )
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

        <div style={{ width: '100%', padding: '20px' }}>
          {contract ? (
            <>
              <div
                style={{
                  padding: '0px 20px',
                  fontSize: '24px',
                  borderBottom: 'solid #A9CBFE 8px'
                }}
              >THÔNG TIN ĐĂNG KÝ</div>
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}></th>
                      <th style={{ width: '50%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>MSSV</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Họ và tên</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Khu vực đối tượng</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Thời gian nộp đơn</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Trạng thái</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                
                <div style={{ width: '100%', height: '40px' }}></div>

                <button style={{ padding: '8px', border: 'none', backgroundColor: '#0B42AB', float: 'left' }} onClick={() => setContract(null)}>
                  <span style={{ margin: '0px 8px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '12px' }}>Trở lại</span>
                </button>

                <button style={{ padding: '8px', border: 'none', backgroundColor: '#0B42AB', float: 'right' }}>
                  <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 8.5C7.75 8.08579 7.41421 7.75 7 7.75C6.58579 7.75 6.25 8.08579 6.25 8.5H7.75ZM6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25C7.41421 15.25 7.75 14.9142 7.75 14.5H6.25ZM11.75 8.5C11.75 8.08579 11.4142 7.75 11 7.75C10.5858 7.75 10.25 8.08579 10.25 8.5H11.75ZM10.25 14.5C10.25 14.9142 10.5858 15.25 11 15.25C11.4142 15.25 11.75 14.9142 11.75 14.5H10.25ZM15.75 4.5C15.75 4.08579 15.4142 3.75 15 3.75C14.5858 3.75 14.25 4.08579 14.25 4.5H15.75ZM3.75 4.5C3.75 4.08579 3.41421 3.75 3 3.75C2.58579 3.75 2.25 4.08579 2.25 4.5H3.75ZM1 3.75C0.585786 3.75 0.25 4.08579 0.25 4.5C0.25 4.91421 0.585786 5.25 1 5.25V3.75ZM17 5.25C17.4142 5.25 17.75 4.91421 17.75 4.5C17.75 4.08579 17.4142 3.75 17 3.75V5.25ZM11.25 4.5C11.25 4.91421 11.5858 5.25 12 5.25C12.4142 5.25 12.75 4.91421 12.75 4.5H11.25ZM5.25 4.5C5.25 4.91421 5.58579 5.25 6 5.25C6.41421 5.25 6.75 4.91421 6.75 4.5H5.25ZM6.25 8.5V14.5H7.75V8.5H6.25ZM10.25 8.5V14.5H11.75V8.5H10.25ZM14.25 4.5V16.5H15.75V4.5H14.25ZM13 17.75H5V19.25H13V17.75ZM3.75 16.5V4.5H2.25V16.5H3.75ZM5 17.75C4.30964 17.75 3.75 17.1904 3.75 16.5H2.25C2.25 18.0188 3.48122 19.25 5 19.25V17.75ZM14.25 16.5C14.25 17.1904 13.6904 17.75 13 17.75V19.25C14.5188 19.25 15.75 18.0188 15.75 16.5H14.25ZM1 5.25H17V3.75H1V5.25ZM12.75 4.5V3.5H11.25V4.5H12.75ZM10 0.75H8V2.25H10V0.75ZM5.25 3.5V4.5H6.75V3.5H5.25ZM8 0.75C6.48122 0.75 5.25 1.98122 5.25 3.5H6.75C6.75 2.80964 7.30964 2.25 8 2.25V0.75ZM12.75 3.5C12.75 1.98122 11.5188 0.75 10 0.75V2.25C10.6904 2.25 11.25 2.80964 11.25 3.5H12.75Z" fill="white"/>
                  </svg>
                  <span style={{ margin: '0px 8px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '12px' }}>Hủy đơn đăng ký</span>
                </button>

                <button style={{ padding: '8px', border: 'none', marginRight: '20px', backgroundColor: '#0B42AB', float: 'right' }}>
                  <span style={{ margin: '0px 8px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '12px' }}>Duyệt</span>
                </button>
              </div>
            </>
          ) : (contracts ? (
            <MyTable 
              forms={contracts.map(({ id, student, season, room_id, subscription, created_at }) => ({
                id: {
                  title: 'id',
                  content: '' + id
                },
                mssv: {
                  title: 'MSSV',
                  content: student.student_card_id
                },
                name: {
                  title: 'Họ và tên',
                  content: student.name
                },
                season: {
                  title: 'Học kỳ',
                  content: season
                },
                room: {
                  title: 'Phòng',
                  content: room_id
                },
                price: {
                  title: 'Số tiền phải trả',
                  content: subscription.price
                },
                ispay: {
                  title: 'Số tiền phải trả',
                  content: subscription.is_paid
                },
                createdAt: {
                  title: 'Duyệt vào lúc',
                  content: created_at
                },
                control: {
                  title: '',
                  content: (
                    <>
                      <svg 
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setContract(id)}
                        version="1.0" 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
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
                  )
                }
              }))} 
              setContract={setContract} type={'contract'}
            ></MyTable>
          ) : (
            <>Khong co du lieu...</>
          ))}
        </div>
      </div>
    </>
  );
}

export default Contract;