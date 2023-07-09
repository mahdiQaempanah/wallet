import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";
import MainPage from "./pages/MainPage";
import ReportPage from "./pages/ReportPage";
import BudgetPage from "./pages/Budget";

export default function App(root) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="transactions" element={<Transactions />} />        <Route path="/home/*" element={<MainPage />} />
        <Route path="/report/*" element={<ReportPage />} />
        <Route path="/budget/*" element={<BudgetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);