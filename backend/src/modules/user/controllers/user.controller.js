
import User from "../model/user.model.js";
class UserController
{
    getMe = async (req, res) =>
    {
        try {

            const userId = req.user.sub;

            if (userId) {
                const user = await User.findById(userId);
                if (user) {
                    const { password, safeUser } = user;
                    return res.send({
                        success: true,
                        message: "User data fetched",
                        data: safeUser
                    }
                    )

                }
            }
        } catch (error) {
            console.log(error);
            res.send({
                success: true,
                message: error.message
            })
        }
    }
}

export default new UserController();