const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

var cors = require("cors");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://0.0.0.0:27017");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Models

const { User } = require("./model/user");
const { Asset } = require("./model/asset");
const { Chapter } = require("./model/chapter");

//MiddleWares

const { admin } = require("./middleware/admin");
const { auth } = require("./middleware/auth");
const { Investment } = require("./model/investment");

const port = process.env.PORT || 3002;

//-----------To check whether app is running or not------//

app.get("/", (req, res) => res.send("Hello World!"));

//-----------------------------------------------//
//                  Admin                        //
//-----------------------------------------------//

//-------------Add Chapter------------//

app.post("/api/chapters", (req, res) => {
  const chapters = new Chapter(req.body);
  chapters.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      chapters: doc
    });
  });
});

//--------------Update Chapter-------------//

app.put("/api/updateChapter/:chaptername", (req, res) => {
  const chapter = new Chapter(req.body);
  // console.log(chapter);
  Chapter.findOneAndUpdate(
    { chapterName: req.params.chaptername },
    {
      chapterDescription: chapter.chapterDescription
    },
    (err, chapter) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        message: "Update Successfully"
        // chapter: chapter
      });
    }
  );
});

//----------------Delete Chapter----------------//

app.delete("/api/deleteChapter/:chapterName", (req, res) => {
  Chapter.findOneAndRemove(
    { chapterName: req.params.chapterName },
    (err, chapter) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        message: "Successfully deleted"
      });
    }
  );
});

//Asset
//-----------Add Asset------------//

app.post("/api/assets", (req, res) => {
  const assets = new Asset(req.body);

  assets.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      assets: doc
    });
  });
});

//---------------Update Asset---------------//

app.put("/api/updateAsset/:assetId", (req, res) => {
  const asset = new Asset(req.body);
  Asset.findOneAndUpdate(
    { assetId: req.params.assetId },
    {
      assetName: asset.assetName,
      bBenefits: asset.bBenefits,
      description: asset.description,
      gitHubLink: asset.gitHubLink,
      imgLink: asset.imgLink,
      amount: asset.amount
    },
    (err, asset) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        message: "Update Successfully"
      });
    }
  );
});

//------------Delete Asset-----------------//

app.delete("/api/deleteAsset/:assetId", (req, res) => {
  Asset.findOneAndRemove({ assetId: req.params.assetId }, (err, asset) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      message: "Successfully Deleted"
    });
  });
});

// -----------------------------------------------//
//                  INVESTMENTS                   //
//------------------------------------------------//

//Investment
//-----------Add investment------------//

app.post("/api/investments", (req, res) => {
  const invesments = new Investment(req.body);

  Investment.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      invesments: doc
    });
  });
});

//-----------Get investment------------//
app.get("/api/investments/:owner", (req, res) => {
  Investment.find({ owner: req.params.owner }, (err, investments) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(investments);
  });
});

// -----------------------------------------------//
//                  USER                          //
//------------------------------------------------//

//Get All Chapters//

app.get("/api/chapters/get_all", (req, res) => {
  Chapter.find({}, (err, chapters) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(chapters);
  });
});

//-----------------Get Chapter By Name-----------------//

app.get("/api/getChapter/:chapterName", (req, res) => {
  Chapter.find({ chapterName: req.params.chapterName }, (err, chapter) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(chapter);
  });
});

//------------------Get Assets------------------//

app.get("/api/assets/:chapterName", (req, res) => {
  Asset.find({ chapterName: req.params.chapterName }, (err, assets) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(assets);
  });
});

//--------Get Assets Description------------//

app.get("/api/assets/:chapterName/:assetId", (req, res) => {
  Asset.find({ assetId: req.params.assetId }, (err, assets) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(assets);
  });
});

// --------------------------------------------------------//
//            REGISTER ,LOGIN and LOGOUT                   //
// --------------------------------------------------------//

//------------Register User-----------------//
//---Only Admin can add egister user----//

app.post("/api/users/register", auth, admin, function(req, res) {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userData: doc
    });
  });
});

//-------------Login----------------//
//While Login user, A token is generated and is given to user

app.post("/api/users/login", function(req, res) {
  // Find the email;
  // User.findOne({ email: req.body.email }, (error, user) => {
  //   if (!user)
  //     return res.json({
  //       loginSuccess: false,
  //       message: "Authentication failed, Email Id not found"
  //     });
  //   if (req.body.password != user.password)
  //     return res.json({
  //       loginSuccess: false,
  //       message: "Authentication failed,Wrong Password"
  //     });

  //   user.generateToken((err, user) => {
  //     if (err) return res.status(400).send(err);
  //     res
  //       .cookie("w_auth", user.token)
  //       .status(200)
  //       .json({
  //         loginSuccess: true,
  //         firstName: user.firstName,
  //         token: user.token,
  //         role: user.role
  //       });
  //   });
  // });

  /*
    1 - admin
    0 - user
  */
  res.cookie("w_auth", 'pqd').status(200).json({
    loginSuccess: true,
    firstName: 'pqd',
    token: 'pqd',
    role: 1
  });
});

// ----------------LogOut User---------------//

//It will delete the token that was given from the database

app.get("/api/users/logout/:firstName", (req, res) => {
  User.findOneAndUpdate(
    { firstName: req.params.firstName },
    {
      token: ""
    },
    (err, doc) => {
      if (err)
        return res.json({
          success: false,
          err
        });
      return res.status(200).json({
        success: true
      });
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
