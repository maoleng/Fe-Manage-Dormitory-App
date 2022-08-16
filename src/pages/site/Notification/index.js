import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import "./Responsive.css";
import { useGetPost } from "./hooks";
import "./pagination.css";
import { notifyManager } from "react-query";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Notification() {
  const [posts, setPosts] = useState(null);
  const [pagenum, setPageNum] = useState(1);
  const getPost = useGetPost();
  let arrNum = [];
  let arrre = [];
  let goForward = () => {
    if (!(pagenum === arrNum.length)) {
      setPageNum(pagenum + 1);
    }
  };
  let goBackward = () => {
    if (pagenum >= 2) {
      setPageNum(pagenum - 1);
    }
  };
  useEffect(() => {
    getPost.mutate(
      {},
      {
        onSuccess(data) {
          setPosts(data.data);
        },
      }
    );
  }, []);
  if (posts) {
    var posttake = posts.slice(pagenum * 7 - 7, pagenum * 7);
    for (let i = 1; i <= posts.length / 7; i++) {
      arrNum.push(i);
    }
    if (posts.length / 7 > arrNum.length) {
      arrNum.push(arrNum[arrNum.length - 1] + 1);
    }
    if (pagenum <= 2) {
      arrre = [1, 2, 3];
    } else {
      if (pagenum === arrNum.length) {
        arrre = [pagenum - 2, pagenum - 1, pagenum];
      } else {
        arrre = [pagenum - 1, pagenum, pagenum + 1];
      }
    }
  }
  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      {!posts ? (
        <>Loading...</>
      ) : (
        <div>
          <Container fluid>
            <div
              className="large_container"
              style={{ padding: "43px 55px 53px" }}
            >
              <div>
                <h1
                  style={{
                    borderBottom: "6px solid #A9CBFE ",
                  }}
                >
                  Thông báo
                </h1>
              </div>
              <Row
                style={{
                  margin: "20px",
                }}
              >
                {posttake.map(({ id, banner, created_at, title }) => (
                  <Col
                    sm={12}
                    md={12}
                    lg={{ span: 8, offset: 4 }}
                    key={id}
                    style={{ display: "flex", marginBottom: "20px" }}
                  >
                    <Link to={`/bai-viet/${id}`}>
                      <img
                        src={banner}
                        alt=""
                        style={{ width: "116px", height: "83px" }}
                      />
                    </Link>
                    <div style={{ marginLeft: "24px" }}>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontWeight: "700",
                          marginBottom: "8px",
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {created_at}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div
                class="pagination"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a onClick={goBackward}>&laquo;</a>
                <a
                  class={
                    pagenum >= arrNum.length + 1 ||
                    pagenum < 4 ||
                    arrNum.length < 4
                      ? "none"
                      : ""
                  }
                  onClick={() => {
                    setPageNum(1);
                  }}
                >
                  1
                </a>
                <a
                  class={
                    pagenum >= arrNum.length + 1 ||
                    pagenum < 4 ||
                    arrNum.length < 4
                      ? "none"
                      : ""
                  }
                >
                  ...
                </a>
                {arrre.map((value, key) => (
                  <a
                    id={key}
                    onClick={() => {
                      setPageNum(value);
                    }}
                    class={value === pagenum ? "active" : ""}
                  >
                    {value}
                  </a>
                ))}
                <a
                  class={
                    pagenum >= arrNum.length - 1 ||
                    (pagenum == 1 && arrNum.length < 4)
                      ? "none"
                      : ""
                  }
                >
                  ...
                </a>
                <a
                  class={
                    pagenum >= arrNum.length - 1 ||
                    (pagenum == 1 && arrNum.length < 4)
                      ? "none"
                      : ""
                  }
                  onClick={() => {
                    setPageNum(arrNum[arrNum.length - 1]);
                  }}
                >
                  {arrNum[arrNum.length - 1]}
                </a>
                <a onClick={goForward}>&raquo;</a>
              </div>
            </div>
          </Container>
          <MyFooter></MyFooter>
        </div>
      )}
    </>
  );
}

export default Notification;
