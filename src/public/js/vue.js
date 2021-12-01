const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const adminAnalysts= Vue.createApp({
  data(){
    return{
      analystsOrigin: [],
      analysts: [],
      emails: [],
      documents:[],
      name:'',
      waterPermits: ["pH","Conductividad Eléctrica","Cloruros","Alcalinidad","Calcio","Magnesio","Dureza de Calcio","Dureza de Magnesio","Dureza Total","Turbiedad","Color","Escherichia Coli","Coliformes Totales","Sodio","Fosfatos"],
      groundPermits: ["pH","Conductividad Eléctrica","Capacidad de intercambio Cationico","Materia Orgánica","Nitrógeno Total","Fosforo","Hierro","Manganeso","Cobre","Zinc","Calcio","Magnesio","Potasio","Sodio","Aluminio","Boro","Azufre","Textura"],
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.emails = JSON.parse(document.getElementById("admin-analysts").getAttribute("data-emails"));
    this.documents = JSON.parse(document.getElementById("admin-analysts").getAttribute("data-documents"));
    this.analystsOrigin = JSON.parse(document.getElementById("admin-analysts").getAttribute("data-analysts"));
    this.analysts = this.analystsOrigin;
  },
  methods:{
    paddedCode(code){
      return code.toString().padStart(4, "0");
    },
    createAnalyst(){
        const waterPermits = this.waterPermits
        const groundPermits = this.groundPermits
        Swal.fire({
          title: "Nuevo Analista",
          html:
          '<label for="my-input">Nombres</label>'+
          '<input id="name" class="swal2-input" placeholder="Nombres" required>' +
          '<label for="my-input">Apellidos</label>'+
          '<input id="lastName" class="swal2-input" placeholder="Apellidos" required>'+
          '<label for="my-input">Correo electrónico</label>'+
          `<input id="email" type="email" class="swal2-input" placeholder="Correo electrónico" required>`+
          '<label for="my-input">Cédula de identificación</label>'+
          `<input id="document" class="swal2-input" oninput="this.value=this.value.replace(/[^0-9]/g,'');" minlength='7' maxlength='10' placeholder="Cédula de identificación" required>`+
          '<label for="my-input" style="margin-bottom: 1.5em;">Selecciona permisos agua</label>'+
          `<select class="selectmultiple select2 form-control select2-multiple" id="water" name="water[]" multiple="multiple"></select>`+
          '<label for="my-input" style="margin-bottom: 1.5em;">Selecciona permisos suelo</label>'+
          `<select class="selectmultiple1 select2 form-control select2-multiple" id="ground" name="ground[]" multiple="multiple"></select>`,
          denyButtonText: 'Volver, sin guardar',
          confirmButtonText: 'Crear analista',
          showDenyButton: true,
          didOpen : function () {
            $('.selectmultiple').select2({
              language: "es",
              minimumResultsForSearch: 15,
              width: '100%',
              placeholder: "Seleccione los parámetros",
              data:waterPermits
            });
            $('.selectmultiple1').select2({
              language: "es",
              minimumResultsForSearch: 15,
              width: '100%',
              placeholder: "Seleccione los parámetros",
              data:groundPermits
          })
          },
          preConfirm: () => {
            if (document.getElementById('name').value=='') {
              Swal.showValidationMessage('Nombres requerido')   
            }
            if (document.getElementById('lastName').value=='') {
              Swal.showValidationMessage('Apellidos requerido')   
            }
            if (document.getElementById('email').value=='') {
              Swal.showValidationMessage('Correo electrónico requerido')   
            }else if(document.getElementById('email').value!='' &&  !reg.test(document.getElementById('email').value)){
              Swal.showValidationMessage('Correo electrónico incorrecto')  
            }
            if(this.emails&&this.emails.length>0){
              this.emails.filter((a)=>{
                if(a.email==document.getElementById('email').value) Swal.showValidationMessage('Ya existe un usuario con este correo electrónico') 
              })  
            }
            if (document.getElementById('document').value=='') {
              Swal.showValidationMessage('Cédula de identificación requerida')   
            }else if(document.getElementById('document').value!='' && document.getElementById('document').value.length<7){
              Swal.showValidationMessage('Cédula de identificación incorrecto')  
            }
            if(this.documents&&this.documents.length>0){
              this.documents.filter((a)=>{
                if(a.document==document.getElementById('document').value) Swal.showValidationMessage('Ya existe un usuario con esta cédula de identificación') 
              })  
            }
            if (document.getElementById('water').selectedOptions.length==0 && document.getElementById('ground').selectedOptions.length==0) {
              Swal.showValidationMessage('Al menos un permiso requerido')   
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const waterPermitsLength = document.getElementById('water').selectedOptions.length
            const groundPermitsLength = document.getElementById('ground').selectedOptions.length
            let waterPermits = []
            let groundPermits = []
            for (let index = 0; index < waterPermitsLength; index++) {
              waterPermits.push(document.getElementById('water').selectedOptions[index].value); 
            }
            for (let index = 0; index < groundPermitsLength; index++) {
              groundPermits.push(document.getElementById('ground').selectedOptions[index].value); 
            }
            const name = document.getElementById('name').value
            const lastName = document.getElementById('lastName').value
            const email = document.getElementById('email').value
            const doc = document.getElementById('document').value
            const obj ={
              name:name,
              lastName:lastName,
              email:email,
              document:doc,
              waterPermits:waterPermits,
              groundPermits:groundPermits,
              type: 1,
              samples: [],
              status: 0
            }
            axios.post(`/admin/analistas/crear`,obj).then(() => {
              Swal.fire('Analista creado!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              //console.log(err)
            })
          }
        })
    },
    editAnalyst(analyst){
      const waterPermits = this.waterPermits
      const groundPermits = this.groundPermits
      const waterSelection = analyst.waterPermits
      const groundSelection = analyst.groundPermits
      let isNew = false
      Swal.fire({
        title: "Editar Analista",
        html:
        '<label for="my-input">Nombres</label>'+
        `<input id="name" class="swal2-input" value="${analyst.name}" placeholder="Nombres" required>` +
        '<label for="my-input">Apellidos</label>'+
        `<input id="lastName" class="swal2-input" value="${analyst.lastName}"  placeholder="Apellidos" required>`+
        '<label for="my-input">Correo electrónico</label>'+
        `<input id="email" type="email" class="swal2-input" value="${analyst.email}" placeholder="Correo electrónico" required>`+
        '<label for="my-input">Cédula de identificación</label>'+
        `<input id="document" class="swal2-input" oninput="this.value=this.value.replace(/[^0-9]/g,'');" minlength='7' maxlength='10' value="${analyst.document}" placeholder="Cédula de identificación" required>`+
        '<label for="my-input" style="margin-bottom: 1.5em;">Selecciona permisos agua</label>'+
        `<select class="selectmultiple select2 form-control select2-multiple" id="water" name="water[]" multiple="multiple"></select>`+
        '<label for="my-input" style="margin-bottom: 1.5em;">Selecciona permisos suelo</label>'+
        `<select class="selectmultiple1 select2 form-control select2-multiple" id="ground" name="ground[]" multiple="multiple"></select>`,
        denyButtonText: 'Volver, sin guardar',
        confirmButtonText: 'Editar analista',
        showDenyButton: true,
        didOpen : function () {
          $('.selectmultiple').select2({
            language: "es",
            minimumResultsForSearch: 15,
            width: '100%',
            placeholder: "Seleccione los parámetros",
            data:waterPermits
          });
          $('.selectmultiple').val(waterSelection).trigger('change');
          $('.selectmultiple1').select2({
            language: "es",
            minimumResultsForSearch: 15,
            width: '100%',
            placeholder: "Seleccione los parámetros",
            data:groundPermits
          })
          $('.selectmultiple1').val(groundSelection).trigger('change');
        },
        preConfirm: () => {
          if (document.getElementById('name').value=='') {
            Swal.showValidationMessage('Nombres requerido')   
          }
          if (document.getElementById('lastName').value=='') {
            Swal.showValidationMessage('Apellidos requerido')   
          }
          if (document.getElementById('email').value=='') {
            Swal.showValidationMessage('Correo electrónico requerido')   
          }else if(document.getElementById('email').value!='' &&  !reg.test(document.getElementById('email').value)){
            Swal.showValidationMessage('Correo electrónico incorrecto')  
          }
          if(analyst.email!=document.getElementById('email').value){
            isNew=true
            if(this.emails&&this.emails.length>0){
              this.emails.filter((a)=>{
                if(a.email==document.getElementById('email').value) Swal.showValidationMessage('Ya existe un usuario con este correo electrónico') 
              })  
            }
          }else{
            isNew=false
          }
          if (document.getElementById('document').value=='') {
            Swal.showValidationMessage('Cédula de identificación requerida')   
          }else if(document.getElementById('document').value!='' && document.getElementById('document').value.length<7){
            Swal.showValidationMessage('Cédula de identificación incorrecto')  
          }
          if(analyst.document!=document.getElementById('document').value){
            if(this.documents&&this.documents.length>0){
              this.documents.filter((a)=>{
                if(a.document==document.getElementById('document').value) Swal.showValidationMessage('Ya existe un usuario con esta cédula de identificación') 
              })  
            }
          }
          if (document.getElementById('water').selectedOptions.length==0 && document.getElementById('ground').selectedOptions.length==0) {
            Swal.showValidationMessage('Al menos un permiso requerido')   
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const waterPermitsLength = document.getElementById('water').selectedOptions.length
          const groundPermitsLength = document.getElementById('ground').selectedOptions.length
          let waterPermits = []
          let groundPermits = []
          for (let index = 0; index < waterPermitsLength; index++) {
            waterPermits.push(document.getElementById('water').selectedOptions[index].value); 
          }
          for (let index = 0; index < groundPermitsLength; index++) {
            groundPermits.push(document.getElementById('ground').selectedOptions[index].value); 
          }
          const name = document.getElementById('name').value
          const lastName = document.getElementById('lastName').value
          const email = document.getElementById('email').value
          const doc = document.getElementById('document').value
          const obj ={
            name:name,
            lastName:lastName,
            email:email,
            document:doc,
            waterPermits:waterPermits,
            groundPermits:groundPermits
          }
          const waterIf = waterSelection.every(item => waterPermits.includes(item)) && waterPermits.every(item => waterSelection.includes(item))
          const groundIf = groundSelection.every(item => groundPermits.includes(item)) && groundPermits.every(item => groundSelection.includes(item))
          if(analyst.name==name && analyst.lastName==lastName && analyst.email==email && analyst.document==doc && waterIf && groundIf){
            Swal.fire('Analista editado!', '', 'success').then(() => {
              location.reload()
            })
          }else{
            axios.post(`/admin/analistas/editar?analyst=${analyst._id}&newEmail=${isNew}`,obj).then(() => {
              Swal.fire('Usuario editado!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              //console.log(err)
            })
          }
        }
      })
    },
    enableAnalyst(userEmail, userId,status){
      const msg = status==0?"¿Está seguro que desea suspender a este analista?":"¿Está seguro que desea activar a este analista?"
      const newStatus = status==0?1:0
      Swal.fire({
        title:msg,
        text: userEmail,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`/admin/analistas/${userId}/habilitar`,{status:newStatus}).then(() => {
            Swal.fire(status==0?'Suspendido!':'Activado', '', 'success').then(() => {
              location.reload()
            })
          }).catch(err=>{
            Swal.fire('Hubo un error', '', 'error')
            //console.log(err)
          })
        }
      })
    },
    setAnalysts() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.analysts.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(analysts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return analysts.slice(from, to);
    },
    searchAnalysts(){
      if(this.name!=''){
        const analysts = this.analystsOrigin
        const reg = new RegExp(this.name,'i')
        const a = analysts.filter((a)=> reg.test(a.name) || reg.test(a.lastName) || reg.test(a.name+" "+a.lastName))
        this.analysts = a
      }else{
        this.analysts = this.analystsOrigin
      }
    },
  },
  watch:{
    analysts(){
      this.setAnalysts()
    },
    name(){
      this.searchAnalysts()
    }
  },
  computed:{
    displayedAnalysts: function(){
      return this.paginate(this.analysts)
    }
  }
})

if(document.getElementById("admin-analysts")){const mountadminAnalysts = adminAnalysts.mount("#admin-analysts")}

const adminSamples= Vue.createApp({
  data(){
    return{
      samplesOrigin: [],
      samples: [],
      documents:[],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.documents = JSON.parse(document.getElementById("admin-samples").getAttribute("data-documents"));
    this.samplesOrigin = JSON.parse(document.getElementById("admin-samples").getAttribute("data-samples"));
    this.samples = this.samplesOrigin;
  },
  methods:{
    getStatus(status){
      let text = ''
      let color =''
      switch(status){
        case 0:
          text="Por asignar";
          color='text-gray';
          break;
        case 1:
          text="Asignado";
          color='text-yellow';
          break;
        case 2:
          text="En proceso";
          color='text-orange';
          break;
        case 3:
          text="Finalizado"
          color='text-green';
          break;
        case 4:
          text="Entregado"
          color='text-darkGreen';
          break;
        default:
          text="Eliminado"
          color='text-green';
      }
      const template = `<h5 class="mb-0 ${color}"><i class="far fa-dot-circle ${color} mr-1"></i> ${text} </h5>`
      return template
    },
    setTime(date) {
      var newDate = new Date(date)
      newDate.setHours(newDate.getHours() - 5);
      return  newDate.getDate() +"-"+(newDate.getMonth() + 1).toString().padStart(2, "0")+ "-"+newDate.getFullYear()
    },
    setSamples() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.samples.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(samples) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return samples.slice(from, to);
    },
    searchSamples(){
      if(this.name!=''){
        const samples = this.samplesOrigin
        const reg = new RegExp(this.name,'i')
        const s = samples.filter((s)=> reg.test(s.client.document) || reg.test(s.code) )
        this.samples = s
      }else{
        this.samples = this.samplesOrigin
      }
    },
    openSample(id){
      return window.location.href = '/admin/muestras/' + id;
      //return window.open(`${window.origin}/admin/muestras/${id}`,"_blank");
    },
    assignAnalyst(id, matrix, status){
      if(status<3){
        if(matrix=='Suelo' || matrix=='Agua'){
          if(status>0){
            Swal.fire({
              icon: `${status==1?'warning':'error'}`,
              title: `${status==1?'¡La muestra ya ha sido asignada!':'¡Muestra en proceso!'}`,
              text: 'Tenga cuidado al reasignar una muestra que ya haya sido asignada o este en proceso',
              footer: '<strong><em>Los datos antiguos serán eliminados</em></strong>',
              denyButtonText: 'Volver',
              confirmButtonText: 'Reasignar',
              showDenyButton: true,
            }).then((result) => {
              //console.log(result)
              if (result.isConfirmed) {
                return (window.location = `/admin/muestras/${id}/asignar`);
              }
            })
          }else{
            return (window.location = `/admin/muestras/${id}/asignar`);
          }
        }else{
          return Swal.fire('No es posible asignar analistas a esta muestra', '', 'error');

        }
      }
    },
  },
  watch:{
    samples(){
      this.setSamples()
    },
    name(){
      this.searchSamples()
    }
  },
  computed:{
    displayedSamples: function(){
      return this.paginate(this.samples)
    }
  }
})

if(document.getElementById("admin-samples")){const mountadminSamples = adminSamples.mount("#admin-samples")}

const adminAssignment= Vue.createApp({
  data(){
    return{
      sample: {},
      analysts: [],
      assignments:[],
      parameters:[],
      selectedAnalysts:[]
    }
  },
  mounted(){
    this.sample = JSON.parse(document.getElementById("admin-assignment").getAttribute("data-sample"));
    this.analysts = JSON.parse(document.getElementById("admin-assignment").getAttribute("data-analysts"));
    this.analysts.filter((a)=>{
      let analyst = {id:a._id, selected:false}
      let waterPermits=[]
      let groundPermits=[]
      a.waterPermits.filter((w)=>{
        waterPermits.push({parameter:w, selected:false})
      })
      a.groundPermits.filter((g)=>{
        groundPermits.push({parameter:g, selected:false})
      })
      this.assignments.push({analyst,waterPermits,groundPermits})
    })
  },
  methods:{
    selectAnalyst(index){
      if(this.assignments[index].analyst.selected==false){
        this.selectedAnalysts.push(this.assignments[index].analyst.id)
        this.assignments[index].analyst.selected=true
      }else{
        this.selectedAnalysts.filter((s, i)=>{
          if(s==this.assignments[index].analyst.id){
            this.selectedAnalysts.splice(i, 1);
          }
        })
        this.assignments[index].analyst.selected=false
      }  
    },
    selectParameter(event,index,j){
      switch (this.sample.matrix) {
        case 'Suelo':
          if(this.assignments[index].groundPermits[j].selected==false){
            if(this.parameters.includes(this.assignments[index].groundPermits[j].parameter)){
              $(event.target).prop("checked", false);
              Swal.fire('Parámetro ya selecionado', '', 'error')
              break;
            }else{
              this.parameters.push(this.assignments[index].groundPermits[j].parameter)
              this.assignments[index].groundPermits[j].selected=true
              break;
            } 
          }else{
            this.assignments[index].groundPermits[j].selected=false
            this.parameters.filter((p, i)=>{
              if(p==this.assignments[index].groundPermits[j].parameter){
                this.parameters.splice(i, 1);
              }
            })
            break;
          }
        case 'Agua':
          if(this.assignments[index].waterPermits[j].selected==false){
            if(this.parameters.includes(this.assignments[index].waterPermits[j].parameter)){
              $(event.target).prop("checked", false);
              Swal.fire('Parámetro ya selecionado', '', 'error')
              break;
            }else{
              this.parameters.push(this.assignments[index].waterPermits[j].parameter)
              this.assignments[index].waterPermits[j].selected=true
              break;
            } 
          }else{
            this.assignments[index].waterPermits[j].selected=false
            this.parameters.filter((p, i)=>{
              if(p==this.assignments[index].waterPermits[j].parameter){
                this.parameters.splice(i, 1);
              }
            })
            break;
          }
        default:
          break;
      } 
    },
    saveAssignment(){
      let isEmpty = true
      let hasError = false
      let finalAssigments= []
      let finalAnalysts= []
      this.assignments.filter((a)=>{
        let count = 0
        let aux = 0
        if(a.analyst.selected==true){
          isEmpty=false
          if (this.sample.matrix=='Suelo') {
            let groundPermits=[]
            //console.log("entro")
            a.groundPermits.filter((g)=>{
              if(!g.selected){ 
                count++
              }else {
                groundPermits.push(g.parameter)
              }
            })
            if(a.groundPermits.length==count){ 
              hasError=true
              return Swal.fire('Analista sin parámetros designados', '', 'error');
            }else{
              finalAnalysts.push(a.analyst.id)
              finalAssigments.push({analyst:a.analyst.id,permits:groundPermits })
            }
          }else if(this.sample.matrix=='Agua'){
            let waterPermits=[]
            a.waterPermits.filter((w)=>{
              if(!w.selected){ 
                count++
              }else {
                waterPermits.push(w.parameter)
              }
            })
            if(a.waterPermits.length==count) {
              hasError=true
              return Swal.fire('Analista sin parámetros designados', '', 'error');
            }else{
              finalAnalysts.push(a.analyst.id)
              finalAssigments.push({analyst:a.analyst.id,permits:waterPermits })
            }
          }
          
        }else{
          if(this.sample.matrix=='Suelo'){
            a.groundPermits.filter((g)=>{
              if(g.selected) aux++
            })
            if(aux>0&&a.groundPermits.length>=aux){
              isEmpty=false
              hasError=true
              return Swal.fire('Parámetros sin analista designado', '', 'error');
            }
          }else if(this.sample.matrix=='Agua'){
            a.waterPermits.filter((w)=>{
              if(w.selected) aux++
            })
            if(aux>0&&a.waterPermits.length>=aux){
              isEmpty=false
              hasError=true
              return Swal.fire('Parámetros sin analista designado', '', 'error');
            }
          }
        }
      })
      if(isEmpty){
        hasError=true
        return Swal.fire('No ha realizado alguna asignación', '', 'error');
      }
      //console.log(finalAssigments,finalAssigments,hasError)
      if(!hasError&&finalAssigments.length>0 && finalAnalysts.length>0 && finalAssigments.length==finalAnalysts.length){
        axios.post(`/admin/muestras/${this.sample._id}/asignar`,{assigments:finalAssigments, analysts:finalAnalysts, oldAnalysts:this.sample.analysts}).then(() => {
          Swal.fire('Cliente asignado correctamente', '', 'success').then(() => {
            return (window.location = `/admin/muestras`);
          })
        }).catch(err=>{
          Swal.fire('Hubo un error', '', 'error')
          //console.log(err)
        })
      }
    }
  },
  watch:{
  },
  computed:{
  }
})

if(document.getElementById("admin-assignment")){const mountadminSample = adminAssignment.mount("#admin-assignment")}

const secretarySamples= Vue.createApp({
  data(){
    return{
      samplesOrigin: [],
      samples: [],
      documents:[],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.samplesOrigin = JSON.parse(document.getElementById("secretary-samples").getAttribute("data-samples"));
    this.samples = this.samplesOrigin;
  },
  methods:{
    setTime(date) {
      var newDate = new Date(date)
      newDate.setHours(newDate.getHours());
      return   newDate.getDate() + "-" + (newDate.getMonth() + 1).toString().padStart(2, "0") + "-" + newDate.getFullYear()
    },
    setSamples() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.samples.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(samples) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return samples.slice(from, to);
    },
    searchSamples(){
      if(this.name!=''){
        const samples = this.samplesOrigin
        const reg = new RegExp(this.name,'i')
        const s = samples.filter((s)=> reg.test(s.client.document))
        this.samples = s
      }else{
        this.samples = this.samplesOrigin
      }
    },
    getStatus(status){
      let text = ''
      let color =''
      switch(status){
        case 0:
          text="Por asignar";
          color='text-gray';
          break;
        case 1:
          text="Asignado";
          color='text-yellow';
          break;
        case 2:
          text="En proceso";
          color='text-orange';
          break;
        case 3:
          text="Finalizado"
          color='text-green';
          break;
        case 4:
          text="Entregado"
          color='text-darkGreen';
          break;
        default:
          text="Eliminado"
          color='text-green';
      }
      const template = `<h5 class="mb-0 ${color}"><i class="far fa-dot-circle ${color} mr-1"></i> ${text} </h5>`
      return template
    },
    openSample(id, status){
      switch (status) {
        case 0:
        case 1:
          this.editSample(id)
          break;
        case 3:
          this.createReport(id)
          break;
        case 3:
          this.createReport(id)
          break;
        case 4:
          this.openReport(id)
          break;
        default:
          break;
      }
    },
    createReport(id){
      //return window.open(`${window.origin}/secretaria/muestras/editar/${id}`,"_blank");
      return window.location.href = '/secretaria/muestras/' + id+'/reporte/crear';
    },
    editSample(id){
      //return window.open(`${window.origin}/secretaria/muestras/editar/${id}`,"_blank");
      return window.location.href = '/secretaria/muestras/editar/' + id;
    },
    editReport(id){
      //return window.open(`${window.origin}/secretaria/muestras/editar/${id}`,"_blank");
      return window.location.href = '/secretaria/muestras/' + id+'/reporte/editar';
    },
    openReport(id){
      //return window.open(`${window.origin}/secretaria/muestras/editar/${id}`,"_blank");
      return window.location.href = '/secretaria/muestras/' + id + '/reporte/detalle';
    }
  },
  watch:{
    samples(){
      this.setSamples()
    },
    name(){
      this.searchSamples()
    }
  },
  computed:{
    displayedSamples: function(){
      return this.paginate(this.samples)
    }
  }
})

if(document.getElementById("secretary-samples")){const mountSecretarySamples = secretarySamples.mount("#secretary-samples")}

const analystSamples= Vue.createApp({
  data(){
    return{
      samplesOrigin: [],
      samples: [],
      documents:[],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.samplesOrigin = JSON.parse(document.getElementById("analyst-samples").getAttribute("data-samples"));
    this.samples = this.samplesOrigin;
  },
  methods:{
    setTime(date) {
      let newDate = new Date(date)
      newDate.setHours(newDate.getHours());
      return   newDate.getDate() + "-" + (newDate.getMonth() + 1).toString().padStart(2, "0") + "-" + newDate.getFullYear()
    },
    setNormalTime(date) {
      let newDate = new Date(date)
      newDate.setHours(newDate.getHours() + 5);
      return   newDate.getDate() + "-" + (newDate.getMonth() + 1).toString().padStart(2, "0") + "-" + newDate.getFullYear()
    },
    setSamples() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.samples.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(samples) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return samples.slice(from, to);
    },
    searchSamples(){
      if(this.name!=''){
        const samples = this.samplesOrigin
        const reg = new RegExp(this.name,'i')
        const s = samples.filter((s)=> reg.test(this.setTime(s.date)))
        this.samples = s
      }else{
        this.samples = this.samplesOrigin
      }
    },
    openSample(id){
      //return window.open(`${window.origin}/secretaria/muestras/editar/${id}`,"_blank");
      return window.location.href = '/analista/muestra/' + id;
    }
  },
  watch:{
    samples(){
      this.setSamples()
    },
    name(){
      this.searchSamples()
    }
  },
  computed:{
    displayedSamples: function(){
      return this.paginate(this.samples)
    }
  }
})

if(document.getElementById("analyst-samples")){const mountAnalystSamples = analystSamples.mount("#analyst-samples")}

const sample = Vue.createApp({
  data(){
    return{
      sample: {
        client:{}
      },
      flag:true
      //client: {}
    }
  },
  mounted(){
    let sample = JSON.parse(document.getElementById("secretary-Editsamples").getAttribute("data-sample"));
    this.sample = sample
    //this.client = sample.client 
  },
  methods:{
    alert(){
      Swal.fire({
        title: "Alerta de edición",
        text: "Si cambia de matriz, las asginaciones serán reiniciadas",
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.flag=false
        }
      })
    }
  },
})

if(document.getElementById("secretary-Editsamples")){const mountedSample = sample.mount("#secretary-Editsamples")}


const sampleDetail = Vue.createApp({
  data(){
    return{
      sample: {},
      user_id: '',
      parametersIni: {},
      parameters: [],
      results: [],
      flag: false,
      //client: {}
    }
  },
  mounted(){
    this.sample = JSON.parse(document.getElementById("sampleDetail").getAttribute("data-samples"));
    this.user_id = document.getElementById("sampleDetail").getAttribute("data-user")
    this.parametersIni = JSON.parse(document.getElementById("sampleDetail").getAttribute("data-parameters"))

    const waterPermits = ["pH","Conductividad Eléctrica","Cloruros","Alcalinidad","Calcio","Magnesio","Dureza de Calcio","Dureza de Magnesio","Dureza Total","Turbiedad","Color","Escherichia Coli","Coliformes Totales","Sodio","Fosfatos"]
    const groundPermits =  ["pH","Conductividad Eléctrica","Capacidad de intercambio Cationico","Materia Orgánica","Nitrógeno Total","Fosforo","Hierro","Manganeso","Cobre","Zinc","Calcio","Magnesio","Potasio","Sodio","Aluminio","Boro","Azufre","Textura"]
    const permits = []
    let results
    
    //console.log(this.user_id, this.sample.assigments, this.parametersIni)
    this.sample.assigments.filter((p)=>{
      if(this.user_id == p.analyst){
        let obj
        obj = p.permits
        permits.push(obj)
        if(p.results){
          results = p.results
        }
      }
    })
    
    this.results = results

    if(permits.length>0){
      permits[0].filter((p) => {
        if(this.sample.matrix == 'Agua'){
          let i = waterPermits.indexOf(p)
          let resultParameter = '', deliveryDateParameter = '', statusParameter = 0

          if(typeof results !== 'undefined'){
            for (let r of results) {
              if (r.index == i) {
                resultParameter = r.finalResult
                deliveryDateParameter = this.printDate(r.deliveryDate)
                statusParameter = r.status
                break;
              }
            }
          }

          const parameterDetail = {
            index: i,
            name: p,
            units: this.parametersIni[i].units,
            result: resultParameter ,
            deliveryDate: deliveryDateParameter,
            status: statusParameter
          }
          this.parameters.push(parameterDetail)
        } 
        if (this.sample.matrix == 'Suelo') {
          let i = groundPermits.indexOf(p)
          let resultParameter = '', deliveryDateParameter = '', statusParameter = 0

          if(p == "Textura"){
            if(typeof results !== 'undefined'){
              for (let r of results) {
                if (r.index == 17) {
                  textureVariables = ["Arena","Arcilla","Limo","Clase textural"]
                  const texture ={
                    index: 17,
                    name: p,
                    units: '',
                    result: '',
                    deliveryDate: this.printDate(r.deliveryDate),
                    status: r.status
                  }
                  this.parameters.push(texture) 

                  r.variables.filter((a, cont)=>{
                    const textureDetail = {
                      index: -1,
                      name: textureVariables[cont],
                      units: a.units,
                      result: a.result,
                      deliveryDate: this.printDate(r.deliveryDate),
                      status: r.status
                    }
                    this.parameters.push(textureDetail) 
                  })
                  break;
                }
              }
            }
          } else{
            if(typeof results !== 'undefined'){
              for (let r of results) {
                if (r.index == i) {
                  resultParameter = r.finalResult
                  deliveryDateParameter = this.printDate(r.deliveryDate)
                  statusParameter = r.status
                  break;
                }
              }
            }
            const parameterDetail = {
              index: i,
              name: p,
              units: this.parametersIni[i].units,
              result: resultParameter,
              deliveryDate: deliveryDateParameter,
              status: statusParameter
            }
            this.parameters.push(parameterDetail)
          }
        }
      })
    }
  
  },
  methods:{
    getStatus(status){
      let text = ''
      let color =''
      switch(status){
        case 0:
          text="Pendiente";
          color='text-gray';
          break;
        case 1:
          text="Ingresado";
          color='text-green';
          break;
        case 2:
          text="Enviado"
          color='text-blue';
          break;
        default:
          text="Eliminado"
          color='text-red';
      }
      const template = `<h5 class="mb-0 ${color}"><i class="far fa-dot-circle ${color} mr-1"></i> ${text} </h5>`
      return template
    },
    openParameter(index){
      return window.location.href = `/analista/muestra/${this.sample._id}/${index}?matrix=${this.sample.matrix}`;
    },
    openEditParameter(index){
      return window.location.href = `/analista/muestra/editar/${this.sample._id}/${index}?matrix=${this.sample.matrix}`;
    },
    printDate(date){
      let stringDate =  new Date(date)
      return `${ stringDate.getDate() + " - " + (stringDate.getMonth() + 1).toString().padStart(2, "0") + " - " + stringDate.getFullYear() }`;
    },
    sendResults(){
      if(this.flag != true){
        if(typeof this.results === 'undefined'){
          Swal.fire('No se ha compleado ningún parametro para poder enviar', '', 'error')
        } else{
          
          Swal.fire({
            title: '¿Estás seguro que deseas enviar los resultados?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, enviar',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              
              this.flag = true
              axios.post(`/analista/muestra/${this.sample._id}?matrix=${this.sample.matrix}`, this.results).then(() => {
                Swal.fire('Parámetros enviados', '', 'success').then(() => {
                  location.reload()
                })
              }).catch(err=>{
                Swal.fire('Hubo un error', '', 'error')
                //console.log(err)
              })

            }
          })

         }
      }
    }
  }
})

if(document.getElementById("sampleDetail")){const mountedsampleDetail = sampleDetail.mount("#sampleDetail")}


const parameter = Vue.createApp({
  data(){
    return{
      parameter: {},
      valuesFlag: false,
      v:[],
      totalResult: null,
      isTexture: false,
      isTotalHardness: false,
      p: [],
      flag: false
    }
  },
  mounted(){
    let parameter = JSON.parse(document.getElementById("parameter").getAttribute("data-parameter"));
    this.parameter = parameter

    this.parameter.formula = this.parameter.formula.replaceAll('v', 'this.v'); //Para remplazar el v de la formula por this.v
    
    if(this.parameter.parameter == 'Textura') this.isTexture = true //Para ver si el parametro es textura

    //Por alguna extraña razon no es un espacio lo que hay en Dureza Total :V
    if(this.parameter.parameter == 'Dureza Total') this.isTotalHardness = true

    //Se verifica si el parametro tiene variables, son las que mediante dichas variables se generara el valor del parametro
    if(this.parameter.variables.length > 0) {
      
      this.valuesFlag = true
      this.parameter.variables.filter((p,index) => {
        const valueDetail = 0
        this.v.push(index==3&&this.isTexture?'':valueDetail)
      })
      
      //se verifica si es textura, porque este presenta variables, no un resultado final, y son estas las que se muestran
      //si no es textura se trabaja con las variables para hallar el resultado final de ese parametro
      //en caso de que si sea textura, se evita que estos se operen con la formula, ya que solo se deben ingresar
      if(!this.isTexture){
        this.totalResult = eval(this.parameter.formula).toFixed(4);
      }

    }

    if(this.isTotalHardness){
      this.parameter.formula = this.parameter.formula.replaceAll('p', 'this.p');
      this.parameter.formula = this.parameter.formula.replaceAll('7', '0');
      this.parameter.formula = this.parameter.formula.replaceAll('8', '1');
    }

    //Para modificar la formula de Materia Organica que ta dando bugs
    if(this.parameter.index==3 && this.parameter.matrix =='Suelo'){
      this.parameter.formula = 'this.v[5]*1.72'
    }

  },
  methods: {
    setData(){
      if(this.flag != true){
        let obj
        if(this.isTexture) this.totalResult = -1
        
        if(this.totalResult == '' || isNaN(this.totalResult) || this.totalResult == null){
          Swal.fire('Por favor, complete los campos requeridos correctamente', '', 'error')
        } else {
          this.flag = true
          if(!this.valuesFlag){
            obj = {
              result: parseFloat(this.totalResult),
            }
          } else{
            const variablesArray = []

            for(let i=0; i<this.parameter.variables.length; i++){
              let vd ={}
              if(this.isTexture&&i==3){
                vd= {
                  result: this.v[i],
                  units: this.parameter.variables[i]
                }
              }else{
                vd= {
                  result: parseFloat(this.v[i]),
                  units: this.parameter.variables[i]
                }
              }
              
              variablesArray.push(vd)
            }
            
            obj = {
              result: parseFloat(this.totalResult),
              variables: variablesArray
            }
          }

          axios.post(`/analista/muestra/${this.parameter.id}/${this.parameter.index}`, obj).then(() => {
            Swal.fire('Parámetro registrado', '', 'success').then(() => {
              return (window.location = `/analista/muestra/${this.parameter.id}`);
            })
          }).catch(err=>{
            Swal.fire('Hubo un error', '', 'error')
            //console.log(err)
          })
        }
      }
    },
    hasVariables(){
      return (this.parameter.variables.length > 0)
    },
    calcTotalHardness(){
      axios.get(`/analista/muestra/${this.parameter.id}/${8}/dureza-total`)
      .then(response => {
        //console.log(response.data[0])
        this.p = response.data;
        if(this.p[0] == -1 || this.p[1] == -1){
          Swal.fire('Aun no se han asignado los valores de los parámetros necesarios para calcular este parámetro', '', 'error')
        } else{
          this.totalResult = eval(this.parameter.formula).toFixed(4);
        }
      })
      .catch((error) => {
        //console.log(error.response.data)
      })
    },
    handleBlur(value, index) {
      this.v[index] = parseFloat(value).toFixed(4)
    }
  },
  
  watch:{
    v: {
      handler(){
        if(!this.isTexture){
          //Para el caso de Materia Organica que debo calcular FAS y CO
          if(this.parameter.index==3 && this.parameter.matrix =='Suelo'){
            this.v[2] = (10 / this.v[0]).toFixed(4)
            this.v[5] = (((parseFloat(this.v[0])-parseFloat(this.v[1]))*parseFloat(this.v[2])*(3/1000)*(100+parseFloat(this.v[3])))/parseFloat(this.v[4])).toFixed(4)
          }
          this.totalResult = eval(this.parameter.formula).toFixed(4);
        }
      },
      deep: true
    }
  }
})

if(document.getElementById("parameter")){const mountedParameter = parameter.mount("#parameter")}

const editParameter = Vue.createApp({
  data(){
    return{
      parameter: {},
      valuesFlag: false,
      v:[],
      totalResult: null,
      isTexture: false,
      isTotalHardness: false,
      p: [],
      flag: false,
      editValues: {},
      isEdit: false
    }
  },
  mounted(){
    let parameter = JSON.parse(document.getElementById("editParameter").getAttribute("data-parameter"));
    this.parameter = parameter

    //Esto es para cuando se editaran los parametros
    let editValues = JSON.parse(document.getElementById("editParameter").getAttribute("data-values"));
    this.editValues = editValues
    if(this.editValues) this.isEdit = true

    this.parameter.formula = this.parameter.formula.replaceAll('v', 'this.v'); //Para remplazar el v de la formula por this.v
    
    if(this.parameter.parameter == 'Textura') this.isTexture = true //Para ver si el parametro es textura

    //Por alguna extraña razon no es un espacio lo que hay en Dureza Total :V
    if(this.parameter.parameter == 'Dureza Total') this.isTotalHardness = true

    //Se verifica si el parametro tiene variables, son las que mediante dichas variables se generara el valor del parametro
    if(this.parameter.variables.length > 0) {
      
      this.valuesFlag = true

      this.parameter.variables.filter((p,index) => {
        let valueDetail
        if(this.isEdit){
          valueDetail = this.editValues.variables[index].result
          this.v.push(valueDetail)
        } else{
          valueDetail = 0
          this.v.push(index==3&&this.isTexture?'':valueDetail)
        }
      })
      
      //se verifica si es textura, porque este presenta variables, no un resultado final, y son estas las que se muestran
      //si no es textura se trabaja con las variables para hallar el resultado final de ese parametro
      //en caso de que si sea textura, se evita que estos se operen con la formula, ya que solo se deben ingresar
      if(!this.isTexture){
        this.totalResult = eval(this.parameter.formula).toFixed(4);
      }

    }

    if(this.isEdit && this.parameter.variables.length == 0){
      this.totalResult = this.editValues.finalResult
    }

    if(this.isTotalHardness){
      this.parameter.formula = this.parameter.formula.replaceAll('p', 'this.p');
      this.parameter.formula = this.parameter.formula.replaceAll('7', '0');
      this.parameter.formula = this.parameter.formula.replaceAll('8', '1');
    }

    //Para modificar la formula de Materia Organica que ta dando bugs
    if(this.parameter.index==3 && this.parameter.matrix =='Suelo'){
      this.parameter.formula = 'this.v[5]*1.72'
    }

  },
  methods: {
    setData(){
      if(this.flag != true){
        let obj
        if(this.isTexture) this.totalResult = -1
        
        if(this.totalResult == '' || isNaN(this.totalResult) || this.totalResult == null){
          Swal.fire('Por favor, complete los campos requeridos correctamente', '', 'error')
        } else {
          this.flag = true
          if(!this.valuesFlag){
            obj = {
              result: parseFloat(this.totalResult),
            }
          } else{
            const variablesArray = []

            for(let i=0; i<this.parameter.variables.length; i++){
              let vd ={}
              if(this.isTexture&&i==3){
                vd= {
                  result: this.v[i],
                  units: this.parameter.variables[i]
                }
              }else{
                vd= {
                  result: parseFloat(this.v[i]),
                  units: this.parameter.variables[i]
                }
              }
              
              variablesArray.push(vd)
            }
            
            obj = {
              result: parseFloat(this.totalResult),
              variables: variablesArray
            }
          }

          axios.post(`/analista/muestra/${this.parameter.id}/${this.parameter.index}`, obj).then(() => {
            Swal.fire('Parámetro registrado', '', 'success').then(() => {
              return (window.location = `/analista/muestra/${this.parameter.id}`);
            })
          }).catch(err=>{
            Swal.fire('Hubo un error', '', 'error')
            //console.log(err)
          })
        }
      }
    },
    hasVariables(){
      return (this.parameter.variables.length > 0)
    },
    calcTotalHardness(){
      axios.get(`/analista/muestra/${this.parameter.id}/${8}/dureza-total`)
      .then(response => {
        this.p = response.data;
        if(this.p[0] == -1 || this.p[1] == -1){
          Swal.fire('Aun no se han asignado los valores de los parámetros necesarios para calcular este parámetro', '', 'error')
        } else{
          this.totalResult = eval(this.parameter.formula).toFixed(4);
        }
      })
      .catch((error) => {
        //console.log(error.response.data)
      })
    },
    handleBlur(value, index) {
      this.v[index] = parseFloat(value).toFixed(4)
    }
  },
  
  watch:{
    v: {
      handler(){
        if(!this.isTexture){
          //Para el caso de Materia Organica que debo calcular FAS y CO
          if(this.parameter.index==3 && this.parameter.matrix =='Suelo'){
            this.v[2] = (10 / this.v[0]).toFixed(4)
            this.v[5] = (((parseFloat(this.v[0])-parseFloat(this.v[1]))*parseFloat(this.v[2])*(3/1000)*(100+parseFloat(this.v[3])))/parseFloat(this.v[4])).toFixed(4)
          }
          this.totalResult = eval(this.parameter.formula).toFixed(4);
        }
      },
      deep: true
    }
  }
})

if(document.getElementById("editParameter")){const mountedEditParameter = editParameter.mount("#editParameter")}

const createReport = Vue.createApp({
  data(){
    return{
      results: [],
      chunks:[],
      matrix:''
    }
  },
  mounted(){
    let results = JSON.parse(document.getElementById("createReport").getAttribute("data-results"));
    let matrix = document.getElementById("createReport").getAttribute("data-matrix");
    this.matrix = matrix
    if(this.matrix=="Suelo"){
      for (let index = 0; index < results.length; index++) {
        if(results[index].index==17 && results[index].name=='Textura'){
          let textureVariables = ["Arena","Arcilla","Limo","Clase textural"]
          results[index].finalResult = ''
          for (let j = 0; j < results[index].variables.length; j++) {
            let obj ={
              name: textureVariables[j],
              finalResult: results[index].variables[j].result,
              units: results[index].variables[j].units
            }
            results.push(obj)
          }
          results.splice(17, 1)
        }
      }
    }
    if(this.matrix=="Agua"){
      let chunks = [],i = 0,n = results.length;
      while (i < n) {
        chunks.push(results.slice(i, i += 8));
      }
      this.chunks= chunks
    }else{
      let chunks = [],i = 0,n = results.length;
      while (i < n) {
        chunks.push(results.slice(i, i += 11));
      }
      this.chunks= chunks
    }
    this.results = results
  },
  methods:{
    splitName(name){
      const str = name.toString()
      let cad = str.toString().split(/\s+/)
      let insert ='<br>'
      if (cad.length==1){
        return `<span>${cad[0]}</span>`
      }else if(cad.length==2){
        return `<span>${cad[0]}</span>${insert}<span>${cad[1]}</span>`
      }else if(cad.length==3){
        return `<span>${cad[0]} ${cad[1]}</span>${insert}<span>${cad[2]}</span>`
      }else if(cad.length==4){
        return `<span>${cad[0]} ${cad[1]}</span>${insert}<span>${cad[2]} ${cad[3]}</span>`
      }
    },
    fixedTwo(number){
      if(typeof number === 'number'){
        return Math.round((number + Number.EPSILON) * 100) / 100
      }
      return number
    }
  }
})

if(document.getElementById("createReport")){const mountedCreateReport = createReport.mount("#createReport")}

const analystResults = Vue.createApp({
  data(){
    return{
      results: [],
      matrix: '',
      resultsFinal: [],
      analyst: []
    }
  },
  mounted(){
    this.results = JSON.parse(document.getElementById("analystResults").getAttribute("data-results"));
    this.matrix = document.getElementById("analystResults").getAttribute("data-matrix");
    this.analyst = JSON.parse(document.getElementById("analystResults").getAttribute("data-analyst"));

    const waterPermits = ["pH","Conductividad Eléctrica","Cloruros","Alcalinidad","Calcio","Magnesio","Dureza de Calcio","Dureza de Magnesio","Dureza Total","Turbiedad","Color","Escherichia Coli","Coliformes Totales","Sodio","Fosfatos"]
    const groundPermits =  ["pH","Conductividad Eléctrica","Capacidad de intercambio Cationico","Materia Orgánica","Nitrógeno Total","Fosforo","Hierro","Manganeso","Cobre","Zinc","Calcio","Magnesio","Potasio","Sodio","Aluminio","Boro","Azufre","Textura"]

    let r = {}

    //Para poner los nombres
    this.results.map((assigment)=>{
      for(let i=0; i<this.analyst.length; i++){
        if(assigment.analyst == this.analyst[i]._id){
          assigment.analyst = this.analyst[i].name + " " + this.analyst[i].lastName
        }
      }
    })

    this.results.filter((assigment) => {
      assigment.permits.filter((p)=>{
        if(this.matrix == 'Agua'){
          let i = waterPermits.indexOf(p)
          let hasResults = false

          if(assigment.results){
            for(let j=0; j<assigment.results.length; j++){
              if(assigment.results[j].index == i){
                r = {
                  parameter: assigment.results[j].name,
                  analyst: assigment.analyst,
                  result: assigment.results[j].finalResult,
                  unit: assigment.results[j].units,
                  deliveryDate: assigment.results[j].deliveryDate,
                }
                hasResults = true
                this.resultsFinal.push(r)
              }
            }
          }

          if(!hasResults){
              r={
                parameter: p,
                analyst: assigment.analyst,
                result: '',
                unit: '',
                deliveryDate: '',
              }
              this.resultsFinal.push(r)
          }

        } else {
          let i = groundPermits.indexOf(p)
          let hasResults = false

          if(assigment.results){
            for(let j=0; j<assigment.results.length; j++){
              if(assigment.results[j].index == i){


                if(assigment.results[j].index == 17){
                  let textureVariables = ["Arena","Arcilla","Limo","Clase textural"]

                  r = {
                    parameter: assigment.results[j].name,
                    analyst: assigment.analyst,
                    result: assigment.results[j].finalResult,
                    unit: assigment.results[j].units,
                    deliveryDate: assigment.results[j].deliveryDate,
                  }
                  hasResults = true
                  this.resultsFinal.push(r)

                  for(let textVar=0; textVar < assigment.results[j].variables.length; textVar++){
                    r = {
                      parameter: textureVariables[textVar],
                      analyst: assigment.analyst,
                      result: assigment.results[j].variables[textVar].result,
                      unit: assigment.results[j].variables[textVar].units,
                      deliveryDate: assigment.results[j].deliveryDate,
                    }
                    hasResults = true
                    this.resultsFinal.push(r)
                  }
                } else{
                  r = {
                    parameter: assigment.results[j].name,
                    analyst: assigment.analyst,
                    result: assigment.results[j].finalResult,
                    unit: assigment.results[j].units,
                    deliveryDate: assigment.results[j].deliveryDate,
                  }
                  hasResults = true
                  this.resultsFinal.push(r)
                }
              }
            }
          }

          if(!hasResults){
              r={
                parameter: p,
                analyst: assigment.analyst,
                result: '',
                unit: '',
                deliveryDate: '',
              }
              this.resultsFinal.push(r)
          }
        }
      })
    })
  },
  methods:{
    formatDate(date){
      if(date!=''){
        let d = new Date(date)
        d.setHours(d.getHours() + 5);
        let dateYear=d.getFullYear()
        let dateMonth=d.getMonth()+1
        let dateDay=d.getDate()
        if (dateDay.toString().length==1) dateDay="0"+dateDay
        if (dateMonth.toString().length==1) dateMonth="0"+dateMonth
        return `${dateYear}-${dateMonth}-${dateDay}`
      } else{
        return ''
      }
    }
  }
})

if(document.getElementById("analystResults")){const mountedAnalystResults = analystResults.mount("#analystResults")}