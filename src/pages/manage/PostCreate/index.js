import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Modal } from "react-bootstrap";

import { useStore, actions } from '~/store';

import { useGetTag, usePostPost } from './hooks';

import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';

function PostCreate() {
  console.log('Page: PostCreate');

  const [showTags, setShowTags] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formBanner, setFormBanner] = useState('');
  const [formContent, setFormContent] = useState('<p>Viết bài viết tại đây<p>');
  const [formTagIds, setFormTagIds] = useState([]);
  const [formCategory, setFormCategory] = useState('');

  const [state, dispatch] = useStore();

  const getTag = useGetTag();
  const postPost = usePostPost();

  const navigate = useNavigate();

  function setBannerImg(e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormBanner(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  function submitPost() {
    postPost.mutate(
      {
        body: {
          title: formTitle,
          banner: formBanner,
          content: formContent,
          tag_ids: formTagIds.filter(({ selected }) => selected).map(({ id }) => id),
          category: formCategory
        }
      },
      {
        onSuccess(data) {
          navigate('/quan-ly/bai-dang');
        }
      }
    );
  }

  useEffect(() => {
    getTag.mutate(
      {},
      {
        onSuccess(data) {
          setFormTagIds(data.data.map((elem) => ({...elem, selected: false})));
        }
      },
    );
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg style={{ width: '24px', height: '24px', margin: '0px 16px', cursor: 'pointer' }} onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            width: '100%',
            padding: '80px',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '20px',
            }}
          >
            <div 
              style={{ 
                width: '400px',
                padding: '8px',
                border: 'solid #000000 1px',
                borderRadius: '8px',
                backgroundImage: `url("${formBanner || '/imgs/site/banner.png'}")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div
              style={{
                width: '100%',
              }}
            >
              <div
                style={{
                  margin: '20px 0px',
                  display: 'flex',
                }}
              >
                <label
                  style={{ 
                    padding: '4px',
                    border: 'none', 
                    borderRadius: '4px', 
                    backgroundColor: '#EEEEEE' 
                  }}
                  htmlFor="file"
                >
                  <svg 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      marginRight: '12px'
                    }} 
                    viewBox="0 0 32 33" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 17.25V21C22 21.8284 21.3284 22.5 20.5 22.5H11.5C10.6716 22.5 10 21.8284 10 21L10 17.25M19 13.5L16 10.5M16 10.5L13 13.5M16 10.5L16 19.5" stroke="#001A72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontWeight: 'bold', marginRight: '12px' }}>Chọn ảnh tiêu đề</span>
                </label>
                <input onChange={setBannerImg} id="file" type="file" hidden/>
              </div>
              <div
                style={{
                  margin: '20px 0px',
                  display: 'flex',
                }}
              >
                <div
                  style={{ width: '180px' }}
                >Tiêu đề bài viết:</div>
                <div style={{ width: '100%'}}>
                  <input style={{ width: '100%', paddingLeft: '8px', border: 'none', backgroundColor: '#F2EEEE'}} onChange={e => setFormTitle(e.target.value)}  value={formTitle} type="text" />
                </div>
              </div>
              <div
                style={{
                  margin: '20px 0px',
                  display: 'flex',
                }}
              >
                <div
                  style={{ width: '180px' }}
                >Phân loại bài viết:</div>
                <div style={{ width: '100%' }}>
                  <input style={{ width: '100%', paddingLeft: '8px', border: 'none', backgroundColor: '#F2EEEE'}} onChange={e => setFormCategory(e.target.value)} value={formCategory} type="text" />
                </div>
              </div>
              <div
                style={{
                  margin: '20px 0px',
                  display: 'flex',
                }}
              >
                <div
                  style={{ width: '180px' }}
                >Các thẻ:</div>
                <div style={{ width: '100%'}}>
                  <div style={{ width: '100%', paddingLeft: '8px', border: 'none', backgroundColor: '#F2EEEE', cursor: 'pointer' }} onClick={() => setShowTags(true)}>
                    {formTagIds.filter(({ selected }) => selected).length === 0 ? (
                      <>Chọn thẻ cho bài viết</>
                    ) : formTagIds.map(({ name, color, selected }, index) => !selected ? (
                      <span key={index}></span>
                    ) : (
                      <div
                        style={{
                          padding: '8px',
                          margin: '8px',
                          backgroundColor: color,
                          color: '#FFFFFF',
                          float: 'left',
                          cursor: 'pointer',
                          textShadow: `
                            2px 0 #000000, 
                            -2px 0 #000000, 
                            0 2px #000000, 
                            0 -2px #000000,
                            1px 1px #000000, 
                            -1px -1px #000000, 
                            1px -1px #000000, 
                            -1px 1px #000000
                          `
                        }}
                        key={index}
                      >{name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '80px' }}></div>

          <CKEditor
            editor={ Editor }
            data={formContent}
            onChange={ ( event, editor ) => {
              setFormContent(editor.getData());
            }}
          />

          <button onClick={submitPost}>Đăng bài viết</button>
        </div>
      </div>

      <Modal size="lg" show={showTags} onHide={() => setShowTags(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body 
          style={{ 
            maxHeight: 'calc(100vh - 210px)',
            padding: '80px',
            overflowY: 'auto'
          }}
        >
          {formTagIds && formTagIds.map(({ id, name, color, selected }, index) => (
            <div
              style={{
                ...{
                  padding: '8px',
                  margin: '8px',
                  backgroundColor: color,
                  color: '#FFFFFF',
                  float: 'left',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  textShadow: `
                    2px 0 #000000, 
                    -2px 0 #000000, 
                    0 2px #000000, 
                    0 -2px #000000,
                    1px 1px #000000, 
                    -1px -1px #000000, 
                    1px -1px #000000, 
                    -1px 1px #000000
                  `,
                },
                ...(selected ? {
                  padding: '6px',
                  border: 'solid #000000 2px',
                  outline: 'solid #00CC00 3px'
                } : {})
              }}
              onClick={() => setFormTagIds(formTagIds.map((elem) => elem.id === id ? {...elem, selected: !elem.selected} : elem))}
              key={index}
            >{name}</div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowTags(false)}>Xác nhận</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostCreate;