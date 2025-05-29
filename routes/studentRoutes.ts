import { Router, Request, Response } from 'express';
import controller from '../controller/studentController'
const router=Router()

router.get('/',controller.renderTable)


export default router;