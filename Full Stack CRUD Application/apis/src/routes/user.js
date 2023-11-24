import {Router} from 'express'
import * as UserController from '../controllers/user'
const User = Router()

User.get('/',UserController.getUsers)
User.get('/:id',UserController.getUserById)
User.post('/createUser',UserController.createUser)
User.delete('/deleteUser/:id',UserController.deleteUserById)
User.put('/updateUser/:id',UserController.updateUser)


export default User