const fs = require("fs");
const path = require("path");

let data = fs.readFileSync("./userData.json", "utf-8");
const userData = JSON.parse(data);

/* home user home route */
module.exports.userHome = (req, res, next) => {
  res.send("<h1>Random User Assignment !</h1>");
  next();
};

/* Random user Data */
module.exports.randomUser = (req, res, next) => {
  const random = Math.floor(Math.random() * 5);
  const oneData = userData.find(el => el.id == random);
  res.send(oneData);
  next();
};

/* All User Data */
module.exports.userAll = (req, res, next) => {
  const { limit } = req.query;
  if (limit) {
    const allDataLimit = userData.slice(0, limit);
    res.send(allDataLimit);
  } else {
    res.send(userData);
  }
  next();
};
 
 /*User Save Data  */
module.exports.userSave = (req, res, next) => {
  const fromData = req.body;
 if(Object.keys(fromData).length){
  console.log(fromData);
  const newUserAdd = [...userData, fromData];
  const stringFyUser = JSON.stringify(newUserAdd);
  fs.writeFileSync("./userData.json", stringFyUser);
  res.send({ message: "successfully save data", success: true});
 }else{
  res.send({success: false, message: 'Empty Data Not Allowed'})
 }
};

module.exports.userUpdate = (req, res, next) => {
  const { id } = req.params;
  console.log('id', id);
  console.log('update=============');
  // const found = userData.find(usr => usr.id === parseInt(id));
  // const changes = req.body;

  // if (found.id === parseInt(id)) {
  //   const ob = Object.assign(found, changes);
  //   const foundFilterId = userData.filter(usr => usr.id !== ob.id);
  //   const updatePush = [...foundFilterId, ob];
  //   const strUpdate = JSON.stringify(updatePush);
  //   fs.writeFileSync("./userData.json", strUpdate);
  //   res.status(200).json({
  //     messages: true,
  //     data: updatePush,
  //     status: 200,
  //   });
  // } else {
  //   res.status(500).json({
  //     Status: 500,
  //     success: false,
  //     messages: "Internal Server Error ",
  //   });
  // }
};

// user/bulk-update
module.exports.userBulkUpdate = (req, res, next) => {
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
  next();
};

/* Delete User */
module.exports.userDelete = (req, res, next) => {
  const id = parseInt(req.params.id);
  const fileData = fs.readFileSync("./userData.json", "utf-8");
  const data = JSON.parse(fileData);

  if (!id) {
    res.status(404).json({
      status: 404,
      message: "user id is Not found check Number the id",
      success: false,
    });
  } else {
    const deleted = data.filter(user => user.id !== id);
    const StringFyUser = JSON.stringify(deleted);
    fs.writeFileSync("./userData.json", StringFyUser);
    res.status(200).json({
      status: 200,
      message: "successFully Deleted User",
      success: true,
    });
  }
  next();
};
