import prismaClient from '../../prisma'
//ele não está dentro de chaves pq foi passado um export default na sua construção
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    async execute({name,email,password}: UserRequest){

        //Verifica se ele enviou um email

        if(!email){
            throw new Error("Email incorret")
        }

        //verificar se esse email já está cadastrado na plataforma
        //findFirst pega o primeiro que encontrar
        const userAlreadyExistys = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        //Validação se existe esse email/usuário
        if(userAlreadyExistys){
            throw new Error("User already exists");
            
        }
        //Criptografando sua senha 
        const passwordHash =  await hash(password, 8)
        
        //Criação de usuário no banco

        const user = await prismaClient.user.create({
            //Corpo do que será enviado para o banco
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            //é aquilo que desejo devolver
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        return user;
    }
}
 export { CreateUserService}