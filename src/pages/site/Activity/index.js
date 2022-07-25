import { useState, useEffect } from "react";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";

import { useGetPost } from "./hooks";
import "./pagination.css";
function Activity() {
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
                  marginLeft: "20px",
                }}
              >
                Hoạt động
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                paddingLeft: "48px",
              }}
            >
              {posttake.map(({ id, banner, created_at, title }, index) => (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    margin: "24px 20px",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={banner}
                    alt=""
                    style={{ width: "395px", height: "206px" }}
                  />
                  <div style={{ maxWidth: "33.333333333333%" }}>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "-webkit-box",
                        webkitLineClamp: "2",
                        webkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "48px",
                        width: "395px",
                        fontWeight: "700",
                        fontSize: "16px",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        display: "-webkit-box",
                        webkitLineClamp: "2",
                        webkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "57px",
                        width: "395px",
                      }}
                    >
                      {created_at}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="pagination" style={{ marginLeft: "37.5%" }}>
              <a onClick={goBackward}>&laquo;</a>
              <a
                class={
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
                  (pagenum === 1 && arrNum.length < 4)
                    ? "none"
                    : ""
                }
              >
                ...
              </a>
              <a
                class={
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
          <MyFooter></MyFooter>
        </div>
      )}
    </>
  );
}

export default Activity;
