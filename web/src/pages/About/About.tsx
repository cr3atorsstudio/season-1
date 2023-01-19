import { Carousel } from "flowbite-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { Navbar } from "components/Navbar";
import { Footer } from "components/Footer";

const About = () => {
  return (
    <>
      <div className="mx-2">
        <Navbar />
        <div className="">
          <Carousel
            slide={false}
            leftControl={
              <ArrowLeftCircleIcon className="w-8 md:w-12 md:text-blue-500" />
            }
            rightControl={
              <ArrowRightCircleIcon className="w-8 md:w-12 md:text-blue-500" />
            }
          >
            <div className="relative mx-2">
              <div className="flex flex-col items-center justify-center">
                <p className="mx-10 mt-10 mb-5 font-semibold md:text-[30px]">
                  これはしりとりでブロックチェーン上にあなたと世界の誰かを”繋げる"アプリです
                </p>
                <div className="flex w-3/4 flex-col items-start justify-center md:flex-row">
                  <p className="mt-16 text-[12px] leading-8 md:mr-10 md:text-[24px]">
                    このアプリは、誰もが知っている”しりとり”ゲームとジェネラティブアートを組み合わせた『DApp』です。
                    <br />
                    言葉を繋げることで、唯一無二のジェネラティブNFTを手に入れることができます
                    <br />
                    生成されるNFTは"前の言葉"と"あなたがしりとりで繋げた言葉"が指で繋がったイラストになっています
                    <br />
                    <br />
                    "左手"のアクセサリーが1つ前のしりとりの言葉から、
                    "右手"のアクセサリーがあなたが繋げた言葉から生成されています。
                    <br />
                    <br />
                    ”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう😍
                    <br />
                    使い方は次のページから紹介します！
                  </p>
                  <img
                    src="/images/placeholder.gif"
                    alt="shiritori_image"
                    className="md:ml-10"
                  />
                </div>
                <p className="mt-20 font-nico text-[30px] font-bold">
                  01<span className="text-gray-400">/04</span>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center justify-center">
                <p className="mt-10 mb-5 font-bold md:text-[30px]">
                  つなげる文字を考えよう！
                </p>
                <div className="flex w-3/4 flex-col items-center justify-center md:flex-row">
                  <p className="text-[12px] leading-8 md:mt-16 md:mr-10 md:text-[24px]">
                    さっそくアプリを使ってみましょう！
                    <br />
                    <br />
                    まずは「Wallet Connect」からWalletを接続してください
                    <br />
                    このしりとりゲームではMATICを使用するので用意をお願いします。
                    <br />
                    <br />
                    上部にある「参加する」ボタンからゲームを始めることができます。
                    <br />
                    現在のしりとりの最後の単語が表示されているので、その単語の最後のひらがな一文字から始まる別の単語を考えてください。
                    <br />
                    ゲームの参加者みんなで、できるだけ長いしりとりを作りたいので、次につなげることができない「ん」で終わる単語はダメですよ。
                    <br />
                    ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。
                  </p>
                  <div className="flex justify-center ">
                    <img
                      src="/images/shiritori_line.png"
                      alt="shiritori_image"
                      className="w-1/2 md:ml-10"
                    />
                  </div>
                </div>
                <p className="mt-20 font-nico text-[30px] font-bold">
                  02<span className="text-gray-400">/04</span>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center justify-start md:justify-center">
                <p className="mt-10 mb-20 font-bold md:text-[30px]">
                  実際につなげてみよう！
                </p>
                <div className="flex w-3/4 flex-col items-center justify-center">
                  <p className="w-3/4 text-[10px] leading-8 md:text-[24px]">
                    つぎは、考えた単語を入力して、実際に「つなげる」ボタンを押してみましょう！
                    <br />
                    <br />
                    あれ？うまくいきませんでしたか？
                    <br />
                    一般的に存在しない単語や複数の単語から成り立つ単語はつなげることができません。
                    <br />
                    でも、大丈夫。つながるまで何度もトライしてみてください！
                  </p>
                  <img
                    src="/images/shiritori_horizon.png"
                    alt="shiritori_image2"
                    className="mt-24"
                  />
                  <p className="mt-20 font-nico text-[30px] font-bold">
                    03<span className="text-gray-400">/04</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center justify-center">
                <p className="mt-10 mb-20 font-bold md:text-[30px]">
                  生成されたジェネラティブNFTを手に入れよう！
                </p>
                <div className="flex w-3/4 flex-col items-start justify-center md:flex-row">
                  <p className="Gtext-[12px] leading-8 md:mr-10 md:text-[24px]">
                    しりとりをつなげることができましたか？
                    <br />
                    おめでとうございます！！
                    <br />
                    <br />
                    単語がつながったら、あなたの単語からデジタルアートが生成されます。これは、あなただけが持つ唯一無二のデジタルアートです。
                    <br />
                    NFTは指が繋ぎ合わさったイラストになっています。
                    <br />
                    生成されるNFTはあなたがしりとりで繋げた言葉と前の言葉がつながったものです。
                    <br />
                    "左手"のアクセサリーが1つ前のしりとりの言葉。
                    <br />
                    "右手"のアクセサリーがあなたが繋げた言葉。
                    <br />
                    ぜひ、いろいろな単語をつなげて、いろいろなデジタルアートを手に入れてみてください。
                    <br />
                  </p>
                  <img
                    src="/images/placeholder.gif"
                    alt="shiritori_image"
                    className="md:ml-10"
                  />
                </div>
                <p className="m-10 font-nico text-[30px] font-bold">
                  04<span className="text-gray-400">/04</span>
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
