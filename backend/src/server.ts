import { app } from './app.js';
import { ENV } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function startServer(): Promise<void> {
  try {
    console.log('--- Starting Portfolio Backend Service ---');
    await connectDatabase();

    const server = app.listen(ENV.PORT, () => {
      console.log(`Server actively running on http://localhost:${ENV.PORT}`);
      console.log(`Health check ready at: http://localhost:${ENV.PORT}/api/health`);
      console.log(`Environment: ${ENV.NODE_ENV}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        console.log('Server and database connections successfully closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
}

startServer();
