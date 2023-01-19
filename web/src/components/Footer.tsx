export const Footer = () => {
  return (
    <div className="text-sm md:text-lg">
      <div className="mt-10 flex w-full justify-between bg-white py-10 px-8 font-poppins text-gray-900">
        <span className="text-2xl font-bold">Creators Studio</span>
        <div className="flex">
          <span className="mx-4">
            <a href="https://twitter.com/cr3atorsstudio" target="_blank">
              <img
                src="/images/twitter_color.svg"
                alt="Twitter Logo"
                width={29.72}
                height={24.14}
              />
            </a>
          </span>
          <span className="mx-4">
            <a href="https://www.instagram.com/cr3atorsstudio" target="_blank">
              <img
                src="/images/substack.svg"
                alt="NewsLetter"
                width={28.55}
                height={28.55}
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
