import express, { Application, Request, Response } from 'express';
import path from 'path';
import router from './routes/studentRoutes'
const app: Application = express();
const port = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON
app.use(express.json());

// Root route to render your EJS file (e.g., index.ejs)
app.use('/',router)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
