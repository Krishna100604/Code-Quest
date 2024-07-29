import mongoose from "mongoose";
import users from '../models/auth.js';

// Get all users
export const getallusers = async (req, res) => {
    try {
        const allusers = await users.find();
        const alluserdetails = allusers.map(user => ({
            _id: user._id,
            name: user.name,
            about: user.about,
            tags: user.tags,
            joinedon: user.joinedon,
        }));
        res.status(200).json(alluserdetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update user profile
export const updateprofile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable");
    }

    try {
        const updateprofile = await users.findByIdAndUpdate(
            _id,
            { $set: { name, about, tags } },
            { new: true }
        );
        res.status(200).json(updateprofile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Search users by query
export const searchUsers = async (req, res) => {
    const { q } = req.query;

    try {
        const usersList = await users.find({
            name: { $regex: q, $options: "i" }
        }).select("_id name username");
        
        const formattedUsers = usersList.map(user => ({
            id: user._id,
            display: `@${user.username}`
        }));
        
        res.status(200).json(formattedUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
