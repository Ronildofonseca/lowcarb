import {NextFunction ,Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
    //tipamos o sub
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //Receber o token
    //O token sempre virá em uma requisição, no header(cabeçalho) e dentro authorization
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
        //Sem token, sem autorização para prosseguir
    
    }

    //Ele irá pegar apenas o token, sem a string bearer que vem na requisição, por isso a virgula no inicio do array, pq significa ignorar o primeiro item antes do espaço e só pegar a sergunda, que no caso é o token.
    //a função split pega tudo que estiver entre espaço
    const[, token] = authToken.split(" ")

    try {
        //validar esse token
        const{ sub } = verify(
            token,
            process.env.Jwt_SECRET

        ) as Payload;

        //recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
        req.user_id = sub
        
        return next()
    //Essa função faz com que após a tratativa do middleware, a função continue seguindo a sua requisição
        
    } catch (error) {
        return res.status(401).end()  
    }
    
}