import { resolve } from 'path';
import db from './models/index.mjs';

export default function bindRoutes(app) {
  // special JS page. Include the webpack index.html file
  app.get('/home', (req, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
