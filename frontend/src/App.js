import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddVisitor from "./pages/AddVisitor";
import VisitorList from "./pages/VisitorList";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Master from "./pages/Master";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute><AddVisitor /></ProtectedRoute>
        } />

        <Route path="/visitors" element={
          <ProtectedRoute><VisitorList /></ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>
        } />

        <Route path="/master" element={
          <ProtectedRoute> <Master /> </ProtectedRoute>
          } />

      </Routes>
    </BrowserRouter>
  );
}
