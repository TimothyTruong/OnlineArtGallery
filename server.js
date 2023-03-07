import express from 'express';
const app = express();

import session from 'express-session';
import {default as connectMongoDBSession} from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);

let store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/comp2406a5',
    collection: 'sessions'
});

app.use(session(
    {
        secret: 'secret key lol',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

import logger from 'morgan';
import pkg from 'mongoose';

pkg.set('strictQuery', false);

const {connect, Types} = pkg;

app.use(express.urlencoded({extended: true}));

import Artwork from './models/artworkModel.js';
import User from './models/userModel.js';
import Workshop from './models/workshopModel.js';
import Review from './models/reviewModel.js';

const PORT = 3000;
const ROOT_DIR_JS = '/public/js';

let host = ["localhost","YOUR_OPENSTACK_IP"];

app.use(logger('dev'));

app.use(express.static('.' + ROOT_DIR_JS));
app.use(express.json()); //auto convert json to object

app.set('views', './views');
app.set('view engine', 'pug');

//Paths
app.get(['/','login'],(req,res) => {
    if(req.session.loggedIn == true){
        res.redirect('/home');
    }else {
        res.render('pages/login', {session: req.session});
    }
});

app.post(['/','/login'], async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const search = await User.findOne({username: username});

        if(search == null){
            console.log("Unable to find user");
            res.status(401).json({'error': "Unable to find user"});
        }
        else {
            if(search.password != password){
                console.log("Incorrect password");
                res.status(401).json({'error': "Incorrect password"});
            }
            else {
                req.session.loggedIn = true;
                req.session.user = search;
                console.log(req.session.user.name);
                res.status(200).send();
            }
        }
    } catch(err){
        console.log(err);
        res.status(500).json({'error': "Internal server error"});
    }
});

app.get('/register', (req,res) => {
    if(req.session.loggedIn == true){
        res.redirect('/home');
    }
    else {
        res.render('pages/register', {session: req.session});
    }
});

app.post('/register', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;

    if(await User.findOne({username: username}) != null){
        console.log("Username already exists");
        res.status(401).json({'error': "Username already exists"});
    }
    else {
        let userid = await User.countDocuments();
        let user = new User({userid: userid, username: username, password: password, name: name});
        await user.save();
        req.session.loggedIn = true;
        req.session.user = user;
        res.status(200).send();
    }
});

app.get('/home', async (req,res) => {
    if(req.session.loggedIn == true){
        let following = [];
        for(let i = 0; i < req.session.user.following.length; i++){
            let user = await User.findOne({userid: req.session.user.following[i]});
            following.push(user);     
        }
        res.render('pages/home', {session: req.session, following: following});
    }
    else {
        res.redirect('/');
    }
});

app.get('/artist/:id', async (req,res) => {
    if(req.session.loggedIn == true){
        let artist = await User.findOne({userid: req.params.id});
        let workshops = await Workshop.find({hostedBy: artist.username})

        if(artist.accType == 'artist'){
            let artworks = [];
            for(let i = 0; i < artist.artworks.length; i++){
                let artwork = await Artwork.findOne({name: artist.artworks[i]});
                artworks.push(artwork);
            }


            res.render('pages/artist', {session: req.session, artist: artist, artworks: artworks, workshops: workshops});
        }
        else {
            res.redirect('/home');
        }  
    }
    else {
        res.redirect('/');
    }
});

app.get('/enroll/:id', async (req,res) => {
    if(req.session.loggedIn == true){
        let workshop = await Workshop.findOne({_id: req.params.id});
        if(workshop.enrolled == undefined){
            workshop.enrolled = [];
        }
        workshop.enrolled.push(req.session.user.username);
        await Workshop.updateOne({_id: req.params.id}, workshop);
        await workshop.save();

        res.redirect('../activity');
    }
    else {
        res.redirect('/');
    }
});

app.get('/like/:id', async (req,res) => {
    if(req.session.loggedIn == true){
        let artid = req.params.id;
        let artwork = await Artwork.find({_id: artid});
        
        if(artwork.likes == undefined){
            artwork.likes = [];
        }
        if(req.session.user.liked == undefined){
            req.session.user.liked = [];
        }

        if(req.session.user.liked.includes(artid)){
            artwork.likes = artwork.likes.filter(item => !req.session.user.username.includes(item));
            req.session.user.liked = req.session.user.liked.filter(item => !artid.includes(item));
        }
        else {
            artwork.likes.push(req.session.user.username);
            req.session.user.liked.push(artid);

        }
        //update database
        await User.updateOne({userid: req.session.user.userid}, {liked: req.session.user.liked});
        await Artwork.updateOne({_id: artid}, {likes: artwork.likes});
        res.redirect('../artwork/' + artid);
    }   
    else {
        res.redirect('/');
    }
});

app.get('/follow/:id', async (req,res) => {
    if(req.session.loggedIn == true){
        if(req.session.user.following.includes(req.params.id)){
            return;
        }
        req.session.user.following.push(req.params.id);
        await User.updateOne({userid: req.session.user.userid}, {following: req.session.user.following});

        res.redirect("../home")
    }
    else {
        res.redirect('/');
    }
});

app.get('/unfollow/:id', async (req,res) => {
    if(req.session.loggedIn == true){
        req.session.user.following.splice(req.session.user.following.indexOf(req.params.id),1);
        await User.updateOne({userid: req.session.user.userid}, {following: req.session.user.following});

        res.redirect("../home")
    }
    else {
        res.redirect('/');
    }
});

app.get('/profile',(req,res) => {
    if(req.session.loggedIn == true){
        res.render('pages/profile', {session: req.session});
    }
    else {
        res.redirect('/');
    }
});

app.post('/editAccount', async (req,res) => {
    if(req.session.loggedIn == true){
        let username = req.session.user.username;
        let accType = req.body.accType;
        
        await User.updateOne({username: username}, {accType: accType});
        req.session.user.accType = accType;
        res.redirect('/home');
    }
    else {
        res.redirect('/');
    }
});

app.get('/artwork/:id', async (req,res) => {
    if(req.session.loggedIn){
        let artwork = await Artwork.findOne({_id: req.params.id});
        let reviews = [];
        let artist = await User.findOne({username: artwork.artist})
        if(artist == null){
            res.render('pages/notFound');
            return;
        }

        for(let i = 0; i < artwork.reviews.length; i++){
            let review = await Review.findOne({_id: artwork.reviews[i]}); //search for review with id
            if(review == null){
                continue;
            }
            reviews.push(review);
        }
        res.render('pages/artwork', {session: req.session, artwork: artwork , reviews: reviews, artist: artist});
    }
    else {
        res.redirect('/');
    }
});

app.post('/addReview', async (req,res) => {
    if(req.session.loggedIn == true){
        let review = req.body;
        
        let artwork = await Artwork.findOne({_id: review.artid});

       
        if(artwork.reviews == undefined){
            artwork.reviews = [];
        }

        let newReview = new Review({artwork: review.artid, username: review.username, reviewText: review.reviewText});
        await newReview.save();
        artwork.reviews.push(newReview._id);
        await Artwork.updateOne({_id: review.artid}, {reviews: artwork.reviews});

        res.status(200).send();
    }
    else {
        res.redirect('/');
    }
});

app.post('/deleteReview', async (req,res) => {
    if(req.session.loggedIn == true){
        let review = req.body;
        let artwork = await Artwork.findOne({_id: review.artid});
        artwork.reviews = artwork.reviews.filter(item => !review.reviewText.includes(item));
        await Artwork.updateOne({_id: review.artid}, {reviews: artwork.reviews});
        await Review.remove({reviewText: review.reviewText});
        
        res.status(200).send();
    }
    else {
        res.redirect('/');
    }
});

app.get('/addArtwork', (req,res) => {
    if(req.session.loggedIn == true){
        res.render('pages/addArtwork', {session: req.session});
    }
    else {
        res.redirect('/');
    }
});

app.post('/addArtwork', async (req,res) => {
    if(req.session.loggedIn == true){
        let newArtwork = req.body;
        
        //check if name already exists
        let result = await Artwork.findOne({name: newArtwork.name});
        
        if(result != null){
            res.status(400).send({"error" : "Artwork name already exists"});
            return;
        }
        else {
            let artwork = new Artwork({name: newArtwork.name, artist: newArtwork.artist, year: newArtwork.year, medium: newArtwork.medium, category: newArtwork.category, description: newArtwork.description, image: newArtwork.image});
            await artwork.save();
            res.status(200).send();
        }
    }
});

app.get('/createWorkshop', (req,res) => {
    if(req.session.loggedIn == true){
        res.render('pages/createWorkshop', {session: req.session});
    }
    else {
        res.redirect('/');
    }
});

app.post('/createWorkshop', async (req,res) => {
    if(req.session.loggedIn == true){
        let newWorkshop = req.body;
        let workshop = new Workshop({title: newWorkshop.title, description: newWorkshop.description, date: newWorkshop.date, hostedBy: newWorkshop.hostedBy})
        await workshop.save();
        res.status(200).send();
    }
    else {
        res.redirect('/');
    }
});

app.get('/activity' , async (req,res) => {
    if(req.session.loggedIn == true){
        let user = await User.findOne({userid: req.session.user.userid});
        let workshops = [];
        let artworks = [];
        let liked = [];
        let reviewed = [];

        let enrolled = await Workshop.find({enrolled: user.username});

        if(user.accType == "artist"){
            artworks = await Artwork.find({artist: user.username});
            workshops = await Workshop.find({hostedBy: user.username});
        }

        for(let i = 0; i < user.liked.length; i++){
            let artwork = await Artwork.findOne({_id: user.liked[i]});
            liked.push(artwork);
        }

        for(let i = 0; i < user.reviewed.length; i++){
            let review = await Review.findOne({_id: user.reviews[i]});
            reviewed.push(review);
        }

        let userActivity = {
            liked: liked,
            reviewed: reviewed,
            artworks: artworks,
            workshops: workshops,
            enrolled: enrolled
        }

        res.render('pages/activity', {session: req.session, activity: userActivity});
    }
    else {
        res.redirect('/');
    }
});

app.get('/notifications', (req,res) => {
    res.render('pages/notifications', {session: req.session});
});

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/search', async (req,res) => {
    let allArt = await Artwork.find({});
    if(req.session.loggedIn == true){
        res.render('pages/search', {session: req.session, artworks: allArt});
    }
    else {
        res.redirect('/');
    }

});

const loadData = async () => {
    const result = await connect(`mongodb://${host[0]}:27017/comp2406a5`);
    return result;
}

loadData()
    .then(() => {
        app.listen(PORT);
        console.log("Server is running on port " + PORT);
    })
    .catch((err) => {
        console.log(err);
    }); 