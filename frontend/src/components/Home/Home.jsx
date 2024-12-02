import React from 'react'
// import "../Home/Home.css";
const Home = () => {
  return (
    <div className="home-container">
    <div className="image-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3JyBDNV5e19preLrQIjFy-OMDkbb8esdgg&s"
        alt="Background"
        className="background-image"
      />
    </div>
    <div className="content-container">
      <h1>Welcome to Our Website</h1>
      {/* <p>This is the homepage content displayed over the image.</p> */}
    </div>
  </div>
  )
}

export default Home