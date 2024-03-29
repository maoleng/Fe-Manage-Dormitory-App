import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { useStore, actions } from "~/store";

import { useGetPosts } from "./hooks";

import MyNavbar from "~/components/MyNavbar";
import MySidebar from "~/components/MySidebar";
import MyTable from "~/components/MyTable";

function Post() {
  // console.log("Page: Post");

  const [state, dispatch] = useStore();
  const getPosts = useGetPosts();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPosts.mutate(
      {},
      {
        onSuccess(data) {
          setPosts(data.data);
          setLoading(false);
        },
      }
    );
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", userSelect: "none" }}
      >
        <div>
          <svg
            style={{
              width: "24px",
              height: "24px",
              margin: "0px 16px",
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))
            }
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z"
              fill="#06245E"
            />
          </svg>
        </div>
        <div style={{ width: "100%" }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            padding: '20px',
            width: "100%",
          }}
        >
          <div>
            <button
              style={{
                marginTop: "12px",
                marginLeft: "2%",
                borderRadius: "4px",
                border: "1px #0B42AB solid",
                backgroundColor: " #0B42AB",
                color: "#FFFFFF",
                padding: "4px",
              }}
              onClick={() => navigate('/quan-ly/bai-dang/tao-them')}
            >
              Thêm bài viết
            </button>
          </div>

          {posts === null ? (
            <>Loading...</>
          ) : (
            <>
              <MyTable
                forms={posts.map(
                  ({
                    id,
                    title,
                    teacher_name,
                    created_at,
                    updated_at,
                    category,
                    tags,
                  }) => ({
                    id: {
                      title: "ID",
                      content: "" + id,
                    },
                    title: {
                      title: "Tiêu đề",
                      content: title,
                    },
                    teacher_name: {
                      title: "Người đăng",
                      content: teacher_name,
                    },
                    created_at: {
                      title: "Ngày tạo",
                      content: created_at,
                    },
                    updated_at: {
                      title: "Ngày chỉnh",
                      content: updated_at,
                    },
                    category: {
                      title: "Thể loại",
                      content: category,
                    },
                    tags: {
                      title: "Thẻ",
                      content: (
                        <div
                          style={{
                            width: "100%",
                            minHeight: "32px",
                            padding: "8px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {tags.map(({ name, color }, index) => (
                            <div style={{ padding: "1px", backgroundColor: color }} key={index}>
                              {name}
                            </div>
                          ))}
                        </div>
                      ),
                    },
                    controls: {
                      title: "",
                      content: (
                        <>
                          <Link to={`/quan-ly/bai-dang/chinh-sua/${id}`}>
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                cursor: "pointer",
                              }}
                              onClick={() => {}}
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000"
                                stroke="none"
                              >
                                <path
                                  d="
                                  M4325 5100 c-98 -11 -199 -51 -280 -113 -57 -43 -2322 -2306 -2345
                                  -2342 -23 -38 -321 -1106 -322 -1156 -1 -75 56 -132 131 -131 49 1 1119 299
                                  1156 322 17 11 546 536 1177 1167 830 831 1157 1166 1187 1212 67 105 83 160
                                  89 296 4 110 2 126 -23 200 -14 44 -44 107 -65 140 -47 72 -255 279 -325 322
                                  -104 65 -249 97 -380 83z m200 -289 c34 -15 84 -57 167 -139 141 -142 163
                                  -180 163 -292 0 -103 -28 -161 -133 -270 l-81 -85 -298 297 -298 298 45 46
                                  c129 132 214 177 320 171 38 -2 86 -13 115 -26z m-1002 -1903 l-928 -928 -297
                                  297 -298 298 927 927 928 928 297 -297 298 -298 -927 -927z m-1193 -1049 c0
                                  -6 -622 -180 -627 -176 -1 2 37 145 85 320 l87 317 228 -228 c125 -125 227
                                  -229 227 -233z
                                "
                                />
                                <path
                                  d="
                                  M500 4594 c-227 -48 -427 -242 -485 -469 -13 -52 -15 -280 -15 -1820
                                  0 -1748 0 -1761 21 -1835 57 -208 229 -381 444 -447 57 -17 144 -18 1965 -18
                                  l1905 0 80 28 c102 36 179 83 250 153 97 96 163 222 184 354 7 40 11 294 11
                                  665 0 581 -1 601 -20 633 -42 69 -120 90 -181 49 -71 -47 -69 -23 -69 -696 0
                                  -674 1 -659 -69 -762 -21 -29 -62 -70 -92 -91 -106 -74 52 -68 -2021 -66
                                  l-1863 3 -62 29 c-82 37 -161 120 -194 201 l-24 60 -3 1705 c-2 1246 0 1721 8
                                  1765 24 121 97 215 210 269 l65 31 630 5 c595 5 632 6 661 24 89 54 84 185 -9
                                  229 -32 15 -95 17 -649 16 -484 0 -627 -4 -678 -15z
                                "
                                />
                              </g>
                            </svg>
                          </Link>
                        </>
                      ),
                    },
                  })
                )}
              ></MyTable>
            </>
          )}
        </div>
      </div>

      <Modal
        size="lg"
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ padding: "80px" }}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Chọn cách để tạo bài viết
          </div>

          <div style={{ width: "100%", height: "20px" }}></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "80px",
            }}
          >
            <div
              style={{
                padding: "20px",
                border: "solid #84B4FC 1px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <Link
                style={{ color: "#000000", textDecoration: "none" }}
                to="/quan-ly/bai-dang/tao-them"
              >
                <div>
                  <img
                    style={{ width: "100px" }}
                    src="/imgs/site/create-post-1.png"
                    alt=""
                  />
                </div>
                <div style={{ width: "100%", height: "20px" }}></div>
                Tạo bài viết
              </Link>
            </div>
            <div
              style={{
                padding: "20px",
                border: "solid #84B4FC 1px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <Link style={{ color: "#000000", textDecoration: "none" }} to="#">
                <div>
                  <img
                    style={{ width: "100px" }}
                    src="/imgs/site/create-post-2.png"
                    alt=""
                  />
                </div>
                <div style={{ width: "100%", height: "20px" }}></div>
                tải lên từ file
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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

export default Post;
