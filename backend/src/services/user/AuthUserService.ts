
import prismaClient from "../../prisma";
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken' //registrar e gerar um token
// Ele cria uma definição de como op usuário deve preencher(no caso para o login Email e password)
interface AuthRequest{
     email: string;
     password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //Verifica se o email existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        
        if(!user){
            throw new Error("User/Password incorrect");    
        }
        //Verifica a senha está correta
        //A função compare vai avaliar se as duas senhas batem, tanto a que o usuário está passando para logar como a que foi criptografada para o banco
         const passwordMatch = await  compare(password, user.password)

         if(!passwordMatch){
            throw new Error("User/Password incorrect");
         }

         //Gerar um token JWT e devolver os dados do usuário como id, name e email
         const token = sign(
            {
            //Payload
            name: user.name,
            email: user.email
         },
         process.env.JWT_SECRET,
         {
            subject: user.id,
            expiresIn: '30d'
         }
         )

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService}