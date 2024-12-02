import User from "../models/userModel.js";
import Assignment from "../models/assignmentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user/admin
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //check username if already exist in database
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists." });
    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // Default to "user" if role is not provided
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user." });
  }
};

// Login a user/admin with username and password
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Failed to login." });
  }
};

// Upload an assignment (user only)
export const uploadAssignment = async (req, res) => {
  try {
    const { task, admin } = req.body;
    const userId = req.user.id;

    const assignment = await Assignment.create({ userId, task, admin });
    return res
      .status(201)
      .json({ message: "Assignment uploaded.", assignment });
  } catch (error) {
    return res.status(500).json({ error: "Failed to upload assignment." });
  }
};

//fetch all admins--GET/admins-(user only)
export const viewAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admins found." });
    }

    return res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    return res.status(500).json({ error: "Failed to fetch admins." });
  }
};

// View all assignments (admin only)
export const viewAssignments = async (req, res) => {
  try {
    // Assuming the admin's username is stored in req.user.username (set during authentication)
    const adminUsername = req.user.username;

    // Fetch assignments tagged to this admin
    const assignments = await Assignment.find({ admin: adminUsername });

    if (!assignments || assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No assignments tagged for this admin." });
    }

    return res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    return res.status(500).json({ error: "Failed to fetch assignments." });
  }
};

// Update assignment status (admin only)
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found." });
    //check for invalid status
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Please use 'Accepted' or 'Rejected'",
      });
    }
    // Update status of the assignment and save it to the database
    assignment.status = status;
    const updatedStatus = await assignment.save();
    return res.status(200).json({
      message: "Assignment status updated.",
      assignment: updatedStatus,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update assignment status." });
  }
};
