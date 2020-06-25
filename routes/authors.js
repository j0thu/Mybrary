const express = require('express');
const router = express.Router();

const Author = require('../models/author');  //Importing the author model to use 

//All authors route
router.get('/', async(req, res)=> {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i') //i flag means, that it is case insensitive
    }
    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {authors:authors, searchOptions: req.query});
    }
    catch{
        res.redirect('/');

    }
})

//New Author Route
router.get('/new', (req, res)=> { 
    res.render('authors/new', {author: new Author()});  // For using the author model in the ejs file
})

//Creating a new author
router.post('/', async(req, res)=> {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save(); //waits for author.save to finish
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors');
    }
    catch{
            res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
     })
    }
})

module.exports = router;

