import mongoose from 'mongoose'

let isConnected = false;

export async function connect() {
    if (isConnected) {
        return;
    }

    try {
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error('MONGO_URL is not defined');
        }

        const options = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(mongoUri, options);
        const connection = mongoose.connection;

        isConnected = connection.readyState === 1;

        connection.on('connected', () => {
            isConnected = true;
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (error) => {
            isConnected = false;
            console.error("MongoDB connection error:", error);
        });

        connection.on('disconnected', () => {
            isConnected = false;
            console.log('MongoDB disconnected');
        });
    } catch (error) {
        isConnected = false;
        console.error('MongoDB connection error:', error);
        throw error;
    }
}