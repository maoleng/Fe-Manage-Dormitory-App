import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";

import { useGetPost } from "./hooks";
import "./pagination.css";
import { notifyManager } from "react-query";

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
          <div style={{ padding: "43px 55px 53px" }}>
            <div>
              <h1
                style={{
                  borderBottom: "6px solid #A9CBFE ",
                }}
              >
                Thông báo
              </h1>
            </div>
            <div
              style={{
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 25%",
              }}
            >
              {posttake.map(({ id, banner, created_at, title }) => (
                <div key={id} style={{ display: "flex", margin: "20px" }}>
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
                        minHeight: "48px",
                        minWidth: "518px",
                        maxWidth: "518px",
                        fontWeight: "700",
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
                        minHeight: "48px",
                        minWidth: "518px",
                        maxWidth: "518px",
                      }}
                    >
                      {created_at}
                    </div>
                  </div>
                </div>
              ))}
              <div class="pagination">
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
          </div>
          <MyFooter></MyFooter>
        </div>
      )}
    </>
  );
}

export default Notification;
