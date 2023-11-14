import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.querySelector(".home-container").classList.add("show");
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">DiagnosAI</h1>
    </div>
  );
}

export default Home;
