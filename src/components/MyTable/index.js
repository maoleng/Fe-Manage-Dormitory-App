import { useState } from 'react';
import { Table } from "react-bootstrap";

import MyPagination from '~/components/MyPagination'

function MyTable({ forms, setContract, submitConfirmContracts, setMistake, type }) {
  console.log('Component: MyTable');

  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ key: '', isASC: false });

  let formsWrap = !inputValue.length ? forms : forms.filter((elem) => {
    for (let key in elem) {
      if ((''+elem[key].content).includes(inputValue)) {
        return true;
      }
    }

    return false;
  });
  if (!formsWrap.length) {
    formsWrap = [{}];
  }
  if (sort.key !== '') {
    formsWrap.sort(
      (a, b) => {
        if ( isNaN(-(-(a[sort.key].content))) ) {
          return (a[sort.key].content < b[sort.key].content) ? (sort.isASC ? 1 : -1) : (sort.isASC ? -1 : 1)
        }
        else {
          return ((a[sort.key].content - b[sort.key].content) > 0) ? (sort.isASC ? 1 : -1) : (sort.isASC ? -1 : 1);
        }
      }
    );
  }

  const pages = [...Array(Math.ceil(formsWrap.length/10)).keys()];

  function search(e) {
    setInputValue(e.target.value);
    setPage(0);
  }

  function sortforms(key) {
    setSort(key !== sort.key ? {key, isASC: false} : {...sort, isASC: !sort.isASC});
    setPage(0);
  }

  return (
    <div
      style={{
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <input 
            onChange={search} 
            type="text" 
            value={inputValue} 
            placeholder="Search"
          />
        </div>
      </div>
      
      {(!Object.keys(formsWrap[0]).length) ? (
        <>Không có dữ liệu</>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                {Object.keys(formsWrap[0]).map(elem => (
                  <th
                    style={{
                      width: (elem === 'name') ? '240px' : 
                        (elem === 'student_id' ? '140px' : 
                        (elem === 'season' ? '160px': 
                        ''
                      ))
                    }}
                    onClick={() => sortforms(elem)}
                    key={elem}
                  >{formsWrap[0][elem].title}</th>
                ))}
                {type === 'registerForm' ? (
                  <>
                    <th>Xét duyệt</th>
                    <th></th>
                  </>
                ) : (type === 'mistake' ? (
                  <th></th>
                ) : (type === 'contract' ? (
                  <th></th>
                ) : (
                  <></>
                )))}
              </tr>
            </thead>
            <tbody>
              {formsWrap.slice((+page)*10, (+page)*10 + 10).map((elem, index) => (
                <tr key={index}>
                  {Object.keys(formsWrap[0]).map((key, index) => (
                    <td key={index}>
                      {(key === 'room') ? (
                        <>
                          {elem.room.content || (
                            <button>Chọn phòng</button>
                          )}
                        </>
                      ) : ((key === 'ispay') ? (
                        <>
                          {elem.ispay.content ? 'Đã trả' : (
                            <button>Xác nhận</button>
                          )}
                        </>
                      ) : (
                        <>{elem[key].content}</>
                      ))}
                    </td>
                  ))}
                  
                {type === 'registerForm' ? (
                  <>
                    <td>
                      <button
                        style={{
                          border: 'solid #1C63EE 1px',
                          backgroundColor: '#FFFFFF',
                          color: '#1C63EE'
                        }}
                        onClick={() => submitConfirmContracts(elem.id.content)}
                      >
                        <svg style={{ width: '16px', height: '16px', marginRight: '24px' }} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.1665 14C3.30051 14 0.166504 10.866 0.166504 7C0.166504 3.13401 3.30051 0 7.1665 0C11.0325 0 14.1665 3.13401 14.1665 7C14.1623 10.8642 11.0307 13.9958 7.1665 14ZM7.1553 12.6H7.1665C10.2582 12.5969 12.7624 10.0889 12.7609 6.9972C12.7594 3.9055 10.2526 1.4 7.1609 1.4C4.0692 1.4 1.56245 3.9055 1.5609 6.9972C1.55936 10.0889 4.0636 12.5969 7.1553 12.6ZM4.7263 9.0048L3.7365 8.015L7.2015 4.55L10.6665 8.015L9.6767 9.0041L7.2015 6.5296L4.727 9.0048H4.7263Z" fill="#1C63EE"/>
                        </svg>
                        Duyệt
                      </button>
                    </td>
                    <td valign="middle">
                      <div style={{ display: 'flex' , alignItems: 'center', gap: '8px' }}>
                        <svg 
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer'
                          }}
                          onClick={() => setContract(elem.id.content)}
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
                            width: '8px',
                            height: '8px',
                            cursor: 'pointer'
                          }}
                          version="1.0" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512.000000 512.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="#000000" stroke="none">
                            <path 
                              d="
                                M197 5106 c-84 -31 -152 -99 -183 -183 -7 -21 -13 -69 -13 -108 -1
                                -137 -66 -64 1087 -1217 l1037 -1038 -1041 -1042 c-1174 -1176 -1090 -1081
                                -1082 -1233 5 -91 27 -143 83 -200 57 -56 109 -78 200 -83 152 -8 57 -92 1233
                                1082 l1042 1041 1043 -1041 c1175 -1174 1080 -1090 1232 -1082 91 5 143 27
                                200 83 56 57 78 109 83 200 8 152 92 57 -1082 1233 l-1041 1042 1041 1043
                                c1174 1175 1090 1080 1082 1232 -5 91 -27 143 -83 200 -57 56 -109 78 -200 83
                                -152 8 -57 92 -1233 -1082 l-1042 -1041 -1038 1037 c-1153 1153 -1080 1088
                                -1217 1087 -38 0 -87 -6 -108 -13z
                              "
                            />
                          </g>
                        </svg>
                      </div>
                    </td>
                  </>
                ) : (type === 'mistake' ? (
                  <>
                    <td valign="middle">
                      <div style={{ display: 'flex' , alignItems: 'center', gap: '8px' }}>
                        <svg 
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer'
                          }}
                          onClick={() => setMistake(elem.id.content)}
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
                      </div>
                    </td>
                  </>
                ) : (type === 'contract' ? (
                  <>
                    <td valign="middle">
                      <svg 
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setContract(elem.id.content)}
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
                    </td>
                  </>
                ) : (
                  <></>
                )))}
                </tr>
              ))}
            </tbody>
          </Table>
    
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MyPagination pages={pages} page={page} setPage={setPage}></MyPagination>
          </div>
    
          <div
            style={{
              textAlign: 'center',
              color: '#0B42ABFF'
            }}
          >Result: {(!(Object.keys(formsWrap[0]).length)) ? 
            '0' :  
            ((+page)*10 + 1 + ' - ' + (((+page)*10 + 10) < formsWrap.length ? ((+page)*10 + 10) : formsWrap.length)) + 
            ' of ' + formsWrap.length}
          </div>
        </>
      )}
    </div>
  );
}

export default MyTable;