type Props = {
  children?: React.ReactNode;
};

export const EmojiContainer = ({ children }: Props) => {
  return (
    <div className='bg-white rounded-[10px] w-14 h-14 md:w-20 md:h-20 lg:w-28 lg:h-28 flex justify-center items-center'>
      <span className='text-[30px] md:text-[40px] lg:text-[65px]'>
        {children}
      </span>
    </div>
  );
};
