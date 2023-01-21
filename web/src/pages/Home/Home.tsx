import { Navbar } from "components/Navbar";
import { EmojiContainer } from "components/EmojiContainer";
import { EMOJIS } from "constants/emoji";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import abi from "../../utils/Shiritori.json";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper";

import { useWindowSize } from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "constants/contract";
import { ShiritoriNftContainer } from "components/ShiriitoriNftContainer";
import { Footer } from "components/Footer";

const Home = () => {
  const width = useWindowSize();
  const { ethereum } = window;

  const [tokenId, SetTokenId] = useState();

  useEffect(() => {
    const getToken = async () => {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const contractABI = abi.abi;
        const shiritori = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );

        const tokenId = await shiritori.nextTokenId();
        console.log(tokenId.toNumber());
        SetTokenId(tokenId.toNumber());
      }
    };
    getToken();
  }, [ethereum]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 mb-10 text-[20px] md:mt-28 md:text-[36px]">
          <p>しりとりであなたと世界を”繋げる"</p>
        </div>

        <a
          href="https://rarible.com/shiritorinft"
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
          <p className="text-md mx-4 mt-16 leading-10 md:mr-10 md:text-[20px]">
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
          </p>
        </div>
        <div className="my-24 flex flex-col items-center justify-center  ">
          <a
            href="https://rarible.com/shiritorinft"
            target="_blank"
            className="text-center font-poppins text-[30px] font-bold text-white md:text-6xl"
          >
            Shiritori NFTs
          </a>
          <p className="leading-10 md:mr-10 md:mt-16 md:text-[20px]">
            これまでに繋がったShiritori NFT
          </p>
          {tokenId && (
            <div className=" mt-10 flex flex-wrap justify-center md:w-3/4">
              {[...Array(tokenId - 1)].map((_, index) => {
                return (
                  <ShiritoriNftContainer>
                    <a
                      target="_blank  "
                      href={`https://rarible.com/token/polygon/${contractAddress}:${
                        index + 1
                      }`}
                    >
                      <img
                        src={`https://${
                          import.meta.env.VITE_BUCKET_NAME
                        }.s3.us-east-1.amazonaws.com/v2/images/${
                          index + 1
                        }.png`}
                        alt=""
                      />
                    </a>
                  </ShiritoriNftContainer>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <section>
        <div className="flex flex-col items-center">
          <h1 className="my-6 text-center font-poppins text-[30px] font-bold text-white md:text-6xl">
            Tutorial
          </h1>
          <div className="">
            <iframe
              className="md:h-[380px] md:w-[800px]"
              src="https://www.youtube.com/embed/jjyHo5hmuSw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <section>
        <div className="font-sans-serif p-8 text-gray-900">
          <h1 className="my-10 text-center font-poppins text-[30px] font-bold text-white md:text-6xl">
            Team
          </h1>
          <div className="flex flex-col items-center justify-center text-center md:flex-row">
            <div className="flex flex-col items-center">
              <img src="/images/riho.png" width={480} height={480} />
              <span className="font-poppins text-lg font-bold text-white">
                Riho
              </span>
              <span className="mb-1 block font-poppins text-white">
                Software Engineer / Founder
              </span>
              <a href="https://twitter.com/rllllho" target="_blank">
                <img
                  src="/images/twitter.svg"
                  alt="Twitter Logo"
                  width={29.72}
                  height={24.14}
                />
              </a>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/risa.png" width={480} height={480} />
              <span className="font-poppins text-lg font-bold text-white">
                Risa
              </span>
              <span className="mb-1 block font-poppins  text-white">
                Software Developer / wannabe crypto witch
              </span>
              <a href="https://twitter.com/risacan_eth" target="_blank">
                <img
                  src="/images/twitter.svg"
                  alt="Twitter Logo"
                  width={29.72}
                  height={24.14}
                />
              </a>
            </div>
            <div className="flex flex-col items-center text-white">
              <img src="/images/miho.png" width={480} height={480} />
              <span className="font-poppins text-lg font-bold">Miho</span>
              <span className="mb-1 block font-poppins  text-white">
                Software Developer
              </span>
              <a href="https://twitter.com/pluto_04" target="_blank">
                <img
                  src="/images/twitter.svg"
                  alt="Twitter Logo"
                  className="text-white"
                  width={29.72}
                  height={24.14}
                />
              </a>
            </div>
            <div className="flex flex-col items-center text-white">
              <img src="/images/maoh.png" width={480} height={480} />
              <span className="font-poppins text-lg font-bold">Mami</span>
              <a href="https://twitter.com/maoh_design" target="_blank">
                <img
                  src="/images/twitter.svg"
                  alt="Twitter Logo"
                  className="text-white"
                  width={29.72}
                  height={24.14}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
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
      <Footer />
    </>
  );
};

export default Home;
