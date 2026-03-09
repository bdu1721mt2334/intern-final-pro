import { useEffect, useState } from "react";

export default function AddVisitor() {
  const [visitorTypes, setVisitorTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
    visitorType: "",
    purpose: ""
  });

  useEffect(() => {
    setVisitorTypes(JSON.parse(localStorage.getItem("visitorTypes")) || []);
    setPurposes(JSON.parse(localStorage.getItem("purposes")) || []);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    const now = new Date();

    const visitorData = {
      ...form,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };

    try {
      await fetch("http://localhost:5000/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorData)
      });

      alert("Visitor saved");

      setForm({
        name: "",
        phone: "",
        vehicleNumber: "",
        visitorType: "",
        purpose: ""
      });

    } catch (err) {
      alert("Error saving visitor");
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gray-100">
    <h2 className="text-xl font-semibold mb-4">Add Visitor</h2>

    <div className="card w-full max-w-md">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Visitor Name"
        className="w-full p-2 border rounded mb-3"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded mb-3"
      />

      <input
        name="vehicleNumber"
        value={form.vehicleNumber}
        onChange={handleChange}
        placeholder="Vehicle Number"
        className="w-full p-2 border rounded mb-3"
      />

      <select
        className="w-full p-2 border rounded mb-3"
        value={form.visitorType}
        onChange={(e) =>
          setForm({ ...form, visitorType: e.target.value })
        }
      >
        <option value="">Select Visitor Type</option>
        {visitorTypes.map((v, i) => (
          <option key={i} value={v}>{v}</option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded mb-4"
        value={form.purpose}
        onChange={(e) =>
          setForm({ ...form, purpose: e.target.value })
        }
      >
        <option value="">Select Purpose</option>
        {purposes.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>

      <button onClick={submit} className="btn w-full">
        Save Visitor
      </button>
    </div>
  </div>
);

}
