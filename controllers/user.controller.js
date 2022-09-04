const fs = require("fs");
const path = require("path");

let data = fs.readFileSync("./userData.json", "utf-8");
const userData = JSON.parse(data);

/* fs.readFile("./public/userData.json", 'utf-8', (err, data) => {
  if(err){
    console.log(err.message);
  }
  else{
      console.log(JSON.parse(data));
  }
}) */

/* home user home route */
module.exports.userHome = (req, res, next) => {
  res.send("<h1>WelCome to Random User Assignment here</h1>");
  res.sendFile(path.join(__dirname + "../views/saveForm.html"));
  next();
};

// random user data
module.exports.randomUser = (req, res, next) => {
  const random = Math.floor(Math.random() * 5);
  const oneData = userData.find(el => el.id == random);
  res.send(oneData);
  next();
};

// all user data
// limit implement korbe
module.exports.userAll = (req, res, next) => {
  if (req.query.name) {
    const searchName = req.query.name.toLowerCase();
    const matchedName = userData.filter(user =>
      user.name.toLowerCase().includes(searchName)
    );
    res.send(matchedName);
  } else if (req.query.id) {
    const searchId = parseInt(req.query.id);
    const matchedId = userData.filter(user => user.id == searchId);
    res.send(matchedId);
  } else if (req.query.contact) {
    const searchContact = req.query.contact.toLowerCase();
    const matchedContact = userData.filter(user =>
      user.contact.toLowerCase().includes(searchContact)
    );
    res.send(matchedContact);
  } else if (req.query.address) {
    const searchAddress = req.query.address.toLowerCase();
    const matchedAddress = userData.filter(user =>
      user.address.toLowerCase().includes(searchAddress)
    );
    res.send(matchedAddress);
  } else if (req.query.photoUrl) {
    const searchPhotoUrl = req.query.photoUrl;
    const matchedPhotoUrl = userData.filter(user =>
      user.photoUrl.includes(searchPhotoUrl)
    );
    res.send(matchedPhotoUrl);
  }
  res.send(userData);
  next();
};

module.exports.userSave = (req, res, next) => {
  const fromData = req.body;
  const newUserAdd = [...userData, fromData] 
  const stringFyUser = JSON.stringify(newUserAdd) 
  console.log(stringFyUser, '===============>');
  fs.writeFileSync('./userData.json', stringFyUser ) 
  res.send("home");
};
