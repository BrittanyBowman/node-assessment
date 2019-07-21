const userData = require("./userData");
let nextId = 100;
//endpoint handler functions/methods
module.exports = {
  getUsers: (req, res) => {
    const qObj = req.query;
    function findUsers(input, prop) {
      const re = new RegExp(input.toLowerCase());
      return userData.filter(user => {
        return user[prop].toLowerCase().match(re);
      });
    }
    if (qObj.favorites) {
      const returnedValue = findUsers(qObj.favorites, "favorites");
      if (returnedValue.length === 0) {
        return res.status(404).send("No match found.");
      }
      return res.status(200).send(returnedValue);
    } else if (qObj.age < userData.age) {
      const returnedValue = userData.filter(user => {
        return user.age;
      });
      if (returnedValue.length === 0) {
        return res.status(404).send("No match found.");
      }
      return res.status(200).send(returnedValue);
    } else if (qObj.email) {
      const returnedValue = findUsers(qObj.email, "email");
      if (returnedValue.length === 0) {
        return res.status(404).send("No match found.");
      }
      return res.status(200).send(returnedValue);
    } else if (Object.keys(qObj).length !== 0) {
      return res
        .status(400)
        .send(
          `Improper query sent in request: ${Object.keys(qObj)[0]}=${
            qObj[Object.keys(qObj)[0]]
          }`
        );
    }
    res.status(200).send(userData);
  },
  getUserById: (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId || typeof userId !== "number")
      return res.status(400).send("User id sent must be a number");
    const user = userData.filter(user => user.id === userId);
    res.status(200).send(user);
  },
  getUsersByType: (req, res) => {
    const userType = req.params.type;
    if (!type) return res.status(404).send("Error. That type does not exist.");
    const users = userData.filter(users => users.type === userType);
    res.status(200).send(users);
  },
  getUsersIfNonAdmins: (req, res) => {
    const userType = req.params.type["user"] || req.params.type["moderator"];
    if (!type) return res.status(404).send("Error. That type does not exist.");
    const users = userData.filter(users => users.type === userType);
    res.status(200).send(users);
  },
  getUsersIfAdmins: (req, res) => {
    const userType = req.params.type["admin"];
    if (!type) return res.status(404).send("Error. That type does not exist.");
    const users = userData.filter(users => users.type === userType);
    res.status(200).send(users);
  },
  createUser: (req, res) => {
    let b = req.body;
    if (
      !b.id ||
      !b.first_name ||
      !b.last_name ||
      !b.email ||
      !b.gender ||
      !b.language ||
      !b.age ||
      !b.city ||
      !b.state ||
      !b.type | !b.favorites
    ) {
      return res
        .status(400)
        .send("Missing information in body. Please full out all fields.");
    }
    nextId++;
    let newUser = {
      id: nextId,
      first_name: b.first_name,
      last_name: b.last_name,
      email: b.email,
      gender: b.gender,
      language: b.language,
      age: b.age,
      city: b.city,
      state: b.state,
      type: b.type,
      favorites: b.favorites
    };
    userData.push(newUser);
    return res.status(200).send([userData[userData.length - 1]]);
  },
  updateUserById: (req, res) => {
    const id = parseInt(req.params.id);
    if (!id || typeof id !== "number") {
      return res.status(400).send("Error with user ID in request.");
    }
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === id) {
        const newUserInfo = {};
        for (let prop in req.body) {
          if (userData[i].hasOwnProperty(prop)) {
            newUserInfo[prop] = req.body[prop];
          }
        }
        userData[i] = Object.assign(userData[i], newUserInfo);
        return res.status(200).send([userData[i]]);
      }
    }
    return res.status(404).send("User not found.");
  },
  deleteUserById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || typeof id !== "number" || !id) {
      return res.status(400).send("Error with user ID in request.");
    }
    let removedUser = `No user with an ID of ${id}.`;
    users = users.filter(user => {
      if (user.id === id) removedUser = user;
      return user.id !== id;
    });
    if (typeof removedUser === "string") {
      return res.status(404).send(removedUser);
    }
    return res.status(200).send([removedUser]);
  }
};

// req.params contains route parameters (in the path portion of the URL), and req.query contains the URL query parameters (after the ? in the URL).
