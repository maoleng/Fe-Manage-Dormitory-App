import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Modal } from "react-bootstrap";
import { HuePicker } from "react-color";

import { useStore, actions } from "~/store";
import { useGetTag, usePostPost, usePostTag } from "./hooks";
import { CheckBoxSVG, TickSVG, AddSVG } from "./svg";
import MyNavbar from "~/components/MyNavbar";
import MySidebar from "~/components/MySidebar";

function PostCreate() {
  // console.log("Page: PostCreate");

  const [state, dispatch] = useStore();
  const getTag = useGetTag();
  const postPost = usePostPost();
  const postTag = usePostTag();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [tagBg, setTagBg] = useState("#FFFFFF");
  const [newTagValue, setNewTagValue] = useState("");
  const [searchTagValue, setSearchTagValue] = useState("");
  const [showTagAdd, setShowTagAdd] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formBanner, setFormBanner] = useState("");
  const [formContent, setFormContent] = useState("<p>Viết bài viết tại đây<p>");
  const [formTags, setFormTags] = useState(null);
  const [formCategory, setFormCategory] = useState([
    {
      content: "Thông báo",
      value: "2",
      selected: false,
    },
    {
      content: "Tin tức",
      value: "3",
      selected: false,
    },
    {
      content: "Hoạt động",
      value: "4",
      selected: false,
    },
  ]);

  const addElem = useRef();

  function setBannerImg(e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormBanner(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function submitPost() {
    postPost.mutate(
      {
        body: {
          title: formTitle,
          banner: formBanner,
          content: formContent,
          tag_ids: formTags
            .filter(({ selected }) => selected)
            .map(({ id }) => id),
          category: formCategory.filter(({ selected }) => selected)[0].value,
        },
      },
      {
        onSuccess(data) {
          navigate("/quan-ly/bai-dang");
        },
      }
    );
  }

  function submitPostTag() {
    postTag.mutate(
      {
        body: {
          name: newTagValue,
          color: tagBg,
        },
      },
      {
        onSuccess(data) {
          setNewTagValue("");
          setShowTags(true);
          setShowTagAdd(false);
          getTag.mutate(
            {},
            {
              onSuccess(data) {
                setFormTags([...formTags, {...data.data[data.data.length - 1], selected: false}])
              }
            },
          );
        },
      }
    );
  }

  useEffect(() => {
    getTag.mutate(
      {},
      {
        onSuccess(data) {
          setFormTags(data.data.map((elem) => ({ ...elem, selected: false })));
        },
      }
    );
  }, []);

  // console.log(formTags);

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

        <div style={{ width: "100%", padding: "80px" }}>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "300px auto",
              gap: "0px 80px",
            }}
          >
            <label htmlFor="file">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "8px",
                  backgroundImage: `url("${
                    formBanner || "/imgs/site/banner.png"
                  }")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </label>
            <input onChange={setBannerImg} id="file" type="file" hidden />

            <div>
              <div
                style={{
                  display: "grid",
                  rowGap: "20px",
                  gridTemplateColumns: "140px auto",
                }}
              >
                <div>Tiêu đề bài viết:</div>
                <div>
                  <input
                    style={{
                      width: "100%",
                      height: "32px",
                      paddingLeft: "8px",
                      borderStyle: "none none solid none",
                      outline: "none",
                    }}
                    placeholder="Tiêu đề..."
                    onChange={(e) => setFormTitle(e.target.value)}
                    value={formTitle}
                    type="text"
                  />
                </div>

                <div style={{ width: "140px" }}>Phân loại bài viết:</div>
                <div>
                  <select
                    style={{
                      width: "100%",
                      height: "32px",
                      padding: "0px 8px",
                      outline: "none",
                    }}
                    onChange={(evt) =>
                      setFormCategory(
                        formCategory.map((elem) => ({
                          ...elem,
                          selected: elem.value === evt.target.value,
                        }))
                      )
                    }
                  >
                    {formCategory.map(({ value, content, selected }) => (
                      <option value={value} selected={selected}>
                        {content}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: "140px" }}>Các thẻ:</div>
                <div
                  style={{
                    width: "100%",
                    minHeight: "32px",
                    padding: "8px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowTags(true)}
                >
                  {formTags === null ? (
                    <>Loading...</>
                  ) : formTags.filter((tag) => tag.selected).length === 0 ? (
                    <>Nhấp để chọn thẻ</>
                  ) : (
                    formTags
                      .filter((tag) => tag.selected)
                      .map(({ name, color }) => (
                        <div style={{ padding: "1px", backgroundColor: color }}>
                          {name}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: "80px" }}></div>

          <CKEditor
            editor={Editor}
            data={formContent}
            onChange={(event, editor) => {
              setFormContent(editor.getData());
            }}
          />

          <button
            style={{
              borderRadius: "4px",
              border: "1px #0B42AB solid",
              backgroundColor: " #0B42AB",
              color: "#FFFFFF",
              padding: "4px",
              marginTop: "12px",
              float: "right",
            }}
            onClick={submitPost}
          >
            Đăng bài viết
          </button>
        </div>
      </div>

      <Modal show={showTags} onHide={() => setShowTags(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 210px)",
            padding: "0px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: "1", overflowY: "auto" }}>
            {formTags === null ? (
              <>Loading...</>
            ) : (
              (!searchTagValue
                ? formTags
                : formTags.filter((tag) =>
                    tag.name
                      .toLowerCase()
                      .includes(searchTagValue.toLowerCase())
                  )
              ).map(({ id, name, color, selected }) => (
                <div
                  style={{
                    margin: "4px 0px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ width: "44px", height: "44px", cursor: "pointer" }}
                    onClick={() =>
                      setFormTags(
                        formTags.map((tag) => ({
                          ...tag,
                          selected:
                            tag.id !== id ? tag.selected : !tag.selected,
                        }))
                      )
                    }
                  >
                    {selected ? <TickSVG /> : <CheckBoxSVG />}
                  </div>
                  <div style={{ padding: "8px", backgroundColor: color }}>
                    {name}
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            style={{
              padding: "12px 0px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <input
              style={{
                height: "32px",
                padding: "0px 8px",
                border: "none",
                outline: "none",
                backgroundColor: "#D9D9D9",
                flexGrow: "1",
              }}
              onChange={(evt) => setSearchTagValue(evt.target.value)}
              type="text"
              value={searchTagValue}
              placeHolder="tag's name"
            />

            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#D9D9D9",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowTags(false);
                setShowTagAdd(true);
              }}
              ref={addElem}
            >
              <AddSVG />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "block",
            padding: "12px 0px",
            textAlign: "center",
            color: "#1C63EE",
            cursor: "pointer",
          }}
          onClick={() => setShowTags(false)}
        >
          OK
        </Modal.Footer>
      </Modal>

      <Modal show={showTagAdd}>
        <Modal.Body>
          <div
            style={{
              float: "right",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowTags(true);
              setShowTagAdd(false);
            }}
          >
            <svg
              style={{ width: "12px", height: "12px" }}
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41L12.59 0Z"
                fill="#2E3A59"
              />
            </svg>
          </div>

          <div style={{ width: "100%", height: "40px" }}></div>

          <div
            style={{
              clear: "both",
              display: "grid",
              gridTemplateColumns: "100%",
              gap: "16px 0px",
            }}
          >
            <input
              style={{
                width: "100%",
                padding: "0px 8px",
                border: "none",
                outline: "none",
                backgroundColor: "#EEEEEE",
              }}
              onChange={(evt) => setNewTagValue(evt.target.value)}
              value={newTagValue}
              type="text"
              placeHolder="tag's name"
            />

            <HuePicker
              width="100%"
              color={tagBg}
              onChange={(color) => setTagBg(color.hex)}
            />

            <input
              type="text"
              style={{
                outline: "none",
                textAlign: "center",
              }}
              onChange={(evt) =>
                setTagBg(
                  (evt.target.value.toLowerCase().includes("#") ? "" : "#") +
                    evt.target.value
                )
              }
              value={tagBg.toUpperCase()}
            />

            <div
              style={{
                color: "#1C63EE",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={submitPostTag}
            >
              Thêm
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostCreate;
