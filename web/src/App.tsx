import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "constants/routes";

const Home = lazy(() => import("pages/Home"));
const HowToPlay = lazy(() => import("pages/HowToPlay"));
const Play = lazy(() => import("pages/Play"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROUTES.TOP} element={<Home />} />
        <Route path={ROUTES.HOWTOPLAY} element={<HowToPlay />} />
        <Route path={ROUTES.PLAY} element={<Play />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

export default App;
