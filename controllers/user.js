const { decryptPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models')

class UserControllers {
    static register (req, res, next) {
        const {username, password} = req.body
        let payload = {
            username, password
        }
        User.create(payload)
        .then(result => {
            let user = {
                id: result.id,
                username: result.username
            }
            let token = generateToken(user)
            return res.status(201).json({
                access_token : token, 
                msg: 'Berhasil menambahkan data user'
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static async login (req, res, next) {
        const {username, password} = req.body
        try {
            let payload = {
                username, password
            }
            let user = await User.findOne({
                where: {
                    username
                }
            })
            if(user){
                let compare = decryptPassword(payload.password, user.password)
              
                if(compare){
                    let data = {
                        id: user.id,
                        username: user.username
                    }
                    let token = generateToken(data)
                    return res.status(200).json({
                        access_token : token
                    })
                }
                else {
                    return next({
                        name : 'Bad Request',
                        errors: [{message: "Username/password yang anda masukkan salah"}]
                    })
                }
            }
            else {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "Username/password yang anda masukkan salah"}]
                })
            }
        } catch (error) {
            return next(error)
        }
    }

}

module.exports = UserControllers