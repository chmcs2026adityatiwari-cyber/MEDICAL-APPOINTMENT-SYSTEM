import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateAppointmentPage from "./pages/CreateAppointmentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateAppointmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;