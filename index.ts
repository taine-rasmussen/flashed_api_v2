import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});