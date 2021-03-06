const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM restaurante', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO restaurante set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('restaurante agregado!')
        })
    })
})

routes.delete('/:nombre', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM restaurante WHERE nombre = ?', [req.params.nombre], (err, rows)=>{
            if(err) return res.send(err)

            res.send('restaurante borrado!')
        })
    })
})

routes.put('/:nombre', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE restaurante set ? WHERE nombre = ?', [req.body, req.params.nombre], (err, rows)=>{
            if(err) return res.send(err)

            res.send('restaurante actualizado!')
        })
    })
})

module.exports = routes