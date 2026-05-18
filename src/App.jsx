import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTutor from "./pages/AddTutor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="add-tutor" element={<AddTutor />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;