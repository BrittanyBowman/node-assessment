const express = require("express");
const usersCtrl = require("./usersCtrl");
const bodyParser = require("body-parser");

//middleware

const app = express();
app.use(bodyParser.json());
app.use(express.json());

//endpoints
app.get("/api/user", usersCtrl.getUsers);
app.get("/api/user/:id", usersCtrl.getUserById);
app.post("/api/user", usersCtrl.createUser);
app.put("/api/user/:id", usersCtrl.updateUserById);
app.delete("/api/user/:id", usersCtrl.deleteUserById);
app.get("/api/type/:type", usersCtrl.getUsersByType);
app.get("/api/nonadmin/:type", usersCtrl.getUsersIfNonAdmins);
app.get("/api/admin/:type", usersCtrl.getUsersIfAdmins);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
