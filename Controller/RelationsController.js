const DB  =  require('../Database/Database')


module.exports = {

    getallInfo : async (req, res)=>{


        const q = "SELECT * FROM books.book JOIN books.author ON book.authorId = author.authorId"

        DB.query(q, (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })


    }

        

    




}