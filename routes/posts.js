const express = require('express')
const router = express.Router()
const Post = require('../model/Post')

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

// create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const save = await post.save()
        res.json(save)
    } catch(err) {
        res.json({
            message: err
        })
    }
})

// get single post by indentifier
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

// delete single post by indentifier
router.delete('/:id', async (req, res) => {
    try {
        const remove = await Post.remove({ _id: req.params.id })
        res.json(remove)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

// update single post by indentifier
router.patch('/:id', async (req, res) => {
    try {
        const update = await Post.updateOne(
            { 
                _id: req.params.id 
            },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        )
        res.json(update)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

module.exports = router