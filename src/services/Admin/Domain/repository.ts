import { mongo } from '../Infrastructure/mongo-queries';

class Repository extends mongo
{
   /*
    *  Pendiente vañodar funcionalides unicas para el repositorio
   *  verificar nombres mas genericos en los impots y los extends
    */
  public encryptPassword(password: string): string{
    return Buffer.from(encodeURIComponent(escape(password))).toString("base64")
  }

  public decryptPassword(password: string): string{
    return Buffer.from(unescape(decodeURIComponent(password)), 'base64').toString();
  }
}

export const repository = new Repository();
