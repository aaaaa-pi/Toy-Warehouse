import { User } from "../../models/user";

const createUser = async (user) => User.create(user)


export default {
    createUser
}