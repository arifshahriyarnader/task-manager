import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  const isUserLoggedIn=false;
  const handleButtonClick=() =>{
    if(isUserLoggedIn){
      navigate('/todo')
    }
    else{
      navigate('/login')
    }
  }
  return (
    <div>
      <div className="flex flex-col self-center justify-betweem pt-40 mb-40">
        <h1 className="text-5xl">
        Simplify Your Day,
          <br /> Achieve your goals
        </h1>
        <p className="pt-5 text-lg">
        Take control of your tasks with ease. 
          <br /> Your ultimate productivity companion.
        </p>
        <button onClick={handleButtonClick}
          className="mt-6 py-2.5 px-2 w-[200] mx-auto flex flex-col md:flex-row text-lg font-bold border-2
              border-solid border-orange-500 rounded-md
               cursor-pointer bg-[#F97316] text-white hover:text-[#fff] hover:bg-[#F97316]"
        >
          Make Todo List
        </button>
      </div>
    </div>
  );
};

export default Home;
