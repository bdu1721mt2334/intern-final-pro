import { useEffect, useState } from "react";

export default function Reports() {
  const [byDate, setByDate] = useState({});
  const [byPurpose, setByPurpose] = useState({});
  const [byType, setByType] = useState({});

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const res = await fetch("http://localhost:5000/api/visitors");
    const visitors = await res.json();

    const dateMap = {};
    const purposeMap = {};
    const typeMap = {};

    visitors.forEach((v) => {
      dateMap[v.date] = (dateMap[v.date] || 0) + 1;
      purposeMap[v.purpose] = (purposeMap[v.purpose] || 0) + 1;
      typeMap[v.visitorType] = (typeMap[v.visitorType] || 0) + 1;
    });

    setByDate(dateMap);
    setByPurpose(purposeMap);
    setByType(typeMap);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Reports Overview</h1>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* DATE */}
        <div className="card">
          <h2 className="font-semibold mb-4 text-blue-600 border-b pb-2">
            Date-wise Visitors
          </h2>

          {Object.keys(byDate).length === 0 && (
            <p className="text-gray-400">No data</p>
          )}

          {Object.keys(byDate).map((d) => (
            <div
              key={d}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <span>{d}</span>
              <span className="font-semibold">{byDate[d]}</span>
            </div>
          ))}
        </div>

        {/* PURPOSE */}
        <div className="card">
          <h2 className="font-semibold mb-4 text-green-600 border-b pb-2">
            Purpose-wise Visitors
          </h2>

          {Object.keys(byPurpose).length === 0 && (
            <p className="text-gray-400">No data</p>
          )}

          {Object.keys(byPurpose).map((p) => (
            <div
              key={p}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <span>{p}</span>
              <span className="font-semibold">{byPurpose[p]}</span>
            </div>
          ))}
        </div>

        {/* TYPE */}
        <div className="card md:col-span-2">
          <h2 className="font-semibold mb-4 text-purple-600 border-b pb-2">
            Visitor Type-wise
          </h2>

          {Object.keys(byType).length === 0 && (
            <p className="text-gray-400">No data</p>
          )}

          {Object.keys(byType).map((t) => (
            <div
              key={t}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <span>{t}</span>
              <span className="font-semibold">{byType[t]}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
