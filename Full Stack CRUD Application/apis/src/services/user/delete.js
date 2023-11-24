import { User } from "../../models/user";

const deleteById = async (id) => User.findByIdAndDelete(id)


export default {
    deleteById
}