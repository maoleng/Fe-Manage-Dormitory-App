import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function MyBlogs({ title, blogs, next }) {
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
            {blogs.map(({ id, banner, title }, index) => (
              <Link
                style={{
                  width: "300px",
                  margin: "20px",
                  color: "#000000",
                  textDecoration: "none",
                }}
                key={id + "_" + index}
                to={`/bai-viet/${id}`}
              >
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={banner}
                  alt=""
                />

                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginTop: "4px",
                    fontWeight:"700"
                  }}
                >
                  {title}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          <Link
            style={{
              padding: "12px 24px",
              border: "none",
              backgroundColor: "#84B4FC",
              color: "#FFFFFF",
              borderRadius: "4px",
              textDecoration: "none",
            }}
            to={next}
          >
            Xem thêm...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
