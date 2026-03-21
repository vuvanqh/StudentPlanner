const express = require('express');
const cors = require('cors');

const groupsRoutes = require('./routes/groups');
const ttRoutes = require('./routes/tt');
const usersRoutes = require('./routes/users');
const facultiesRoutes = require('./routes/faculties');
const loginRoutes = require('./routes/login');
const authMiddleware = require('./middleware/auth');
const { initDb } = require('./initDb');

initDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/services/login', loginRoutes);
app.use('/services/users', authMiddleware, usersRoutes);
app.use('/services/groups', authMiddleware, groupsRoutes);
app.use('/services/tt', authMiddleware, ttRoutes);
app.use('/services/faculties', authMiddleware, facultiesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API działa na http://localhost:${PORT}`);
});