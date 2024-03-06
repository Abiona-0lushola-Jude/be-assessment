const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT  = process.env.PORT || 5000
const CategoryRouter = require('./Routes/CategoryRoute')
const AuthorRouter = require('./Routes/AuthorRoute')
const BookRoute = require('./Routes/bookRoute')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const path = require('path')


// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
// app.use(cookieParser())



  const storage = multer.diskStorage({
    destination:async (req, file, cb) => {
     await cb(null, '../my-app/src/uploads')
    },
    filename: async (req, file, cb)=> {
      await cb(null, Date.now()+file.originalname)
    }

  });


 const upload = multer({ storage });

 app.post('/upload', upload.single('image'), async(req, res) => {
    try {
      const imageUrl = await `${req.file.filename}`;
      await res.json({ imageUrl });
    } catch (err) {
      await res.json({message:err.message})
    }
   
});


// routes
// app.use('/', router)
app.use('/api', AuthorRouter)
app.use('/api', BookRoute)
app.use('/api', CategoryRouter)
app.use('/api', require('./Routes/RelationsRoute'))


// app listening
app.listen(PORT, ()=> console.log(`SEVER IS RUNNING ON PORT ${PORT}`))