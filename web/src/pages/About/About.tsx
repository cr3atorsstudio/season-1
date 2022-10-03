import { forwardRef, LegacyRef } from "react";
import { Carousel } from "flowbite-react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Navbar } from "components/Navbar";

const About = () => {
  return (
    <>
      <div className='h-screen'>
        <Navbar />
        <Carousel
          slide={false}
          leftControl={<ArrowLeftCircleIcon className="h-12 w-12 text-blue-500" />}
          rightControl={<ArrowRightCircleIcon className="h-12 w-12 text-blue-500" />}
        >
          <div className='flex flex-col items-center justify-center'>
            slide1
          </div>
          <div className='flex flex-col items-center justify-center'>
            slide2
          </div>
          <div className='flex flex-col items-center justify-center'>
            slide3
          </div>
          <div className='flex flex-col items-center justify-center'>
            slide4
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default About;
