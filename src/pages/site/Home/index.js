import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetPostsNew } from "./hooks";
import MyNavbar from "~/components/MyNavbar";
import MyCarousel from "~/components/MyCarousel";
import MyBlogs from "~/components/MyBlogs";
import MyFooter from "~/components/MyFooter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Home() {
  console.log("Page: Home");

  const getPostsNew = useGetPostsNew();

  const [postsNotifications, setPostsNotifications] = useState(null);
  const [postsActivity, setPostsActivity] = useState(null);

  useEffect(() => {
    getPostsNew.mutate(
      { category: "2" },
      {
        onSuccess(data) {
          console.log(2);
          setPostsNotifications(data.data);
          console.log("Notifications:", data.data);

          getPostsNew.mutate(
            { category: "4" },
            {
              onSuccess(data) {
                console.log(4);
                setPostsActivity(data.data);
                console.log("Activity:", data);
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

      <MyCarousel></MyCarousel>
      <Container fluid>
        <div
          style={{
            padding: "calc(100vw/75)",
            backgroundColor: "#06245E",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "calc(100vw/33)",
            color: "#84B4FC",
          }}
        >
          Welcome to TDT dormitory
        </div>
        <div
          style={{
            margin: "50px",
          }}
        >
          <div
            style={{
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                padding: "8px 0px",
                borderBottom: "solid #84B4FC 8px",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              GIỚI THIỆU CHUNG
            </span>
          </div>

          <Row>
            <Col sm={12} md={12} lg={6} style={{ margin: "8px 0" }}>
              <img
                style={{
                  width: "100%",
                }}
                src="/imgs/site/gioi-thieu.png"
                alt="gioi-thieu"
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={{ span: "5", offset: "1" }}
              style={{ margin: "8px 0" }}
            >
              <p>
                Ký túc xá Trường đại học Tôn Đức Thắng cơ sở Tân Phong gồm 04
                tòa nhà: Nhà H, I cao 10 tầng. Nhà K, L cao 20 tầng{" "}
              </p>
              <p>Cơ chế hoạt động: Tự chủ tài chính, tự cân đối thu chi</p>
              <p>
                Phương châm: Nề nếp, văn minh, hiệu quả, an toàn, bền vững, lâu
                dài
              </p>
              <p>
                Tiêu chí: Phục vụ người học, tạo điều kiện tốt nhất trong ăn ở,
                sinh hoạt và học tập cho sinh viên ở nội trú. Bổ sung cho các
                hoạt động chính của Trường, góp phần thực hiện tốt mục tiêu và
                nhiệm vụ đào tạo của Nhà trường
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    float: "center",
                    padding: "8px 24px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#84B4FC",
                    color: "#FFFFFF",
                  }}
                >
                  Xem thêm...
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src="/imgs/site/dang-ky-ktx-bg.png"
            alt="dang-ky-ktx-bg"
          />
          <Link
            style={{
              padding: "calc(100vw/160)",
              borderBottom: "solid #0B42AB calc(.2vw)",
              color: "#0B42AB",
              fontWeight: "bold",
              fontSize: "calc(100vw/33)",
              textDecoration: "none",
              position: "absolute",
              top: "18%",
              left: "8%",
            }}
            to="/sinh-vien/dang-ky"
          >
            Đăng ký Ký túc xá
          </Link>
        </div>

        {!postsNotifications ? (
          <></>
        ) : (
          <MyBlogs
            title={"THÔNG BÁO"}
            blogs={postsNotifications}
            next={"/thong-bao"}
          ></MyBlogs>
        )}

        {!postsActivity ? (
          <></>
        ) : (
          <MyBlogs
            title={"HOẠT ĐỘNG PHONG TRÀO"}
            blogs={postsActivity}
            next={"/hoat-dong"}
          ></MyBlogs>
        )}
      </Container>
      <MyFooter></MyFooter>
    </>
  );
}

export default Home;
