const dotenv = require('dotenv');

if (!process.env.NODE_ENV) {
  let result = dotenv.config();
  if (result.error) {
    console.log(error);
  }
}

const app = require('./Routes');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}...`);
});
