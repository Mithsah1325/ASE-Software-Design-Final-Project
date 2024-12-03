import React from "react";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="mb-10">
          <img
            src="https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fitness Image 1"
            className="w-full rounded-md shadow-md"
          />
        </div>
        <div className="mb-10">
          <img
            src="https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fitness Image 2"
            className="w-full rounded-md shadow-md"
          />
        </div>
        <div className="mb-10">
          <img
            src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Fitness Image 3"
            className="w-full rounded-md shadow-md"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
