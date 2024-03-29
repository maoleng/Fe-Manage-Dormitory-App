import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./fix.css";
import { useGetPost } from "./hooks";
import RulesLogo1 from "./RulesLogo1.png";
import RulesLogo2 from "./RulesLogo2.png";
import RulesLogo3 from "./RulesLogo3.png";
import RulesLogo4 from "./RulesLogo4.png";
import RulesLogo5 from "./RulesLogo5.png";
import RulesLogo6 from "./RulesLogo6.png";
import RulesLogo7 from "./RulesLogo7.png";
import RulesLogo8 from "./RulesLogo8.png";
function Rules() {
  console.log("Page: Activity");

  const [posts, setPosts] = useState(null);

  const getPost = useGetPost();

  useEffect(() => {
    getPost.mutate(
      {},
      {
        onSuccess(data) {
          setPosts(data.data);
        },
      }
    );
  }, []);

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      {!posts ? (
        <>Loading...</>
      ) : (
        <>
          <Container
            fluid
            className="Guild_Container"
            style={{ backgroundColor: "#E9E9EA" }}
          >
            <div
              style={{
                borderBottom: "6px solid #A9CBFE ",
                marginLeft: "110.5px",
                marginRight: "110.5px",
              }}
              className="Guild_Heading"
            >
              <h1
                style={{
                  paddingTop: "75px",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#000000",
                }}
              >
                NỘI QUY
              </h1>
            </div>
            <Row
              style={{
                margin: "80px 110.5px 0",
              }}
              className="Rules_List"
            >
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1n0vt55NnP2-uiYmeaMKGLvQXAVD5Nbwt/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo1}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Nội quy kí túc xá"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Nội quy kí túc xá
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1O2IAf0_yZK8MdnEwaGAYeAc4QoFLkIeS/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo2}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Nội dung vi phạm và khung hình phạt xử lý kỷ luật "
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Nội dung vi phạm và khung hình phạt xử lý kỷ luật
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/178o6dU0NB-z0iMFqV8pSE2iO49IU8-1v/view?usp=sharing"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo3}
                    alt="Quy định về tiếp nhận, lưu trú, chấm dứt HĐ nội trú"
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Quy định về tiếp nhận, lưu trú, chấm dứt HĐ nội trú
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1r-n1gV8E8luaj9DL7sOQtRzuUYc1wnce/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo4}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Quy định về sinh hoạt, học tập, ứng xử tại ký túc xá"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      margin: "0 8px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Quy định về sinh hoạt, học tập, ứng xử tại ký túc xá
                  </p>
                </a>
              </Col>
            </Row>
            <Row style={{ margin: "0 110.5px" }} className="Rules_List">
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1hjhR05B8cB2cbQW1M-ZqpOzbgB8Lg9gE/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo5}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Quy định đánh giá tổ trưởng phòng và tính lỗi vi phạm"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Quy định đánh giá tổ trưởng phòng và tính lỗi vi phạm
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1liEd_DAl2K7tXFiCGBRYfxCGJCkygbCp/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo6}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Quy định về việc tham gia câu lạc bộ TDTT"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Quy định về việc tham gia câu lạc bộ TDTT
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1g5EU-yKCFaTg4D6BatRNq2kAR5A7L-PR/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo7}
                    alt="Đội sinh viên tự quản ký túc xá"
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "0 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Đội sinh viên tự quản ký túc xá
                  </p>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3} style={{ margin: "8px 0px" }}>
                <a
                  className="Rules_Item"
                  href="https://drive.google.com/file/d/1VC8YUs_zxxVqdv9Q7QjFBeRp_F94DnSn/view"
                  style={{
                    display: "block",
                    margin: " 0 23.75px",
                    padding: "39px 0 24px",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                >
                  <img
                    className="Item_Image"
                    src={RulesLogo8}
                    style={{
                      display: "block",
                      margin: "0 auto 24px auto",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Tổ trưởng phòng ở ký túc xá"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      margin: "0 8px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    Tổ trưởng phòng ở ký túc xá
                  </p>
                </a>
              </Col>
            </Row>
          </Container>
          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default Rules;
