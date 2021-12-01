import { databaseDAO } from './databaseDAO';
import { getConection } from '../../../loaders/mongo';
import { ObjectID } from 'mongodb';

export class mongo implements databaseDAO {

  public async findSamples(id: any): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('users');
        let samples = await collection.aggregate([
          {
            '$lookup': {
              'from': 'samples', 
              'localField': 'samples', 
              'foreignField': '_id', 
              'as': 'samples'
            }
          },
          {
              '$match': {_id: new ObjectID(id) }
          },
          {
            '$project': {_id: 1, samples:{_id:1, code: 1, date: 1, matrix: 1, analysisType: 1, resultsDeliveryDate: 1}}
          }
        ]).toArray();
        return samples[0].samples;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }
  
    public async findSample(user_is: any, id: any): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('samples');
        let samples =  await collection.findOne(
          {
            _id: new ObjectID(id)
          }, 
          { projection: { 
            _id:1, 
            code: 1, 
            date: 1,
            resultsDeliveryDate: 1, 
            matrix: 1, 
            analysisType: 1, 
            samplingDate: 1, 
            cropType: 1,
            assigments: 1
          } 
        } );
        return samples;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }


    public async findParametersUnits(matrix: String): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('parameters');
        let parametersUnits = await collection.aggregate([
          {'$match' : { matrix : matrix }},
          {
            '$project': {
              _id: 0,
              index: 1,
              units: 1,
              variables: {
                  $cond: {
                    if: { $eq: [ "Textura", "$parameter" ] },
                    then: "$variables",
                    else: "$$REMOVE"
                  }
              }
            }
          },
          {
            '$sort': {index: 1}
          }
       ] ).toArray();
      return parametersUnits;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }

    public async findParameterDetail(matrix: String, index: number): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('parameters');
        let parameterDetail =  await collection.findOne(
          {
            matrix: matrix,
            index: index,
          }, 
          { projection: {
            _id: 0, 
            index: 1, 
            parameter: 1,
            units: 1, 
            variables: 1, 
            result: 1, 
            formula: 1,
          } 
        } );
        return parameterDetail;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }


    public async getAssigments(id: any): Promise<any> {
      try{
        const database = getConection();
        const collection = database.db.collection('samples');
        let assigments =  await collection.findOne(
          {
            _id: new ObjectID(id)
          }, 
          { projection: {
            _id: 0,
            assigments: 1,
          } 
        } );
        return assigments;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }

    public async createParameterResult(result: any, id: any): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('samples');
        let sample = await collection.findOneAndUpdate(
          { 
            "_id": new ObjectID(id)
          },
          { 
            $set: {
              "assigments": result,
              "status": 2
            }
          }, 
          { 
            projection:{ _id: 0 }
          }
        );
        return sample.value;

      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }

    public async getResults(id: any): Promise<any> {
      try{
        const database = getConection();
        const collection = database.db.collection('samples');
        let results =  await collection.findOne(
          {
            _id: new ObjectID(id)
          }, 
          { projection: {
            _id: 0,
            results: 1,
          } 
        } );
        return results;
      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }

    public async createSampleResult(result: any, id: any, status: any): Promise<any> { 
      try{
        const database = getConection();
        const collection = database.db.collection('samples');
        let sample = await collection.findOneAndUpdate(
          { 
            "_id": new ObjectID(id)
          },
          { 
            $set: {
              "results": result,
              "status": status
            }
          }, 
          { 
            projection:{ _id: 0 }
          }
        );
        return sample.value;

      }catch(error){
        console.log(error)
        throw "Error interno, intentelo más tarde.";
      }
    }

}
