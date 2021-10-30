import { repository } from '../Domain/repository';

export default async function(token: string, password: string ): Promise<string> {
  try{
    const exist: boolean = await repository.existToken(token);
    if( !exist ) throw "La validación no existe.";

    let encryptPassword: string = repository.encryptPassword(password);

    const response: boolean = await repository.updatePasswordReset(encryptPassword, token);
    if(!response) throw "Error al modificar la contraña, intentelo más tarde.";

    return "Se modificó la contraseña";

  }catch(error){
    return error;
  }
}
