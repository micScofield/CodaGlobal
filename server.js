const express = require('express')
const path = require('path')

//db connection
const connectDB = require('./config/db')

//models
const HttpError = require('./models/http-error')


const app = express()

app.use(express.json()) //for bodyparsing 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    next();
});

app.use('/api/teams', require('./routes/api/teams'))
app.use('/api/results', require('./routes/api/results'))


// app.use((req, res, next) => {
//     return new HttpError('Couldnt find any route you provided !', 404)
// })

// app.use((error, req, res, next) => {
//     if (res.headerSent) {
//         return next(error);
//     }
//     res.status(error.code || 500)
//     res.json({ message: error.message || 'An unknown error occurred!' });
// })

if (process.env.NODE_ENV==='production') {
    app.use(express.static('/client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))