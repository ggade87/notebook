var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");
app.use(cors());
const { wait } = require("@testing-library/react");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//app.use(express.bodyParser({limit: '50mb'}));
//Below two line added to save image large size
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));
var ObjectID = require('mongodb').ObjectID; 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/", function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    //var query = "email='" + email + "' and " + " password='" + password + "'";
    var query = { email: "amit@gmail.com" };
    dbo
      .collection("Users")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
});

app.get("/getMainMenu", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { userId } = req.query;
    var query = { userId: userId };
    dbo
      .collection("mainMenu")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});
app.post("/addMainMenu", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { userId, name } = req.body;
      var myobj = {
        userId: userId,
        name: name,
      };
      dbo.collection("mainMenu").insertOne(myobj, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});

app.post("/addSubMenu", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { mid, name } = req.body;
      var myobj = {
        mid: mid,
        name: name,
      };
      dbo.collection("SubMenu").insertOne(myobj, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});

app.post("/addConent", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { smid, name, value } = req.body;
      var myobj = {
        smid: smid,
        name: name,
        value: value,
      };
      dbo.collection("Content").insertOne(myobj, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});

app.post("/getSubMenu", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { id } = req.body;
    var query = { mid: id };
    dbo
      .collection("SubMenu")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});

app.post("/getContent", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { smid } = req.body;
    var query = { smid: smid };
    dbo
      .collection("Content")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});

app.post("/getUser", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { email, password } = req.body;
    var query = { email: email, password: password };
    dbo
      .collection("Users")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});

app.post("/rigisterUser", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { email, password } = req.body;
      var myobj = {
        usersId: "",
        image:"",
        name: "",
        email: email,
        password: password,
        Mobile: "",
        profession: "",
      };
      dbo.collection("Users").insertOne(myobj, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});


app.put("/addImage", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { imageData, id } = req.body;
     
      var myquery = { "_id": ObjectID(id)};
      console.log(id,imageData)
      var newvalues ={$set: {
        "image":imageData
      }};
      dbo.collection("Users").updateOne(myquery ,newvalues, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});


app.get("/getImage", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { userId } = req.query;
    var query = { "_id": ObjectID(userId)};
    dbo
      .collection("Users")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});





app.put("/updateUser", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { User, id } = req.body;
     
      var myquery = { "_id": ObjectID(id)};
      var newvalues ={$set: {
        "name":User.name,
        "Mobile": User.Mobile,
        "profession":User.profession,
      }};
      dbo.collection("Users").updateOne(myquery ,newvalues, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});


app.get("/getUserDetails", jsonParser, function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("notebook");
    var { userId } = req.query;
    var query = { "_id": ObjectID(userId)};
    dbo
      .collection("Users")
      .find(query)
      .toArray(function (err, result) {
        console.log("getUserDetails",result);
        if (err) throw err;
        result.length === 0
          ? res.send({ error: { code: 1 } })
          : res.send(result);
        db.close();
      });
  });
});

app.put("/updatePassword", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { password, id } = req.body;
     
      var myquery = { "_id": ObjectID(id)};
      var newvalues ={$set: {
        "password":password,
      }};
      dbo.collection("Users").updateOne(myquery ,newvalues, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }

        db.close();
      });
    }
  );
});


app.put("/updateMainMenu", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { menuname, menuid } = req.body;
      var myquery = { "_id": ObjectID(menuid)};
      var newvalues ={$set: {
        "name":menuname,
      }};
      dbo.collection("mainMenu").updateOne(myquery ,newvalues, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }
        db.close();
      });
    }
  );
});

app.put("/updateSubMenu", jsonParser, function (req, res) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var { submenuname, menuid } = req.body;
      var myquery = { "_id": ObjectID(menuid)};
      var newvalues ={$set: {
        "name":submenuname,
      }};
      dbo.collection("SubMenu").updateOne(myquery ,newvalues, function (error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          res.send(result);
        }
        db.close();
      });
    }
  );
});


app.delete("/deleteMainMenu", jsonParser, function (req, res) {
  //1. Select sunMenuIds using mainMenuID
  //2. Delete All content using list of submenu IDS.
  //3. Delete Sum Menues using main menu IDS
  //4. Delete main menue ID using main menu id.
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var {   menuid } = req.query;
      var myquery = { "mid": menuid};
      console.log("Qury ",myquery,req)
      var collectionSubMenu = dbo.collection("SubMenu");
      var collectionMainMenu = dbo.collection('mainMenu');
      collectionSubMenu.find(myquery,{ projection: { "_id": 1 }}).toArray(function(error, result) {
        if (error) {
          res.send({ error: error });
        } else {
          const objects = [];
          result.forEach(function (arrayItem) {
            objects.push(arrayItem._id.toString());
          });
          console.log("objects ",objects);
          //2. Delete All content using list of submenu IDS.
          var deleteContentQuery = {"smid": { $in: objects}};
          console.log("deleteContentQuery ",deleteContentQuery);
          dbo.collection("Content").deleteMany(deleteContentQuery, function(error, result) {
            if (error) {
              console.log("error Deleted ",error.message);
              res.send({ error: error });
            } else {
              console.log("Content deletedCount ",result.deletedCount);
              //res.send(result); 
              if(result !== null){
                //3. Delete Sum Menues using main menu IDS
                var deleteSubMenuQuery = {"mid":menuid };
                dbo.collection("SubMenu").deleteMany(deleteSubMenuQuery, function(error, result) {
                  if (error) {
                    res.send({ error: error });
                  } else {
                    //res.send(result); 
                    console.log("SubMenu deletedCount ",result.deletedCount);
                    if(result !== null){
                      //4. Delete main menue ID using main menu id.
                      var deleteMainMenuQuery = {"_id": ObjectID(menuid) };
                      dbo.collection("mainMenu").deleteMany(deleteMainMenuQuery, function(error, result) {
                        if (error) {
                          res.send({ error: error });
                        } else {
                          console.log("mainMenu deletedCount ",result.deletedCount);
                          res.send(result); 
                          db.close();
                        };
                      }); 
                    }
                  };
                }); 
              }
            };
          });  
        };
      });
    }
  );
});




app.delete("/deleteSubMenu", jsonParser, function (req, res) {
  //1. Select sunMenuIds using mainMenuID
  //2. Delete All content using list of submenu IDS.
  //3. Delete Sum Menues using main menu IDS
  //4. Delete main menue ID using main menu id.
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      var dbo = db.db("notebook");
      var {   menuid } = req.query;
      var myquery = { "smid": menuid};
      console.log("Qury ",myquery,req)
      dbo.collection("Content").deleteMany(myquery, function(error, result) {
        if (error) {
          console.log("error Deleted ",error.message);
          res.send({ error: error });
        } else {
          console.log("Content deletedCount ",result.deletedCount);
          //res.send(result); 
          if(result !== null){
            var deleteSubMenuQuery = {"_id":ObjectID(menuid) };
            dbo.collection("SubMenu").deleteMany(deleteSubMenuQuery, function(error, result) {
              if (error) {
                res.send({ error: error });
              } else {
                //res.send(result); 
                console.log("SubMenu deletedCount ",result.deletedCount);
                res.send(result); 
                db.close();
              };
            }); 
          }
        };
      });  
    }
  );
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";
// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("notebook");
//   var query = { usersId: 1 };
//   dbo
//     .collection("Users")
//     .find(query)
//     .toArray(function (err, result) {
//       if (err) throw err;

//       db.close();
//     });
// });
