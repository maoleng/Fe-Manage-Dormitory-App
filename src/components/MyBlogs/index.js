import React from "react";

function MyBlogs({ title, blogs }) {
  console.log("Component: MyBlogs");

  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <div
        style={{
          width: "50%",
          padding: "8px 0px",
          borderBottom: "solid #84B4FC 8px",
          margin: "25px auto",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      <div
        style={{
          margin: "25px auto",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginLeft: "15%",
            }}
          >
            {blogs.map(({ title, href }, index) => (
              <div
                style={{
                  width: "300px",
                  margin: "20px",
                }}
                key={index}
              >
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={href}
                  alt={href}
                />
                <b
                  style={{
                    display: "-webkit-box",
                    webkitLineClamp: "2",
                    webkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginTop: "4px",
                  }}
                >
                  {title}
                </b>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          <button
            style={{
              padding: "8px 24px",
              border: "none",
              backgroundColor: "#84B4FC",
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            Xem thêm...
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
