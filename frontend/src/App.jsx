import { Routes,Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import WorkoutHistory from "./pages/WorkoutHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import ReminderPage from "./pages/ReminderPage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<ProtectedRoute> <DashBoard /> </ProtectedRoute>}/>
        <Route path="/history" element={<ProtectedRoute> <WorkoutHistory /> </ProtectedRoute>}/>
        <Route path="/reminders" element={<ProtectedRoute> <ReminderPage /> </ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
