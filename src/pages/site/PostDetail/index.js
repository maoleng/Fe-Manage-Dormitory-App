import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import { useGetPost, useGetPostRelated } from "./hooks";

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

  const { id } = useParams();
  const getPost = useGetPost();
  const getPostRelated = useGetPostRelated();

  const [post, setPost] = useState(null);
  const [postsRelated, setPostsRelated] = useState(null);

  useEffect(() => {
    getPost.mutate(
      { id },
      {
        onSuccess(data) {
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
          <div style={{ margin: "20px 115px", display: "flex" }}>
            <div className="post_detail" style={{ width: "50%" }}>
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
            </div>
            <div
              style={{
                margin: "0 10%",
                display: "flex",
                flexDirection: "column",
              }}
              className="relativepost"
            >
              {/* {post.tags.map(({ id, name, color }, index) => (
                <div style={{ color: color }} key={id + "_" + index}>
                  {name}
                </div>
              ))} */}
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
                <div className="category-content" style={{ margin: "12px 0" }}>
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
                    {postsRelated.map((post) => (
                      <div
                        className="post_Related_item"
                        id={post.id}
                        style={{ display: "flex", margin: "23px 0" }}
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
                          <div className="post_time">{post.created_at}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default PostDetail;
