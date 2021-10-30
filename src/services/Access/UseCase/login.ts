import { repository } from '../Domain/repository';

export default async function (email: string, password: string): Promise<any> {
  try{
    const exits: boolean = await repository.existEmail(email);
    if( !exits ) throw 'El correo ingresado no esta registrado en la plataforma';

    let passwordEncrypt = repository.encryptPassword(password);

    const user =  await repository.findUser({ email: email, password: passwordEncrypt });
    if( !user ) throw 'Contraseña equivocada';
    if(user.status ==1) throw ('Su cuenta se encuentra suspendida');
    return user;

  }catch(error){
    throw error;
  }
}
