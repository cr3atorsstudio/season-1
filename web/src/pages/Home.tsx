import { Navbar } from "components/Navbar";
import { EmojiContainer } from "components/EmojiContainer";
import { EMOJIS } from "constants/emoji";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper";

import { useWindowSize } from "hooks/useWindowSize";

const Home = () => {
  const width = useWindowSize();
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-10 mb-10 text-[20px] font-semibold md:mt-28 md:text-[40px]'>
          <p>言葉をつなげて、</p>
          <p>みんなでつくる</p>
        </div>

        <p className='mb-20 text-[30px] font-bold md:text-[60px]'>
          ジェネレーティブアート
        </p>

        <img
          src='public/images/placeholder.png'
          alt=''
          className=' w-1/2 rounded-[25px] md:w-4/12 md:rounded-[50px]'
        />
      </div>

      <div className='mt-24 w-full transform xl:mt-28'>
        <Swiper
          autoplay={{
            delay: 0,
          }}
          speed={width < 1400 ? 2500 : 3000}
          modules={[Autoplay]}
          slidesPerView={width < 1400 ? 6 : 10}
          loop={true}
          allowTouchMove={false}
        >
          {EMOJIS.map((emoji) => (
            <SwiperSlide>
              <EmojiContainer>{emoji}</EmojiContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
