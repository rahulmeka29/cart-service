const db = require('../models/index');
const Cart = db.Carts;
exports.create = async (req, res)=>{
    const {userId, items, total } = req.body;
    try {
        const response = await Cart.create({
            userId,
            items,
        })
        console.log('Cart created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }
    res.json({ status: 'ok' })
}

exports.update = async(req, res)=>{
    
        const {userId, items, total } = req.body;
        try {
            const response = await Cart.findOneAndUpdate(
                {userId}, 
                {
                userId,
                items,
                }, 
                {
                new: true,
                upsert: true // Make this update into an upsert
                }
              )
            console.log('Cart created successfully: ', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Username already in use' })
            }
            throw error
        }
        res.json({ status: 'ok' })
}

exports.fetch = (req, res)=>{
    const id = req.query.userId;
    console.log('id', id);
    Cart.findOne({ "userId":id })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
}
