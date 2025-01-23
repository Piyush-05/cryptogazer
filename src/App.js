import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Overview from "./Routes/Overview";
import History from "./Routes/History";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <BrowserRouter>
      <Provider store={appStore}>
        <div className="App">
          <Header />
          <div className="banner">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/dashboard" />}
                exact
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/overview" element={<Overview />}></Route>
              <Route path="/history" element={<History />}></Route>
            </Routes>
            <Footer />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
