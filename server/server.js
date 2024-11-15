require('dotenv').config()
// console.log(process.env.MONGODB_URI)
const express = require("express");
const app = express();
const cors = require('cors')
const authRouter = require("./routes/auth-routes");
const ConnectDB = require("./DB/connectdb.js");
const errorMiddleware = require('./middleware/error-middleware');
const PORT = process.env.PORT || 8000;


//cors polcy issue
// Proper CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD'], 
  credentials: true, 
};

app.use(cors(corsOptions)); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use(errorMiddleware);

ConnectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})