const express = require('express')
const restaurantRouter = express.Router()
const { RestaurantModel } = require('../model/Restaurant.model')

restaurantRouter.post("/restaurant", async (req, res) => {
    const payload = req.body;
    try {
        const data = new RestaurantModel(payload);
        data.save();
        res.status(200).send({ "msg": "Resturant added sucessfully" })
    } catch (err) {
        res.send({ "msg": err.message })
    }
})

restaurantRouter.get("/restaurants", async (req, res) => {
    try {
        const data = await RestaurantModel.find();
        res.status(200).send({ "restaurants": data })
    } catch (err) {
        res.send({ "msg": err.message })
    }
})


restaurantRouter.get("/restaurants/:id", async (req, res) => {
    const id=req.params.id;
    try {
        const data =  await RestaurantModel.findById(id);
        res.status(200).send({ "restaurants": data })
    } catch (err) {
        res.send({ "msg": err.message })
    }
})


restaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
    const id = req.params.id;
    try {
      const restaurant = await RestaurantModel.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menu = restaurant.menu;
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  restaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
      let id = req.params.id;
      let { name, description, price, image } = req.body;
    try {
        let restaurant = await RestaurantModel.findById(id);
        let NewmenuObject = {
            name,
            description,
            price,
            image
        };

        restaurant.menu.push(NewmenuObject);
        await restaurant.save();
        res.status(201).send("Item added successfully")
    } catch (err) {
        res.send({ "msg": err.message })
    }
})
  

restaurantRouter.delete("/restaurants/:id/menu/:menuid", async (req, res) => {
    let { id, menuid } = req.params;
    try {
        let restaurant = await RestaurantModel.findById(id);
        if (restaurant) {
            for (let i = 0; i < restaurant.menu.length; i++) {
                if (restaurant.menu[i]._id == menuid) {
                    restaurant.menu.splice(i, 1);
                    await restaurant.save();
                    res.status(200).send("Menu Deleted");
                    break;
                }
            }
        } else {
            res.send("Restaurant ID Wrong");
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});



module.exports = {
    restaurantRouter
}
