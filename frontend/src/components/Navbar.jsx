import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-white border-b px-6 py-4 flex items-center shadow-sm">

      <div className="flex gap-6 font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/master" className="hover:text-blue-600">Master</Link>
        <Link to="/add" className="hover:text-blue-600">Add Visitor</Link>
        <Link to="/visitors" className="hover:text-blue-600">Visitors</Link>
        <Link to="/reports" className="hover:text-blue-600">Reports</Link>
      </div>

      <div className="ml-auto">
        {user ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            <span className="material-icons text-sm">logout</span>
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            <span className="material-icons text-sm">login</span>
            Login
          </button>
        )}
      </div>

    </div>
  );
}
