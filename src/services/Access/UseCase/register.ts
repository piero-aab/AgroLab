import { repository } from '../Domain/repository';

export default async function (usercode: string, password: string): Promise<any> {
  try{
    const exists: boolean = await repository.existUserCode( usercode );
    if( exists ) throw "El código de usuario ingresado ya esta registrado";

    let encryptPassword: string = repository.encryptPassword(password);

    const newUser = await repository.createUser(usercode, encryptPassword);
    if( !newUser ) throw "Problema al registar al usuario.";

    return newUser;
  }catch(error){
    throw error;
  }
}
