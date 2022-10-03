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
          <div>
            <div className='flex flex-col items-center justify-center'>
              <div className='mb-20 text-[30px] font-bold md:text-[60px]'>
                <p>どんなアプリ？</p>
              </div>
              <p className='w-2/3 text-[10px] font-semibold md:text-[40px]'>
                このアプリは、みんな知っている”しりとり”ゲームとジェネレイティブアートを組み合わせたDappです。
              </p>
            </div>
            <div className='ml-64 flex items-end h-60'>
              <p　className='text-[30px] md:text-[60px] font-nico '>
                01/04
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default About;
