import React from 'react';

function MyFooter() {
  console.log('Component: MyFooter');

  return (
    <footer 
      style={{ 
        padding: '20px',
        backgroundColor: '#06245EFF',
        color: 'white' 
      }}
    >
      <div className="row">
        <div className="col-12 col-sm-4">
          <div 
            style={{ 
              color: '#b6d4fe' 
            }}
          >LIÊN KẾT NHANH</div>
          <hr />
          <ul>
            <li>Giới thiệu</li>
            <li>Tin tức</li>
            <li>Thông báo</li>
            <li>Hướng dẫn</li>
            <li>Hoạt động phong trào</li>
          </ul>
        </div>
        <div className="col-12 col-sm-4">
          <p 
            style={{ 
              color: '#b6d4fe' 
            }}
          >LIÊN KẾT</p>
          <hr />
          <ul>
            <li>Đại học Tôn Đức Thắng</li>
            <li>TDTU Inspire Library</li>
            <li>Sinh viên</li>
            <li>Facebook</li>
            <li>Youtube</li>
          </ul>
        </div>
        <div className="col-12 col-sm-4">
          <p 
            style={{ 
              color: '#b6d4fe' 
            }}
          >KÝ TÚC XÁ</p>
          <hr />
          <div>Đại học Tôn Đức Thắng</div>
          <div>Phòng I0005 - Số 19 Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, TP. Hồ Chí Minh</div>
          <div>Số điện thoại: 02.837.760.652</div>
          <div>Email: ktx@tdtu.edu.vn</div>
        </div>
      </div>
      <div 
        style={{ 
          margin: '20px auto',
          textAlign: 'center',
          color: '#b6d4fe' 
        }}
      >© Copyright Ton Duc Thang University 2022.</div>
    </footer>
  );
}

export default MyFooter;