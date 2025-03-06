const db = require('../config/db');

// Fetch Patients from Open Dental DB
exports.getPatients = async (req, res) => {
    try {
        const [patients] = await db.query('SELECT PatNum, LName, FName, Birthdate, Email FROM patient LIMIT 100');
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patients from Open Dental' });
    }
};

// Fetch Appointments from Open Dental DB
exports.getAppointments = async (req, res) => {
    try {
        const [appointments] = await db.query(`
            SELECT AptNum, PatNum, AptDateTime, ProvNum, Op, ProcDescript
            FROM appointment
            WHERE AptDateTime >= NOW()
            ORDER BY AptDateTime ASC
            LIMIT 100
        `);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments from Open Dental' });
    }
};

// Insert New Appointment into Open Dental DB
exports.createAppointment = async (req, res) => {
    const { PatNum, AptDateTime, ProvNum, Op, ProcDescript } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO appointment (PatNum, AptDateTime, ProvNum, Op, ProcDescript) VALUES (?, ?, ?, ?, ?)',
            [PatNum, AptDateTime, ProvNum, Op, ProcDescript]
        );

        res.json({ message: 'Appointment created', appointmentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};
