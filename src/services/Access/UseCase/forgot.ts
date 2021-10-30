import { repository } from '../Domain/repository';

export default async function (email: string): Promise<string> {
  try{
    const exits = await repository.existEmail( email );
    if( !exits ) throw "El correo ingresado no esta registrado en la plataforma.";
    
    const response = await saveNewTokenInUserAccount(email);
    return response;

  }catch(error){
    throw error;
  }
}

async function saveNewTokenInUserAccount(email: string): Promise<string>{
  try {
    const date: string = getDateOfExpireToken();
    const token: string = tokenCreator(64);

    const tokenUpdate: string = await repository.updateToken(email, token, date);

    return tokenUpdate;

  } catch (error) {
    throw error;
  }
}

function getDateOfExpireToken(): string{
  try {
    const today =  new Date();
    today.setDate(today.getDate() + 1);
    return today.toString();
  } catch (err) {
    throw "Error al generar el tiempo de expiración del token, intentelo más tarde";
  }
}

function tokenCreator(length: number): string {
  try{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }catch(error){
    throw "Error al generar el token de validación, vuelva a intentarlo más tarde.";
  }
}
