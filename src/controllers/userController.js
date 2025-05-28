import {
  registerUserService,
  loginUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/userService.js";

export async function registerUser(req, res) {
  await registerUserService(req, res);
}

export async function loginUser(req, res) {
  await loginUserService(req, res);
}

export async function getUserById(req, res) {
  await getUserByIdService(req, res);
}

export async function updateUser(req, res) {
  await updateUserService(req, res);
}

export async function deleteUser(req, res) {
  await deleteUserService(req, res);
}
