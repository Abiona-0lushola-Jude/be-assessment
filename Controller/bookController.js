const DB = require('../Database/Database')

module.exports = {
    getAllBooks: async (req, res)=>{

        const q = "SELECT * FROM books.book"

        DB.query(q, (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    getOneBook: async (req, res)=> {

        const bookId = req.params.id
        const q = "SELECT * FROM books.book WHERE `bookId` =? "

        await DB.query(q,[bookId], (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    postOneBook: async (req, res) => {

        const bookId = req.body.id
        const title = req.body.title
        const descpription = req.body.description
        const publisher = req.body.publisher
        const file = req.body.file
        const lang = req.body.lang


        const q = "INSERT INTO books.book (`bookId`, `title`, `description`, `publisher`, `file`, `lang`) VALUES (?)"
        const values = [
                bookId,
                title,
                descpription,
                publisher,
                file,
                lang
            ]

            await DB.query(q, [values], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Book has been created successfully!"})
            })

         

    },

    updateBook: async (req, res)=>{

        const bookId = req.params.id
        const title = req.body.title
        const descpription = req.body.description
        const publisher = req.body.publisher
        const file = req.body.file
        const lang = req.body.lang

        const firstQuery = "SELECT * FROM  books.book WHERE  `bookId`= ? "

        await DB.query(firstQuery, [bookId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Book doesn't exist yet"})
            }

        const updatedTitle = title ?title : data[0].title
        const updatedDescription = descpription? descpription : data[0].description
        const updatedPublisher  = publisher? publisher : data[0].publisher
        const updatedFile = file? file : data[0].file
        const updatedLang = lang? lang : data[0].lang

            
            const q = "UPDATE books.book  SET  `title`= ?, `description`= ?, `publisher`= ?, `file`= ?, `lang` = ? WHERE bookId = ?"
            const values = [
                updatedTitle,
                updatedDescription,
                updatedPublisher,
                updatedFile,
                updatedLang
            ]

            await DB.query(q, [...values, bookId], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Book has been updated successfully!"})
            })

        })
    },

    deleteBook: async (req, res)=>{
        const bookId = req.params.id

        const q = "DELETE FROM books.book WHERE `bookId` = ?"

        await DB.query(q, [bookId], (err, data)=>{
            if(err) return res.json({message: err.message})

            res.json({message: "Book has been deleted successfully!"})
        })
    }
}