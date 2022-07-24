import { useState, useEffect } from "react";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";

import { useGetPost } from "./hooks";
import "./pagination.css";

function Notification() {
  const [posts, setPosts] = useState(null);
  const [pagenum, setPageNum] = useState(1);
  const getPost = useGetPost();
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
              {posttake.map(({ id, banner, created_at, title }, index) => (
                <div key={id} style={{ display: "flex", margin: "20px" }}>
                  <img
                    src={banner}
                    alt=""
                    style={{ width: "116px", height: "83px" }}
                  />
                  <div style={{ marginLeft: "24px" }}>
                    <div
                      style={{
                        display: "-webkit-box",
                        webkitLineClamp: "2",
                        webkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "48px",
                        minWidth: "279.34px",
                        maxWidth: "279.34px",
                        fontWeight: "700",
                      }}
                    >
                      {title}
                    </div>
                    <div>{created_at}</div>
                  </div>
                </div>
              ))}
              <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="#" class="active">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a>...</a>
                <a href="#">6</a>
                <a href="#">&raquo;</a>
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
