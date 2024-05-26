const { Users } = require('../models/Users');
const { Role } = require('../models/Role');


const UserRoleAssociation = () => {
  Users.belongsTo(Role, { foreignKey: 'role_id' });
};

module.exports = {
  UserRoleAssociation
};
