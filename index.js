const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');

const usersRouter = require('./routers/usersRouter');
const departmentsRouter = require('./routers/departmentsRouter');
const employeesRouter = require('./routers/employeesRouter');
const shiftsRouter = require('./routers/shiftsRouter');
const authRouter = require('./routers/authRouter');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/departments', departmentsRouter);
app.use('/employees', employeesRouter);
app.use('/shifts', shiftsRouter);
app.use('/auth', authRouter);

dotenv.config();
connectDB();

app.listen(PORT, () => {
    console.log(`app is listening at http://localhost:${PORT}`);
});