import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";

export default function App(root) {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="transactions" element={<Transactions />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);