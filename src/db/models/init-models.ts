import type { Sequelize } from "sequelize";
import { SequelizeMeta as _SequelizeMeta } from "./SequelizeMeta";
import type { SequelizeMetaAttributes, SequelizeMetaCreationAttributes } from "./SequelizeMeta";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _SequelizeMeta as SequelizeMeta,
  _users as users,
};

export type {
  SequelizeMetaAttributes,
  SequelizeMetaCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const SequelizeMeta = _SequelizeMeta.initModel(sequelize);
  const users = _users.initModel(sequelize);

  return {
    SequelizeMeta: SequelizeMeta,
    users: users,
  };
}
