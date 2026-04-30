

const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require('path');

const app = express();


// database connection
mongoose.connect('mongodb://localhost:27017/fileUploadDB')
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// schema and models
const FileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    size: Number,
    hash: String
});

const File = mongoose.model('File', FileSchema);

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage });

// hash function
function generateHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data)=> hash.update(data));
        stream.on('end', ()=>resolve(hash.digest('hex')));
        stream.on('error', reject);
    })
}

//API

app.post('/upload', upload.single('file'), async (req, res)=>{
    try {
        const file = req.file;

        if(!file){
            return res.json({ message: "No file uploaded" });
        }

        const hash = await generateHash(file.path);

        const existing = await File.findOne({ hash });
        if(existing) {
            return re.json({
                message: 'Duplicate file',
                hash
            })
        }

        const newFile = new File({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            hash: hash
        })

        await newFile.save();

        res.json({
            message: 'File uploaded',
            hash: hash
        })
        
    } catch {
        res.status(500).json({ error: err.message })
    }
})

app.get("/", (req, res)=> {
    res.send("App is up and running");
})

app.listen(3000, ()=> console.log("Server running on port http://localhost:3000"))