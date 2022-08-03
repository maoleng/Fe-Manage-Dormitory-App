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
  console.log('Page: Schedule');

  const [state, dispatch] = useStore();
  const getSchedules = useGetSchedules();
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState(null);

  useEffect(() => {
    getSchedules.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);
          setSchedules(data.data);
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
          {/* {(new Date()).getDay() === 0 && ( */}
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
          {/* )} */}

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
    </>
  );
}

export default Schedule;