import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import LivePage from "./pages/LivePage";
import AdhocTrigger from "./pages/AdhocTrigger";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new-request" element={<NewRequest />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/adhoc-trigger" element={<AdhocTrigger />} />
    </Routes>
  );
}

export default App;
