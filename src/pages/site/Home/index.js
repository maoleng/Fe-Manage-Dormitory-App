import React from 'react';
import { Link } from "react-router-dom";

import MyNavbar from '~/components/MyNavbar';
import MyCarousel from '~/components/MyCarousel';
import MyBlogs from '~/components/MyBlogs';
import MyFooter from '~/components/MyFooter';

const notifications = [
  {
    title: 'Thông báo cập nhật danh sách sinh viên đăng ký nội trú NH 2022-2023',
    href: '/imgs/site/notification-1.png'
  },
  {
    title: 'Thông báo hoàn trả tiền thế chân cho SVNT thanh lý hợp đồng đợt 15/6/2022',
    href: '/imgs/site/notification-2.png'
  },
  {
    title: 'Thông báo danh sách sinh viên đăng ký nội trú NH 2022-2023',
    href: '/imgs/site/notification-3.png'
  },
];

const activities = [
  {
    title: 'Tết cổ truyền Bun Pi May và Chol Chnam Thmey tại Đại học Tôn Đức Thắng',
    href: '/imgs/site/activitie-1.png'
  },
  {
    title: 'Câu lạc bộ thể dục thể thao NH 2021-2022',
    href: '/imgs/site/activitie-2.png'
  },
  {
    title: 'Tập huấn sinh viên nội trú năm học 2021-2022',
    href: '/imgs/site/activitie-3.png'
  },

];

function Home() {
  console.log('Page: Home');

  return (
    <>
      <MyNavbar isSite={true}></MyNavbar>

      <MyCarousel></MyCarousel>

      <div
        style={{
          padding: 'calc(100vw/75)',
          backgroundColor: '#06245E',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 'calc(100vw/33)',
          color: '#84B4FC'
        }}
      >
        Welcome to TDT dormitory
      </div>

      <div
        style={{
          margin: '50px'
        }}
      >
        <div
          style={{
            marginBottom: '32px'
          }}
        >
          <span
            style={{
              padding: '8px 0px',
              borderBottom: 'solid #84B4FC 8px',
              fontSize: '32px',
              fontWeight: 'bold'
            }}
          >GIỚI THIỆU CHUNG</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div
              style={{ 
                width: '45%',
              }} 
          >
            <img 
              style={{ 
                width: '100%',
              }} 
              src="/imgs/site/gioi-thieu.png" 
              alt="gioi-thieu"
            />
          </div>
          <div
            style={{
              width: '45%'
            }}
          >
            <p>Ký túc xá Trường đại học Tôn Đức Thắng cơ sở Tân Phong gồm 04 tòa nhà: Nhà H, I cao 10 tầng. Nhà K, L cao 20 tầng </p>
            <p>Cơ chế hoạt động: Tự chủ tài chính, tự cân đối thu chi</p>
            <p>Phương châm: Nề nếp, văn minh, hiệu quả, an toàn, bền vững, lâu dài</p>
            <p>Tiêu chí: Phục vụ người học, tạo điều kiện tốt nhất trong ăn ở, sinh hoạt và học tập cho sinh viên ở nội trú. Bổ sung cho các hoạt động chính của Trường, góp phần thực hiện tốt mục tiêu và nhiệm vụ đào tạo của Nhà trường</p>
            <button
              style={{
                padding: '8px 24px',
                border: 'none',
                backgroundColor: '#84B4FC',
                color: '#FFFFFF'
              }}
            >Xem thêm...</button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative'
        }}
      >
        <img 
          style={{ 
            width: '100%' 
          }} 
          src="/imgs/site/dang-ky-ktx-bg.png" 
          alt="dang-ky-ktx-bg"
        />
        <Link
          style={{ 
            padding: 'calc(100vw/160)',
            borderBottom: 'solid #0B42AB calc(.2vw)',
            color: '#0B42AB',
            fontWeight: 'bold', 
            fontSize: 'calc(100vw/33)',
            textDecoration: 'none',
            position: 'absolute',
            top: '18%',
            left: '8%'
          }}
          to="/sinh-vien/dang-ky"
        >
          Đăng ký Ký túc xá
        </Link>
      </div>

      <MyBlogs title={'THÔNG BÁO'} blogs={notifications}></MyBlogs>

      <MyBlogs title={'HOẠT ĐỘNG PHONG TRÀO'} blogs={activities}></MyBlogs>

      <MyFooter></MyFooter>
    </>
  );
}

export default Home;