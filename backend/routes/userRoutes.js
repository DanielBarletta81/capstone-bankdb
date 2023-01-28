import express from 'express';
import { getUser, setUser, getUserById, updateUser, deleteUser } from '../controller/userController';

const router = express.Router();

router.get("", getUser);
router.get("/:id", getUserById);
router.get("", setUser);
router.get("/:id", updateUser);
router.get("/:id", deleteUser);

module.export = router;
