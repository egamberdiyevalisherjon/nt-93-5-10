import { Routes, Route } from "react-router-dom";
import Private from "./Layout/Private";
import Dashboard from "./Pages/Dashboard";
import EditInfo from "./Pages/EditInfo";
import ChangePassword from "./Pages/ChangePassword";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import CompleteInfo from "./Pages/CompleteInfo";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit-info" element={<EditInfo />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/complete-info" element={<CompleteInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
