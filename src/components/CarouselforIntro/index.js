import Carousel from "react-bootstrap/Carousel";
import Slide1 from "./Slide1.png";
import Slide2 from "./Slide2.png";
import Slide3 from "./Slide3.png";
function CarouselIntro() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide1}
          alt="First slide"
          style={{
            width: "1131px",
            height: "582px",
            filter: "brightness(60%)",
          }}
        />
        <Carousel.Caption>
          <h3 style={{ color: "#fff" }}>
            Hệ thống cửa ra vào tối tân hiện đại
          </h3>
          <p>Với phương châm: An toàn của sinh viên là trên hết</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide2}
          alt="Second slide"
          style={{ width: "1131px", height: "582px" }}
        />
        <Carousel.Caption>
          <h3>Hành lang hiện đại</h3>
          <p>
            Được trang bị hệ thống camera giám sát an ninh, hệ thống chiếu sáng
            và máy lọc nước uống tinh khiết nóng, lạnh phục vụ 24/24
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide3}
          alt="Third slide"
          style={{
            width: "1131px",
            height: "582px",
            filter: "brightness(75%)",
          }}
        />

        <Carousel.Caption>
          <h3>Khu vực rộng rãi</h3>
          <p>
            Khu vực cá nhân rộng rãi thuận tiện cho việc học tập và nghỉ ngơi
            của sinh viên
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselIntro;
