import bcryptjs from 'bcryptjs';
import models from '../models';
import token from '../services/token';
import resource from '../resources';

export default {
    register: async(req, res) => {
        try {
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);
            const user = await models.User.create(req.body);
            console.log(user);
            res.status(200).json({
                user
            })
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
            console.log('error', error);
        }
    },

    register_admin: async(req, res) => {
        try {
            const userV = await models.User.findOne({email: req.body.email});
            console.log(userV);
            if(userV) {
                return res.status(500).send({
                    message: 'EL USUARIO YA EXISTE'
                });
            }
            req.body.rol = "admin";
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);
            let user = await models.User.create(req.body);
            return res.status(200).json({
                user: resource.User.user_list(user)
            });
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
            console.log('error', error);
        }
    },
    
    login: async(req, res) => {
        try {
            console.log(req.body);
            const user = await models.User.findOne({email: req.body.email, state: 1});
            console.log(user);
            if (user) {
                let compare = await bcryptjs.compare(req.body.password, user.password);
                if (compare) {
                    let tokenT = await token.encode(user._id, user.orFail, user.email);
                    const userFront = {
                        token: tokenT,
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            surname: user.surname,
                            avatar: user.avatar,
                        },  
                    }
                    res.status(200).json({
                        userFront: userFront
                    })
                } else {
                    res.status(500).send({
                        message: 'EL USUARIO NO EXISTE'
                    }); 
                }
            } else {
                res.status(500).send({
                    message: 'EL USUARIO NO EXISTE'
                }); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
            console.log(error);
        }
    },

    login_admin: async(req,res) => {
        try {
            const user = await models.User.findOne({email: req.body.email,state:1,rol: "admin"});
            console.log(user);
            if(user){
                //SI ESTA RGISTRADO EN EL SISTEMA
                let compare = await bcryptjs.compare(req.body.password,user.password);
                if(compare){
                    let tokenT = await token.encode(user._id,user.rol,user.email);

                    const USER_FRONTED = {
                        token:tokenT,
                        user: {
                            name: user.name,
                            email: user.email,
                            surname: user.surname,
                            avatar: user.avatar,
                            rol: user.rol,
                        },
                    }

                    res.status(200).json({
                        USER_FRONTED:USER_FRONTED,
                    })
                }else{
                    res.status(500).send({
                        message: "EL USUARIO NO EXISTE"
                    });
                }
            }else{
                res.status(500).send({
                    message: "EL USUARIO NO EXISTE"
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
            });
            console.log(error);
        }
    },

    update: async(req, res) => {
        try {
            console.log(req.body);
            if (req.files) {
                var img_path = req.files.avatar.path;
                var name = img_path.split('/');
                var avatar_name = name[2];                
            }
            if (req.body.password) {                
                console.log(req.body);
                const salt = await bcryptjs.genSalt(10);
                req.body.password = await bcryptjs.hash(req.body.password, salt);
            }
            await models.User.findByIdAndUpdate({_id: req.body._id}, req.body);

            let UserT = await models.User.findOne({ _id: req.body._id });

            res.status(200).json({
                message: "EL USUARIO SE HA MODIFICADO CORRECTAMENTE",
                user: resource.User.user_list(UserT)
            });
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
            console.log(error);
        }
    },

    list: async(req, res) => {
        try {
            var search = req.query.search;
            let Users = await models.User.find({
                $or: [
                    {'name': new RegExp(search, 'i')},
                    {'surname': new RegExp(search, 'i')},
                    {'email': new RegExp(search, 'i')},
                ]
            }).sort({'createdAt': -1});

            Users = Users.map((user) => {
                return resource.User.user_list(user);
            });

            res.status(200).json({
                users: Users
            });
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
        }
    },

    remove: async(req, res) => {
        try {
            const User = await models.User.findByIdAndDelete({_id: req.query._id});
            res.status(200).json({
                message: 'EL USUARIO SE ELIMINO CORRECTAMENTE'
            });
        } catch (error) {
            res.status(500).send({
                message: 'HUBO UN PROBLEMA'
            });
        }
    }
}