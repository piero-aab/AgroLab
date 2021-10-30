import { repository } from '../Domain/repository';

export  async function createClient(obj:object,email: string,ruc:string, password: string): Promise<any> {
  try{
    const exist: boolean = await repository.existEmail( email );
    if( exist ) throw "El correo ingresado ya esta registrado";
    const exist2: boolean = await repository.existRuc(ruc)
    if( exist2 ) throw "El RUC ingresado ya esta registrado";
    if (password.length < 8) throw ("La contraseña debe contener al menos 8 caracteres" )
    if (!/(?=.*[a-z])/.test(password)) throw ("La contraseña debe contener al menos un carácter en mayúscula" )
    let encryptPassword: string = repository.encryptPassword(password);

    const newUser = await repository.createUser(obj, encryptPassword);
    if( !newUser ) throw "Problema al registar al Cliente.";

    return newUser;
  }catch(error){
    throw error;
  }
}

export  async function createAnalist(obj:object,email: string,password: string): Promise<any> {
  try{
    const exist: boolean = await repository.existEmail( email );
    if( exist ) throw "El correo ingresado ya esta registrado";
    if (password.length < 8) throw ("La contraseña debe contener al menos 8 caracteres" )
    if (!/(?=.*[a-z])/.test(password)) throw ("La contraseña debe contener al menos un carácter en mayúscula" )
    let encryptPassword: string = repository.encryptPassword(password);

    const newUser = await repository.createUser(obj, encryptPassword);
    if( !newUser ) throw "Problema al registar al Cliente.";

    return newUser;
  }catch(error){
    throw error;
  }
}

export  async function getAllEmails(): Promise<any> {
  try{
    let emails =await repository.findAllEmails();
    return emails;
  }catch(error){
    throw error;
  }
}