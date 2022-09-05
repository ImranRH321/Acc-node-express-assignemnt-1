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
  // res.sendFile(path.join(__dirname + "../views/saveForm.html"));
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
  const newUserAdd = [...userData, fromData];
  const stringFyUser = JSON.stringify(newUserAdd);
  fs.writeFileSync("./userData.json", stringFyUser);
  res.send("home");
  /* 
  check duplicate data 
  err status code 
  implement next 
  */
  next();
};

module.exports.userUpdate = (req, res, next) => {
  const { id } = req.params;
  const found = userData.find(usr => usr.id === parseInt(id));
  const changes = req.body;

  if (found.id === parseInt(id)) {
    const ob = Object.assign(found, changes);
    const foundFilterId = userData.filter(usr => usr.id !== ob.id);
    const updatePush = [...foundFilterId, ob];
    const strUpdate = JSON.stringify(updatePush);
    fs.writeFileSync("./userData.json", strUpdate);
    res.status(200).json({
      messages: true,
      data: updatePush,
      status: 200,
    });
  } else {
    res.status(500).json({
      Status: 500,
      success: false,
      messages: "Internal Server Error ",
    });
  }
};

// user/bulk-update
module.exports.userBulkUpdate = (req, res) => {
  const bodyUser = req.body;
  const changeUser = bodyUser;

  if (Array.isArray(changeUser)) {
    changeUser.forEach(element => {
      const id = element.id;
      const exist = userData.find(user => user.id == parseInt(id));
      exist.id = element.id ? element.id : exist.id;
      exist.name = element.name ? element.name : exist.name;
      exist.contact = element.contact ? element.contact : exist.contact;
      exist.address = element.address ? element.address : exist.address;
      exist.photoUrl = element.photoUrl ? element.photoUrl : exist.photoUrl;

      const updateLight = [...userData, exist];

      const updateStringify = JSON.stringify(updateLight);
      console.log(updateStringify);
      fs.writeFileSync("./userData.json", updateStringify);
      res.status(200).send({
        status: 200,
        message: "Multi user data update",
        data: exist,
      });
    });
  } else {
    res.status(404).json({
      Status: 404,
      success: false,
      message: "input the array and update user check",
    });
  }
};
