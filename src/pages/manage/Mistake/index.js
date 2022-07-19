import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

import MyInput from '~/components/MyInput';
import { useStore, actions } from '~/store';

import { useGetMistakes, useGetMistake, usePostMistake, usePutMistake } from './hooks';

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
            setMistakes(data.data);
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

            <MyTable 
              forms={mistakes.map(({ id, student_card_id, student_name, room_name, teacher_name, date }) => ({
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
                },
                controls: {
                  title: '',
                  content: (
                    <>
                        <div style={{ display: 'flex' , alignItems: 'center', gap: '8px' }}>
                          <svg 
                            style={{
                              width: '16px',
                              height: '16px',
                              cursor: 'pointer'
                            }}
                            onClick={() => setMistakeID('' + id)}
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

                          <svg 
                            style={{
                              width: '16px',
                              height: '16px',
                              cursor: 'pointer'
                            }}
                            onClick={() => {setEdit(true); setMistake(id);}}
                            version="1.0" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                              <path 
                                d="
                                  M4325 5100 c-98 -11 -199 -51 -280 -113 -57 -43 -2322 -2306 -2345
                                  -2342 -23 -38 -321 -1106 -322 -1156 -1 -75 56 -132 131 -131 49 1 1119 299
                                  1156 322 17 11 546 536 1177 1167 830 831 1157 1166 1187 1212 67 105 83 160
                                  89 296 4 110 2 126 -23 200 -14 44 -44 107 -65 140 -47 72 -255 279 -325 322
                                  -104 65 -249 97 -380 83z m200 -289 c34 -15 84 -57 167 -139 141 -142 163
                                  -180 163 -292 0 -103 -28 -161 -133 -270 l-81 -85 -298 297 -298 298 45 46
                                  c129 132 214 177 320 171 38 -2 86 -13 115 -26z m-1002 -1903 l-928 -928 -297
                                  297 -298 298 927 927 928 928 297 -297 298 -298 -927 -927z m-1193 -1049 c0
                                  -6 -622 -180 -627 -176 -1 2 37 145 85 320 l87 317 228 -228 c125 -125 227
                                  -229 227 -233z
                                "
                              />
                              <path 
                                d="
                                  M500 4594 c-227 -48 -427 -242 -485 -469 -13 -52 -15 -280 -15 -1820
                                  0 -1748 0 -1761 21 -1835 57 -208 229 -381 444 -447 57 -17 144 -18 1965 -18
                                  l1905 0 80 28 c102 36 179 83 250 153 97 96 163 222 184 354 7 40 11 294 11
                                  665 0 581 -1 601 -20 633 -42 69 -120 90 -181 49 -71 -47 -69 -23 -69 -696 0
                                  -674 1 -659 -69 -762 -21 -29 -62 -70 -92 -91 -106 -74 52 -68 -2021 -66
                                  l-1863 3 -62 29 c-82 37 -161 120 -194 201 l-24 60 -3 1705 c-2 1246 0 1721 8
                                  1765 24 121 97 215 210 269 l65 31 630 5 c595 5 632 6 661 24 89 54 84 185 -9
                                  229 -32 15 -95 17 -649 16 -484 0 -627 -4 -678 -15z
                                "
                              />
                            </g>
                          </svg>
                        </div>
                    </>
                  )
                }
              }))} 
              setMistake={setMistakeID} setEdit={setEdit} type={'mistake'}
            ></MyTable>
          </div>
        ) : (
          <>Loading...</>
        )))}
      </div>
    </>
  );
}

export default Mistake; 