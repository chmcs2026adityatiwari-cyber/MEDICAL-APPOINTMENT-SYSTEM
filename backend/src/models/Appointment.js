import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  appointmentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
