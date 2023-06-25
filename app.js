const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = `Welcome to the Blog Website! This is a platform where you can unleash your creativity and share your thoughts with the world. Whether you're a seasoned writer or just starting out, this is the perfect place to showcase your ideas, experiences, and expertise.
Feel free to explore the various blog posts written by our community members. From insightful articles to personal stories, you'll find a wide range of topics to dive into. If something catches your interest, click on the "Read More" button to view the full post.
Are you ready to contribute to the conversation? Click on the "Compose" button to create your own blog post. Share your unique perspective, offer valuable insights, or simply express yourself through words. We can't wait to read what you have to say!
Join our community and let your voice be heard. Happy blogging!`;


const aboutContent = `Welcome to our blog website! We are a passionate community of writers, thinkers, and storytellers who believe in the power of words to inspire, educate, and entertain.
Our mission is to provide a platform where individuals from all walks of life can come together to share their experiences, knowledge, and perspectives.We believe that everyone has a unique voice and story to tell, and we are committed to giving them a platform to be heard.
Through our blog website, we aim to create a diverse and inclusive community where ideas can be freely expressed and conversations can flourish.Whether you're an aspiring writer, a seasoned professional, or simply someone who enjoys reading and engaging with thought-provoking content, you'll find a home here.
We encourage open dialogue, respectful discussions, and the exchange of ideas.We value different viewpoints and believe that through the sharing of diverse perspectives, we can foster understanding, empathy, and positive change.
So, whether you're here to read, write, or connect with like-minded individuals, we're thrilled to have you as part of our community.Join us on this exciting journey of exploration, learning, and self - expression.
Thank you for being a part of our blog website.Together, let's create a space where words have the power to inspire and make a difference.
Happy blogging!`;

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get('/', (req, res) => {
  res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
  res.render("about", { aboutContent: aboutContent })
})

app.get('/contact', (req, res) => {
  res.render("contact", { contactContent: contactContent });
})

app.get('/compose', (req, res) => {
  res.render('compose');
})

app.post("/compose", (req, res) => {

  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }


  posts.push(post);

  res.redirect('/');
})

app.get("/posts/:postName", (req, res) => {

  const reqTitle = req.params.postName;
  // let hasPost = posts.some(post => post.title === reqTitle);   
  // where post=> is arrow function without {} braces called as implicit return
  // OR
  let hasPost = false;
  let postTitle;
  let postBody;

  posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(reqTitle)) {
      hasPost = true;
      postTitle = post.title;
      postBody = post.body;
    }
  })

  if (hasPost) {
    res.render("post", { postTitle: postTitle, postBody: postBody });
  } else {
    console.log("Match Not Found");
    res.redirect('/');
  }
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
