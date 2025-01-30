const ROLES = {
  Admin: ["create", "update", "delete", "view"],
  Creator: ["create", "view"],
  Producer: ["update", "view"],
  Tester: ["view"]
};

module.exports = ROLES;
