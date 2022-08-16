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
    getPost.mutate(
      { id: idCurr },
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
              },
            }
          );
        },
      }
    );
  }, []);

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
                                <img
                                  src={post.banner}
                                  alt="Hinh_anh"
                                  style={{ width: "92px", height: "65px" }}
                                ></img>
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
    </>
  );
}

export default PostDetail;
