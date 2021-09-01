const express = require('express')
const routesR = express.Router()

routesR.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM reserva', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routesR.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        count = conn.query('SELECT COUNT(restaurante) FROM reserva WHERE restaurante ?',[req.params.restaurante] );
        if (count < 5) {
            conn.query('INSERT INTO reserva set ?', [req.body], (err, rows)=>{
                if(err) return res.send(err)

                res.send('reserva added!')
            })
        }
        else {
            res.send('Reservas llenas')
        }
    })
})

routesR.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM reserva WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva excluded!')
        })
    })
})

routesR.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE reserva set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('reserva updated!')
        })
    })
})

module.exports = routesR