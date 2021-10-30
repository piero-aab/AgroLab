import { repository } from '../Domain/repository';

export default async function (email: string, password: string): Promise<any> {
  try{
    const exists: boolean = await repository.existEmail( email );
    if( exists ) throw "El correo ingresado ya esta registrado";

    let encryptPassword: string = repository.encryptPassword(password);

    const newUser = await repository.createUser(email, encryptPassword);
    if( !newUser ) throw "Problema al registar al usuario.";

    return newUser;
  }catch(error){
    throw error;
  }
}
