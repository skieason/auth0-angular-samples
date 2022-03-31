// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }

const express = require('express');
const app = express();

// app.use(requireHTTPS);
app.use(express.static('dist/login-demo'));

app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'dist/login-demo/'}),
);

// const port = process.env.API_SERVER_PORT || 8080;

app.listen(8080, () => console.log(`Api started on port 8080`));