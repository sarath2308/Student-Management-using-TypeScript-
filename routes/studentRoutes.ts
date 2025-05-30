import { Router, Request, Response } from 'express';
import controller from '../controller/studentController'
const router=Router()

router.get('/',controller.renderTable)
router.post('/api/students',controller.newStudent)
router.patch('/api/students',controller.editStudent)


export default router;