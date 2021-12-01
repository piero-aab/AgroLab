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
      let user = await collection.find(filter, { projection: { password: 0, __v: 0 } } ).toArray();
      return user;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findLastAnalyst(): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let user = await collection.find({type:1}, { projection: {code: 1,_id: 0 }}).toArray();
      return user;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  
  public async findAllEmails(): Promise<any>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let emails = await collection.find({}, { projection: { 
        email: 1,
        _id: 0} } ).toArray();
      return emails;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findAllDocuments(): Promise<any>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let docs = await collection.find({}, { projection: { 
        document: 1,
        _id: 0} } ).toArray();
      return docs;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async createUser(obj: any, password:string): Promise<any>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      obj.password=password
      let newUser = await collection.insertOne(obj);
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

      let user = await collection.findOneAndUpdate(
        { 
          "token": token 
        },
        { 
          $set: {
            "password": password
          }
        }, { projection:{ email: 1, _id: 0 }, returnOriginal: false }
      );

      return user.value.email !== undefined;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }
  public async updateAnalystStatus(id: string, status: number): Promise<string>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');

      let user = await collection.findOneAndUpdate(
        { 
          "_id": new ObjectID(id)
        },
        { 
          $set: {
            "status": status
          }
        }, { projection:{ password: 0, __v: 0 }, returnOriginal: false }
      );

      return user.value;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }
  public async updateAnalyst(obj: any,id: string): Promise<string>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let user = await collection.findOneAndUpdate(
        { 
          "_id": new ObjectID(id)
        },
        { 
          $set: obj
        }, { projection:{ password: 0, __v: 0 }, returnOriginal: false }
      );

      return user.value;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async updateAnalystSamples(analysts: any,id: string): Promise<string>{
    try{
      const database = getConection();
      const collection = database.db.collection('users');
      let ids = analysts.map((a:any)=>a=new ObjectID(a))
      let user = await collection.updateMany(
        { 
          "_id":  { "$in":ids}
        },
        { 
          $pull: {
            "samples": new ObjectID(id)
          }
        }, { projection:{ password: 0, __v: 0 }, returnOriginal: false }
      );
      return user.value;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }
  
  public async findSamples(filter: any): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('samples');
      let samples = await collection.find(filter, { projection: { password: 0, __v: 0 } } ).toArray();
      return samples;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findSampleById(id: any): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('samples');
      let sample = await collection.findOne({
        _id: new ObjectID(id)
      }, { projection: { password: 0, __v: 0 } } );
      return sample;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async setAssigmentsSample(id: string,assigments: any, analysts:any): Promise<string>{
    try{
      const database = getConection();
      const users  = database.db.collection('users');
      const samples = database.db.collection('samples');
      let ids = analysts.map((a:any)=>a=new ObjectID(a))
      for (let index = 0; index < assigments.length; index++) {
        assigments[index].analyst=new ObjectID(assigments[index].analyst)
      }
      let user = await users.updateMany(
        { 
          "_id":  { "$in":ids}
        },
        { 
          $addToSet: {
            "samples": new ObjectID(id)
          }
        }, { projection:{ password: 0, __v: 0 }, returnOriginal: false }
      );
      let sample = await samples.findOneAndUpdate(
        { 
          "_id": new ObjectID(id)
        },
        { 
          $set: {
            "status":1,
            "assigments": assigments,
            "analysts": ids,
            "results": [],
            "images": [],
          }
        }, { projection:{ password: 0, __v: 0 }, returnOriginal: false }
      );
      return sample.value;
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async findSample(id: any): Promise<any> { 
    try{
      const database = getConection();
      const collection = database.db.collection('samples');
      //let sample = await collection.findOne({_id: new ObjectID(id)}, { projection: { _id: 0 } } );

      let sample = await collection.aggregate([
        {
          '$lookup': {
            'from': 'users', 
            'localField': 'analysts', 
            'foreignField': '_id', 
            'as': 'analysts'
          }
        },
        {
            '$match': {_id: new ObjectID(id) }
        },
        {
          '$project': {_id: 0, analysts:{email:0, document: 0, waterPermits: 0, groundPermits:0, type:0, samples:0, status:0, code:0, password:0}}
        }
      ]).toArray();

      return sample[0];
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }


}



