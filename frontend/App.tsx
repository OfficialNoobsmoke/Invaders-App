import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { UserContextProvider } from './src/context/UserContextProvider';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import { ProtectedRoute } from './src/features/ProtectedRoute';
import { NotFound } from './src/pages/NotFound';
import AppLayout from './src/layouts/AppLayout';
import Characters from './src/pages/Characters';
import Profile from './src/pages/Profile';
import { AuthenticationContextProvider } from './src/context/AuthenticationContextProvider';
import CharacterDetails from './src/pages/CharacterDetails';
import { ApplicationDataContextProvider } from './src/context/ApplicationDataContextProvider';
import RaidSchedule from './src/pages/RaidSchedule';
import RaidSessionDetails from './src/pages/RaidSessionDetails';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthenticationContextProvider>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            element={
              <UserContextProvider>
                <ApplicationDataContextProvider>
                  <AppLayout />
                </ApplicationDataContextProvider>
              </UserContextProvider>
            }>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/characters"
              element={
                <ProtectedRoute>
                  <Characters />
                </ProtectedRoute>
              }
            />
            <Route
              path="/character-details"
              element={
                <ProtectedRoute>
                  <CharacterDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/raid-schedule"
              element={
                <ProtectedRoute>
                  <RaidSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/raid-session-details"
              element={
                <ProtectedRoute>
                  <RaidSessionDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </AuthenticationContextProvider>
    </BrowserRouter>
  );
};

export default App;
