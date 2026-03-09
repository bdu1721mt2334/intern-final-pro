import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [visitors, setVisitors] = useState([]);

  const [total, setTotal] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);

  const [byType, setByType] = useState({});
  const [byPurpose, setByPurpose] = useState({});

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const res = await fetch("http://localhost:5000/api/visitors");
    const data = await res.json();

    setVisitors(data);
    setTotal(data.length);

    const today = new Date().toLocaleDateString();
    setTodayCount(data.filter(v => v.date === today).length);

    const now = new Date();
    setMonthCount(
      data.filter(v => {
        const d = new Date(v.date);
        return d.getMonth() === now.getMonth() &&
               d.getFullYear() === now.getFullYear();
      }).length
    );

    setVehicleCount(
      data.filter(v => v.vehicleNumber && v.vehicleNumber !== "").length
    );

    const typeMap = {};
    const purposeMap = {};

    data.forEach(v => {
      if (v.visitorType)
        typeMap[v.visitorType] = (typeMap[v.visitorType] || 0) + 1;

      if (v.purpose)
        purposeMap[v.purpose] = (purposeMap[v.purpose] || 0) + 1;
    });

    setByType(typeMap);
    setByPurpose(purposeMap);
  };

  const recentVisitors = [...visitors].slice(-5).reverse();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card title="Total Visitors" value={total} color="text-blue-600" />
        <Card title="Today’s Visitors" value={todayCount} color="text-green-600" />
        <Card title="This Month" value={monthCount} color="text-purple-600" />
        <Card title="With Vehicle" value={vehicleCount} color="text-orange-600" />
      </div>

      {/* BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div className="card">
          <h2 className="font-semibold mb-3">Visitor Type-wise</h2>
          {Object.keys(byType).length === 0 && <p>No data</p>}
          {Object.keys(byType).map(t => (
            <p key={t}>{t} : {byType[t]}</p>
          ))}
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">Purpose-wise</h2>
          {Object.keys(byPurpose).length === 0 && <p>No data</p>}
          {Object.keys(byPurpose).map(p => (
            <p key={p}>{p} : {byPurpose[p]}</p>
          ))}
        </div>

      </div>

      {/* RECENT */}
      <div className="card mb-6">
        <h2 className="font-semibold mb-3">Recent Visitors</h2>

        {recentVisitors.length === 0 && <p>No recent visitors</p>}

        {recentVisitors.map((v, i) => (
          <div key={i} className="border-b py-2">
            <p className="font-medium">{v.name}</p>
            <p className="text-sm text-gray-600">{v.date} • {v.time}</p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="card">
        <h2 className="font-semibold mb-3">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <Link to="/add" className="btn">Add Visitor</Link>
          <Link to="/visitors" className="btn">View Visitors</Link>
          <Link to="/reports" className="btn">Reports</Link>
          <Link to="/master" className="btn">Master</Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="card">
      <h2 className="text-sm">{title}</h2>
      <p className={`text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
