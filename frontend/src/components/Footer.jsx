import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Workout Tracker. All Rights Reserved.
        </p>
        <p className="text-sm mt-2">
          Designed and Developed by <strong>Mith & Preston</strong>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
