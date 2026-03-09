import { useEffect, useState } from "react";

export default function Master() {
  const [visitorType, setVisitorType] = useState("");
  const [purpose, setPurpose] = useState("");

  const [visitorTypes, setVisitorTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);

  // ⭐ DEFAULT DATA
  const defaultTypes = ["Employee", "Interview", "Delivery", "Guest", "Vendor"];
  const defaultPurposes = ["Meeting", "Interview", "Delivery", "Maintenance", "Personal"];

  // ⭐ LOAD DATA (first time set default)
  useEffect(() => {
    let types = JSON.parse(localStorage.getItem("visitorTypes"));
    let purp = JSON.parse(localStorage.getItem("purposes"));

    if (!types || types.length === 0) {
      localStorage.setItem("visitorTypes", JSON.stringify(defaultTypes));
      types = defaultTypes;
    }

    if (!purp || purp.length === 0) {
      localStorage.setItem("purposes", JSON.stringify(defaultPurposes));
      purp = defaultPurposes;
    }

    setVisitorTypes(types);
    setPurposes(purp);
  }, []);

  // ⭐ ADD VISITOR TYPE
  const addVisitorType = () => {
    if (!visitorType.trim()) return;

    if (visitorTypes.includes(visitorType)) {
      alert("Already exists");
      return;
    }

    const updated = [...visitorTypes, visitorType];
    setVisitorTypes(updated);
    localStorage.setItem("visitorTypes", JSON.stringify(updated));
    setVisitorType("");
  };

  // ⭐ ADD PURPOSE
  const addPurpose = () => {
    if (!purpose.trim()) return;

    if (purposes.includes(purpose)) {
      alert("Already exists");
      return;
    }

    const updated = [...purposes, purpose];
    setPurposes(updated);
    localStorage.setItem("purposes", JSON.stringify(updated));
    setPurpose("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Master Management</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Visitor Type */}
        <div className="card">
          <h2 className="font-semibold mb-3">Visitor Type Master</h2>

          <div className="flex gap-2 mb-3">
            <input
              value={visitorType}
              onChange={(e) => setVisitorType(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter Visitor Type"
            />
            <button onClick={addVisitorType} className="btn">
              Add
            </button>
          </div>

          <ul className="list-disc ml-5">
            {visitorTypes.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>

        {/* Purpose */}
        <div className="card">
          <h2 className="font-semibold mb-3">Purpose Master</h2>

          <div className="flex gap-2 mb-3">
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter Purpose"
            />
            <button onClick={addPurpose} className="btn">
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
