import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MyNavbar from "~/components/MyNavbar";
import MyFooter from "~/components/MyFooter";
import InstructionLogo1 from "./Instruction1.png";
import InstructionLogo2 from "./Instruction2.png";
import InstructionLogo3 from "./Instruction3.png";
import InstructionLogo4 from "./Instruction4.png";
import InstructionLogo5 from "./Instruction5.png";

import { useGetPost } from "./hooks";

function Guide() {
  console.log("Page: Activity");

  const [posts, setPosts] = useState(null);

  const getPost = useGetPost();

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

      {!posts ? (
        <>Loading...</>
      ) : (
        <>
          <div
            className="Guild_Container"
            style={{ backgroundColor: "#E9E9EA", height: "538px" }}
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
            <div
              style={{
                margin: "80px 110.5px",
                display: "flex",
                flexBasis: "nowrap",
              }}
              className="Guide_List"
            >
              <a
                className="Guide_Item"
                href="https://dormitory.tdtu.edu.vn/huong-dan/dang-ky-noi-tru"
                style={{
                  width: "200px",
                  margin: " 0 23.75px",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  height: "240px",
                }}
              >
                <img
                  className="Item_Image"
                  src={InstructionLogo1}
                  style={{
                    margin: "39px 59px 24px 59px",
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
                    margin: "0 8px",
                    lineHeight: "19px",
                    textAlign: "Center",
                    color: "#333",
                  }}
                >
                  Đăng ký nội trú
                </p>
              </a>
              <a
                className="Guide_Item"
                href="https://dormitory.tdtu.edu.vn/huong-dan/thu-tuc-xe"
                style={{
                  width: "200px",
                  margin: " 0 23.75px",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  height: "240px",
                }}
              >
                <img
                  className="Item_Image"
                  src={InstructionLogo2}
                  style={{
                    margin: "39px 59px 24px 59px",
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
                    margin: "0 8px",
                    lineHeight: "19px",
                    textAlign: "Center",
                    color: "#333",
                  }}
                >
                  Gửi xe, Đổi xe, Chấm dứt hợp đồng xe
                </p>
              </a>
              <a
                className="Guide_Item"
                href="https://dormitory.tdtu.edu.vn/huong-dan/cham-dut-hd"
                style={{
                  width: "200px",
                  margin: " 0 23.75px",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  height: "240px",
                }}
              >
                <img
                  className="Item_Image"
                  src={InstructionLogo3}
                  alt="Chấm dứt hợp đồng nội trú"
                  style={{
                    margin: "39px 59px 24px 59px",
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
                  Chấm dứt hợp đồng nội trú
                </p>
              </a>
              <a
                className="Guide_Item"
                href="https://dormitory.tdtu.edu.vn/huong-dan/xin-ve-tre-22h"
                style={{
                  width: "200px",
                  margin: " 0 23.75px",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  height: "240px",
                }}
              >
                <img
                  className="Item_Image"
                  src={InstructionLogo4}
                  style={{
                    margin: "39px 59px 24px 59px",
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
                    margin: "0 8px",
                    textAlign: "Center",
                    color: "#333",
                  }}
                >
                  Xin về trễ sau thời gian quy định(22h00)
                </p>
              </a>
              <a
                className="Guide_Item"
                href="https://dormitory.tdtu.edu.vn/huong-dan/tam-tru-tam-vang"
                style={{
                  width: "200px",
                  margin: " 0 23.75px",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  height: "240px",
                }}
              >
                <img
                  alt="Tạm vắng - Tạm trú"
                  className="Item_Image"
                  src={InstructionLogo5}
                  style={{
                    margin: "39px 59px 24px 59px",
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
                    margin: "0 8px",
                    textAlign: "Center",
                    color: "#333",
                  }}
                >
                  Tạm vắng - Tạm trú
                </p>
              </a>
            </div>
          </div>

          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default Guide;
