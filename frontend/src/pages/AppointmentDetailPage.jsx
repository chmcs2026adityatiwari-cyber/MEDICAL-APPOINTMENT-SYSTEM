import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AppointmentDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {

        const res = await api.get(`/appointments/${id}`);
        setAppointment(res.data);

      } catch (error) {
  console.log(error);
  toast.error("Failed to load appointment");
} finally {

        setLoading(false);

      }
    };

    fetchAppointment();
  }, [id]);

  const handleSave = async () => {

    setSaving(true);

    try {

      await api.put(`/appointments/${id}`, {
        patientName: appointment.patientName,
        age: appointment.age,
        disease: appointment.disease,
        appointmentDate: appointment.appointmentDate,
        contactNumber: appointment.contactNumber,
        appointmentStatus: appointment.appointmentStatus
      });

      toast.success("Appointment updated");
      navigate("/");

    } catch (error) {
  console.log(error);
  toast.error("Failed to load appointment");
} finally {

      setSaving(false);

    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Delete this appointment?")) return;

    try {

      await api.delete(`/appointments/${id}`);

      toast.success("Appointment deleted");
      navigate("/");

    } catch (error) {
  console.log(error);
  toast.error("Failed to load appointment");
}
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-xl mx-auto bg-base-100 shadow-xl p-6 rounded-lg">

        <Link to="/" className="btn btn-sm mb-4">
          Back
        </Link>

        <h2 className="text-2xl font-bold mb-6">
          Edit Appointment
        </h2>

        <input
          type="text"
          placeholder="Patient Name"
          className="input input-bordered w-full mb-3"
          value={appointment.patientName}
          onChange={(e) =>
            setAppointment({ ...appointment, patientName: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Age"
          className="input input-bordered w-full mb-3"
          value={appointment.age}
          onChange={(e) =>
            setAppointment({ ...appointment, age: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Disease"
          className="input input-bordered w-full mb-3"
          value={appointment.disease}
          onChange={(e) =>
            setAppointment({ ...appointment, disease: e.target.value })
          }
        />

        <input
          type="date"
          className="input input-bordered w-full mb-3"
          value={appointment.appointmentDate?.split("T")[0]}
          onChange={(e) =>
            setAppointment({ ...appointment, appointmentDate: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="input input-bordered w-full mb-3"
          value={appointment.contactNumber}
          onChange={(e) =>
            setAppointment({ ...appointment, contactNumber: e.target.value })
          }
        />

        <select
          className="select select-bordered w-full mb-4"
          value={appointment.appointmentStatus}
          onChange={(e) =>
            setAppointment({ ...appointment, appointmentStatus: e.target.value })
          }
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <div className="flex gap-3">

          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default AppointmentDetailPage;