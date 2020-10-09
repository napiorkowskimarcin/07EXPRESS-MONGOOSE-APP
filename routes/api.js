const express = require('express');
const router = express.Router();
const News = require('../models/news')
const defaultSort=-1

/* GET home page. */
router.get('/', (req, res, next) =>{
const search = req.query.search || '';
let sort = req.query.sort || -1;
if(sort !== -1 && sort !== 1){
    sort=defaultSort;
}

const findNews = News
  .find( {title: new RegExp(search.trim(), 'i')})
  .sort({created: sort})
   .select('title description');


  findNews.exec((err,data)=>{
    res.json(data);
  })
});

module.exports = router;
