export const Navbar = () => {
  return (
    <div>
      <nav className="px-2 py-8 sm:px-4">
        <div className="justify-between items-center px-2 flex flex-nowrap">
          <a className="flex w-56 items-center" href="">
            <img 
              src="public/images/creatorsstudio.jpeg"
              alt="Creators Studio Logo"
              className="ml-10 mr-5 sm:h-11 object-contain h-full rounded-lg"
            />
            <span className="self-center text-xl whitespace-nowrap text-white" >Creators Studio</span>
          </a>
          <div>
            <ul className="flex lg:flex-row list-none ml-auto">
              <li>
                <a className="flex w-40 px-9 py-2 items-center text-white hover:opacity-75">説明</a>
              </li>
              <li>
                <a className="flex w-40 px-9 py-2 items-center text-white hover:opacity-75">参加する</a>
              </li>
            </ul>
          </div>
          <div className="w-56">
            <button className="bg-transparent text-white py-2 px-4 border border-pink-400 rounded-full" >ウォレット接続</button>
          </div>
        </div>
      </nav>
    </div>
  );
};
