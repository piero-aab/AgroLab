import { repository } from '../Domain/repository';

export default async function (usercode: string, password: string): Promise<any> {
  try{
    const exits: boolean = await repository.existUserCode(usercode);
    if( !exits ) throw 'El código de usuario ingresado no esta registrado en la plataforma';

    let passwordEncrypt = repository.encryptPassword(password);

    const user =  await repository.findUser({ document: usercode, password: passwordEncrypt });
    if( !user ) throw 'Contraseña equivocada';
    if(user.status ==1) throw ('Su cuenta se encuentra suspendida');
    return user;

  }catch(error){
    throw error;
  }
}
