const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'Umesh'
    // defining schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

const folderSchema = new mongoose.Schema({
    foldername: String,
    wallpaper: String,
    madeat: Date,
    madeby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const filesSchema = new mongoose.Schema({
        image: String,
        uploadedby: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
        uploadedat: Date
    })
    // Define mongoose models
const User = mongoose.model('User', userSchema);
const Folder = mongoose.model('Folder', folderSchema)
const Files = mongoose.model('Files', filesSchema);


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// connecting 
mongoose.connect('mongodb+srv://umeshola07:VXxtq6se2CnE5Jok@cluster0.dnc0pbe.mongodb.net/Space');

app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            if (password === user.password) {
                const token = jwt.sign({ username: user.username, email: user.email }, SECRET);
                res.status(201).json({ message: 'User logged in successfully', token });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            user = new User({ username: name, email, password });
            await user.save();
            const token = jwt.sign({ username: user.username, email: user.email }, SECRET);
            res.status(201).json({ message: 'User created successfully', token });
        }
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/data', auth, async(req, res) => {
    const data = await User.findOne({ username: req.user.username, email: req.user.email })
    if (data) {
        res.status(200).json({ "username": req.user.username, "email": req.user.email })
    } else {
        res.status(405);
    }
})
app.post('/addfolder', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const { foldername, wallpaper } = req.body;
    if (user) {
        const folder = new Folder({ foldername, wallpaper, madeat: Date(), madeby: user._id })
        await folder.save();
        res.status(201).json("added");
    } else {
        res.status(401).json("user don't exists")
    }
})
app.get('/get_all_folder', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    if (user) {
        const data = await Folder.find({ madeby: user._id }); // Change from findAll to find
        res.status(201).json({ data }); // Change status code to 200 and send data as an object
    } else {
        res.status(401).json("user doesn't exist");
    }
});
app.get('/get_folder_name/:folderid', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const folderid = req.params.folderid
    if (user) {
        const data = await Folder.find({ _id: folderid })
        res.status(201).json({ data })

    } else {
        res.status(401).json("User don't exist")
    }
})

app.post('/addfile', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const { folderid, image } = req.body;
    if (user) {
        const file = new Files({ image, uploadedby: folderid, uploadedat: Date() });
        await file.save();
        res.status(201).json("Done adding file");
    } else {
        res.status(401).json("User don't exist")
    }
})
app.put('/deletefolder', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const { folderid } = req.body;
    if (user) {
        try {
            await Files.deleteMany({ uploadedby: folderid });
            await Folder.deleteOne({ _id: folderid });
            res.status(201).json("deleted");
        } catch (error) {
            console.error("Error deleting folder and files:", error);
            res.status(500).json("Internal server error");
        }
    } else {
        res.status(401).json("user don't exist");
    }
});


app.put('/deleteimage', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const { imageid } = req.body;
    if (user) {
        await Files.deleteOne({ _id: imageid })
        res.status(201).json("deleted")
    } else {
        res.status(401).json("user don't exist")
    }
})

app.get('/get_all_files/:folderid', auth, async(req, res) => {
    const user = await User.findOne({ username: req.user.username, email: req.user.email });
    const folderid = req.params.folderid
    if (user) {
        const data = await Files.find({ uploadedby: folderid })
        res.status(201).json({ "data": data })

    } else {
        res.status(401).json("User don't exist")
    }
})
app.listen(3000, () => console.log('Server running on port 3000'));