import logo from './logo.svg';
import AppRouter from "./routes/routes"
import "./App.css"
import { ToastContainer } from "react-toastify";
import 'animate.css';
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
     <AppRouter />
     <ToastContainer icon={false} autoClose={5000} hideProgressBar={true} />{" "}
    </div>
  );
}

export default App;
