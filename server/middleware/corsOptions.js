const allowedOrigins = [
  process.env.FRONTEND_URL,   
  process.env.ADMIN_URL,
  "http://192.168.1.62:5173"
];

export default {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
