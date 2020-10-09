const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')


/* GET home page. */
router.get('/', (req, res) =>{
  const show = !req.session.vote
  Quiz.find({}, (err,data)=>{
    let sum = 0;
    data.forEach(item=>{
      sum+=item.vote;
    })
    // console.log(data)
    res.render('quiz', { title: 'quiz', data, show, sum });
  })
  
});

router.post('/', (req, res) =>{
  const id = req.body.quiz;

  Quiz.findOne({ _id: id }, (err,data)=>{
    data.vote=data.vote+1;
    data.save(()=>{
      req.session.vote=1;
      res.redirect('/quiz')
    })
    console.log(data)
    
  });
});

module.exports = router;
