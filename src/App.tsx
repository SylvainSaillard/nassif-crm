import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import { ClientsPage } from './pages/Clients';
import { TasksPage } from './pages/Tasks';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/calendar" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/documents" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/analytics" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/notifications" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/settings" element={<Dashboard />} /> {/* Placeholder */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
