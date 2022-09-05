const fs = require("fs");

let data = fs.readFileSync("./userData.json", "utf-8");
const userData = JSON.parse(data);

/* home */
module.exports.userHome = (req, res, next) => {
  res.send("<h1>Random User Assignment !</h1>");
  next();
};

/* Random user */
module.exports.randomUser = (req, res, next) => {
  const random = Math.floor(Math.random() * 5);
  const oneData = userData.find(el => el.id == random);
  res.send(oneData);
  next();
};

/* All User */
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

/* Save user*/
module.exports.userSave = (req, res, next) => {
  const fromData = req.body;
  if (Object.keys(fromData).length) {
    console.log(fromData);
    const newUserAdd = [...userData, fromData];
    const stringFyUser = JSON.stringify(newUserAdd);
    fs.writeFileSync("./userData.json", stringFyUser);
    res.send({ message: "successfully save data", success: true });
  } else {
    res.send({ success: false, message: "Empty Data Not Allowed" });
  }
};

/* update user */
module.exports.userUpdate = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    res.json({ message: "check id number then try again" });
    return;
  }

  const foundData = userData.find(user => user.id === parseInt(id));
  const changeData = req.body;
  if (foundData) {
    const changeValue = Object.assign(foundData, changeData);
    const foundFilterId = userData.filter(usr => usr.id !== changeValue.id);
    const updateUser = [...foundFilterId, changeValue];
    const userStringFy = JSON.stringify(updateUser);
    fs.writeFileSync("./userData.json", userStringFy);
    res.status(200).json({
      message: true,
      data: foundData,
      status: 200,
    });
  } else {
    res.status(404).send({
      messages: " found data not exists",
    });
  }
};

// user/bulk-update
module.exports.userBulkUpdate = (req, res, next) => {
  const changeUser = req.body;

  if (Array.isArray(changeUser)) {
    const body = changeUser.find(userId => userId);
    const singleId = body.id;
    const exist = userData.find(user => user.id === singleId);
    exist.id = body?.id ? body?.id : exist.id;
    exist.name = body?.name ? body?.name : exist.name;
    exist.contact = body?.contact ? body?.contact : exist.contact;
    exist.address = body?.address ? body?.address : exist.address;
    exist.photoUrl = body?.photoUrl ? body?.photoUrl : exist.photoUrl;

    const badIdUser = userData.filter(el => el.id !== singleId);
    console.log(badIdUser, "---all");
    const updateLight = [...badIdUser, exist];

    const updateStringify = JSON.stringify(updateLight);
    console.log(updateLight);
    fs.writeFileSync("./userData.json", updateStringify);
    res.status(200).send({
      status: 200,
      message: "Multi user data update",
      data: exist,
    });
  } else {
    res.status(404).json({
      Status: 404,
      success: false,
      message: "Body Data Not found",
    });
  }
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
