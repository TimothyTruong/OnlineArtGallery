import fs from 'fs';

let gallery2 = [
    {"name": "Female (NTSC test image)", "artist": "Kodak", "year": "1977", "category": "misc", "medium": "film", "description": "Scans of an NTSC test picture possibly from Kodak. Copyright probably owned by Kodak.", "image": "https://seang.win/comp2406images/misc/4.1.01.png"},
    {"name": "Couple (NTSC test image)", "artist": "Kodak", "year": "1977", "category": "misc", "medium": "film", "description": "Scans of an NTSC test picture possibly from Kodak. Copyright probably owned by Kodak.", "image": "https://seang.win/comp2406images/misc/4.1.02.png"},
    {"name": "Female (from Bell Labs?)", "artist": "Bell Labs", "year": "1977", "category": "misc", "medium": "film", "description": "Believed to be from Bell Labs, copyright status unknown.", "image": "https://seang.win/comp2406images/misc/4.1.03.png"},
    {"name": "Female", "artist": "b", "year": "1977", "category": "misc", "medium": "print", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.1.04.png"},
    {"name": "House", "artist": "b", "year": "1977", "category": "misc", "medium": "print", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.1.05.png"},
    {"name": "Tree", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "print", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.1.06.png"},
    {"name": "Jelly Beans", "artist": "USC", "year": "1977", "category": "misc", "medium": "photo", "description": "Picture of jelly beans taken at USC. Free to use.", "image": "https://seang.win/comp2406images/misc/4.1.07.png"},
    {"name": "Splash", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.2.01.png"},
    {"name": "Mandrill", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Scan from a magazine picture. Copyright belongs to original publisher or photographer.", "image": "https://seang.win/comp2406images/misc/4.2.03.png"},
    {"name": "Airplane (F-16)", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.2.05.png"},
    {"name": "Sailboat on lake", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.2.06.png"},
    {"name": "Peppers", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/4.2.07.png"},
    {"name": "Moon surface", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.1.09.png"},
    {"name": "Aerial", "artist": "b", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.1.10.png"},
    {"name": "Clock", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.1.12.png"},
    {"name": "Resolution chart", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.1.13.png"},
    {"name": "Chemical plant", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.1.14.png"},
    {"name": "Stream and bridge", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.2.10.png"},
    {"name": "Male", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "film", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.3.01.png"},
    {"name": "Airport", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/5.3.02.png"},
    {"name": "Truck", "artist": "Unknown", "ye6ar": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.01.png"},
    {"name": "Airplane", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.02.png"},
    {"name": "Tank", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.03.png"},
    {"name": "Cars and APCs", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.04.png"},
    {"name": "Truck and APCs", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.05.png"},
    {"name": "APC", "artist": "testUser2", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.1.08.png"},
    {"name": "Airplane (U-2)", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/7.2.01.png"},
    {"name": "Fishing Boat", "artist": "Unknown", "year": "1977", "category": "misc", "medium": "photo", "description": "Sources of these are unknown and copyright status is also unknown", "image": "https://seang.win/comp2406images/misc/boat.512.png"},
    {"name": "21 level step wedge", "artist": "USC-SIPI", "year": "1977", "category": "misc", "medium": "photo", "description": "Test patterns constructed at USC-SIPI. Free to use.", "image": "https://seang.win/comp2406images/misc/gray21.512.png"},
    {"name": "Pixel ruler", "artist": "USC-SIPI", "year": "1977", "category": "misc", "medium": "photo", "description": "Test patterns constructed at USC-SIPI. Free to use.", "image": "https://seang.win/comp2406images/misc/ruler.512.png"}
]

let usersData = [
    {"userid" : 0 , "username" : "a" , "password" : "a" , "name" : "Sean G", "accType" : "patron", "following" : [1,3,6]},
    {"userid" : 1 , "username" : "b" , "password" : "b" , "name" : "Sean G", "accType" : "artist", "artworks" : ["Female", "House", "Aerial",]},
    {"userid" : 2 , "username" : "testUser1" , "password" : "testPassword1" , "name" : "John Doe", "accType" : "patron"},
    {"userid" : 3 , "username" : "testUser2" , "password" : "testPassword2" , "name" : "Jane Smith", "accType" : "artist", "artworks": ["Tree","Airport","Airplane","Cars and APCs","Truck and APCs","APC"]},
    {"userid" : 4 , "username" : "testUser3" , "password" : "testPassword3" , "name" : "Chris Lee", "accType" : "patron", "following": [1]},
    {"userid" : 5 , "username" : "testUser4" , "password" : "testPassword4" , "name" : "Son Heung-min", "accType" : "patron"},
    {"userid" : 6 , "username" : "artist", "password" : "artist", "name" : "Big Artist", "accType" : "artist" , "artworks" : ["Tiny bunny love","Rhapsody","Hedgehog","Courage My Love","Untitled (O'Ryan)","Hearts and a Watercolor","Dancing in the street","Independence Monument","Kaleidoscope eye","Air meets Water"]},
    {"userid" : 7 , "username" : "Unknown", "password" : "Unknown", "name" : "Mystery Artist", "accType" : "artist", "artworks": ["Moon surface", "Stream and bridge", "Male", "Chemical plant", "Truck","Airplane","Tank","Airplane (U-2)","Fishing Boat","21 level step wedge","Pixel ruler", "Clock","Resolution chart","Splash","Mandrill","Airplane (F-16)", "Sailboat on lake", "Peppers"]}
]

//store the items from gallery.json in gallery1
let galleryData = [];
let gallery1 = fs.readFileSync('gallery.json', 'utf8');

gallery1 = JSON.parse(gallery1);

//set up gallery array
for(let i = 0; i < gallery1.length; i++){
    galleryData.push(gallery1[i]);
}

for(let i = 0; i < gallery2.length; i++){
    galleryData.push(gallery2[i]);
}

import pkg from 'mongoose';
const {connect, connection} = pkg;

import Artwork from './models/artworkModel.js';
import User from './models/userModel.js';

pkg.set('strictQuery', false);

const loadData = async () => {
    await connect('mongodb://localhost:27017/comp2406a5');

    await connection.dropDatabase();

    //Load art into new art model
    let gallery = galleryData.map(art => new Artwork(art));
    let users = usersData.map(user => new User(user));

    await Artwork.create(gallery);
    await User.create(users);
};


loadData()
    .then(result => {
        console.log("Data loaded");
        connection.close();
    })
    .catch(err => {
        console.log(err);
    });