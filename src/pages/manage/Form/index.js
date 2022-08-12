import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { useStore, actions } from "~/store";
import { useGetForms, useGetForm, usePostFormComment } from "./hooks";

import MyInput from "~/components/MyInput";
import MyNavbar from "~/components/MyNavbar";
import MyTable from "~/components/MyTable";
import MySidebar from "~/components/MySidebar";

function Form() {
  // console.log("Page: Form");

  const getForms = useGetForms();
  const getForm = useGetForm();
  const postFormComment = usePostFormComment();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const chatBox = useRef();
  const [inputValue, setInputValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [forms, setForms] = useState(null);
  const [loadedForm, setLoadedForm] = useState(false);
  const [form, setForm] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [imgComments, setImgComments] = useState([]);
  const [state, dispatch] = useStore();
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const removeImgComment = (indexRm) => {
    setImgComments(imgComments.filter((elem, index) => index !== indexRm));
  };

  const changeComment = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgComments((imgComments) => [...imgComments, reader.result]);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  const submitComment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const body = {
      parent_id: form.id,
      content: formData.get("content"),
      images: imgComments,
    };

    postFormComment.mutate(
      { body },
      {
        onSuccess(data) {
          getFormHandle(form.id);
          setInputValue("");
          setImgComments([]);
        },
      }
    );
  };

  const getFormHandle = (id) => {
    getForm.mutate(
      { id },
      {
        onSuccess(data) {
          setForm(data.data);
          setLoadedForm(true);
          getForms.mutate(
            {},
            {
              onSuccess(data) {
                console.log();
                setForms(data.data);

                setLoaded(true);
              },
            }
          );
        },
      }
    );
  };

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }

    window.onresize = () => {
      setPageWidth(window.innerWidth);
    }
  }, [form]);

  useEffect(() => {
    getForms.mutate(
      {},
      {
        onSuccess(data) {
          console.log();
          setForms(data.data);

          setLoaded(true);
        },
      }
    );
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", userSelect: "none" }}
      >
        <div>
          <svg
            style={{
              width: "24px",
              height: "24px",
              margin: "0px 16px",
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))
            }
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z"
              fill="#06245E"
            />
          </svg>
        </div>
        <div style={{ width: "100%" }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            width: "100%",
            padding: "40px",
          }}
        >
          {loaded ? (
            forms ? (
              <>
                <MyTable
                  forms={forms.map(
                    ({
                      id,
                      student_card_id,
                      name,
                      title,
                      content,
                      child_answer_count,
                      created_at,
                    }) => ({
                      id: {
                        title: "Mã đơn",
                        content: "" + id,
                      },
                      student_card_id: {
                        title: "Mã sinh viên",
                        content: student_card_id,
                      },
                      name: {
                        title: "Tên sinh viên",
                        content: name,
                      },
                      title: {
                        title: "Tiêu đề",
                        content: title,
                      },
                      child_answer_count: {
                        title: "Số câu trả lời",
                        content: child_answer_count,
                      },
                      created_at: {
                        title: "Ngày tạo",
                        content: created_at,
                      },
                      test: {
                        title: "",
                        content: (
                          <>
                            <button
                              style={{
                                padding: "4px 8px",
                                border: "none",
                                backgroundColor: "#1C63EE",
                              }}
                              onClick={() => {
                                getFormHandle(id);
                                setShowCommentForm(true);
                              }}
                            >
                              <svg
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  marginRight: "8px",
                                }}
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                              >
                                <g
                                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                  fill="#FFFFFF"
                                  stroke="none"
                                >
                                  <path
                                    d="
                                  M1155 4689 c-343 -50 -616 -296 -707 -639 l-23 -85 0 -1405 0 -1405
                                  23 -85 c83 -313 309 -539 622 -622 l85 -23 1405 0 1405 0 85 23 c311 82 535
                                  305 622 617 22 78 22 96 26 690 3 660 3 665 -50 729 -82 100 -240 104 -330 9
                                  -54 -57 -53 -43 -58 -698 -5 -603 -5 -611 -27 -665 -49 -120 -151 -214 -273
                                  -251 -64 -19 -95 -19 -1420 -17 l-1355 3 -55 22 c-120 49 -213 150 -250 271
                                  -20 63 -20 97 -20 1402 0 1305 0 1339 20 1402 37 121 130 222 250 271 54 22
                                  62 22 665 27 429 4 618 8 636 17 14 6 40 23 58 38 95 80 97 239 4 327 -61 58
                                  -62 58 -697 57 -319 -1 -608 -5 -641 -10z
                                "
                                  />
                                  <path
                                    d="
                                  M3138 4690 c-52 -16 -98 -52 -126 -98 -22 -38 -27 -59 -27 -112 0
                                  -85 34 -147 103 -187 l47 -28 404 -3 405 -3 -781 -782 c-430 -430 -789 -798
                                  -799 -817 -24 -45 -25 -153 -2 -195 21 -39 64 -82 103 -103 42 -23 150 -22
                                  195 2 19 10 387 369 817 799 l782 781 3 -405 3 -404 28 -47 c40 -69 102 -103
                                  187 -103 71 1 108 15 154 61 65 65 61 18 61 794 l0 705 -28 47 c-18 31 -44 57
                                  -75 75 l-47 28 -690 2 c-379 1 -702 -2 -717 -7z
                                "
                                  />
                                </g>
                              </svg>
                              chat
                            </button>
                          </>
                        ),
                      },
                    })
                  )}
                  type={"form"}
                ></MyTable>
              </>
            ) : (
              <>Không có dữ liệu</>
            )
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>

      <Modal show={showCommentForm} onHide={() => {setShowCommentForm(false); setLoadedForm(null);}}>
        <div style={{ height: pageWidth < 600 ? '97.5vh' : "80vh" }}>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {!loadedForm ? (
              <>Loading...</>
            ) : (
              <>
                <Modal.Header closeButton>
                  <span style={{ fontWeight: "bold" }}># {form.title}</span>
                </Modal.Header>
                <Modal.Body style={{ height: "50%" }}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div ref={chatBox} style={{ height: "100%", overflowY: "auto" }}>
                      <div style={{ padding: "8px", margin: "8px 0px" }}>
                        <div style={{ fontWeight: "bold" }}>
                          {form.student.student_card_id} - {form.student.name}
                        </div>
                        <div
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                            backgroundColor: "#DDE8FB",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            {form.images.map(({ source }, index) => (
                              <div
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginRight: "8px",
                                  position: "relative",
                                  display: "inline-block",
                                }}
                                key={index}
                              >
                                <img
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                  }}
                                  src={source}
                                  alt={index}
                                  key={index}
                                />
                              </div>
                            ))}
                          </div>
                          {form.content}
                          <div style={{ color: "#001A72", fontSize: "12px" }}>
                            {form.created_at}
                          </div>
                        </div>
                      </div>

                      {form.answers &&
                        form.answers.map(
                          (
                            { student, teacher, content, images, created_at },
                            index
                          ) => (
                            <div
                              style={{ padding: "8px", margin: "8px 0px" }}
                              key={index}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                {student
                                  ? `
                              ${student.student_card_id} - ${student.name}
                            `
                                  : `
                              ${teacher.role} - ${teacher.name}
                            `}
                              </div>
                              <div
                                style={{
                                  padding: "8px",
                                  borderRadius: "8px",
                                  backgroundColor: "#DDE8FB",
                                }}
                              >
                                <div style={{ width: "100%" }}>
                                  {images.map(({ source }, index) => (
                                    <div
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        marginRight: "8px",
                                        position: "relative",
                                        display: "inline-block",
                                      }}
                                      key={index}
                                    >
                                      <img
                                        style={{
                                          height: "100px",
                                          width: "100px",
                                          objectFit: "contain",
                                          objectPosition: "center",
                                        }}
                                        src={source}
                                        alt={index}
                                        key={index}
                                      />
                                    </div>
                                  ))}
                                </div>
                                {content}
                                <div
                                  style={{ color: "#001A72", fontSize: "12px" }}
                                >
                                  {created_at}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <div style={{ width: "100%" }}>
                        {imgComments.map((source, index) => (
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              position: "relative",
                              display: "inline-block",
                            }}
                            key={index}
                          >
                            <img
                              style={{
                                height: "100px",
                                width: "100px",
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                              src={source}
                              alt={index}
                              key={index}
                            />
                            <svg
                              style={{
                                width: "16px",
                                height: "16px",
                                position: "absolute",
                                top: "4px",
                                right: "4px",
                                cursor: "pointer",
                              }}
                              onClick={() => removeImgComment(index)}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429L17.9857 0Z"
                                fill="#06245E"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={submitComment}>
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: "#E7F0FF",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          <label
                            style={{
                              padding: "4px",
                              border: "none",
                              borderRadius: "4px",
                              backgroundColor: "#EEEEEE",
                            }}
                            htmlFor="imgComments"
                          >
                            <svg
                              style={{
                                width: "24px",
                                height: "24px",
                                cursor: "pointer",
                              }}
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000"
                                stroke="none"
                              >
                                <path
                                  d="
                                    M2238 5104 c-558 -72 -1087 -332 -1488 -734 -406 -405 -664 -933
                                    -735 -1500 -20 -161 -20 -459 0 -620 71 -567 329 -1095 735 -1500 405 -406
                                    933 -664 1500 -735 161 -20 459 -20 620 0 859 107 1605 638 1990 1420 177 358
                                    260 716 260 1125 0 409 -83 767 -260 1125 -385 782 -1131 1313 -1990 1420
                                    -153 19 -482 18 -632 -1z m622 -1644 l0 -600 600 0 600 0 0 -300 0 -300 -600
                                    0 -600 0 0 -600 0 -600 -300 0 -300 0 0 600 0 600 -600 0 -600 0 0 300 0 300
                                    600 0 600 0 0 600 0 600 300 0 300 0 0 -600z
                                  "
                                />
                              </g>
                            </svg>
                          </label>
                          <input
                            onChange={changeComment}
                            id="imgComments"
                            type="file"
                            multiple
                            hidden
                          />
                        </div>

                        <input
                          style={{
                            width: "100%",
                            padding: "0px 8px",
                            backgroundColor: "#FFFFFF00",
                            border: "none",
                            outline: "none",
                          }}
                          onChange={(e) => setInputValue(e.target.value)}
                          value={inputValue}
                          type="text"
                          name="content"
                          placeholder="Viết tin nhắn của bạn tại đây..."
                        />

                        <div>
                          <button
                            style={{
                              backgroundColor: "#FFFFFF00",
                              border: "none",
                            }}
                            type="submit"
                          >
                            <svg
                              style={{ width: "24px", height: "24px" }}
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512.000000 512.000000"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#001A72"
                                stroke="none"
                              >
                                <path
                                  d="
                                  M2489 4147 c-1334 -535 -2434 -978 -2443 -986 -34 -29 -48 -72 -44
                                  -133 4 -49 9 -64 34 -88 19 -20 358 -189 979 -491 523 -253 955 -466 962 -472
                                  6 -7 216 -434 467 -950 250 -517 462 -950 471 -963 57 -87 213 -85 259 3 8 16
                                  448 1111 978 2433 944 2358 963 2406 963 2472 0 65 -2 69 -37 105 -34 34 -43
                                  37 -100 40 -62 2 -84 -6 -2489 -970z m700 -733 l-1126 -1126 -761 368 c-418
                                  203 -758 371 -755 374 4 4 3751 1507 3763 1509 3 1 -502 -506 -1121 -1125z
                                  m599 -981 c-413 -1033 -754 -1881 -757 -1885 -3 -3 -172 336 -375 754 l-368
                                  761 1123 1123 c618 618 1125 1124 1125 1124 1 0 -336 -845 -748 -1877z
                                "
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal.Footer>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Form;
