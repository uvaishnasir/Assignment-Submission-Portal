### **Assignment Submission Portal**

This is a backend application for an **Assignment Submission Portal**. The portal allows users to upload assignments and enables admins to manage assignments by accepting or rejecting them. It is built with **Node.js**, **Express**, and **MongoDB**.

---

### **Features**
- **User functionality**:
  - Register and log in.
  - Upload assignments tagged to specific admins.
- **Admin functionality**:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.

---

### **Technologies Used**
- **Node.js** - JavaScript runtime environment.
- **Express.js** - Web framework for Node.js.
- **MongoDB** - NoSQL database.
- **Mongoose** - MongoDB ODM for Node.js.
- **JWT** - Authentication using JSON Web Tokens.
- **bcrypt.js** - Password hashing.

---

### **Folder Structure**
```
Assignment-Submission-Portal/
│
├── models/
│   ├── userModel.js         # User model (for users and admins)
│   ├── assignmentModel.js   # Assignment model
│
├── controllers/
│   ├── userController.js     # Controllers for user and admin operations
│
├── routes/
│   ├── userRoutes.js         # User and admin routes
│
├── middlewares/
│   ├── authMiddleware.js     # Middleware for authentication and authorization
│
├── DB/
│   ├── db.js                 # MongoDB connection configuration
│
├── .env                      # Environment variables
├── .gitignore                # Files/directories to ignore in Git
├── package.json              # Project metadata and dependencies
├── README.md                 # Project documentation
└── server.js                 # Main application entry point
```

---

### **Setup and Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/Assignment-Submission-Portal.git
cd Assignment-Submission-Portal
```

#### **2. Install Dependencies**
```bash
npm install
```

#### **3. Configure Environment Variables**
Create a `.env` file in the root of the project and add the following:
```plaintext
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### **4. Run the Server**
Start the development server:
```bash
node server.js or nodemon server.js
```
The server will run at `http://localhost:5000`.

---

### **API Endpoints**

#### **User Endpoints**
- `POST /api/register` - Register a new user.
- `POST /api/login` - User login.
- `POST /api/upload` - Upload an assignment.
- `GET /api/admins` - Fetch all available admins.

#### **Admin Endpoints**
- `POST /api/register` - Register a new admin.
- `POST /api/login` - Admin login.
- `GET /api/assignments` - View assignments tagged to the admin.
- `PATCH /api/admins/assignment/:id` - Accept/Reject an assignment.
---

### **Database Models**

#### **User Model**
```javascript
{
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  }
```

#### **Assignment Model**
```javascript
{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    admin: {
      type: String,     //username of the admin
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  }
```
