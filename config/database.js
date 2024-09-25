import mongoose from 'mongoose';

let connected = false

const dbConnect = async () => {
    mongoose.set('strictQuery', true)

    if(connected){
        console.log(`DATABASE : 'connected'`)
        return
       } else {
        console.log(`DATABASE : 'not connected'`);
       }

    try {
       await mongoose.connect(process.env.MONGO_DB)
        connected = true
       
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect