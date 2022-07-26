import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import { useGetPost, useGetPostRelated } from "./hooks";

function categoryMapping(category) {
  switch (category) {
    case 'Giới thiệu': return '1'; 
    case 'Thông báo': return '2'; 
    case 'Tin tức': return '3'; 
    case 'Hoạt động': return '4'; 
    case 'Hướng dẫn': return '5'; 
    default: return '1';
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
            { category: categoryMapping(data.data.post.category), id: data.data.post.id },
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
            <div style={{ margin: "0 10%" }} className="relativepost">
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
                      margin: "0 12px",
                      height: "39px",
                      backgroundColor: "#A9CBFE",
                      padding: "10px",
                    }}
                  >
                    <p
                      style={{
                        color: "#0B42AB",
                        margin: "0",
                        fontSize: "16px",
                        height: "19px",
                        lineHeight: "19px",
                      }}
                    >
                      {post.post.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1>Đây là dữ liệu các bài viết liên quan</h1>
            <div>
              {!postsRelated 
                ? <>Loading</> 
                : postsRelated.length === 0 
                ? (
                  <>Không có bài viết liên quan</>
                ) 
                : (
                  <>
                    chọc từ biến postsRelated ra, hiện chưa biết dữ liệu mẫu ra sao
                  </>
                )
              }
            </div>
          </div>

          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default PostDetail;
