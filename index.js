express = require('express');
dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// set view engine to EJS
app.set('view engine', 'ejs');

// mount main app
app.use('/', require('./app/app'));

// serve static files *after route
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
