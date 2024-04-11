import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import InnerCon from "./components/common/InnerCon";
import MarketPage from "./pages/MarketPage";

function App() {
  return (
    <>
      <InnerCon>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/market/:marketname" element={<MarketPage />}></Route>
        </Routes>
      </InnerCon>
    </>
  );
}

export default App;
