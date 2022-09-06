import { Navbar } from "components/Navbar";
import { EmojiContainer } from "components/EmojiContainer";
import { EMOJIS } from "constants/emoji";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper";

const Home = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <Navbar />
        <div className='mt-10 md:mt-28 text-[20px] md:text-[40px] font-semibold mb-10'>
          <p>言葉をつなげて、</p>
          <p>みんなでつくる</p>
        </div>

        <p className='text-[30px] md:text-[60px] mb-20 font-bold'>
          ジェネレーティブアート
        </p>

        <img
          src='public/images/placeholder.png'
          alt=''
          className=' w-1/2 md:w-3/12 rounded-[25px] md:rounded-[50px]'
        />
      </div>

      <div className='w-full transform  mt-40 xl:mt-28'>
        <Swiper
          autoplay={{
            delay: 0,
          }}
          speed={2500}
          modules={[Autoplay]}
          slidesPerView={8}
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
