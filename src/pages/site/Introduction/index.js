import { useState, useEffect } from "react";

import { useGetPost } from "./hooks";
import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import "./Responsive.css";
import CarouselIntro from "~/components/CarouselforIntro";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
import H_I from "./H_I.png";
import K_L from "./K_L.png";
import utility1 from "./utility1.png";
import utility2 from "./utility2.png";
import utility3 from "./utility3.png";
import building1 from "./building1.png";
import building2 from "./building2.png";
import building3 from "./building3.png";
import building4 from "./building4.png";
import building5 from "./building5.png";
import building6 from "./building6.png";
import building7 from "./building7.png";
import Component1 from "./Component1.png";
import Component2 from "./Component2.png";
import Component3 from "./Component3.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
              margin: "0 17%",
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
        <Container fluid>
          <Row className="banner_intro_list" style={{ margin: "30px 0" }}>
            <Col
              className="banner_intro_item"
              style={{}}
              xs={12}
              md={12}
              lg={4}
            >
              <img
                src={banner1}
                style={{
                  width: "100%",
                  display: "block",
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
            </Col>
            <Col
              className="banner_intro_item"
              style={{}}
              xs={12}
              md={12}
              lg={4}
            >
              <img
                src={banner2}
                style={{
                  width: "100%",
                  display: "block",
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
            </Col>
            <Col
              className="banner_intro_item"
              style={{}}
              xs={12}
              md={12}
              lg={4}
            >
              <img
                src={banner3}
                style={{
                  width: "100%",
                  display: "block",
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
                Gồm 2 dãy nhà hoàn thành và đưa vào sử dụng năm 2008, phục vụ
                200 chỗ ở cho sinh viên.
                <br></br>
                Bên cạnh đó Ký túc xá mới đang trong quá trình thi công dự kiến
                phục vụ thêm 430 chỗ ở cho sinh viên đang theo học tại cơ sở.
              </p>
            </Col>
          </Row>

          <Row
            className="main_heading_place"
            style={{ margin: "42px 0 42px 30px" }}
          >
            <Col className="about_place_item" style={{}} xs={12} md={12} lg={6}>
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
                Ký túc xá Trường đại học Tôn Đức Thắng cơ sở Tân Phong gồm 04
                tòa nhà: Nhà H, I cao 10 tầng. Nhà K, L cao 20 tầng
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
                  Phục vụ người học, tạo điều kiện tốt nhất trong ăn ở, sinh
                  hoạt và học tập cho sinh viên ở nội trú. Bổ sung cho các hoạt
                  động chính của Trường, góp phần thực hiện tốt mục tiêu và
                  nhiệm vụ đào tạo của Nhà trường.
                </p>
              </div>
            </Col>
            <Col className="tags_about_place_container" xs={12} md={12} lg={6}>
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
                    Trong đó khu nhà H và I cao 10 tầng, diện tích sàn xây dựng
                    là 15.994 m&#xB2;, hoàn thành và đưa vào sử dụng từ tháng
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
                    vụ thêm 2.576 chỗ ở: trong đó có 560 chỗ ở dành cho nghiên
                    cứu sinh, học viên sinh viên quốc tế tham gia chương trình
                    học tập, trao đổi ngắn hạn. Phòng ở dành cho sinh viên quốc
                    tế đạt tiêu chuẩn về tiện nghi và chất lượng phục vụ, có 112
                    phòng 4 giường và 56 phòng 2 giường.
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
            </Col>
          </Row>
          <div className="container_utility" style={{ marginBottom: "40px" }}>
            <p
              className="utility_heading"
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              CÁC TIỆN ÍCH TẠI KÝ TÚC XÁ
            </p>
            <p
              className="des_content"
              style={{
                margin: "0 17%",
                fontSize: "16px",
                color: "#000000",
              }}
            >
              Công trình Ký túc xá được xây dựng với thiết kế kiến trúc đẹp,
              hiện đại, hài hòa, phù hợp với kiến trúc tổng thể của Trường đại
              học Tôn Đức Thắng.
              <br></br>
              Nhằm mục đích phục vụ tốt nhất cho sinh viên, bên trong Ký túc xá
              các hạng mục công trình tiện ích được đưa vào sử dụng như
            </p>
            <Row
              className="utility_list"
              style={{ display: "flex", margin: "12px 0", flexWrap: "wrap" }}
            >
              <Col
                xs={12}
                md={12}
                lg={{ span: 2, offset: 3 }}
                className="utility_item"
                style={{}}
              >
                <div className="utility_image" style={{}}>
                  <img
                    src={utility1}
                    alt="Siêu thị mini"
                    style={{
                      width: "77px",
                      height: "77px",
                      margin: "16px auto 0 auto",
                      display: "block",
                    }}
                  ></img>
                </div>
                <div
                  className="utility_display"
                  style={{
                    margin: "16px 0",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <p>Siêu thị mini</p>
                </div>
              </Col>
              <Col xs={12} md={12} lg={2} className="utility_item" style={{}}>
                <div className="utility_image" style={{}}>
                  <img
                    src={utility2}
                    alt="Phòng giặt"
                    style={{
                      width: "77px",
                      height: "77px",
                      margin: "16px auto 0 auto",
                      display: "block",
                    }}
                  ></img>
                </div>
                <div
                  className="utility_display"
                  style={{
                    margin: "16px 0",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <p>Phòng giặt</p>
                </div>
              </Col>
              <Col xs={12} md={12} lg={2} className="utility_item" style={{}}>
                <div className="utility_image" style={{}}>
                  <img
                    src={utility3}
                    alt="Canteen"
                    style={{
                      width: "77px",
                      height: "77px",
                      margin: "16px auto 0 auto",
                      display: "block",
                    }}
                  ></img>
                </div>
                <div
                  className="utility_display"
                  style={{
                    margin: "16px 0",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  <p>Canteen</p>
                </div>
              </Col>
            </Row>
          </div>
          <div className="building_container">
            <p
              className="building_heading"
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "20px",
                margin: "0",
              }}
            >
              CÁC HẠNG MỤC CÔNG TRÌNH
            </p>
            <p
              className="des_content"
              style={{
                margin: "0 17%",
                fontSize: "16px",
                color: "#000000",
                textAlign: "center",
              }}
            >
              Xung quanh khuôn viên ký túc xá
            </p>
            <div className="building_grid" style={{ margin: "12px 0%" }}>
              <Row className="building_row" style={{}}>
                <Col
                  className="building_item"
                  xs={12}
                  md={12}
                  lg={{ span: 2, offset: 2 }}
                >
                  <div className="building_image" style={{}}>
                    <img
                      src={building1}
                      alt="Sân tennis"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Sân tennis</p>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={12}
                  lg={2}
                  className="building_item"
                  style={{}}
                >
                  <div className="building_image" style={{}}>
                    <img
                      src={building2}
                      alt="Hồ bơi"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Hồ bơi</p>
                  </div>
                </Col>
                <Col className="building_item" xs={12} md={12} lg={2}>
                  <div className="building_image" style={{}}>
                    <img
                      src={building3}
                      alt="Nhà thi đấu"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Nhà thi đấu</p>
                  </div>
                </Col>
                <Col className="building_item" xs={12} md={12} lg={2}>
                  <div className="building_image" style={{}}>
                    <img
                      src={building4}
                      alt="Sân vân động"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Sân vân động</p>
                  </div>
                </Col>
              </Row>
              <Row className="building_row" style={{}}>
                <Col
                  className="building_item"
                  style={{}}
                  xs={12}
                  md={12}
                  lg={{ span: 2, offset: 3 }}
                >
                  <div className="building_image" style={{}}>
                    <img
                      src={building5}
                      alt="Sân bóng rổ"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Sân bóng rổ</p>
                  </div>
                </Col>
                <Col className="building_item" xs={12} md={12} lg={2}>
                  <div className="building_image">
                    <img
                      src={building6}
                      alt="Sân bóng chuyền"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Sân bóng chuyền</p>
                  </div>
                </Col>
                <Col xs={12} md={12} lg={2} className="building_item">
                  <div className="building_image">
                    <img
                      src={building7}
                      alt="Khu vực tập luyện thể thao ngoài trời"
                      style={{
                        width: "77px",
                        height: "77px",
                        margin: "16px auto 0 auto",
                        display: "block",
                      }}
                    ></img>
                  </div>
                  <div
                    className="building_display"
                    style={{
                      margin: "16px 0",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    <p>Khu vực tập luyện thể thao ngoài trời</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div
            className="Component_Container"
            style={{
              backgroundColor: "#A9CBFE",
              padding: "64.5px 0",
              margin: "0 -81.5px",
            }}
          >
            <p
              className="Component_heading"
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              NHIỆM VỤ, TỔ CHỨC NHÂN SỰ & CƠ SỞ VẬT CHẤT
            </p>
            <Row
              className="Component_List"
              style={{
                display: "flex",
                margin: "59px 92px -10px 135px",
                flexWrap: "wrap",
              }}
            >
              <Col className="Component_Item" xs={12} md={12} lg={4}>
                <div
                  className="Component_Image"
                  style={{
                    height: "304px",
                    backgroundColor: "#FFFFFF",
                    padding: "47px 0",
                  }}
                >
                  <img
                    src={Component1}
                    alt={posts ? posts[0].title : "Error"}
                    style={{
                      width: "210px",
                      height: "210px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></img>
                </div>
                <div
                  className="Component_name"
                  style={{
                    padding: "10px 0 10px 62px",
                    backgroundColor: "#001A72",
                  }}
                >
                  <p style={{ color: "#FFFFFF", margin: "0" }}>
                    {posts ? posts[0].title : "Error"}
                    <span
                      style={{
                        float: "right",
                        marginBottom: "24px",
                        marginRight: "17px",
                        fontSize: "16px",
                      }}
                    >
                      &#8594;
                    </span>
                  </p>
                </div>
              </Col>
              <Col className="Component_Item" xs={12} md={12} lg={4}>
                <div
                  className="Component_Image"
                  style={{
                    height: "304px",
                    padding: "47px 0",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <img
                    src={Component2}
                    alt={posts ? posts[1].title : "Error"}
                    style={{
                      width: "210px",
                      height: "210px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></img>
                </div>
                <div
                  className="Component_name"
                  style={{
                    padding: "10px 0 10px 62px",
                    backgroundColor: "#001A72",
                  }}
                >
                  <p style={{ color: "#FFFFFF", margin: "0" }}>
                    {posts ? posts[1].title : "Error"}
                    <span
                      style={{
                        float: "right",
                        marginBottom: "24px",
                        marginRight: "17px",
                        fontSize: "16px",
                      }}
                    >
                      &#8594;
                    </span>
                  </p>
                </div>
              </Col>
              <Col className="Component_Item" xs={12} md={12} lg={4}>
                <div
                  className="Component_Image"
                  style={{
                    height: "304px",
                    backgroundColor: "#FFFFFF",
                    padding: "47px 0",
                  }}
                >
                  <img
                    src={Component3}
                    alt={posts ? posts[2].title : "Error"}
                    style={{
                      width: "210px",
                      height: "210px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></img>
                </div>
                <div
                  className="Component_name"
                  style={{
                    padding: "10px 0 10px 62px",
                    backgroundColor: "#001A72",
                  }}
                >
                  <p style={{ color: "#FFFFFF", margin: "0" }}>
                    {posts ? posts[2].title : "Error"}
                    <span
                      style={{
                        float: "right",
                        marginBottom: "24px",
                        marginRight: "17px",
                        fontSize: "16px",
                      }}
                    >
                      &#8594;
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="CarouselPlace" style={{ marginTop: "80px" }}>
          <CarouselIntro></CarouselIntro>
        </div>
      </div>
      <MyFooter></MyFooter>
    </>
  );
}

export default Introduction;
