export const AppConfig = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
};
