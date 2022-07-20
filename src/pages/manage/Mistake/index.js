import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

import MyInput from '~/components/MyInput';
import { useStore, actions } from '~/store';

import { useGetMistakes, useGetMistake, usePostMistake, usePutMistake, usePutFixMistake } from './hooks';

import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import MyTable from '~/components/MyTable';

function Mistake() {
  console.log('Page: Mistake');
  
  const [mistakeID, setMistakeID] = useState(null);
  const [mistake, setMistake] = useState(null);
  const [mistakes, setMistakes] = useState(false);
  const [mistakeAdd, setMistakeAdd] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [edit, setEdit] = useState(false);

  const [state, dispatch] = useStore();

  const getMistakes = useGetMistakes();
  const getMistake = useGetMistake();
  const postMistake = usePostMistake();
  const putMistake = usePutMistake();
  const putFixMistake = usePutFixMistake();

  const submitMistake = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (edit) {
      putMistake.mutate(
        {
          body: {
            student_card_id: mistake.student_card_id,
            content: formData.get('content'),
            'images': imgs
          },
          id: mistake.id
        },
        {
          onSuccess(data) {
            console.log(data);
          }
        }
      )
    }
    else {
      postMistake.mutate(
        {
          student_card_id: formData.get('student_card_id'),
          content: formData.get('content'),
          'images': imgs
        },
        {
          onSuccess(data) {
            console.log(data);
            if (data.status) {
            }
            else {
              alert('Sai');
            }
          }
        }
      );
    }
  }

  const removeImg = (indexRm) => {
    setImgs(imgs.filter((elem, index) => index !== indexRm));
  }

  const change = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {     
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgs((imgs) => [...imgs, reader.result]);
      }
      reader.readAsDataURL(e.target.files[i]);
    }
  }

  useEffect(() => {
    if (mistakeID) {
      getMistake.mutate(
        { id: mistakeID },
        {
          onSuccess(data) {
            console.log(data);
            if (edit) {
              setImgs(data.images.map(({ source }) => source));
            }
            setMistake(data);
          }
        }
      )
    }
  }, [mistakeID])

  useEffect(() => {
    getMistakes.mutate(
      {},
      {
        onSuccess(data) {
          if (data.status) {
            setMistakes(data.data.map(({ id, student_card_id, student_name, room_name, teacher_name, date }) => ({
              id: {
                title: 'id',
                content: '' + id
              },
              student_card_id: {
                title: 'Mã thẻ sinh viên',
                content: student_card_id
              },
              student_name: {
                title: 'Tên sinh viên',
                content: student_name
              }, 
              room_name: {
                title: 'Phòng học',
                content: room_name
              }, 
              teacher_name: {
                title: 'Tên giảng viên',
                content: teacher_name
              }, 
              date: {
                title: 'Ngày tạo',
                content: date
              }
            })));
          }
        }
      }
    )
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg 
            style={{ 
              width: '24px', 
              height: '24px', 
              margin: '0px 16px', 
              cursor: 'pointer' 
            }} 
            onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} 
            viewBox="0 0 30 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        {(mistakeAdd || edit) ? (
          <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '50%', maxWidth: '500px', margin: 'auto' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}
              >GHI LỖI KÝ TÚC XÁ</div>

              <form onSubmit={submitMistake}>
                <table cellPadding="8px">
                  <thead>
                    <tr>
                      <th width="160px"></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span style={{ color: '#0B42AB', fontWeight: 'bold' }}>MSSV</span>
                      </td>
                      <td>
                        {edit ? mistake ? (
                          <MyInput 
                            style={{ 
                              width: '320px', 
                              paddingLeft: '8px',
                              border: 'none', 
                              borderRadius: '4px', 
                              outline: 'none',
                              backgroundColor: '#EEEEEE' 
                            }} 
                            type="text"
                            name="content"
                            initValue={mistake.student_card_id}
                            disabled={true}
                          />
                        ) : (<></>) : (
                          <MyInput 
                            style={{ 
                              width: '320px', 
                              paddingLeft: '8px',
                              border: 'none', 
                              borderRadius: '4px', 
                              outline: 'none',
                              backgroundColor: '#EEEEEE' 
                            }} 
                            type="text"
                            name="content"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style={{ color: '#0B42AB', fontWeight: 'bold' }}>Nội dung lỗi</span>
                      </td>
                      <td>
                        {edit ? mistake ? (
                          <MyInput 
                            style={{ 
                              width: '320px', 
                              paddingLeft: '8px',
                              border: 'none', 
                              borderRadius: '4px', 
                              outline: 'none',
                              backgroundColor: '#EEEEEE' 
                            }} 
                            type="text"
                            name="content"
                            initValue={mistake.content}
                          />
                        ) : (<></>) : (
                          <MyInput 
                            style={{ 
                              width: '320px', 
                              paddingLeft: '8px',
                              border: 'none', 
                              borderRadius: '4px', 
                              outline: 'none',
                              backgroundColor: '#EEEEEE' 
                            }} 
                            type="text"
                            name="content"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style={{ color: '#0B42AB', fontWeight: 'bold' }}>Upload ảnh</span>
                      </td>
                      <td>
                        <label
                          style={{ 
                            padding: '4px',
                            border: 'none', 
                            borderRadius: '4px', 
                            backgroundColor: '#EEEEEE' 
                          }}
                          htmlFor="file"
                        >
                          <svg 
                            style={{ 
                              width: '28px', 
                              height: '28px', 
                              marginRight: '12px'
                            }} 
                            viewBox="0 0 32 33" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M22 17.25V21C22 21.8284 21.3284 22.5 20.5 22.5H11.5C10.6716 22.5 10 21.8284 10 21L10 17.25M19 13.5L16 10.5M16 10.5L13 13.5M16 10.5L16 19.5" stroke="#001A72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ fontWeight: 'bold', marginRight: '12px' }}>Upload files</span>
                        </label>
                        <input onChange={change} id="file" type="file" multiple hidden/>
                        <div>
                          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                            {imgs.map((source, index) => (
                              <div style={{ position: 'relative' }}>
                                <img style={{ height: '100px' }} src={source} alt={index} key={index}/>
                                <svg style={{ width: '16px', height: '16px', position: 'absolute', top: '4px', right: '4px', cursor: 'pointer' }} onClick={() => removeImg(index)} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429L17.9857 0Z" fill="#06245E"/>
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
                            padding: '4px 32px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#0B42AB',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 4px #00000040',
                            color: '#FFFFFF',
                          }}
                          onClick={() => {setMistakeAdd(false); setEdit(false); setMistake(null); setMistakeID(null)}}
                        >Back</button>
                        <button
                          style={{
                            padding: '4px 32px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#0B42AB',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 4px #00000040',
                            color: '#FFFFFF',
                          }}
                          type="submit"
                        >Submit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        ) : (mistakeID ? (mistake ? (
          <div style={{ width: '100%', padding: '0px 0px 0px 0px20px' }}>
            <Table>
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Mã thẻ</td>
                  <td>{mistake.student_card_id}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Mã sinh viên</td>
                  <td>{mistake.student_id}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Tên sinh viên</td>
                  <td>{mistake.student_name}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Mã phòng</td>
                  <td>{mistake.room_name}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Tên giáo viên</td>
                  <td>{mistake.teacher_name}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Ngày tạo</td>
                  <td>{mistake.date}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Trạng thái xác nhận</td>
                  <td>{mistake.is_confirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Trạng thái sửa lỗi</td>
                  <td>{mistake.is_fix_mistake ? 'Đã sửa lỗi' : 'Chưa sửa lỗi'}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Nội dung</td>
                  <td>{mistake.content}</td>
                </tr>
              </tbody>
            </Table>

            <div>
              <div>Minh chứng</div>
              <div>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                  {mistake.images.map(({ source }, index) => (
                    <img style={{ height: '100px' }} src={source} alt={index} key={index}/>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMistakeID(null)}
            >Back</button>
          </div>
        ) : (
          <>Loading...</>
        )) : (mistakes ? (
          <div style={{ width: '100%', padding: '0px 20px'  }}>
            <button
              onClick={() => setMistakeAdd(true)}
            >Tạo lỗi</button>

            <MyTable forms={mistakes} setMistake={setMistakeID} setEdit={setEdit} type={'mistake'}></MyTable>
          </div>
        ) : (
          <>Loading...</>
        )))}
      </div>
    </>
  );
}

export default Mistake; 