import User from "../models/userSchema.js"

export const followUser = async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findById(req.user._id)
        const userToFollow = await User.findById(userId)

        if (!userToFollow) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }


        if (userToFollow.followers.includes(req.user._id)) {
            return res.status(400).json({ success: false, message: 'User is already followed' });
        }

        user.following.push(userId)
        userToFollow.followers.push(req.user._id)

        await user.save()
        await userToFollow.save()

        const updatedUser = await User.findById(req.user._id).select('-password');
        return res.status(200).json({ success: true, message: 'User followed successfully', user: updatedUser });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


export const getFollowers = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(req.user._id).populate('followers', 'name pic')

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, followers: user.followers });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const unFollowUser = async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findById(req.user._id)
        const userToUnFollow = await User.findById(userId)

        if (!userToUnFollow) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.following = user.following.filter(id => id.toString() !== userId)

        userToUnFollow.followers = userToUnFollow.followers.filter(id => id.toString() !== req.user._id.toString())

        await user.save()
        await userToUnFollow.save()

        return res.status(200).json({ success: true, message: 'User followed successfully' })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


export const getUserProfile = async (req, res) => {
    const { userId } = req.params

    try {
        const userProfile = await User.findById(userId).select('-password')

        if (!userProfile) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log(userProfile);
        res.json({ success: true, user: userProfile }).status(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getFollowerStatus = async (req, res) => {

    try {

        const { userId } = req.params

        const followerId = req.user._id

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isFollowing = await user.followers.includes(followerId)

        res.status(200).json({ success: true, isFollowing });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}