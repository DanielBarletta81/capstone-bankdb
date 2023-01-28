import asyncHandler from "express-async-handler";

import User from "../model/user";

const getUser = asyncHandler(async (req, res) => {
    const usersList = User.find();

    res.status(200).json({
        description: "Successfully fetched all user data!",
        result: usersList
    })
})
const getUserById = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.id);

    res.status(200).json({
        description: "Successfully fetched user by IDdata!",
        result: user
    })
})

const setUser = asyncHandler(async (req, res) => {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.status(200).json({
        description: "User data saved succesfully!"
    })

})

const updateUser = asyncHandler(async (req, res) => {
    await User.findByIDAndUpdate(req.params.id, req.body, 
        { new: true })
    res.status(200).json({
        description: "User data updated succesfully!"
    })

})
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByID(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error("User not located")
    }
    await user.remove()
    res.status(200).json({
        description: "User data successfully removed!"
    })

    module.exports = {
        getUser,
        getUserById,
        setUser,
        updateUser,
        deleteUser
}

})