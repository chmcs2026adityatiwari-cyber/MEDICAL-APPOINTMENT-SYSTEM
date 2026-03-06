import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentNotFound from "../components/AppointmentNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const fetchAppointments = async () => {
    try {

      const res = await api.get("/appointments");
      setAppointments(res.data);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load appointments");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    return (
      a.disease?.toLowerCase().includes(search.toLowerCase()) &&
      (date === "" || a.appointmentDate?.startsWith(date))
    );
  });

  return (
    <div className="min-h-screen bg-base-200">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by Disease..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
            className="input input-bordered"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

        </div>

        {loading && (
          <div className="text-center text-primary py-10">
            Loading appointments...
          </div>
        )}

        {!loading && filteredAppointments.length === 0 && (
          <AppointmentNotFound />
        )}

        {!loading && filteredAppointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredAppointments.map((appointment) => (

              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                refreshAppointments={fetchAppointments}   // ⭐ important for refresh
              />

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default HomePage;