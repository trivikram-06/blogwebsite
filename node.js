const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/new-post.html', (req, res) => {
    res.sendFile(__dirname + '/new-post.html');
});

app.post('/new-post', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    newPost.save((err) => {
        if (err) {
            res.send('Error saving post');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send('Error fetching posts');
        } else {
            res.json(posts);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
