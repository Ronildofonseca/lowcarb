import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}
//Quando usra esse metodo execute, é preciso passar um name(tipo string).
class CreateCategoryService{
    async execute({name}: CategoryRequest){

        if(name === ''){
            throw new Error("Name Invalid");
        }

        const category = await prismaClient.category.create({
            data:{
                name: name
            },
            select:{
                id: true,
                name: true,
            }
        })

        return category;
    }
}
export{CreateCategoryService}