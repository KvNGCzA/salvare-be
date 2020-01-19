import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import responseMessage from './helpers/responseMessage';
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use(routes);

// / catch 404 errors
app.use((req, res) => {
  return responseMessage({
    res,
    data: {
      errors: {
        path: `${req.path} route not found, please check your request and try again`
      }
    },
    status: 400
  });
});

// error handler
app.use((err, req, res) => {
  return responseMessage({
    res,
    data: { errors: { [err.name]: err.message } },
    status: err.status || 500
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`))

export default app;
