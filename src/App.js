import React, { useState } from 'react';
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Commodity from "./scenes/commodity";
import Sidebar from "./scenes/global/Sidebar";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/Pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Main from "./scenes/main";
import SignIn from './scenes/user/signin';
import Home from './scenes/home';
import './index.css';
import SignUp from './scenes/user/register';
import Complaints from './scenes/complaints';
import Users from './scenes/users';
import CommodityForm from './scenes/commodity/commodity';

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);

  const isHomePath = () => {
    return window.location.pathname === "/home";
  };

  const isSignInPath = () => {
    return window.location.pathname === "/signin";
  };

  const isSignUpPath = () => {
    return window.location.pathname === "/signup";
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className='w-full'>
            {!isSignInPath() && !isHomePath() && !isSignUpPath() && <Topbar setIsSidebar={setIsSidebar} />}
            <main className="content" style={{ display: "flex" }}>
              {isAuthenticated && isSidebar && <Sidebar isSidebar={isSidebar} />}
              <Box flexGrow={1}>
                <Routes>
                {isAuthenticated && (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/commodity" element={<Commodity />} />
                      <Route path="/addcommodity" element={<CommodityForm />} />
                      <Route path="/complaints" element={<Complaints />} />
                      <Route path="/invoices" element={<Invoices />} />
                      <Route path="/form" element={<Form />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/line" element={<Line />} />
                      <Route path="/geography" element={<Geography />} />
                    </>
                  )}
                  <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
              </Routes>
            </Box>
          </main>
        </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
