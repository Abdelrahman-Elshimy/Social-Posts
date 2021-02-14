const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/social", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post Added successfully",
      postId: result._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts Fetched Successfully",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("error get posts");
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);

  Post.findById(req.params.id)
    .then((data) => {
      return Post.deleteOne({ _id: req.params.id });
    })
    .then((response) => {
      res.status(200).json({ message: "Post Deleted" });
    })
    .catch((err) => {
      console.log("Post Not Found");
    });
});

module.exports = app;
