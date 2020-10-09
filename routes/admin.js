const express = require('express');
const router = express.Router();
const News = require('../models/news.js')


router.all('*',(req,res,next)=>{
if(!req.session.admin){
  res.redirect('login')
  return;
}
next();
})


/* GET home page. */
router.get('/', (req, res, next) =>{
News.find({},(err,data)=>{
  console.log(data)
  res.render('admin/index', { title: 'admin', data });
});

  
});

router.get('/news/add', (req,res)=>{
  res.render('admin/newsform', { title: 'Dodaj news', body: {} ,errors: {}});
})


router.post('/news/add', (req,res)=>{

const body = req.body;
const newsData = new News(body);
const errors = newsData.validateSync();

newsData.save((err)=>{
    if(err){
      res.render('admin/newsform',{title: 'Add more news', errors, body});
      return
    }
  })
res.redirect('/admin')
})


router.get('/news/delete/:id', (req,res)=>{
 News.findByIdAndDelete(req.params.id,(err)=>{
   res.redirect('/admin')
 })
})


module.exports = router;

