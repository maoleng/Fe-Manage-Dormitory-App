import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import jwt_decode from "jwt-decode";

import { MenuSVG } from '~/svg'

const paths = [
  {
    title: 'TRANG CHỦ',
    href: '/'
  },
  { 
    title: 'GIỚI THIỆU',
    'href': '/gioi-thieu'
  },
  { 
    title: 'THÔNG BÁO',
    'href': '/thong-bao'
  },
  { 
    title: 'TIN TỨC',
    'href': '/tin-tuc'
  },
  { 
    title: 'HOẠT ĐỘNG',
    'href': '/hoat-dong'
  },
  { 
    title: 'HƯỚNG DẪN',
    'href': '/huong-dan'
  },
  { 
    title: 'NỘI QUY',
    'href': '/noi-quy'
  }
];

function MyNavbar({ isSite }) {
  // console.log("Component: MyNavbar");

  const [token, setToken] = useState("");
  if ((window.localStorage.getItem("token") || "") !== token) {
    setToken(window.localStorage.getItem("token") || "");
  }
  const [navBarTop, setNavBarTop] = useState("0px");
  const [collapseShow, setCollapseShow] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const user = token && jwt_decode(token);
  const role = window.localStorage.getItem("role") || "";

  const navigate = useNavigate();
  
  const pathCurr = window.location.pathname.split('/')[1];

  function signOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
    navigate('/', { replace: true });
  }

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = collapseShow
      ? null
      : () => {
          const currentScrollPos = window.pageYOffset;

          if (prevScrollpos !== currentScrollPos) {
            setNavBarTop(prevScrollpos > currentScrollPos ? "0px" : "-100px");
          }

          prevScrollpos = currentScrollPos;
        };

    window.onresize = () => {
      setPageWidth(window.innerWidth)
    }
  }, [collapseShow]);

  return (
    <div
      style={{
        padding: "0px 16px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        position: "sticky",
        top: navBarTop,
        transition: "top .5s",
        zIndex: "999",
      }}
    >
      <div>
        <Link to="/">
          <img
            style={{ height: "50px", padding: "4px" }}
            src="/imgs/site/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      {isSite ? (
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {pageWidth < 1000
                  ? (
                    <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenMenu(true)}>
                      <MenuSVG style={{ width: '24px', height: '24px' }} />
                    </div>
                  )
                  : paths.map(({ title, href }, index) => (
                    <Link
                      style={{
                        padding: "4px 8px",
                        borderBottom:
                          href.slice(1) === pathCurr
                            ? "solid #0B42AB 2px"
                            : "none",
                        fontWeight: "bold",
                        color: href.slice(1) === pathCurr ? "#0B42AB" : "#000000",
                      }}
                      className="nav-link"
                      to={href}
                      key={index}
                    >
                      {title}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div>
              {user ? (
                <Dropdown align="end">
                  <span onClick={() => setCollapseShow(!collapseShow)}>
                    <Dropdown.Toggle
                      style={{
                        color: "#0B42AB",
                        backgroundColor: "#84B4FC",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "0px",
                        boxShadow: "none",
                      }}
                    >
                      {user.name}
                    </Dropdown.Toggle>
                  </span>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        style={{
                          color: "#000000",
                          textDecoration: "none",
                        }}
                        to={
                          role === "Quản lý kí túc xá"
                            ? "/quan-ly/don-dang-ky"
                            : "/sinh-vien/hop-dong"
                        }
                      >
                        Control Panel
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={signOut}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  style={{
                    padding: "8px 16px",
                    border: "solid #0B42AB 2px",
                    backgroundColor: "#FFFFFF",
                    textDecoration: "none",
                    color: "#0B42AB",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  to="/dang-nhap"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Dropdown align="end">
            <span onClick={() => setCollapseShow(!collapseShow)}>
              <Dropdown.Toggle
                style={{
                  color: "#0B42AB",
                  backgroundColor: "#84B4FC",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "0px",
                  boxShadow: "none",
                }}
              >
                {user.name}
              </Dropdown.Toggle>
            </span>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  style={{
                    color: "#000000",
                    textDecoration: "none",
                  }}
                  to={
                    role === "Quản lý kí túc xá"
                      ? "/quan-ly/don-dang-ky"
                      : "/sinh-vien/hop-dong"
                  }
                >
                  Control Panel
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={signOut}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {isOpenMenu && (
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '9999'
          }}
        >
          <div style={{ padding: '0px 20px', display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{ fontSize: '40px', cursor: 'pointer' }} onClick={() => setIsOpenMenu(false)}>
              X
            </div>
          </div>

          {paths.map(({ title, href }, index) => (
            <div key={index}>
              <Link
                style={{
                  width: '100%',
                  padding: "4px 8px",
                  // borderBottom:
                  //   href.slice(1) === pathCurr
                  //     ? "solid #0B42AB 2px"
                  //     : "none",
                  fontWeight: "bold",
                  color: href.slice(1) === pathCurr ? "#0B42AB" : "#000000",
                }}
                className="nav-link"
                to={href}
              >
                {title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNavbar;
