import mongoose from "mongoose";

const defaultConnectionString = "mongodb+srv://nagpalkrrish32:NVcKgBPLm0v0fPc0@botcluster.bl3b8af.mongodb.net/?retryWrites=true&w=majority&appName=botCluster";

const connect = (env) => {
    return async (callback) => {
        console.log("hehe");
        mongoose.connection.on("open", () => {
            callback ? callback(null, true) : false;
            console.log("hi there!");
        });
        mongoose.connection.on("error", (error) => {
            callback ? callback(error, false) : false;
            console.log("fail", error);
        });

        await mongoose.connect(defaultConnectionString);
    };
};

const dbConfig = (env) => ({
    connectionString: env.DB_CONNECTION_STRING || defaultConnectionString,
    port: env.DB_PORT || 27017,
    database: env.DB_NAME || "shivaexchange",
    username: env.DB_USER || "admin",
    password: env.DB_PASS || "password",
    host: env.DB_HOST || "localhost",
    connect: connect(env),
});

export default dbConfig;
