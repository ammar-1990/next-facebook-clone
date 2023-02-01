import { useState } from "react";

const Story = ({ el }) => {
  const [story, setStory] = useState(false);
  return (
    <div className="w-14 h-14 md:w-28 md:h-40  ">
      <div className=" relative overflow-hidden hover:scale-105 hover:animate-pulse duration-300 rounded-full md:rounded-lg">
        <div
          className="outlay cursor-pointer"
          onClick={() => setStory(true)}
        ></div>
        <img
          src={el.image}
          className=" w-14 h-14 md:w-28 md:h-40  object-cover    "
          alt=""
        />
        <img
          className="hidden absolute top-2 left-2 md:block w-9 h-9 rounded-full object-cover border-2  border-white cursor-pointer"
          src={el.profile}
          alt=""
        />
        <p className="absolute hidden md:block text-white bottom-2 left-2 capitalize cursor-pointer ">
          {el.name}
        </p>
      </div>

      <div
        className={`fixed  ${
          story ? "flex" : "hidden"
        } top-0 left-0 w-full h-full  layout  justify-center items-center `}
      >

<div
            className="absolute top-3 right-3  cursor-pointer "
            onClick={() => setStory(false)}
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>
          </div>
      
          <img src={el.image} alt="" />
          
     
      </div>
    </div>
  );
};

export default Story;
