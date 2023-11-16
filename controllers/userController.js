const { User, Thought } = require("../models");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            const userObj = {
                users
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .lean();

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json({
                user

            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req.params;
        const { username, email } = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, email },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User successfully deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    addFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID :(' });
            }

            res.json('Friend Added');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    removeFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID :(' });
            }

            res.json('Friend Removed');
        } catch (err) {
            res.status(500).json(err);
        }
    }
};