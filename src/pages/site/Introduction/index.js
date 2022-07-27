import { useState, useEffect } from "react";

import { useGetPost } from "./hooks";
import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import "./Responsive.css";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
import H_I from "./H_I.png";
import K_L from "./K_L.png";
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
            <p
              className="heading_place"
              style={{ fontSize: "16px", width: "100%" }}
            >
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
            <p
              className="heading_place"
              style={{ fontSize: "16px", width: "100%" }}
            >
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
            <p
              className="heading_place"
              style={{ fontSize: "16px", width: "100%" }}
            >
              Gồm 2 dãy nhà hoàn thành và đưa vào sử dụng năm 2008, phục vụ 200
              chỗ ở cho sinh viên.
              <br></br>
              Bên cạnh đó Ký túc xá mới đang trong quá trình thi công dự kiến
              phục vụ thêm 430 chỗ ở cho sinh viên đang theo học tại cơ sở.
            </p>
          </div>
        </div>
        <div
          className="main_heading_place"
          style={{ display: "flex", margin: "42px 0 42px 30px" }}
        >
          <div className="about_place_item" style={{ margin: "0 15px" }}>
            <div
              className="about_place_heading"
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              KÝ TÚC XÁ CƠ SỞ TÂN PHONG
            </div>
            <div className="about_place_des">
              Ký túc xá Trường đại học Tôn Đức Thắng cơ sở Tân Phong gồm 04 tòa
              nhà: Nhà H, I cao 10 tầng. Nhà K, L cao 20 tầng
            </div>
            <div className="about_place_prob">
              <p className="prob-item" style={{ fontSize: "16px" }}>
                <br></br>
                <span style={{ fontWeight: "500" }}>Cơ chế hoạt động:</span>
                <br></br>
                Tự chủ tài chính, tự cân đối thu chi
              </p>
              <p className="prob-item" style={{ fontSize: "16px" }}>
                <span style={{ fontWeight: "500" }}>Phương châm: </span>
                <br></br>
                Nề nếp, văn minh, hiệu quả, an toàn, bền vững, lâu dài;
              </p>
              <p className="prob-item" style={{ fontSize: "16px" }}>
                <span style={{ fontWeight: "500" }}>Tiêu chí: </span>
                <br></br>
                Phục vụ người học, tạo điều kiện tốt nhất trong ăn ở, sinh hoạt
                và học tập cho sinh viên ở nội trú. Bổ sung cho các hoạt động
                chính của Trường, góp phần thực hiện tốt mục tiêu và nhiệm vụ
                đào tạo của Nhà trường.
              </p>
            </div>
          </div>
          <div className="tags_about_place_container">
            <div className="about_place_item">
              <div
                className="about_H_I_place"
                style={{
                  display: "flex",
                  backgroundColor: "#1C63EE",
                }}
              >
                <img
                  src={H_I}
                  alt="tòa H_I"
                  style={{
                    width: "214px",
                    height: "111px",
                    display: "inline-block",
                    margin: "12px",
                  }}
                ></img>
                <p
                  className="content_place"
                  style={{
                    width: "421px",
                    padding: "26.5px 10px 26.5px 0",
                    color: "#fff",
                  }}
                >
                  Trong đó khu nhà H và I cao 10 tầng, diện tích sàn xây dựng là
                  15.994 m&#xB2;, hoàn thành và đưa vào sử dụng từ tháng
                  12/2010. Phục vụ 2.196 chỗ ở cho sinh viên.
                </p>
              </div>
            </div>
            <div className="about_place_item" style={{ margin: "10px 0" }}>
              <div
                className="about_H_I_place"
                style={{
                  display: "flex",
                  backgroundColor: "#0B42AB",
                }}
              >
                <p
                  className="content_place"
                  style={{
                    width: "421px",
                    margin: "5% 16px",
                    color: "#fff",
                  }}
                >
                  Khu nhà K, L cao 20 tầng, diện tích sàn xây dựng là 26.420
                  m&#xB2;, hoàn thành và đưa vào sử dụng từ tháng 8/2019. Phục
                  vụ thêm 2.576 chỗ ở: trong đó có 560 chỗ ở dành cho nghiên cứu
                  sinh, học viên sinh viên quốc tế tham gia chương trình học
                  tập, trao đổi ngắn hạn. Phòng ở dành cho sinh viên quốc tế đạt
                  tiêu chuẩn về tiện nghi và chất lượng phục vụ, có 112 phòng 4
                  giường và 56 phòng 2 giường.
                </p>
                <img
                  src={K_L}
                  alt="tòa H_I"
                  style={{
                    width: "214px",
                    height: "111px",
                    lineHeight: "19px",
                    margin: "10% 12px 10% 0",
                    display: "inline-block",
                  }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter></MyFooter>
    </>
  );
}

export default Introduction;
