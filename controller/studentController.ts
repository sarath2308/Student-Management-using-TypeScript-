import { Request, Response } from 'express';

 const renderTable=async(req:Request,res:Response)=>
{
    try {
        res.render('table')
    } catch (error) {
        res.send("error")
    }
}
export default{
    renderTable,
}