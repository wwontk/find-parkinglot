import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import InnerCon from "./components/common/InnerCon";
import MarketPage from "./pages/MarketPage";
import ParkingLotDetailPage from "./pages/ParkingLotDetailPage";

function App() {
  return (
    <>
      <InnerCon>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market/:marketname" element={<MarketPage />} />
          <Route
            path="/parkinglot/:prkplceNo"
            element={<ParkingLotDetailPage />}
          />
        </Routes>
      </InnerCon>
    </>
  );
}

export default App;
