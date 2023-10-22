import Users from "../models/users";
import { IUsers, UsersCreationAttributes, UsersAttributes } from "../models/types/IUsers";

// Create a new user
export const createUser = async (payload: UsersCreationAttributes): Promise<UsersAttributes> => {
  try {
    const newUser = await Users.create(payload);

    return newUser;
  } catch (err) {
    throw err;
  }
}

// Update an existing user
export const updateUser = async (id: number, payload: IUsers): Promise<UsersAttributes> => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const updatedUser = await user.update(payload);
    return updatedUser;

  } catch (err) {
    throw err;
  }
}

// Get a user by id
export const getUserById = async (id: number): Promise<UsersAttributes> => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (err) {
    throw err;
  }
}

// Get a user by name
export const getUserByName = async (name: string): Promise<UsersAttributes | null> => {
  try {
    const user = await Users.findOne({
      where: {
        name,
      }
    });
    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.log('ERROR IN DATABASE', err)
    throw err;
  }
}


// Delete a user by id
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const deleteUserCount = await Users.destroy({
      where: {
        id: id,
      }
    });

    return !!deleteUserCount;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

// Get all users
export const getAllUsers = async (): Promise<UsersAttributes[]> => {
  try {
    const user = await Users.findAll();

    return user;
  } catch (err) {
    throw err;
  }
}