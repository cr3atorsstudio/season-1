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
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-20 text-[30px] font-bold md:text-[60px]'>
                どんなアプリ？
              </p>
              <p className='text-[10px] font-semibold md:text-[28px] leading-8 w-3/4'>
                このアプリは、誰もが知っている”しりとり”ゲームとジェネラティブアートを組み合わせた『DApp』です。<br/><br/>
                ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。<br/>
                また、言葉をつなげることで、NFTを利用した唯一無二のデジタルアートを手に入れることができます。<br/><br/>
                ”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう😍
              </p>
            </div>

            <p className='absolute left-36 bottom-16 text-[30px] font-bold md:text-[60px] font-nico'>
              01<span className='text-gray-400'>/04</span>
            </p>
          </div>
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-5 text-[30px] font-bold md:text-[60px]'>
                つなげる文字を考えよう！
              </p>
              <div className='flex w-3/4 items-start justify-center'>
                <p className='mt-16 mr-10 text-[10px] font-semibold md:text-[26px] leading-8'>
                  さっそくアプリを使ってみましょう！<br/>
                  ゲームの参加方法はとても簡単です。<br/><br/>
                  上部にある「参加する」ボタンからゲームを始めることができます。<br/>
                  現在のしりとりの最後の単語が表示されているので、その単語の最後のひらがな一文字から始まる別の単語を考えてください。<br/>
                  ゲームの参加者みんなで、できるだけ長いしりとりを作りたいので、次につなげることができない「ん」で終わる単語はダメですよ。
                </p>
                <img
                  src='public/images/shiritori_line.png'
                  alt='shiritori_image'
                  className='ml-10'
                />
              </div>
            </div>

            <p className='absolute left-36 bottom-16 text-[30px] font-bold md:text-[60px] font-nico'>
              02<span className='text-gray-400'>/04</span>
            </p>
          </div>
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-20 text-[30px] font-bold md:text-[60px]'>
                実際につなげてみよう！
              </p>
              <p className='text-[10px] font-semibold md:text-[26px] leading-8 w-3/4'>
                つぎは、考えた単語を入力して、実際に「つなげる」ボタンを押してみましょう！<br/><br/>
                あれ？うまくいきませんでしたか？<br/>
                一般的に存在しない単語や複数の単語から成り立つ単語はつなげることができません。<br/>
                でも、大丈夫。つながるまで何度もトライしてみてください！
              </p>
              <img
                  src='public/images/shiritori_horizon.png'
                  alt='shiritori_image2'
                  className='mt-24'
              />
            </div>

            <p className='absolute left-36 bottom-16 text-[30px] font-bold md:text-[60px] font-nico'>
              03<span className='text-gray-400'>/04</span>
            </p>
          </div>
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-20 text-[30px] font-bold md:text-[60px]'>
                生成された絵を手に入れよう！
              </p>
              <div className='flex w-3/4 items-start justify-center'>
                <p className='mr-10 text-[10px] font-semibold md:text-[26px] leading-8'>
                  しりとりをつなげることができましたか？<br/>
                  おめでとうございます！！<br/><br/>
                  単語がつながったら、あなたの単語からデジタルアートが生成されます。これは、あなただけが持つ唯一無二のデジタルアートです。<br/>
                  ぜひ、いろいろな単語をつなげて、いろいろなデジタルアートを手に入れてみてください。<br/>
                </p>
                <img
                  src='public/images/art.png'
                  alt='shiritori_image'
                  className='ml-10'
                />
              </div>
            </div>

            <p className='absolute left-36 bottom-16 text-[30px] font-bold md:text-[60px] font-nico'>
              04<span className='text-gray-400'>/04</span>
            </p>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default About;
