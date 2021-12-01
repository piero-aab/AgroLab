export function validateSampleForm ( req: any, res: any, next: any): any{
    try{
      const { documentType, document, name, address, firstEmail, applicant, 
        firstPhone, resultsDeliveryDate, ourSample, matrix, analysisType, cropType, cropAge, masl,
        samplingDate, depthSample, cropAddress, village, municipality, country } = req.body;
      if( documentType === '' || document === '' || name === '' || address == "" 
      || firstEmail == "" || applicant == '' || firstPhone == "" || resultsDeliveryDate == "" 
      || ourSample == "" || matrix == '' || analysisType == "" || cropType == '' || cropAge == "" 
      || masl == "" || samplingDate == ""|| depthSample == "" || cropAddress == '' || village == "" 
      || municipality == "" || country == "") throw 'Faltan campos requeridos'
      next();
    }catch(error){
      req.flash('errors', { msg: error});
      return res.redirect('back');
    }
  }  