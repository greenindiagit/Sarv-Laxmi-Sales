const allowedOrigins = [
  'http://localhost:5173',
  'https://sales.greenindiateam.com',
];

export default {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
