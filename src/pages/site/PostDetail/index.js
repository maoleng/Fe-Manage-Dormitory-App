import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import { useGetPost } from './hooks';

function PostDetail() {
  console.log("Page: PostDetail");

  const { id } = useParams();
  const getPost = useGetPost();

  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost.mutate(
      { id },
      {
        onSuccess(data) {
          console.log(data.data);
          setPost(data.data);
        }
      }
    )
  }, []);

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      {!post 
        ? <>Loading...</> 
        : (
          <>
            <div>
              <img
                src={post.post.banner}
                alt=""
                style={{ width: "395px", height: "206px" }}
              />
              <div style={{ margin: '12px 0px' }}>{post.post.title}</div>
              <div style={{ margin: '12px 0px' }}>{post.post.category}</div>
              <div style={{ margin: '12px 0px' }}>{post.post.created_at}</div>
              <div style={{ margin: '12px 0px' }} dangerouslySetInnerHTML={{ __html: post.post.content }}></div>
              <div style={{ margin: '12px 0px' }}>
                {post.tags.map(({ id, name, color }, index) => (
                  <div style={{ color: color }} key={id + '_' + index}>{name}</div>
                ))}
              </div>
            </div>
      
            <MyFooter></MyFooter>
          </>
        )
      }
    </>
  );
}

export default PostDetail;