import { useState, useEffect } from 'react';

import MyNavbar from '~/components/MyNavbar';
import MyFooter from '~/components/MyFooter';

import { useGetPost } from './hooks';

function Guide() {
  console.log('Page: Activity');

  const [posts, setPosts] = useState(null);

  const getPost = useGetPost();

  useEffect(() => {
    getPost.mutate(
      {},
      {
        onSuccess(data) {
          setPosts(data.data);
        }
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
          {posts.map(({ id, banner, created_at, title }) => (
            <div style={{ margin: '20px', border: 'solid #000000 3px' }} key={id}>
              <div>
                <img src={banner} alt=""/>
              </div>
              <div>Tiêu đề: {title}</div>
              <div>Ngày tạo: {created_at}</div>
            </div>
          ))}

          <MyFooter></MyFooter>
        </>
      )}
    </>
  );
}

export default Guide;