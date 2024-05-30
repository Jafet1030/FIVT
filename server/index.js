import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import { saleRoute } from './routes/saleRoute.js';


dotenv.config()

const app = express();
const PORT= process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/user',userRoute)
app.use("/api/residency",residencyRoute)
app.use('/api/sale', saleRoute);