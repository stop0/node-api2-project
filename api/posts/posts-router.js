// implement your posts router here
const express = require('express');

const router = express.Router()

const Posts = require('./posts-model')

////////////////////////////////////

router.get('/api/posts', (req, res) => {
    Posts.find()
        .then(posts =>{

            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "The posts information could not be retrieved"})

        })

})

////////////////////////////////////


router.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts =>{
            if (posts){
                res.status(200).json(posts)
            }
            else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "The posts information could not be retrieved"})

        })

})

////////////////////////////////////
router.post('/api/posts', (req, res) => {

    const newPosts = req.body

    if (!newPosts.title || !newPosts.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })

    }
    else{
        Posts.insert(newPosts)
        .then(posts =>{

            res.status(201 ).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "There was an error while saving the post to the database" })

        })
    }
})

//////////////////////////////////////////

router.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    try {
        if (!changes.title || !changes.contents){
            res.status(400).json({message: "Please provide title and contents for the post"})
        }
        else{
            const updatePosts =  Posts.update(id, changes)
            if (! updatePosts) {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
            else{
                res.json(updatePosts)
            }
        }

    }   catch(error) {
        console.log(error)
        res.status(500).json({ message: "The post information could not be modified"})
   }

})

////////////////////////////////////////////////


router.delete('/api/posts/:id', (req, res) => {
    try{
        const deleted =  Posts.remove(req.params.id)
        if (!deleted){
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
        else{
            res.json(deleted)
        }
    }
    catch (error) {
        res.status(500).json({message: "The post could not be removed"})

    }


})

////////////////////////////////////////////////


router.get('/api/posts/:id/comments', (req, res) => {
    try{
        const Get = Posts.findPostComments(req.params.id)
        if (!Get){
            res.status(404).json({message: "The post with the specified ID does not exist"})

        }
        else{
            res.json(Get)
        }
    }
    catch (error){
        console.log(error)
        res.status(500).json({ message: "The posts information could not be retrieved"})



    }

})


module.exports = router
