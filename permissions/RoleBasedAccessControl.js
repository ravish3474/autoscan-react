const Controller = require('../models/Controller');
const ControllerAction = require('../models/ControllerAction');
const Role = require('../models/Role');
const { User } = require('../models/User');

class RBAC {
    static checkAccess(controller_name, action_name) {
        return async (req, res, next) => {

            try {
                if(!req.user) {
                    throw new Error('Couldn\'t find the user');
                }

                const { role } = req.user;
                
                let permissions = await Role.findOne({ where: { role_name: role }, attributes: ["role_permissions"], raw: true });
                permissions = JSON.parse(permissions.role_permissions);
                let controller_id = await Controller.findOne({ where: { controller_name }, attributes: ["id"] });
                let fetched_actions = permissions[controller_id.dataValues.id];

                let action_id = await ControllerAction.findOne({ where: { action_name }, attributes: ["id"] });
                action_id = action_id.dataValues.id;

                // console.log('FETHCED')
                if(fetched_actions.indexOf(action_id + "") !== -1) {
                    console.log('You can access this route!');
                    next();
                } else {
                    return res.status(403).json({
                        status: "success",
                        msg: "You don't have permission to access this route!"
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    status: "fail", 
                    msg: `${error.message}`
                });
            }
        }
    }
}

module.exports = RBAC;