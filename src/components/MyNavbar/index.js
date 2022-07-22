import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import jwt_decode from "jwt-decode";

const paths = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Test",
    href: "/test",
  },
];

const pathCurr = window.location.pathname.split("/")[1];

function MyNavbar({ isSite }) {
  console.log("Component: MyNavbar");

  const [token, setToken] = useState("");
  if ((window.localStorage.getItem("token") || "") !== token) {
    setToken(window.localStorage.getItem("token") || "");
  }
  const [navBarTop, setNavBarTop] = useState("0px");
  const [collapseShow, setCollapseShow] = useState(false);

  const user = token && jwt_decode(token);
  const role = window.localStorage.getItem("role") || "";

  const navigate = useNavigate();

  function signOut() {
    console.log("ok");
    window.localStorage.removeItem("token");
    navigate("/", { replace: true });
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
                {paths.map(({ title, href }, index) => (
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
                ))}
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
    </div>
  );
}

export default MyNavbar;
