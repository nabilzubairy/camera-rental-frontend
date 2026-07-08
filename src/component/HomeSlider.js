import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

function HomeSlider() {
    const slides = [
    {
      img: "/simple.jpg",
      title: "Find Your Perfect Camera",
      subtitle: "Rent professional cameras at affordable prices."
    },
    {
      img: "/simple2.jpeg",
      title: "Top Quality DSLR & Mirrorless",
      subtitle: "Capture beautiful moments with high-end lenses."
    },
    {
      img: "/simple3.jpeg",
      title: "Shoot Cinematic 4K Videos",
      subtitle: "Professional filmmaking cameras available."
    }
  ];

  return (
    <div>
      {/* HERO SLIDER */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel"
        data-bs-interval="3000"
      >

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={slide.img} className="d-block w-100" alt={slide.title} />

              <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                <h1 className="fw-bold display-4">{slide.title}</h1>
                <p className="lead">{slide.subtitle}</p>
                <button className="btn btn-primary mt-3 px-4 py-2">Explore Now</button>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

export default HomeSlider