import {Request, Response} from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'


class CreateCategoryController{
    async handle(req: Request, res: Response){

        const { name } = req.body; // o name será informado no body pelo usuario e será armazenado nesta const através da proprriedade name
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({
            name
        });

        return res.json(category)
    }
}

export{CreateCategoryController}