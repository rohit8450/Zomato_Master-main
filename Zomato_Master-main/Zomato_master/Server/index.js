// import {UserModel} from "./database/allModels";


require('dotenv').config();
import express from "express";
import cors from "cors" ;
import helmet  from "helmet";
import Auth from "./APIs/Auth";
// Database Connection
import ConnectDB from "./database/connection";

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());

//application routes

zomato.use("/auth",Auth);


zomato.listen(4000, () => {
ConnectDB()
  .then(() =>{
      console.log("server is running");
  })

  .catch((error) => {
    console.log("Server is running but database connection failed...");
    console.log(error);
  })
})

