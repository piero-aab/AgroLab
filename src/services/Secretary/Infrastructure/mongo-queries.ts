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
        documents: 1,
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

  public async findLastSample(todayIni: any, today: any): Promise<any> {
    try{
      const database = getConection();
      const collection = database.db.collection('samples');
      
      let sample = await collection.find({date: { $gte: todayIni, $lt: today}}, { projection: {code: 1, _id: 0}} ).toArray();
      return sample;
    }catch(error){
      throw "Error interno, intentelo más tarde.";
    }
  }

  public async createSample(body: any): Promise<any> {
    const newDate = new Date()
    newDate.setHours(newDate.getHours() - 5);
    const newResultsDeliveryDate = new Date(body.resultsDeliveryDate)
    const newSamplingDate = new Date(body.samplingDate)

    try{
      const sample = {
        client:{
          firstEmail: body.firstEmail,
          secondEmail: body.secondEmail,
          documentType: body.documentType,
          document: body.document,
          name: body.name,
          address: body.address,
          firstPhone: body.firstPhone,
          secondPhone: body.secondPhone,
        },
        code: body.code,
        applicant: body.applicant,
        ourSample: body.ourSample,
        resultsDeliveryDate: newResultsDeliveryDate,
        matrix: body.matrix,
        analysisType: body.analysisType,
        cropType: body.cropType,
        cropAge:body.cropAge,
        masl:body.masl,
        samplingDate: newSamplingDate,
        date: newDate,
        depthSample: body.depthSample,
        farmName: body.farmName,
        cropAddress: body.cropAddress,
        village: body.village,
        municipality: body.municipality,
        country: body.country,
        observation: body.observation,
        analysts: [],
        status: 0,
      }

      const database = getConection();
      const collection = database.db.collection('samples');
      let newSample = await collection.insertOne(sample);
      return newSample.ops[0];
    }catch(error){
      throw "Error interno, intentelo más tarde.";
    }
  }
  public async setImages(id:string,images: any): Promise<any> {
    try{
      const database = getConection();
      const collection = database.db.collection('samples');
      let sample = await collection.updateOne(
        {_id: new ObjectID(id)}, 
        {"$set": {
          images,
          status:4
        }
      })
      return sample;
  
    }catch(error){
      console.log(error)
      throw "Error interno, intentelo más tarde.";
    }
  }
public async findSample(id: any): Promise<any> { 
  try{
    const database = getConection();
    const collection = database.db.collection('samples');
    let sample = await collection.findOne({_id: new ObjectID(id)}, { projection: { _id: 0 } } );
    return sample;
  }catch(error){
    console.log(error)
    throw "Error interno, intentelo más tarde.";
  }
}

public async updateSample(id: any, body: any): Promise<any>{
  try{
    const database = getConection();
    const collection = database.db.collection('samples');
    
    const newResultsDeliveryDate = new Date(body.resultsDeliveryDate)
    const newSamplingDate = new Date(body.samplingDate)
    let sample = await collection.findOne({_id: new ObjectID(id)}, { projection: { _id: 0, matrix:1 } } );
    if(sample.matrix==body.matrix){
      let updatedSample = await collection.updateOne(
        { "_id":  new ObjectID(id)},
        {
          "$set": {
            client:{
              firstEmail: body.firstEmail,
              secondEmail: body.secondEmail,
              documentType: body.documentType,
              document: body.document,
              name: body.name,
              address: body.address,
              firstPhone: body.firstPhone,
              secondPhone: body.secondPhone,
            },
            code: body.code,
            applicant: body.applicant,
            ourSample: body.ourSample,
            resultsDeliveryDate: newResultsDeliveryDate,
            matrix: body.matrix,
            analysisType: body.analysisType,
            cropType: body.cropType,
            cropAge:body.cropAge,
            masl:body.masl,
            samplingDate: newSamplingDate,
            depthSample: body.depthSample,
            farmName: body.farmName,
            cropAddress: body.cropAddress,
            village: body.village,
            municipality: body.municipality,
            country: body.country,
            observation: body.observation
          }
      })
      return updatedSample;
    }else{
      let updatedSample = await collection.updateOne(
        { "_id":  new ObjectID(id)},
        {
          "$set": {
            client:{
              firstEmail: body.firstEmail,
              secondEmail: body.secondEmail,
              documentType: body.documentType,
              document: body.document,
              name: body.name,
              address: body.address,
              firstPhone: body.firstPhone,
              secondPhone: body.secondPhone,
            },
            code: body.code,
            applicant: body.applicant,
            ourSample: body.ourSample,
            resultsDeliveryDate: newResultsDeliveryDate,
            matrix: body.matrix,
            analysisType: body.analysisType,
            cropType: body.cropType,
            cropAge:body.cropAge,
            masl:body.masl,
            samplingDate: newSamplingDate,
            depthSample: body.depthSample,
            farmName: body.farmName,
            cropAddress: body.cropAddress,
            village: body.village,
            municipality: body.municipality,
            country: body.country,
            observation: body.observation,
            status:0,
            analysts:[],
            assigments:[]
          }
      })
      return updatedSample;
    }
    
  }catch(error){
    console.log(error)
    throw "Error interno, intentelo más tarde.";
  }

}

}
