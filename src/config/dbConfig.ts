import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        connection.on('error', (error) => {
            console.log("MongoDb error make sure it run properly" + error);
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
    }
}