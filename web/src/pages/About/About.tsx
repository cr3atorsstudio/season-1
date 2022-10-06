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
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-20 text-[30px] font-bold md:text-[60px]'>
                どんなアプリ？
              </p>
              <p className='text-[10px] font-semibold md:text-[28px] leading-8 w-3/4'>
                このアプリは、誰もが知っている”しりとり”ゲームとジェネレイティブアートを組み合わせた『DApp』です。<br/><br/>
                ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。<br/>
                さらに、言葉をつなげることで、NFTを利用した唯一無二のデジタルアートを手に入れることができます。<br/><br/>
                どんどん”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう。
              </p>
            </div>

            <p className='absolute left-36 bottom-16 text-[30px] font-bold md:text-[60px] font-nico'>
              01<span className='text-gray-400'>/04</span>
            </p>
          </div>
          <div className='relative h-full'>
            <div className='flex flex-col items-center justify-center'>
              <p className='mt-10 mb-20 text-[30px] font-bold md:text-[60px]'>
                つなげる文字を考えよう！
              </p>
              <p className='text-[10px] font-semibold md:text-[26px] leading-8 w-3/4'>
                このアプリは、誰もが知っている”しりとり”ゲームとジェネレイティブアートを組み合わせた『DApp』です。<br/><br/>
                ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。<br/>
                さらに、言葉をつなげることで、NFTを利用した唯一無二のデジタルアートを手に入れることができます。<br/><br/>
                どんどん”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう。
              </p>
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
                このアプリは、誰もが知っている”しりとり”ゲームとジェネレイティブアートを組み合わせた『DApp』です。<br/><br/>
                ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。<br/>
                さらに、言葉をつなげることで、NFTを利用した唯一無二のデジタルアートを手に入れることができます。<br/><br/>
                どんどん”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう。
              </p>
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
              <p className='text-[10px] font-semibold md:text-[26px] leading-8 w-3/4'>
                このアプリは、誰もが知っている”しりとり”ゲームとジェネレイティブアートを組み合わせた『DApp』です。<br/><br/>
                ゲームの参加者みんなでつなげる”しりとり”は、ブロックチェーン上に保管されます。そして、一度保管された”しりとり”は、後から言葉を入れ替えたり、言葉の繋がりを変えることはできません。<br/>
                さらに、言葉をつなげることで、NFTを利用した唯一無二のデジタルアートを手に入れることができます。<br/><br/>
                どんどん”しりとり”をつなげて、あなただけのデジタルアートを手に入れてみましょう。
              </p>
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
