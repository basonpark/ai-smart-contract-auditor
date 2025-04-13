// Add these Process Error Handlers AT THE VERY TOP  
process.on('uncaughtException', (error) => {  
    console.error('UNCAUGHT EXCEPTION:', error);  
    process.exit(1); // Exit gracefully on uncaught exception  
  });  
  
  process.on('unhandledRejection', (reason, promise) => {  
    console.error('UNHANDLED PROMISE REJECTION:', reason);  
    // Optionally log the promise that rejected: console.error(promise);  
    // Consider exiting or handling specific rejections  
    // process.exit(1); // Might exit here depending on the error  
  });  
  

import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auditRoutes from './routes/audit.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001; // Default to 3001 if PORT not set

// Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic Route for Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('AI Smart Contract Auditor Backend is running!');
});

// // API Routes
// app.use('/api/audit', auditRoutes);

// // Global Error Handler (Basic Example)
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// Start Server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 

// Add an error listener specifically for the server starting up  
app.on('error', (error) => {  
    console.error(`[server]: Failed to start server on port ${port}:`, error);  
    process.exit(1); // Exit if the server fails to start (e.g., port in use)  
  });  


// // Add this line temporarily for diagnosis:  
// setInterval(() => { console.log('Server still alive...'); }, 10000); // Log every minute  