const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger-output.json')
//const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connect database
connectDb(process.env.MONGO_URI);

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

//app.use(errorHandler);
// health
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// error handler (last)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));