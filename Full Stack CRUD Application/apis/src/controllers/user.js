import getUserService from '../services/user/get'
import postUserService from '../services/user/post'
import deleteUserService from '../services/user/delete'
import putUserService from '../services/user/put'

export const getUsers = async (req,res) => {
    try {
        res.status(200).json((await getUserService.all()))
    }catch(e){
        res.status(500).json(e)
    }
}
export const getUserById = async (req,res) => {
    try {
        res.status(200).json((await getUserService.byId(req.params.id)))
    }catch(e){
        res.status(500).json(e)
    }
}
export const deleteUserById = async (req,res) => {
    try {
        await deleteUserService.deleteById(req.params.id)
        res.status(200).json({
            code:0,
            res: '删除成功'
        });
    }catch(e){
        res.status(500).json(e)
    }
}
export const createUser = async (req,res) => {
    try{
        const {name,email,password} = req.body
        const newUser = await postUserService.createUser({
            name,
            email,
            password
        })
        res.status(200).json(newUser);
    }catch(e) {
        res.status(500).json(e)
    }
}
export const updateUser = async (req,res) => {
    try{
        const {name,email,password} = req.body
        await putUserService.updateById(req.params.id,{
            name,
            email,
            password
        })
        res.status(200).json({
            code:0,
            res: '更新成功'
        });
    }catch(e) {
        res.status(500).json(e)
    }
}