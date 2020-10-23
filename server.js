const express= require('express');
const mongoose=require("mongoose");
const gravatar=require("gravatar");
const db=require('./config/default').mongoURI;
const app= express();

app.use(express.json({extended:false}));

//connecting  db

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Sucessfully connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
connectDB();

app.get('/',(req,res)=>{
    res.send("API Running");
});

// defining routes
app.use('/auth', require("./routes/api/auth"));
app.use('/api/users', require("./routes/api/users"));
app.use('/api/posts', require("./routes/api/posts"));
app.use('/api/profile', require("./routes/api/profile"));


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server running on port',PORT));