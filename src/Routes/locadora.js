const express = require('express')
const router = express.Router()
const crud = require("../Controllers/crud")
const auth = require("../Middlewares/auth");

// Instancia o middleware admin, que verifica se o user é admin para permitir fazer funções.
const admin = require("../Middlewares/admin");


router.get("/locadora/:id", (req, res) => {
    crud("locadora",   
        {
            where: {
                id: req.params.id
            }
        },
        "request"
    )
    .then(data=>res.status(200).json(data)
    )
    .catch(err=>
        {
            res.status(400).json(err)
        })
});


router.get("/locadora", (req, res) => {
    crud("locadora",   
        {},
        "request"
    )
    .then(data=>res.status(200).json(data)
    )
    .catch(err=>
        {
            res.status(400).json(err)
        })
});




router.post("/locadora",auth, admin, (req, res) => {
    crud("locadora",   
        {
            nome: req.body.nome,
            email : req.body.email,
            cnpj : req.body.cnpj,
            telefone : req.body.telefone
        },
        "create"
    )
    .then(data=>res.status(200).json(data)
    )
    .catch(err=>
    {
        res.status(400).json(err)
    })
});


router.put("/locadora",auth,admin, (req, res) => {
        
        crud("locadora",   
        [
            {
                nome: req.body.nome,
                email : req.body.email,
                cnpj : req.body.cnpj,
                telefone : req.body.telefone
            },
            {where: { id: req.body.id}}
        ],
        "update"
        )
        .then(data=>res.status(200).json(data)
    )
    .catch(err=>
        {
            res.status(400).json(err)
        })
    });


    router.delete("/locadora",auth,admin, (req, res) => {
        
        crud("locadora",   
        
            {
                where: { id: req.body.id }
            }
            ,
        "delete"
        )
        .then(data=>res.status(200).json(data)
    )
    .catch(err=>
        {
            res.status(400).json(err)
        })
    });

    
module.exports = router