import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Medical Appointment System</h1>

        <Link
          to="/create"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          + New Appointment
        </Link>
      </div>
    </div>
  );
};

export default Navbar;