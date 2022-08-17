import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./responsive.css";
import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import { useGetPost, useGetPostRelated } from "./hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function categoryMapping(category) {
  switch (category) {
    case "Giới thiệu":
      return "1";
    case "Thông báo":
      return "2";
    case "Tin tức":
      return "3";
    case "Hoạt động":
      return "4";
    case "Hướng dẫn":
      return "5";
    default:
      return "1";
  }
}

function PostDetail() {
  console.log("Page: PostDetail");

  const { idCurr } = useParams();
  const getPost = useGetPost();
  const getPostRelated = useGetPostRelated();

  console.log("id:", idCurr);

  const [loading, setLoading] = useState(false);
  const [newId, setNewId] = useState(null);
  const [post, setPost] = useState(null);
  const [postsRelated, setPostsRelated] = useState(null);
  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }
  function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }
  useEffect(() => {
    setLoading(true);
    getPost.mutate(
      { id: newId || idCurr },
      {
        onSuccess(data) {
          console.log(data);
          setPost(data.data);

          getPostRelated.mutate(
            {
              category: categoryMapping(data.data.post.category),
              id: data.data.post.id,
            },
            {
              onSuccess(data) {
                setPostsRelated(data.data);
                setLoading(false);
              },
            }
          );
        },
      }
    );
  }, [newId]);

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      {!post ? (
        <>Loading...</>
      ) : (
        <>
          <Container fluid>
            <Row
              className="big_row"
              style={{ margin: "20px 115px", display: "flex" }}
            >
              <Col
                className="post_detail"
                style={{}}
                sm={12}
                md={post.post.category !== "Hướng dẫn" ? 7 : 12}
                lg={post.post.category !== "Hướng dẫn" ? 7 : 12}
              >
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "29px",
                  }}
                >
                  {post.post.title}
                </div>
                <div style={{ margin: "12px 0px" }}>{post.post.created_at}</div>
                <div
                  style={{ margin: "12px 0px" }}
                  dangerouslySetInnerHTML={{ __html: post.post.content }}
                ></div>
              </Col>
              {post.post.category !== "Hướng dẫn" ? (
                <Col
                  sm={12}
                  md={5}
                  lg={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="relativepost"
                >
                  <div className="category">
                    <div
                      className="category-heading"
                      style={{
                        borderBottom: "#0B42AB solid 3px",
                        width: "100%",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        Thể loại
                      </h1>
                    </div>
                    <div
                      className="category-content"
                      style={{ margin: "12px 0" }}
                    >
                      <div
                        style={{
                          marginBottom: "10px",
                          height: "39px",
                          marginLeft: "32px",
                          textAlign: "center",
                          backgroundColor: "#A9CBFE",
                          padding: "10px",
                          display: "inline-block",
                        }}
                      >
                        <p
                          style={{
                            color: "#0B42AB",
                            margin: "0",
                            fontSize: "16px",
                            height: "19px",
                            lineHeight: "19px",
                            textAlign: "center",
                          }}
                        >
                          {post.post.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="Related_Post">
                    <div
                      className="Related_Post_heading"
                      style={{
                        width: "100%",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "24px",
                          borderBottom: "#0B42AB solid 3px",
                        }}
                      >
                        Các bài viết liên quan
                      </h1>
                      <div className="post_related_container">
                        {postsRelated
                          ? postsRelated.map((post) => (
                              <div
                                className="post_Related_item"
                                key={post.id}
                                style={{
                                  display: "flex",
                                  margin: "23px 32px",
                                }}
                              >
                                <Link to={`/bai-viet/${post.id}`}>
                                  <img
                                    src={post.banner}
                                    alt="Hinh_anh"
                                    style={{ width: "92px", height: "65px" }}
                                    onClick={() => setNewId(post.id)}
                                  ></img>
                                </Link>
                                <div
                                  className="post_description"
                                  style={{ margin: "0 21px" }}
                                >
                                  <div
                                    className="post_title"
                                    style={{
                                      marginBottom: "6px",
                                      display: "-webkit-box",
                                      WebkitLineClamp: "1",
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {post.title}
                                  </div>
                                  <div className="post_time">
                                    {post.created_at}
                                  </div>
                                </div>
                              </div>
                            ))
                          : console.log("error")}
                      </div>
                    </div>
                  </div>
                  <div className="Tags_Place">
                    <div
                      className="Related_Post_heading"
                      style={{
                        width: "100%",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "24px",
                          borderBottom: "#0B42AB solid 3px",
                        }}
                      >
                        Thẻ
                      </h1>
                      <div className="Tags_Container">
                        {!post ? (
                          <></>
                        ) : (
                          post.tags.map(({ id, name, color }, index) => (
                            <div
                              className="Tags_Item"
                              key={id}
                              style={{
                                display: "inline-block",
                                margin: "8px 8px 8px 32px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: color,
                                  padding: "10.5px 12px",
                                  color: invertColor(color, "#FFFFFF"),
                                  fontSize: "16px",
                                  lineHeight: "19px",
                                  fontWeight: "700",
                                }}
                              >
                                {name}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              ) : (
                console.log("Ko in")
              )}
            </Row>
          </Container>
          <MyFooter></MyFooter>
        </>
      )}

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

export default PostDetail;
