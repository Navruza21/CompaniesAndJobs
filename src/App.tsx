import React from "react";
import "./App.css";
import Layoutt from "./components/layout";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Company } from "./pages/Company";
import { Job } from "./pages/Job";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layoutt>
                <Outlet />
              </Layoutt>
            }
          >
            <Route path="/" element={<Navigate to={"./company"} />}></Route>
            <Route path="/company" element={<Company />}></Route>
            <Route path="/job" element={<Job />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
