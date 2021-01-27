const { json, urlencoded } = require('express');
const app = require('express')();
const cors = require('cors');

const auth = require('./routes/authRoutes');
const user = require('./routes/userRoutes');
const admin = require('./routes/adminRoutes');

app.get('/', (req, res) => {
  res.send('<h2>Server running ...</h2>');
});

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/user', user);
app.use('/admin', admin);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});