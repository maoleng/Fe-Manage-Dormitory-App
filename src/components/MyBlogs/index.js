import React from 'react';

function MyBlogs({ title, blogs }) {
  console.log('Component: MyBlogs');

  return (
    <div
      style={{
        margin: '50px'
      }}
    >
      <div
        style={{
          width: '50%',
          padding: '8px 0px',
          borderBottom: 'solid #84B4FC 8px',
          margin: '25px auto',
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold'
        }}
      >{title}</div>
      <div
        style={{
          margin: '25px auto',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around'
            }}
          >
            {blogs.map(({ title, href }, index) => (
              <div
                style={{
                  width: '300px',
                  margin: '20px'
                }}
                key={index}
              >
                <img 
                  style={{ 
                    width: '100%', 
                    height: '150px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }} 
                  src={href} 
                  alt={href}
                />
                <b>{title}</b>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
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
  );
}

export default MyBlogs;