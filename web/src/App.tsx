import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { LoadingSpinner } from "components/Spinner";

import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const Home = lazy(() => import("pages/Home/Home"));
const About = lazy(() => import("pages/About/About"));
const Play = lazy(() => import("pages/Play/Play"));

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Shiritori Art",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      coolMode
      theme={darkTheme({
        accentColor: "#CB2BF3",
        accentColorForeground: "white",
        borderRadius: "small",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path={ROUTES.TOP} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.PLAY} element={<Play />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

export default App;
