import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import InnerCon from "./components/common/InnerCon";
import MarketPage from "./pages/MarketPage";
import ParkingLotDetailPage from "./pages/ParkingLotDetailPage";
import MyPage from "./pages/MyPage";
import SearchPage from "./pages/SearchPage";

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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </InnerCon>
    </>
  );
}

export default App;
