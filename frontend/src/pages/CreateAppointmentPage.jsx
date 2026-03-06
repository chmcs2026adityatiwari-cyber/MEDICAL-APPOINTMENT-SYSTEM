import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const CreateAppointmentPage = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    patientName:"",
    age:"",
    disease:"",
    appointmentDate:"",
    contactNumber:"",
    status:"Pending"
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await api.post("/appointments",formData);

      navigate("/");

    }catch(error){
      console.log(error);
    }
  };

  return (

    <div className="max-w-lg mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Create Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
        name="patientName"
        placeholder="Patient Name"
        onChange={handleChange}
        className="w-full border p-2"
        />

        <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
        className="w-full border p-2"
        />

        <input
        name="disease"
        placeholder="Disease"
        onChange={handleChange}
        className="w-full border p-2"
        />

        <input
        type="date"
        name="appointmentDate"
        onChange={handleChange}
        className="w-full border p-2"
        />

        <input
        name="contactNumber"
        placeholder="Contact Number"
        onChange={handleChange}
        className="w-full border p-2"
        />

        <select
        name="status"
        onChange={handleChange}
        className="w-full border p-2"
        >

          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>

        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Appointment
        </button>

      </form>

    </div>
  );
};

export default CreateAppointmentPage;