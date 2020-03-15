const express = require('express')
const router = express.Router()
const Post = require('../model/Post')
const auth = require('../middleware/auth')

// get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
        res.json({
            data: posts
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

// create a new post
router.post('/', auth, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const save = await post.save()
        res.json({
            data: save 
        })
    } catch(error) {
        res.json({
            error: error
        })
    }
})

// get single post by indentifier
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json({
            data: post 
        })
    } catch (error) {
        res.json({
            erorr: error
        })
    }
})

// delete single post by indentifier
router.delete('/:id', auth, async (req, res) => {
    try {
        const remove = await Post.remove({ _id: req.params.id })
        res.json({
            data: remove 
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

// update single post by indentifier
router.patch('/:id', auth, async (req, res) => {
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
        res.json({
            data: update
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

module.exports = router