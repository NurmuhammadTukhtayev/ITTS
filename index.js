express = require('express');
dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', require('./app/app'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
