var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
    user: 'senapati923',
    database: 'senapati923',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
    
'article-one':{
    title: 'Article-one | Shubhankeet Senapati',
    heading: 'Rafa: The Rising Star',
    date: 'August 15, 2017',
    content:`<img src="https://i.pinimg.com/originals/a7/fa/9d/a7fa9d9dac92aff77a8735a089cdac11.jpg" class="img-medium" />
    <br>
    <a href="https://rafaelnadal.com/en/" class="center text-large bold">Rafael Nadal</a>

    
    <h2> He is not just one of the greatest tennis players and greatest atheletes of all time, period but maintains a top position at the Atp Rankings. In a season that's seen him win his 15th Grand Slam Title, and more impressively, his tenth career title at the <a href="http://www.rolandgarros.com">French Open</a> - Rafael Nadal is World No. 1 again
		</h2>
		<hr/>`
},

'article-two':{
    title: 'Article-two | Shubhankeet Senapati',
    heading: 'Article two',
    date: 'August 25, 2017',
    content:`	<p>
		hello every one !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..
		</p>	

		<p>
		hello every one !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..
		</p>

		<p>
		hello every one!! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..<br>hello every two !! welcome to my second blog..
		</p>`
},

'article-three':{
    title: 'Article-three | Shubhnakeet Senapati',
    heading: 'Article three',
    date: 'August 30, 2017',
    content:`	<p>
	      hello every one !! welcome to my third blog..<br>First Line..
		
		</p>	

		<p>
		hello every one !! welcome to my third blog..<br>Second Line..
		</p>`
    
}
};


function createTemplate(data)
{
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;

var htmlTemplate=`
<!DOCTYPE HTML>
<html>
	<head>
		
		<title>
			
			    ${title}
			
		</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="/ui/style.css" rel="stylesheet" />
    </head> 
<body>
    <div class="container">
	<div>
		<a href="/">HOME</a>
	</div>
	<hr/>
	<h1>
		${heading}
	</h1>
	<div>
		${date.toDateString()}
	</div>
	<br>
	<br>
	<div>
		${content}
	</div>
	</div>
</body>

<footer>
<p>"Enjoy your day till the worst comes..else wait in tense for the end..choice is yours"</p>
<p>Contact Information : 
	<a href="mailto:piyalde2009@gmail.com">piyalde2009@gmail.com</a>
</p>
</footer>
</html>`;

return htmlTemplate;
}

//counter endpopint
var counter=0;
app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    //return a response with the results 
    pool.query('SELECT * FROM test', function(err, result){
        if (err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var names=[];
app.get('/submit-name', function(req,res){ //submit-name?name=xxx
    //get the name from the request
   var name= req.query.name;
   
   names.push(name);
   //JSON: JavaScript Object Notation.. used to convert JavaScript objects into strings
   res.send(JSON.stringify(names));
});

app.get('/articles/articleName', function (req, res) {
    
    
    pool.query('SELECT * FROM article WHERE title = $1', [req.params.articleName], function(err, result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.lenth === 0){
                res.status(404).send('Article Not Found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
 
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
