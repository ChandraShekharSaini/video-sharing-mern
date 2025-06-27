import mongoose from "mongoose"
const connectDB = async (): Promise<void> => {

    try {
        const con = await mongoose.connect(process.env.MONGODB_URL as string, {
            dbName: "Reelix",
            appName: "Reelix"
        })

        console.log("Database Connected");

    } catch (error) {
        console.log(`Error in connecting to Db ${error}`);

        process.exit(1);
    }
}

export default connectDB