const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {connectDB} = require('./database/conn');
const dotenv = require('dotenv');
const router = require('./router/route');

const port = 8080;
const app = express();
dotenv.config();

/** connect to database*/
connectDB();


/**Middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));//this is used to log http requests on the console
app.disable('x-powered-by');// hackers have less info of the stack

/** Http requests */
app.get('/', (req, res) => {
    return res.status(201).json("Home GET request");
});

/**Api endpoints */
app.use('/api', router);

/** start server */
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});