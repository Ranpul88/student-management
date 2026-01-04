import mongoose from "mongoose";

mongoURI = process.env.MONGO_URI

let cached = mongoose.global

if(!cached){
    cached = mongoose.global = {conn: null, promise: null}
}

export async function connectDB(){
    if(cached.conn) return cached.conn

    if(!cached.promise){
        cached.promise = mongoose.connect(mongoURI)
        .then((mongoose)=>{
            console.log("Connected to mongoDB Cluster...")
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    }catch(error){
        console.log("Error connecting to mongoDB", error)
    }

    return cached.conn
}