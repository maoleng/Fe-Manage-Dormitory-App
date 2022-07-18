import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { useStore, actions } from '~/store';
import { useGetFormDetail } from './hooks';

import MyNavbar from '~/components/MyNavbar';
import MyTable from '~/components/MyTable';
import MySidebar from '~/components/MySidebar';

function FormDetail() {
  console.log('Page: FormDetail');

  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(null);

  const [state, dispatch] = useStore();

  const getFormDetail = useGetFormDetail();

  useEffect(() => {
    getFormDetail.mutate(
      { id },
      {
        onSuccess(data) {
          setForm(data.data);
          setLoaded(true);
        }
      }
    )
  }, [])

  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
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
      
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }} >
          <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

          {loaded ? form ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '100%',
                  padding: '4px',
                  boxShadow: '5px 5px 5px #6D9CF840',
                  fontWeight: 'bold'
                }}
              ># {form.title}</div>

              <div
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></div>

              <div
                style={{
                  width: '100%'
                }}
              >
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#E7F0FF',
                    display: 'flex'
                  }}
                >
                  <div>
                    <svg 
                      style={{ width: '24px', height: '24px' }}
                      version="1.0" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path 
                          d="
                            M2238 5104 c-558 -72 -1087 -332 -1488 -734 -406 -405 -664 -933
                            -735 -1500 -20 -161 -20 -459 0 -620 71 -567 329 -1095 735 -1500 405 -406
                            933 -664 1500 -735 161 -20 459 -20 620 0 859 107 1605 638 1990 1420 177 358
                            260 716 260 1125 0 409 -83 767 -260 1125 -385 782 -1131 1313 -1990 1420
                            -153 19 -482 18 -632 -1z m622 -1644 l0 -600 600 0 600 0 0 -300 0 -300 -600
                            0 -600 0 0 -600 0 -600 -300 0 -300 0 0 600 0 600 -600 0 -600 0 0 300 0 300
                            600 0 600 0 0 600 0 600 300 0 300 0 0 -600z
                          "
                        />
                      </g>
                    </svg>
                  </div>

                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0px 8px',
                      backgroundColor: '#FFFFFF00',
                      border: 'none',
                      outline: 'none'
                    }}
                    placeHolder="Viết tin nhắn của bạn tại đây..."
                  />

                  <div>
                    <svg 
                      style={{ width: '24px', height: '24px' }}
                      version="1.0" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#001A72" stroke="none">
                      <path 
                        d="
                          M2489 4147 c-1334 -535 -2434 -978 -2443 -986 -34 -29 -48 -72 -44
                          -133 4 -49 9 -64 34 -88 19 -20 358 -189 979 -491 523 -253 955 -466 962 -472
                          6 -7 216 -434 467 -950 250 -517 462 -950 471 -963 57 -87 213 -85 259 3 8 16
                          448 1111 978 2433 944 2358 963 2406 963 2472 0 65 -2 69 -37 105 -34 34 -43
                          37 -100 40 -62 2 -84 -6 -2489 -970z m700 -733 l-1126 -1126 -761 368 c-418
                          203 -758 371 -755 374 4 4 3751 1507 3763 1509 3 1 -502 -506 -1121 -1125z
                          m599 -981 c-413 -1033 -754 -1881 -757 -1885 -3 -3 -172 336 -375 754 l-368
                          761 1123 1123 c618 618 1125 1124 1125 1124 1 0 -336 -845 -748 -1877z
                        "
                      />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>Chưa có dữ liệu</>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </>
  );
}

export default FormDetail;