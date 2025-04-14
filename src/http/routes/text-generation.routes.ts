// src/http/routes/text-generation.routes.ts
import { Router } from 'express';
import { textGenerationController } from '../controllers/text-generation-controller/text-generation.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Route für Textgenerierung
router.post('/generate', verifyToken, (req: any, res) => 
  textGenerationController.generateText(req, res)
);

export default router;