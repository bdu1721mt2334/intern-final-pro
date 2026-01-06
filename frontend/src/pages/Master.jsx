import { useEffect, useState } from "react";

export default function Master() {
  const [visitorType, setVisitorType] = useState("");
  const [purpose, setPurpose] = useState([]);

  const [visitorTypes, setVisitorTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);

  // 🔹 Load existing master data
  useEffect(() => {
    setVisitorTypes(JSON.parse(localStorage.getItem("visitorTypes")) || []);
    setPurposes(JSON.parse(localStorage.getItem("purposes")) || []);
  }, []);

  const addVisitorType = () => {
    if (!visitorType) return;
    const updated = [...visitorTypes, visitorType];
    setVisitorTypes(updated);
    localStorage.setItem("visitorTypes", JSON.stringify(updated));
    setVisitorType("");
  };

  const addPurpose = () => {
    if (!purpose) return;
    const updated = [...purposes, purpose];
    setPurposes(updated);
    localStorage.setItem("purposes", JSON.stringify(updated));
    setPurpose("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Master Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitor Type Master */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold mb-3">Visitor Type Master</h2>

          <div className="flex gap-2 mb-3">
            <input
              value={visitorType}
              onChange={(e) => setVisitorType(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter Visitor Type"
            />
            <button
              onClick={addVisitorType}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <ul className="list-disc ml-5">
            {visitorTypes.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>

        {/* Purpose Master */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold mb-3">Purpose Master</h2>

          <div className="flex gap-2 mb-3">
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter Purpose"
            />
            <button
              onClick={addPurpose}
              className="bg-green-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <ul className="list-disc ml-5">
            {purposes.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
