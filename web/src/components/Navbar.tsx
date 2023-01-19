import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <div className="text-sm md:text-lg">
      <nav className="px-2 py-8 sm:px-4">
        <div className="flex w-full flex-nowrap items-center justify-between md:px-2">
          <div className="flex w-10 items-center md:w-56">
            <img
              src="/images/creatorsstudio.jpeg"
              alt="Creators Studio Logo"
              className="mr-5 h-full rounded-lg object-contain sm:h-11 md:ml-10"
            />
            <Link
              className="hidden self-center whitespace-nowrap font-poppins text-xl text-white md:block"
              to={"/"}
            >
              Creators Studio
            </Link>
          </div>
          <div>
            <ul className="ml-auto flex list-none lg:flex-row">
              <li>
                <Link
                  className="flex items-center py-2 px-2 text-white hover:opacity-75 md:w-40 md:px-9"
                  to={"/about"}
                >
                  遊び方
                </Link>
              </li>
              <li>
                <Link
                  className="md:w-50 flex items-center py-2 text-white hover:opacity-75 md:px-9"
                  to={"/play"}
                >
                  やってみる
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-80">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="rounded-3xl border border-accent p-3"
                          >
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      if (connected) {
                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            <button
                              onClick={openChainModal}
                              style={{ display: "flex", alignItems: "center" }}
                              type="button"
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: "hidden",
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? "Chain icon"}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button onClick={openAccountModal} type="button">
                              {account.displayName}
                              {account.displayBalance ? (
                                <div className="hidden md:block">
                                  (${account.displayBalance})
                                </div>
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        );
                      }
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </nav>
    </div>
  );
};
