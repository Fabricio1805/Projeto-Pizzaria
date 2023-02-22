
import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../../shared/errors/AppError';

interface AuthRequest{
  email: string;
  password: string;
}


class AuthUserService{
  async execute({ email, password }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(!user){
      throw new AppError('User/password incorrect');
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new AppError('User/password incorrect');
    }


    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );
    //const { password: _, ...userLogin } = user;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };
  }
}

export { AuthUserService };
