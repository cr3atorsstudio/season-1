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
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 mb-10 text-[20px] md:mt-28 md:text-[36px]">
          <p>しりとりであなたと世界を”繋げる"</p>
        </div>

        <a
          href="https://opensea.io/collection/shiritorinft"
          target="_blank"
          className="mb-20 font-poppins text-[30px] font-bold hover:underline md:text-[60px]"
        >
          Shiritori NFT
        </a>

        <img
          src="/images/placeholder.gif"
          alt=""
          className=" w-1/2 rounded-[25px] md:w-4/12 md:rounded-[50px]"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="">
          <p className="mt-16 mr-10 text-[20px] leading-10">
            このアプリでは、誰もが知っている”しりとり”ゲームからジェネラティブNFTを手に入れることができます。
            <br />
            <br />
            しりとりに繋がる言葉を入力すると、その言葉がブロックチェーン上に保存され、
            <br />
            あなたの言葉からジェネラティブNFTが生成されます。
            <br />
            <br />
            生成されるNFTは"前の言葉"と"あなたが繋げた言葉"が指で繋がったイラストになっています
            <br />
            <br />
            "左手"のアクセサリーが1つ前のしりとりの言葉から、
            <br />
            "右手"のアクセサリーがあなたが繋げた言葉から生成されています。
            <br />
            <br />
            ”しりとり”をつなげて、世界とあなただけのジェネラティブNFTを手に入れてみましょう😍
            <br />
            <br />
            <br />
            <a
              href="https://opensea.io/collection/shiritorinft"
              target="_blank"
              className="underline"
            >
              いままでに繋がったShiritori NFTをみる
            </a>
          </p>
        </div>
      </div>
      <div className="mt-24 w-full transform xl:mt-28">
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
          {EMOJIS.map((emoji, index) => (
            <SwiperSlide key={index}>
              <EmojiContainer>{emoji}</EmojiContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
