import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

const sideManage = [
  {
    url: '/vi-pham',
    icon: '/imgs/icons/vi-pham-icon.png',
    title: 'Vi phạm'
  },
  {
    url: '/don-khieu-nai',
    icon: '/imgs/icons/don-khieu-nai-icon.png',
    title: 'Đơn'
  },
  {
    url: '/phong',
    icon: '/imgs/icons/phong.png',
    title: 'Phòng'
  },
  {
    url: '/diem-danh',
    icon: '/imgs/icons/dien-danh.png',
    title: 'Điểm danh'
  },
  {
    url: '/hoa-don-dien-nuoc',
    icon: '/imgs/icons/hoa-don-dien-nuoc-icon.png',
    title: 'Điện nước'
  },
  {
    url: '/bai-dang',
    icon: '/imgs/icons/bai-dang-icon.png',
    title: 'Bài đăng'
  },
  {
    url: '/don-dang-ky',
    icon: '/imgs/icons/don-dang-ky.png',
    title: 'Đơn đăng ký'
  },
  {
    url: '/hop-dong',
    icon: '/imgs/icons/hop-dong-icon.png',
    title: 'Hợp đồng'
  },
];

const sideStudent = [
  {
    url: '/hop-dong',
    icon: '/imgs/icons/hop-dong-icon.png',
    title: 'Hợp đồng'
  },
  {
    url: '/vi-pham',
    icon: '/imgs/icons/vi-pham-icon.png',
    title: 'Vi phạm'
  },
  {
    url: '/don-khieu-nai',
    icon: '/imgs/icons/don-khieu-nai-icon.png',
    title: 'Đơn'
  },
];

const sideStudentManager = [
  {
    url: '/hop-dong',
    icon: '/imgs/icons/hop-dong-icon.png',
    title: 'Hợp đồng'
  },
  {
    url: '/vi-pham',
    icon: '/imgs/icons/vi-pham-icon.png',
    title: 'Vi phạm'
  },
  {
    url: '/don-khieu-nai',
    icon: '/imgs/icons/don-khieu-nai-icon.png',
    title: 'Đơn'
  },
  {
    url: '/diem-danh',
    icon: '/imgs/icons/dien-danh.png',
    title: 'Điểm danh'
  },
  {
    url: '/lich-truc',
    icon: '/imgs/icons/xin-phep-icon.png',
    title: 'Lịch trực'
  },
];

function MySidebar({ isOpen }) {
  // console.log('Component: MySidebar');

  const role = window.localStorage.getItem('role');

  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      setPageWidth(window.innerWidth);
    }

    return () => {
      window.onresize = null;
    }
  }, []);

  return (
    <div
      style={{
        ...(isOpen ? pageWidth < 600 ? {
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          backgroundColor: '#FFFFFF',
        } :{
          width: '240px',
        } : {}),
        ...{
          paddingTop: '20px',
          borderRight: 'solid #D9D9D9 1px',
        }
    }}
    >
      {(role === 'Quản lý kí túc xá' 
        ? sideManage 
        : role === 'Sinh viên tự quản' 
        ? sideStudentManager
        : sideStudent
      ).map(({ url, icon, title }, index) => (
        <div 
          style={{ 
            padding: '4px 8px', 
            cursor: 'pointer',
            backgroundColor: (window.location.pathname.includes(url) ? '#84B4FC' : '#FFFFFF')
          }}
          key={index}
        >
          <Link style={{ textDecoration: 'none', color: '#000000' }} to={(role === 'Quản lý kí túc xá' ? '/quan-ly' : '/sinh-vien') + url}>
            <img style={{ height: '32px', marginRight: (isOpen ? '20px' : '')}} src={icon} alt={icon}/>
            {isOpen ? title : ''}
          </Link>
        </div>
      ))} 
    </div>
  );
}

export default MySidebar;