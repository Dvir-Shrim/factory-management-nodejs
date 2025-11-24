# Node.JS – Final Project: Factory Management System

This is the **backend** of a Factory Management System built using **Node.js**, **Express**, and **MongoDB**.  
The frontend was not implemented; all functionality is available via server-side routes and API endpoints.

## Project Overview

The system allows management of a factory with:

- Employees
- Departments
- Shifts
- Registered users with daily action limits

### Features Implemented

- **User authentication**: JWT-based login with pre-defined users.  
- **Daily action limits**: Each user has a limited number of actions per day; exceeding the limit logs the user out automatically.  
- **Employee management**: Create, read, update, and delete employees.  
- **Department management**: Create, read, update, and delete departments, and assign employees to departments.  
- **Shift management**: Create shifts and allocate employees to shifts (shifts cannot be deleted).  
- **Action logging**: All user actions are logged in a JSON file on the server.

---

## Technologies Used

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- JSON placeholder API for verifying user login  
- JavaScript / Node modules (backend only)

---

## Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/Dvir-Shrim/factory-management-nodejs.git
cd factory-management-nodejs

2. Install dependencies:
npm install

3. Create a .env file with:
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
MAX_ACTIONS=<max-actions-per-day>

4. Start the server:
npm start

The server will run on http://localhost:3000 (or the port specified in your .env).

--

 # Project Structure (Backend)

/controllers
    authController.js
    employeeController.js
    departmentController.js
    shiftController.js
/models
    User.js
    Employee.js
    Department.js
    Shift.js
/routes
    authRoutes.js
    employeeRoutes.js
    departmentRoutes.js
    shiftRoutes.js
/middleware
    authMiddleware.js
/logs
    actionLogs.json
app.js
package.json
.env
