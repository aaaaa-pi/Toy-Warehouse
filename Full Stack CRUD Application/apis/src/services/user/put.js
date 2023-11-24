import { User } from "../../models/user";

const updateById = async (id,user) => User.findByIdAndUpdate(id,user)


export default {
    updateById
}