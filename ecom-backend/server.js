// server.js
const { sequelize } = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5001;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });  // Ensure alter is only for development
    })
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database connection failed:', err));
