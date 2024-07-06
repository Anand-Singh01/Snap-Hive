import { Router } from "express";
import { addUser } from '../controllers/user-controller';

export const userRoutes = Router();

userRoutes.post('/addUser', addUser);