import prismaClient from "../../prisma";

 class DetailUserService{
    async execute(user_id: string){

        //Vai no banco e com a função findFirst vai pegar ao primeiro item que tenha o id
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            //Por padrão o prisma vai mandar tudo que tem deste id, mas com o select podemos definir o que ele deve mandar
            select:{
                id:true,
                name: true,
                email: true
            }
        })
        return user;
    }
 }

 export { DetailUserService}