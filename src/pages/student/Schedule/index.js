import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useStore, actions } from '~/store';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { CalendarSVG } from './svgs';
import { useGetSchedules } from './hooks';

function weekdayMapping(en) {
  return (
    en === 'Monday' ? 'Thứ 2'
      : en === 'Tuesday' ? 'Thứ 3'
      : en === 'Wednesday' ? 'Thứ 4'
      : en === 'Thursday' ? 'Thứ 5'
      : en === 'Friday' ? 'Thứ 6'
      : en === 'Saturday' ? 'Thứ 7'
      : en === 'Sunday' ? 'Chủ nhật'
      : 'Err'
  )
}

function Schedule() {
  // console.log('Page: Schedule');

  const [state, dispatch] = useStore();
  const getSchedules = useGetSchedules();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSchedules.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          setSchedules(data.data);
          setLoading(false);
        }
      }
    );
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
            padding: '20px',
            width: '100%',
            position: 'relative'
          }}
        >
          {(new Date()).getDay() === 0 && (
            <div
              style={{
                padding: '8px',
                border: 'solid #1C63EE 1px',
                borderRadius: '4px',
                color: '#1C63EE',
                fontWeight: 'bold',
                position: 'absolute',
                right: '20px',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/sinh-vien/lich-truc/dang-ky', { replace: true })}
            ><CalendarSVG style={{ width: '19px', height: '21px', marginRight: '20px' }} />Đăng ký trực</div>
          )}

          <div
            style={{
              color: '#001A72',
              textAlign: 'center',
              fontSize: '32px',
              fontWeight: 'bold'
            }}
          >LỊCH TRỰC TUẦN</div>

          <div style={{ width: '100%', height: '20px' }}></div>

          {schedules === null ? <>Loading...</> : (
            <>
              <div
                style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(8, 1fr)'
                }}
              >
                <div
                  style={{  
                    padding: '4px',
                    border: 'solid #D9D9D9 1px',
                    backgroundColor: '#001A72',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >Ca trực/Ngày trức</div>

                {schedules[0].schedules.map(({ day, date}, index) => (
                  <div
                    style={{
                      padding: '4px',
                      border: 'solid #D9D9D9 1px',
                      backgroundColor: '#001A72',
                      color: '#FFFFFF',
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    key={`${day}-${index}`}
                  >
                    <div
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <div>{weekdayMapping(day)}</div>
                      <div>{date}</div>
                    </div>
                  </div>
                ))}

                {schedules.map(elem => (
                  <>
                    <div
                      style={{
                        padding: '4px',
                        border: 'solid #D9D9D9 1px',
                        backgroundColor: '#84B4FC',
                        color: '#000000',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >{elem.period_detail}</div>

                    {elem.schedules.map(({ period, students }) => (
                      <div
                        style={{
                          padding: '4px',
                          border: 'solid #D9D9D9 1px'
                        }}
                        key={period}
                      >
                        {students && students.map((student, index) => (
                          <div
                            key={`${student.id}-${index}`}
                          >
                            {student.student_card_id}
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

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

export default Schedule;