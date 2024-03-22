import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogPost=[
    {title: 'Cricket', body:'hello'},
    {title: 'Cricket', body:'hello'}

]

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index.ejs',{blogPost});
});

app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPost.find((post) => post.id === postId);
    const cssFilePath = `/styles/post${postId}.css`;
    res.render('post.ejs',{blogPost,cssFilePath});

})

app.get('/compose', (req, res) => {
    res.render('compose.ejs');
})

app.get("/back", (req, res) => {
    res.render("index.ejs", { blogPost });
});

app.post("/compose", (req, res) => {
    const { title, body, author } = req.body;
    const newPostId = blogPost.length + 1;
    blogPost.push({id:newPostId,title, body, author});
    res.redirect("/");
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})