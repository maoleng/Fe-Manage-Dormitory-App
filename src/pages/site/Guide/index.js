import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import InstructionLogo1 from "./Instruction1.png";
import InstructionLogo2 from "./Instruction2.png";
import InstructionLogo3 from "./Instruction3.png";
import InstructionLogo4 from "./Instruction4.png";
import InstructionLogo5 from "./Instruction5.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./fix.css";
import { useGetPost } from "./hooks";

function Guide() {
  // console.log("Page: Activity");

  const [posts, setPosts] = useState(null);

  const getPost = useGetPost();

  useEffect(() => {
    getPost.mutate(
      {},
      {
        onSuccess(data) {
          setPosts(data.data);
          console.log(data.data);
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
                HƯỚNG DẪN
              </h1>
            </div>
            <Row
              style={{
                padding: "80px 110.5px",
              }}
              className="Guide_List"
            >
              <Col sm={12} md={4} lg={1}>
                <Link
                  className="Guide_Item"
                  style={{
                    width: "200px",
                    margin: " 12px 23.75px",
                    padding: "12px 0px ",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                  to={`/bai-viet/${posts[0].id}`}
                >
                  <img
                    className="Item_Image"
                    src={InstructionLogo1}
                    style={{
                      margin: "39px auto 24px auto",
                      display: "block",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Đăng kí nội trú"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "16px 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    {posts[0].title}
                  </p>
                </Link>
              </Col>
              <Col sm={12} md={4} lg={1}>
                <Link
                  className="Guide_Item"
                  style={{
                    width: "200px",
                    margin: " 12px 23.75px",
                    padding: "12px 0px ",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                  to={`/bai-viet/${posts[1].id}`}
                >
                  <img
                    className="Item_Image"
                    src={InstructionLogo2}
                    style={{
                      margin: "39px auto 24px auto",
                      display: "block",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Gửi xe, Đổi xe, Chấm dứt hợp đồng xe"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "16px 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    {posts[1].title}
                  </p>
                </Link>
              </Col>
              <Col sm={12} md={4} lg={1}>
                <Link
                  className="Guide_Item"
                  style={{
                    width: "200px",
                    margin: " 12px 23.75px",
                    padding: "12px 0px ",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                  to={`/bai-viet/${posts[2].id}`}
                >
                  <img
                    className="Item_Image"
                    src={InstructionLogo3}
                    alt="Chấm dứt hợp đồng nội trú"
                    style={{
                      margin: "39px auto 24px auto",
                      display: "block",
                      width: "82px",
                      height: "82px",
                    }}
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      margin: "16px 8px",
                      lineHeight: "19px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    {posts[2].title}
                  </p>
                </Link>
              </Col>
              <Col sm={12} md={4} lg={1}>
                <Link
                  className="Guide_Item"
                  style={{
                    width: "200px",
                    margin: " 12px 23.75px",
                    padding: "12px 0px ",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                  to={`/bai-viet/${posts[3].id}`}
                >
                  <img
                    className="Item_Image"
                    src={InstructionLogo4}
                    style={{
                      margin: "39px auto 24px auto",
                      display: "block",
                      width: "82px",
                      height: "82px",
                    }}
                    alt="Xin về trễ sau thời gian quy định(22h00)"
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      margin: "16px 8px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    {posts[3].title}
                  </p>
                </Link>
              </Col>
              <Col sm={12} md={4} lg={1}>
                <Link
                  className="Guide_Item"
                  style={{
                    width: "200px",
                    margin: " 12px 23.75px",
                    padding: "12px 0px ",
                    textDecoration: "none",
                    backgroundColor: "#fff",
                    height: "240px",
                  }}
                  to={`/bai-viet/${posts[4].id}`}
                >
                  <img
                    alt="Tạm vắng - Tạm trú"
                    className="Item_Image"
                    src={InstructionLogo5}
                    style={{
                      margin: "39px auto 24px auto",
                      display: "block",
                      width: "82px",
                      height: "82px",
                    }}
                  ></img>
                  <p
                    className="Guild_Des"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      lineHeight: "19px",
                      margin: "16px 8px",
                      textAlign: "Center",
                      color: "#333",
                    }}
                  >
                    {posts[4].title}
                  </p>
                </Link>
              </Col>
            </Row>
          </Container>
          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default Guide;
