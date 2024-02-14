import prismaClient from "../../prisma";

//Aqui ele mostra como quer receber e o que vai receber
interface ProductRequest{
    category_id: string;
}
class ListByCategoryService{
    //Aqui ele recebe o Id informado
    async execute({category_id}: ProductRequest){
        //Aqui ele busca com base no Id recebido todos os products que tenha esse ID
        const findByCategory = await prismaClient.product.findMany({

            where:{
                category_id: category_id
            }
        })

        return findByCategory;
    }
}

export { ListByCategoryService }