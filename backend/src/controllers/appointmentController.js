import Appointment from "../models/Appointment.js";

export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 });
  res.json(appointments);
};

export const createAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.json(appointment);
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};