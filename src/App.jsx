import React from 'react';
import Lottie from "lottie-react";
import animation from "/public/Animation - 1699374904135";

const App = () => {
  return (
    <div>
      <Lottie className='h-[60vh] w-full' animationData={animation} loop={true} />
    </div>
  );
};

export default App;