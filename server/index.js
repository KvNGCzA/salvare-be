import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: false }));

// / catch 404 errors
app.use((req, res) => {
  return res.status(400).json(
    { errors: { path: 'Not Found. Use /api/v1 to access the Api' } },
  );
});

// error handler
app.use((err, req, res) => {
  return res.status(err.status || 500).json({ errors: { [err.name]: err.message } });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))

export default app;
