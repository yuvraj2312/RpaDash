import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import LivePage from "./pages/LivePage";
import AdhocTrigger from "./pages/AdhocTrigger";
import LoginPage from "./pages/LoginPage";
import UseCase from "./pages/UseCase";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new-request" element={<NewRequest />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/adhoc-trigger" element={<AdhocTrigger />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/usecase-analytics" element={<UseCase />} />
    </Routes>
  );
}

export default App;
