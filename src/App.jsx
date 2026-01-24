import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Layout/Header";
import { AuthProvider } from "./contexts/AuthContext";
import ChatWidget from "./components/common/ChatWidget";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex-grow pt-0">
          <AppRouter />
          <ChatWidget />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
