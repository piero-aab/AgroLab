import { databaseDAO } from './databaseDAO';
import { getConection } from '../../../loaders/mongo';
import { ObjectID } from 'mongodb';

export class mongo implements databaseDAO {

  public async existEmail(email: string): Promise<boolean> { 
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let exists:boolean = await collection.find({email: email}).count() > 0;
      return exists;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async existToken(token: string): Promise<boolean> { 
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let exists:boolean = await collection.find({emailToken: token}).count() > 0;
      return exists;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findById(id: string): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let user = await collection.findOne({
        _id: new ObjectID(id)
      }, { projection: { password: 0, __v: 0 } } );
      return user;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findUser(filter: any): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let user = await collection.findOne(filter, { projection: { password: 0, __v: 0 } } );
      return user;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async createUser(email: string, password: string): Promise<any>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let newUser = await collection.insertOne({
        email: email,
        password: password,
        type: 0
      });
      return newUser.ops[0];
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async updateToken(email: string, token: string, date: string): Promise<string>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');

      let user = await collection.findOneAndUpdate(
        { 
          "email": email 
        },
        { 
          $set: {
            "emailToken": token,
            "expireToken": date
          }
        }, { projection:{ emailToken: 1, _id: 0 }, returnOriginal: false }
      );

      return user.value.emailToken;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async updatePasswordReset(password: string, token: string): Promise<boolean>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');

      console.log(token);
      let user = await collection.findOneAndUpdate(
        { 
          "emailToken": token 
        },
        { 
          $set: {
            "password": password
          }
        }, { projection:{ email: 1, _id: 0 }, returnOriginal: false }
      );

      console.log(user.value);
      return user.value.email !== undefined;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }
}
