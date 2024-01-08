const mongoose = require('mongoose')  
// Set the strictQuery option
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            });
        console.log(`Database Running!!! ${conn.connection.host}`);
    }catch(err){
        console.log(err.message);
    }
};

module.exports = { connectDB };