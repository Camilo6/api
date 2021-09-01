const express = require('express')
const routes2 = express.Router()

routes2.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM reserva', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes2.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO reserva set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva added!')
        })
    })
})

routes2.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM reserva WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva excluded!')
        })
    })
})

routes2.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE reserva set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva updated!')
        })
    })
})

module.exports = routes