const getAllGroups = require("./getAllGroups");
const getAllGroupsOfUser = require("./getAllGroupsOfUser");
const addGroup = require("./addGroup");
const updateGroup = require("./updateGroup");
const deleteGroup = require("./deleteGroup");
const getGroupById = require("./getGroupById");
const addUserToGroup = require("./addUserToGroup");
const makeUserAdmin = require("./makeUserAdmin");
const customGroup = require("./customGroup");
const copyGroup = require("./copyGroup");

module.exports = {
  getAllGroups,
  getAllGroupsOfUser,
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupById,
  addUserToGroup,
  makeUserAdmin,
  customGroup,
  copyGroup
};
