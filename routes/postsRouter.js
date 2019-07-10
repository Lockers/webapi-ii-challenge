const express = require('express');
const db = require('../data/db');

const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        db.insert({
            title,
            contents,
        })
            .then(response => {
                res.status(201).json({ title: title, contents: contents })
            })
            .catch(error => {
                res.status(500).send({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.post('/:id/comments', (req, res) => {
    
    const comment = req.body;
   
   db.findCommentById(req.params.id)
       .then(res => {
           db.findPostComments(res[0].post_id)
            .then(() => {
                db.insertComment(comment)
                res.status(200).json({err: 'Nice'})
               })
       })
    
        .catch(error => {
        res.status(500).json({error: 'Nope, not for you'})
        })
    })


router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).json(response)
            }
        })
        .catch(error => {
            res.status(500).send({ error: "The post information could not be retrieved." })
    })
    
})

router.get('/:id/comments', (req, res) => {
    
    db.findCommentById(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).send(response)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
    })
    
})
 

router.delete('/:id', (req, res) => {
    
    db.findById(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else
            {
                db.remove(req.params.id)
                    .then(() => { 
                        console.log(response)
                        res.status(204).json(response)
                    })
                        .catch(error => {
                        res.status(500).send({ error: "The post information could not be retrieved." })
                    })
            }
        })
})


router.put('/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
        return 1
    }
    db.findById(req.params.id)
        .then(res => {
            console.log(res)
            if (res.length === 0) {
                res.status(404).json({ err: 'No post here' })
                return 1
            }
        
        })
        .then(() => {
            db.update(req.params.id, req.body)
                .then(() => {
                    db.findById(req.params.id)
                        .then(response => {
                            res.status(200).json(response)
                        })
                })
    })
    .catch(err => {
        res.status(500).json({err: 'Summat went wrong mate'})
    })
})

module.exports = router;