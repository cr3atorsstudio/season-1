interface Props {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className='mt-20 w-48 rounded-full border-2 border-accent bg-transparent py-4 px-6 font-bold text-white hover:bg-accent md:w-60'
      onClick={onClick}
    >
      <span className='font-nico text-3xl'>{text}</span>
    </button>
  );
};
