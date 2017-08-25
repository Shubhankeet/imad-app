var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne = {
    tilte: 'Article one 1:Shubhankeet Senapati',
    heading: 'Article One',
    date: 'August 24,2016',
    content: `
    <p>
                This is the content for my first article.Hello Everyone.Myself Shhubhankeet Senapati.I am from Odisha.I was born and brought up in Rourkela,Sundergarh,Odisha.Rourkela is one of the most beautiful place in India;one of the cleanest city filed with greenery everywhere.I completed my high school at Ispat English Medium School,a well recognized school in Odisha.
            </p>
            <p>
              Every day was like a new day in  Rourkela;filled with enjoyment and fun. 
           </p>
           <p>
               Whether it was at school or outside school,playing different sports,hanging out with friends,etc was just awesome!!
           </p>
           <p>
               I like to play football and volleyball out of which i have played volleyball the most.I still play that game whenenver i go home during my vaccations,with my friends.
           </p>`
};
function createTemplate(data){
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate = `
<html>
    <head>
        <title>
            S{title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
<style>
    .container{
        max-width: 800px;
        margin: 0 auto;
        color: red;
        font-family: sans-serif;
        padding-top: 60px;
        padding-left: 20px;
        padding-right: 20px;
}
     </style>
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            S{heading}
        </h3>
        <div>
            S{date}
        </div>
        <div>
           S{content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req, res){
    res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res){
     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
