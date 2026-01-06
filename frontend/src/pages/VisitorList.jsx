import { useEffect, useState } from "react";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/visitors");
      const data = await res.json();
      setVisitors(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Group visitors by date
  const grouped = visitors.reduce((acc, v) => {
    acc[v.date] = acc[v.date] || [];
    acc[v.date].push(v);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Visitor Records</h2>

      <div className="bg-white p-5 rounded shadow">
        {Object.keys(grouped).length === 0 && (
          <p>No visitor records found</p>
        )}

        {Object.keys(grouped).map(date => (
          <div key={date} className="mb-6">
            <h3 className="font-semibold text-blue-600 mb-2">
              📅 {date}
            </h3>

            {grouped[date].map(v => (
              <div key={v._id} className="border-b py-2">
                <p><b>Name:</b> {v.name}</p>
                <p><b>Phone:</b> {v.phone}</p>
                <p><b>Vehicle:</b> {v.vehicleNumber || "-"}</p>
                <p><b>Type:</b> {v.visitorType}</p>
                <p><b>Purpose:</b> {v.purpose}</p>
                <p><b>Time:</b> {v.time}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
