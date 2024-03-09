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
        const q = "SELECT * FROM books.category WHERE cat_id =? "

        await DB.query(q,[categoryId], (err, data)=>{
            if (err) return res.json({message: err.message})

            res.json(data)

        })
    },

    postCategory: async (req, res) => {

        const cat_id = req.body.id
        const name = req.body.name
        const descpription = req.body.description
        const file = req.body.file
       

        const q = "INSERT INTO books.category (`cat_id`, `name`, `description`, `file`) VALUES (?)"
        const values = [
                cat_id,
                name,
                descpription,
                file
            ]

            await DB.query(q, [values], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Book has been created successfully!"})
            })


    },

    updateCaregory: async (req, res)=>{

        const cat_id = req.body.id
        const name = req.body.name
        const descpription = req.body.description
        const file = req.body.file

        const firstQuery = "SELECT * FROM  books.book WHERE  `cat_id` = ? "

        await DB.query(firstQuery, [cat_id], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Book doesn't exist yet"})
            }


            const q = "UPDATE books.category  SET  `title`= ?, `description`= ?, `publisher`= ?, `file`= ?, `lang` = ? WHERE blog_id = ?"
            const values = [
                name,
                descpription,
                file,
            ]

            await DB.query(q, [...values, cat_id], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Book has been updated successfully!"})
            })

        })
    },

    deleteCategory: async (req, res)=>{
        const categoryId = req.params.id

        const q = "DELETE FROM books.category WHERE `cat_id` = ?"

        await DB.query(q, [categoryId], (err, data)=>{
            if(err) return res.json({message: err.message})

            res.json({message: "Category has been deleted successfully!"})
        })
    }
}