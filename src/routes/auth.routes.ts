import { Router } from 'express';
import { 
    login, 
    register,
    logout,
    verifyToken,
} from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validator.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', verifyToken, logout)
router.get('/verify', verifyToken)

export default router;
