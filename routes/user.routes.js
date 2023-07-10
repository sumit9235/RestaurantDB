const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model.js")
const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body
    try {
        bcrypt.hash(password, 4, async (err, hash) => {
            if (err) {
                res.send({ "msg": err.message })
            } else {
                const user = new UserModel({ name, email, password: hash, address })
                await user.save()
                res.status(201).send({ "msg": "Registration Sucessfull" })
            }
        })
    } catch (err) {
        res.send(err.message)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "sumit");
                    res.status(201).send({ "msg": "User Logged in Sucessfull", "token": token })
                } else {
                    res.send({ "msg": "Wrong Password" })
                }
            })
        } else {
            res.status(400).send({ "msg": "No user found" })
        }
    } catch (err) {
        res.send({ "err": err.message })
    }
})

userRouter.patch("/user/:id/reset", async (req, res) => {
    const id = req.params.id;
    const { old_pass, password } = req.body;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            bcrypt.compare(old_pass, user.password, async (err, result) => {
                if (result) {
                    bcrypt.hash(password, 4, async (err, hash) => {
                        if (err) {
                            res.send({ "msg": err.message })
                        } else {
                            await UserModel.findByIdAndUpdate(id, { password: hash });
                            res.status(201).send({ "msg": "Password updated successfully" });
                        }
                    })
                } else {
                    res.send({ "msg": "Previous password is wrong" });
                }
            });
        } else {
            res.status(400).send({ "msg": "No user found" });
        }
    } catch (err) {
        console.log(err.message);
    }
});



module.exports = {
    userRouter
}
