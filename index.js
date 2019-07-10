const express = require('express');
const cors = require('cors')
const server = express();
const postRoutes = require('./routes/postsRouter')

server.use(cors())

// server.use('/', (req, res) => res.send('API up and running!'));
server.use('/api/posts', postRoutes);


server.listen(8000, () => console.log('API running on port 8000'));