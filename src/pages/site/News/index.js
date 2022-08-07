import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import "./pagination.css";
import { useGetPost } from "./hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function News() {
  const [posts, setPosts] = useState(null);
  const [pagenum, setPageNum] = useState(1);
  const getPost = useGetPost();
  let arrNum = [];
  let arrre = [];
  let post1 = [];
  let post2 = [];
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
    var posttake = posts.slice(pagenum * 6 - 6, pagenum * 6);
    for (let i = 1; i <= posts.length / 6; i++) {
      arrNum.push(i);
    }
    if (posts.length / 6 > arrNum.length) {
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
    if (posttake) {
      posttake.forEach((value, index) => {
        if (index < posttake.length / 2) {
          post1.push(value);
        } else {
          post2.push(value);
        }
      });
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
            <div style={{ padding: "43px 55px 53px" }}>
              <div>
                <h1
                  style={{
                    borderBottom: "6px solid #A9CBFE ",
                    marginLeft: "20px",
                  }}
                >
                  Tin tức
                </h1>
              </div>

              <Row>
                {post1.map(({ id, banner, created_at, title }, index) => (
                  <Col sm={12} lg={4} md={4}>
                    <div
                      key={id}
                      style={{
                        display: "flex",

                        margin: "24px 20px",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={`/bai-viet/${id}`}>
                        <img
                          src={banner}
                          alt=""
                          style={{ width: "100%", height: "206px" }}
                        />
                      </Link>
                      <div>
                        <div
                          style={{
                            marginTop: "12px",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "48px",
                            width: "100%",
                            fontWeight: "700",
                            fontSize: "16px",
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
                            width: "100%",
                            minHeight: "57px",
                          }}
                        >
                          {created_at}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                {post2.map(({ id, banner, created_at, title }, index) => (
                  <Col sm={12} lg={4} md={4}>
                    <div
                      key={id}
                      style={{
                        display: "flex",

                        margin: "24px 20px",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={`/bai-viet/${id}`}>
                        <img
                          src={banner}
                          alt=""
                          style={{ width: "100%", height: "206px" }}
                        />
                      </Link>
                      <div>
                        <div
                          style={{
                            marginTop: "12px",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "48px",
                            width: "100%",
                            fontWeight: "700",
                            fontSize: "16px",
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
                            width: "100%",
                            minHeight: "57px",
                          }}
                        >
                          {created_at}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div
                className="pagination"
                style={{
                  margin: "8px 0",

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a onClick={goBackward}>&laquo;</a>
                <a
                  className={
                    pagenum >= arrNum.length + 1 ||
                    pagenum < 3 ||
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
                  className={
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
                    className={value === pagenum ? "active" : ""}
                  >
                    {value}
                  </a>
                ))}
                <a
                  className={
                    pagenum >= arrNum.length - 1 ||
                    (pagenum === 1 && arrNum.length < 4)
                      ? "none"
                      : ""
                  }
                >
                  ...
                </a>
                <a
                  className={
                    pagenum >= arrNum.length - 1 ||
                    (pagenum === 1 && arrNum.length < 4)
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

export default News;
