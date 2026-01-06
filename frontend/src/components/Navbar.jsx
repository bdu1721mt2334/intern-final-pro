import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 text-white px-6 py-4 flex items-center">

      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/master" className="hover:underline">Master</Link> {/* ✅ ADD THIS */}
        <Link to="/add" className="hover:underline">Add Visitor</Link>
        <Link to="/visitors" className="hover:underline">Visitors</Link>
        <Link to="/reports" className="hover:underline">Reports</Link>
      </div>

      <div className="ml-auto">
        <button
          onClick={logout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold shadow"
        >
          Logout
        </button>
      </div>

    </div>
  );
}
