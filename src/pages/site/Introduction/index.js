import { useState, useEffect } from "react";

import { useGetPost } from "./hooks";
import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import "./Responsive.css";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
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
        },
      }
    );
  }, []);

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>
      <div className="container_intro" style={{ margin: "42px 81.5px" }}>
        <div className="heading_place" style={{ margin: "10px 0" }}>
          <h2
            className="heading_content"
            style={{
              textAlign: "center",
              fontSize: "24px",
              color: "#0B42AB",
              fontWeight: "700",
            }}
          >
            KÝ TÚC XÁ ĐẠI HỌC TÔN ĐỨC THẮNG
          </h2>
          <p
            className="des_content"
            style={{
              margin: "0 202px",
              fontSize: "16px",
              color: "#0000000",
              fontWeight: "500",
            }}
          >
            Hệ thống Ký túc xá Đại học Tôn Đức Thắng gồm Ký túc xá Cơ sở Tân
            Phong, quận 7, Tp.HCM, Ký túc xá Cở sở Bảo Lộc và Ký túc xá Phân
            hiệu Nha Trang. Cung cấp 5831 chỗ ở cho sinh viên.
          </p>
        </div>
        <div
          className="banner_intro_list"
          style={{ display: "flex", margin: "30px 0" }}
        >
          <div className="banner_intro_item" style={{ marginLeft: "42px" }}>
            <img
              src={banner1}
              style={{
                width: "398px",
                height: "201px",
                margin: "10px 0 0 5px",
              }}
              alt="Ký túc xá cơ sở tân phong"
            ></img>
            <p
              className="heading_place"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0 0 0",
              }}
            >
              Ký túc xá Trường Đại học Tôn Đức Thắng cơ sở Tân Phong
            </p>
            <p className="heading_place" style={{ fontSize: "16px" }}>
              Gồm 04 khối nhà H, I, K và L. <br></br>
              Với tổng diện tích sàn xây dựng là 42.414 m&#xB2;
              <br></br>Phục vụ 4.772 chỗ ở cho sinh viên.
            </p>
          </div>
          <div className="banner_intro_item" style={{ marginLeft: "42px" }}>
            <img
              src={banner2}
              style={{
                width: "398px",
                height: "201px",
                margin: "10px 0 0 5px",
              }}
              alt="Ký túc xá cơ sở tân phong"
            ></img>
            <p
              className="heading_place"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0 0 0",
              }}
            >
              Ký túc xá Cơ sở Bảo Lộc
            </p>
            <p className="heading_place" style={{ fontSize: "16px" }}>
              Gồm 2 khối nhà cao 3 tầng hoàn thành và đưa vào sử dụng năm 2017
              <br></br>
              Phục vụ 429 chỗ ở cho sinh viên học tập tại Cơ sở.
            </p>
          </div>
          <div className="banner_intro_item" style={{ marginLeft: "42px" }}>
            <img
              src={banner3}
              style={{
                width: "398px",
                height: "201px",
                margin: "10px 0 0 5px",
              }}
              alt="Ký túc xá cơ sở tân phong"
            ></img>
            <p
              className="heading_place"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0 0 0",
              }}
            >
              Ký túc xá Phân hiệu Nha Trang
            </p>
            <p className="heading_place" style={{ fontSize: "16px" }}>
              Gồm 2 dãy nhà hoàn thành và đưa vào sử dụng năm 2008, phục vụ 200
              chỗ ở cho sinh viên.
              <br></br>
              Bên cạnh đó Ký túc xá mới đang trong quá trình thi công dự kiến
              phục vụ thêm 430 chỗ ở cho sinh viên đang theo học tại cơ sở.
            </p>
          </div>
        </div>
      </div>
      <MyFooter></MyFooter>
    </>
  );
}

export default Introduction;
