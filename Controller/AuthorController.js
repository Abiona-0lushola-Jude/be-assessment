const DB = require('../Database/Database')

module.exports = {
    getAllAuthor: async (req, res)=>{

        const q = "SELECT * FROM books.author"

        DB.query(q, (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    getOneAuthor: async (req, res)=> {

        const authorId = req.params.id
        const q = "SELECT * FROM books.author WHERE `authorId` = ? "

        await DB.query(q,[authorId], (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    postOneAuthor: async (req, res) => {

        const authorId = req.body.id
        const Name = req.body.Name
        const nationality = req.body.nationality
        const Education = req.body.Education
        const publisher = req.body.publisher
        const file = req.body.file


        const q = "INSERT INTO books.author (`authorId`, `Name`, `nationality`,`education`, `publisher`, `file`) VALUES (?)"
        const values = [
                authorId,
                Name,
                nationality,
                Education,
                publisher,
                file
            ]

            await DB.query(q, [values], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Author has been created successfully!"})
            })


    },

    updateAuthor: async (req, res)=>{

        const authorId = req.body.id
        const name = req.body.title
        const nationality = req.body.nationality
        const Education = req.body.Education
        const publisher = req.body.publisher
        const file = req.body.file

        const firstQuery = "SELECT * FROM  books.author WHERE  `authorId`= ? "

        await DB.query(firstQuery, [authorId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Author doesn't exist yet"})
            }

            const updatedName = name ? name : data.Name
            const updatedNationality = nationality ? nationality : data.nationality
            const updatedEducation = Education? Education : data.Education
            const updatedPublisher = publisher ? publisher : data.publisher
            const updatedFile = file ? file : data.file

            const q = "UPDATE INTO books.author (, `Name`, `nationality`,`education`, `publisher`, `file`) VALUES (?)"
            const values = [
                updatedName,
                updatedNationality,
                updatedEducation,
                updatedPublisher,
                updatedFile
            ]

            await DB.query(q, [values], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Author has been updated successfully!"})
            })


        })
    },

    deleteAuthor: async (req, res)=>{
        const authorId = req.params.id

        const q = "DELETE FROM books.author WHERE `authorId` = ?"

        await DB.query(q, [authorId], (err, data)=>{
            if(err) return res.json({message: err.message})

            res.json({message: "Author has been deleted successfully!"})
        })
    }
}