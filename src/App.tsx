import React from "react";
import logo from "./logo.svg";

import { ActionListPage, ActionIntroPage } from "./actions/pages/";
import { LoginPage, RegisterPage, ResetPasswordPage } from "./auth";
import { HomePage } from "./home/pages/HomePage";
import { NotFound } from "./common/components/NotFound";
import { Layout } from "./common/components/Layout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./bootstrap-variables.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { AuthProvider } from "./providers/authProvider";
import { LogoutPage } from "./auth/pages/LogoutPage";
import { PrivateRoutes } from "./common/components/withAuth";
import { useEffect } from "react";
import EventPage from "./event/pages/EventPage";
import ViewEventPage from "event/pages/ViewEventPage";
import CreateEventPage from "./event/pages/CreateEventPage";
import ProfilePage from "./profile/pages/ProfilePage";
import DashboardPage from "./dashboard/pages/DashboardPage";
import SettingsPage from "./settings/page/SettingsPage";
import EvidencePage from "./evidence/page/EvidencePage";
import EditEventPage from "event/pages/EditEventPage";
import ActionBoardPage from "./board/pages/ActionBoardPage";
import PrinciplesSelectorPage from "principles/pages/PrinciplesSelectorPage";
import PrinciplesSelectedPage from "principles/pages/PrinciplesSelectedPage";
import EventReport from "event/pages/EventReport";

function App() {
  useEffect(() => {}, []);
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/actions-intro' element={<ActionIntroPage />} />
              <Route path='/actions' element={<ActionListPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/event' element={<EventPage />} />
              <Route path='/event-report/:id' element={<EventReport />} />
              <Route path='/eventedit/:id' element={<EditEventPage />} />
              <Route path='/eventview/:id' element={<ViewEventPage />} />
              <Route path='/create-event' element={<CreateEventPage />} />
              <Route path='/actionboard' element={<ActionBoardPage />} />
              <Route path='/principlesselector' element={<PrinciplesSelectorPage />} />
              <Route path='/principlesselected' element={<PrinciplesSelectedPage />} />
            </Route>
            <Route path='/' element={<HomePage />} />
            <Route path='/evidence' element={<EvidencePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
