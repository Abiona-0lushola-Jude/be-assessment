const DB = require('../Database/Database')

module.exports = {
    getAllCategory: async (req, res)=>{

        const q = "SELECT * FROM books.catgory"

        DB.query(q, (err, data)=>{
            if (err) return res.json({message: err.message})

            res.json(data)

        })
    },

    getOneCategory: async (req, res)=> {

        const categoryId = req.params.id
        const q = "SELECT * FROM books.category WHERE blog_id =? "

        await DB.query(q,[categoryId], (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    postCategory: async (req, res) => {

        const bookId = req.body.id
        const title = req.body.title
        const descpription = req.body.description
        const publisher = req.body.publisher
        const file = req.body.file
        const lang = req.body.lang


        const q = "INSERT INTO books.category (`book_id`, `title`, `description`, `publisher`, `file`, `lang`) VALUES (?)"
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

    updateCaregory: async (req, res)=>{

        const categoryId = req.body.id
        const title = req.body.title
        const descpription = req.body.description
        const publisher = req.body.publisher
        const file = req.body.file
        const lang = req.body.lang

        const firstQuery = "SELECT * FROM  books.book WHERE  `categoryIdnpm start`= ? "

        await DB.query(firstQuery, [blogId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Book doesn't exist yet"})
            }


            const q = "UPDATE books.category  SET  `title`= ?, `description`= ?, `publisher`= ?, `file`= ?, `lang` = ? WHERE blog_id = ?"
            const values = [
                title,
                descpription,
                publisher,
                file,
                lang
            ]

            await DB.query(q, [...values, categoryId], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Book has been updated successfully!"})
            })

        })
    },

    deleteCategory: async (req, res)=>{
        const categoryId = req.params.id

        const q = "DELETE FROM books.category WHERE `categoryId` = ?"

        await DB.query(q, [categoryId], (err, data)=>{
            if(err) return res.json({message: err.message})

            res.json({message: "Category has been deleted successfully!"})
        })
    }
}