import { useState, useEffect } from 'react';

import { useGetPost } from "./hooks";
import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";

function Introduction() {
  console.log("Page: Introduction");

  const getPost = useGetPost();
  
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPost.mutate(
      {},
      {
        onSuccess(data) {
          console.log(data.data);
          setPosts(data.data);
        }
      }
    );
  }, []);

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      <div>Tương tự mấy trang kia</div>
      {!posts 
        ? (
          <div>Loading...</div>
        )
        : posts.length === 0
          ? (
            <div>Chưa có dữ liệu mẫu</div>
          )
          : (
            <div>Lấy dữ liệu từ biến posts</div>
          )}

      <MyFooter></MyFooter>
    </>
  );
}

export default Introduction;