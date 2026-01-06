import { useEffect, useState } from "react";

export default function Reports() {
  const [byDate, setByDate] = useState({});
  const [byPurpose, setByPurpose] = useState({});
  const [byType, setByType] = useState({});

  useEffect(() => {
    const visitors =
      JSON.parse(localStorage.getItem("visitors")) || [];

    const dateMap = {};
    const purposeMap = {};
    const typeMap = {};

    visitors.forEach((v) => {
      // Date-wise
      dateMap[v.date] = (dateMap[v.date] || 0) + 1;

      // Purpose-wise
      purposeMap[v.purpose] =
        (purposeMap[v.purpose] || 0) + 1;

      // Visitor Type-wise
      typeMap[v.visitorType] =
        (typeMap[v.visitorType] || 0) + 1;
    });

    setByDate(dateMap);
    setByPurpose(purposeMap);
    setByType(typeMap);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Date-wise Report */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Date-wise Visitors</h2>
        {Object.keys(byDate).map((d) => (
          <p key={d}>{d} : {byDate[d]}</p>
        ))}
      </div>

      {/* Purpose-wise Report */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Purpose-wise Visitors</h2>
        {Object.keys(byPurpose).map((p) => (
          <p key={p}>{p} : {byPurpose[p]}</p>
        ))}
      </div>

      {/* Visitor Type-wise Report */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">Visitor Type-wise</h2>
        {Object.keys(byType).map((t) => (
          <p key={t}>{t} : {byType[t]}</p>
        ))}
      </div>
    </div>
  );
}
