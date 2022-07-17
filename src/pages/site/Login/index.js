import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import MyInput from '~/components/MyInput';
import { useLogin } from './hooks';

function Login() {
  console.log('Page: Login');

  const [role, setRole] = useState(null);
  const [roleTmp, setRoleTmp] = useState(null);

  const navigate = useNavigate();
  const login = useLogin();

  function submitLogin(e) {
    e.preventDefault();

    const loginForm = new FormData(e.target);
    const username = loginForm.get('username');
    const password = loginForm.get('password');

    login.mutate(
      {
        username,
        password
      },
      {
        onSuccess(data) {
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('role', data.role);
          navigate('/', { replace: true });
        }
      }
    )
  }

  return (
    <>
      <div 
        style={{ 
          padding: '0px 16px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: '999'
        }}
      >
        <div>
          <Link to="/">
            <img style={{ height: '50px', padding: '4px' }} src="/imgs/site/logo.png" alt="logo"/>
          </Link>
        </div>
        <div>
          <Link to="/">
            <svg 
              style={{
                width: '16px',
                height: '16px'
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.000000 512.000000"
            >
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
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
          </Link>
        </div>
      </div>

      {role ? (
        <div 
          style={{
            width: '800px',
            textAlign: 'center',
            margin: 'auto'
          }}
        >
          <img 
            style={{
              width: '100%'
            }}
            src={role === 'student' ? '/imgs/site/sign-in-student-bg.png' : '/imgs/site/sign-in-manage-bg.png'}
            alt={role === 'student' ? 'sign-in-student-bg' : 'sign-in-manage-bg'}
          />

          <form
            style={{
              width: '400px',
              margin: 'auto'
            }}
            onSubmit={submitLogin}
          >
            <div
              style={{
                margin: '16px auto',
                display: 'flex',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 7.79113 15.7654 8.56448 15.3259 9.22228C14.8864 9.88008 14.2616 10.3928 13.5307 10.6955C12.7998 10.9983 11.9956 11.0775 11.2196 10.9231C10.4437 10.7688 9.73098 10.3878 9.17157 9.82843C8.61216 9.26902 8.2312 8.55629 8.07686 7.78036C7.92252 7.00444 8.00173 6.20017 8.30448 5.46927C8.60723 4.73836 9.11992 4.11365 9.77772 3.67412C10.4355 3.2346 11.2089 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7ZM15 15H9C7.67392 15 6.40215 15.5268 5.46447 16.4645C4.52678 17.4021 4 18.6739 4 20V20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21H19C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20C20 18.6739 19.4732 17.4021 18.5355 16.4645C17.5979 15.5268 16.3261 15 15 15Z" stroke="#84B4FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <MyInput 
                style={{
                  width: '100%',
                  padding: '0px 8px',
                  borderStyle: 'none none solid none',
                  borderColor: '#AFADAD',
                  outlineStyle: 'none',
                  outlineBottom: 'solid #84B4FC 1px',
                  marginLeft: '24px'
                }}
                type="email"
                name="username" 
                placeholder="Enter Username"
                spl="login"
              />
            </div>
            <div
              style={{
                margin: '16px auto',
                display: 'flex',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 9V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V9M18 21H6C5.73478 21 5.48043 20.8946 5.29289 20.7071C5.10536 20.5196 5 20.2652 5 20V10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H18C18.2652 9 18.5196 9.10536 18.7071 9.29289C18.8946 9.48043 19 9.73478 19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21Z" stroke="#84B4FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <MyInput 
                style={{
                  width: '100%',
                  padding: '0px 8px',
                  borderStyle: 'none none solid none',
                  borderColor: '#AFADAD',
                  outline: 'none',
                  marginLeft: '24px'
                }}
                type="password" 
                name="password"
                placeholder="Enter Password"
                spl="login"
              />
            </div>
            <button
              style={{
                padding: '8px 18px',
                margin: '24px auto',
                backgroundColor: '#06245E',
                color: '#FFFFFF',
                fontWeight: 'bold'
              }}
              type="submit"
            >
              Next
              <svg style={{ width:'24px',  height:'12px', marginLeft: '40px' }}  viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12L28 6L22 0L20.586 1.414L24.172 5H0V7H24.172L20.586 10.586L22 12Z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <div
          style={{ 
            width: '480px', 
            margin: 'auto',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '100%',
              margin: '28px 0px',
              backgroundColor: (roleTmp === 'manage' ? '#0B42AB' : '#3E88F6'),
              display: 'flex',
              flexDirection: 'flex-start',
              cursor: 'pointer'
            }}
            onClick={() => setRoleTmp('manage')}
          >
            <div
              style={{ padding: '10px' }}
            >
              <img style={{ borderRadius: '8px' }} src="/imgs/site/manage-icon.png" alt="manage-icon"/>
            </div>
            <div
              style={{
                margin: '0px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center'
              }}
            >Đăng nhập qua tài khoản Cán bộ</div>
          </div>

          <div
            style={{
              width: '100%',
              margin: '28px 0px',
              backgroundColor: (roleTmp === 'student' ? '#0B42AB' : '#3E88F6'),
              display: 'flex',
              flexDirection: 'flex-start',
              cursor: 'pointer'
            }}
            onClick={() => setRoleTmp('student')}
          >
            <div
              style={{ padding: '10px' }}
            >
              <img style={{ borderRadius: '8px' }} src="/imgs/site/student-icon.png" alt="manage-icon"/>
            </div>
            <div
              style={{
                margin: '0px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center'
              }}
            >Đăng nhập qua tài khoản Sinh Viên</div>
          </div>

          <button
            style={{
              padding: '8px 18px',
              border: 'none',
              marginTop: '24px',
              backgroundColor: '#06245E',
              color: '#FFFFFF',
              fontWeight: 'bold',
              position: 'absolute',
              right: '0px'
            }}
            onClick={() => setRole(roleTmp)}
          >
            Next
            <svg style={{ width:'24px',  height:'12px', marginLeft: '40px' }}  viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12L28 6L22 0L20.586 1.414L24.172 5H0V7H24.172L20.586 10.586L22 12Z" fill="white"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Login;