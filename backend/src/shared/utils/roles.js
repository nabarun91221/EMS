export const ROLES = {
  ORGANIZER: "ORGANIZER",
  ATTENDEE: "ATTENDEE"
};

const roleScopes = Object.freeze({
  [ROLES.ORGANIZER]: [

    "event:create",
    "event:read",
    "event:update",
    "event:delete",

    "registration:create",
    "registration:read",
    "registration:update",
    "registration:delete",
    "registration:update:me",
    "registration:read:me",

  ],

  [ROLES.ATTENDEE]: [
    "event:read",
    "event:book",

    "registration:update:me",
    "registration:read:me",
    "registration:create:me"
  ],
});
class Roles
{
  constructor()
  {
    this.roles = roleScopes;
  }
  getPermissionOf = (role) =>
  {
    return this.roles[role];
  };
}

export default new Roles();
