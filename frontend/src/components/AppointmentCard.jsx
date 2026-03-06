import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AppointmentCard = ({ appointment, refreshAppointments }) => {

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    patientName: appointment.patientName,
    age: appointment.age,
    disease: appointment.disease,
    appointmentDate: appointment.appointmentDate?.substring(0,10),
    contactNumber: appointment.contactNumber,
    appointmentStatus: appointment.appointmentStatus
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {

      await api.put(`/appointments/${appointment._id}`, formData);

      toast.success("Appointment updated");
      setEditing(false);
      refreshAppointments();

    } catch (error) {

      console.log(error);
      toast.error("Update failed");

    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Delete this appointment?")) return;

    try {

      await api.delete(`/appointments/${appointment._id}`);

      toast.success("Appointment deleted");
      refreshAppointments();

    } catch (error) {

      console.log(error);
      toast.error("Delete failed");

    }

  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">

      {!editing ? (

        <>
          <h2 className="text-xl font-bold">{appointment.patientName}</h2>

          <p><b>Age:</b> {appointment.age}</p>
          <p><b>Disease:</b> {appointment.disease}</p>
          <p><b>Date:</b> {appointment.appointmentDate?.substring(0,10)}</p>
          <p><b>Contact:</b> {appointment.contactNumber}</p>
          <p><b>Status:</b> {appointment.appointmentStatus}</p>

          <div className="flex gap-2 mt-3">

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className="btn btn-error btn-sm"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>
        </>

      ) : (

        <>
          <input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="input input-bordered mb-2"
          />

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered mb-2"
          />

          <input
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            className="input input-bordered mb-2"
          />

          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="input input-bordered mb-2"
          />

          <input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="input input-bordered mb-2"
          />

          <select
            name="appointmentStatus"
            value={formData.appointmentStatus}
            onChange={handleChange}
            className="select select-bordered mb-3"
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <div className="flex gap-2">

            <button
              className="btn btn-success btn-sm"
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>

          </div>
        </>

      )}

    </div>
  );
};

export default AppointmentCard;