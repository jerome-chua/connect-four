import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import bindRoutes from './routes.mjs';

const app = express(); // Initialise Express instance.

app.set('view engine', 'ejs'); // Set view engine to expect EJS templates.
app.use(cookieParser()); // Parse cookies in requests.
app.use(express.urlencoded({ extended: false })); // Parse request bodies for POST requests.
app.use(express.json()); // Parse request with JSON payloads.
app.use(methodOverride('_method')); // Parse PUT requests sent as POST requests.
app.use(express.static('public')); // Serve files stored in public folder.
app.use(express.static('dist')); // Serve files stored in dist folder.

// Bind route definitions to the Express application.
bindRoutes(app);

// Set Express to listen on the given port.
const PORT = process.env.PORT || 3000;
app.listen(PORT);
