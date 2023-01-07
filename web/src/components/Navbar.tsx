import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <div>
      <nav className="px-2 py-8 sm:px-4">
        <div className="flex flex-nowrap items-center justify-between px-2">
          <div className="flex w-56 items-center">
            <img
              src="/images/creatorsstudio.jpeg"
              alt="Creators Studio Logo"
              className="ml-10 mr-5 h-full rounded-lg object-contain sm:h-11"
            />
            <Link
              className="self-center whitespace-nowrap font-poppins text-xl text-white"
              to={"/"}
            >
              Creators Studio
            </Link>
          </div>
          <div>
            <ul className="ml-auto flex list-none lg:flex-row">
              <li>
                <Link
                  className="flex w-40 items-center px-9 py-2 text-white hover:opacity-75"
                  to={"/about"}
                >
                  遊び方
                </Link>
              </li>
              <li>
                <Link
                  className="flex w-40 items-center px-9 py-2 text-white hover:opacity-75"
                  to={"/play"}
                >
                  やってみる
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-56">
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
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ""}
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
