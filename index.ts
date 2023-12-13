import { NextFunction, Request, Response, Express } from "express";

import express from 'express'
const app: Express = express();
import path from 'path'
import bodyParser from 'body-parser'
// import flash from 'express-flash-message'


// VIEW ENGINE SET
app.set('view engine', 'ejs');


// Use (for easier work) (you understand :) )
// This line of code acts like a namespace / module
// You can access it by just using res.render('whatever path to file is in the public folder')
// Without needing to go back folders
app.set('views', path.join(__dirname, 'views'));


// POST SET
app.use(bodyParser.urlencoded({
    extended: true
}))

// Port
const port = process.env.POST || 4040;


// Import Controllers\
import users from './routes/users';
import auth from './routes/auth';
import home from './routes/home';
// STATIC FILES (Images, etc)
// app.use('/static', express.static(path.join(__dirname, 'public')))


// Set Controllers
app.use('/users', users);
app.use('/auth', auth);
app.use('/', home);

app.all('/', (req: Request, res: Response, next: NextFunction) => {

    // 404
    res.render('errors/404');
    next();
})

// Starting App
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

// declare global {
//     namespace MyTypes {
//         export type AddRequired<Type, Key extends keyof Type> = Type & {
//             [Property in Key]-?: Type[Property]
//         };
//     }
// }

export {}

