
const adminClients = Vue.createApp({
  data(){
    return{
      clientsOrigin: [],
      clients: [],
      emails: [],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.emails = JSON.parse(document.getElementById("admin-clients").getAttribute("data-emails"));
    this.clientsOrigin = JSON.parse(document.getElementById("admin-clients").getAttribute("data-clients"));
    this.clients = this.clientsOrigin;
  },
  computed:{
    displayedClients: function(){
      return this.paginate(this.clients)
    }
  },
  watch:{
    clients(){
      this.setClients()
    },
    name(){
      this.searchClients()
    }
  },
  methods:{
    enableClient(clientId, businessName, tradeName,status){
      const msg = status==0?"¿Está seguro que desea suspender a este cliente?":"¿Está seguro que desea activar a este cliente?"
      const newStatus = status==0?1:0
      Swal.fire({
        title:msg,
        text: businessName,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`/admin/clientes/${clientId}/habilitar`,{status:newStatus}).then(() => {
            Swal.fire(status==0?'Suspendido!':'Activado', '', 'success').then(() => {
              location.reload()
            })
          }).catch(err=>{
            Swal.fire('Hubo un error', '', 'error')
            console.log(err)
          })
        }
      })
    },
    setClients() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.clients.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(clients) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return clients.slice(from, to);
    },
    searchClients(){
      if(this.name!=''){
        const clients = this.clientsOrigin
        const reg = new RegExp(this.name,'i')
        const a = clients.filter((a)=> reg.test(a.tradeName) || reg.test(a.businessName) )
        this.clients = a
      }else{
        this.clients = this.clientsOrigin;
      }
    },
    createClient(){
        Swal.fire({
          title: "Nuevo cliente",
          html:
          '<label for="my-input">Razón social</label>'+
          '<input id="businessName" class="swal2-input" placeholder="Razón social" required>' +
          '<label for="my-input">Nombre comercial</label>'+
          '<input id="tradeName" class="swal2-input" placeholder="Nombre comercial" required>'+
          '<label for="my-input">RUC</label>'+
          `<input id="ruc" oninput="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="11" class="swal2-input" placeholder="RUC" required>`+
          '<label for="my-input">Correo electrónico</label>'+
          `<input id="email" type="email" class="swal2-input" placeholder="Correo electrónico" required>`,
          denyButtonText: 'Volver, sin guardar',
          confirmButtonText: 'Crear cliente',
          showDenyButton: true,
          preConfirm: () => {
            if (document.getElementById('businessName').value=='') {
              Swal.showValidationMessage('Razón social requerido')   
            }
            if (document.getElementById('tradeName').value=='') {
              Swal.showValidationMessage('Nombre comercial requerida')   
            }
            if (document.getElementById('ruc').value=='') {
              Swal.showValidationMessage('RUC requerido')   
            }else if(document.getElementById('ruc').value!=='' && document.getElementById('ruc').value.length<11){
              Swal.showValidationMessage('Verificar RUC')
            }
            if (document.getElementById('email').value=='') {
              Swal.showValidationMessage('Correo electrónico requerido')   
            }else if(document.getElementById('email').value!='' && !/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(document.getElementById('email').value)){
              Swal.showValidationMessage('Correo electrónico incorrecto')  
            }
            if(this.clientsOrigin&&this.clientsOrigin.length>0){
              this.clientsOrigin.filter((c)=>{
                if(c.ruc==document.getElementById('ruc').value) Swal.showValidationMessage('Ya existe un cliente con este RUC')
              })  
            }
            if(this.emails&&this.emails.length>0){
              this.emails.filter((c)=>{
                if(c.email==document.getElementById('email').value) Swal.showValidationMessage('Ya existe un usuario con este correo electrónico') 
              })  
            }
          }
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            const businessName = document.getElementById('businessName').value
            const tradeName = document.getElementById('tradeName').value
            const ruc = document.getElementById('ruc').value
            const email = document.getElementById('email').value
            const obj ={
              businessName:businessName,
              tradeName:tradeName,
              ruc:ruc,
              email:email,
              type: 2,
              analists:[],
              reports:[],
              status:0
            }
            axios.post(`/admin/clientes/crear`,obj).then(() => {
              Swal.fire('Cliente creado!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              console.log(err)
            })
          }
        })
    }
  }
})

if(document.getElementById("admin-clients")){const mountadminClients = adminClients.mount("#admin-clients")}


const adminAnalists= Vue.createApp({
  data(){
    return{
      analistsOrigin: [],
      analists: [],
      emails: [],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.emails = JSON.parse(document.getElementById("admin-analists").getAttribute("data-emails"));
    this.analistsOrigin = JSON.parse(document.getElementById("admin-analists").getAttribute("data-analists"));
    this.analists = this.analistsOrigin;
  },
  methods:{
    createAnalist(){
        Swal.fire({
          title: "Nuevo Analista",
          html:
          '<label for="my-input">Nombres</label>'+
          '<input id="name" class="swal2-input" placeholder="Nombres" required>' +
          '<label for="my-input">Apellidos</label>'+
          '<input id="lastName" class="swal2-input" placeholder="Apellidos" required>'+
          '<label for="my-input">Correo electrónico</label>'+
          `<input id="email" type="email" class="swal2-input" placeholder="Correo electrónico" required>`,
          denyButtonText: 'Volver, sin guardar',
          confirmButtonText: 'Crear analista',
          showDenyButton: true,
          preConfirm: () => {
            if (document.getElementById('name').value=='') {
              Swal.showValidationMessage('Nombres requerido')   
            }
            if (document.getElementById('lastName').value=='') {
              Swal.showValidationMessage('Apellidos requerida')   
            }
            if (document.getElementById('email').value=='') {
              Swal.showValidationMessage('Correo electrónico requerido')   
            }else if(document.getElementById('email').value!='' && !/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(document.getElementById('email').value)){
              Swal.showValidationMessage('Correo electrónico incorrecto')  
            }
            if(this.emails&&this.emails.length>0){
              this.emails.filter((a)=>{
                if(a.email==document.getElementById('email').value) Swal.showValidationMessage('Ya existe un usuario con este correo electrónico') 
              })  
            }
          }
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            const name = document.getElementById('name').value
            const lastName = document.getElementById('lastName').value
            const email = document.getElementById('email').value
            const obj ={
              name:name,
              lastName:lastName,
              email:email,
              type: 1,
              clients:[],
              status:0
            }
            axios.post(`/admin/analistas/crear`,obj).then(() => {
              Swal.fire('Analista creado!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              console.log(err)
            })
          }
        })
    },
    enableAnalist(userEmail, userId,status){
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
            console.log(err)
          })
        }
      })
    },
    setAnalists() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.analists.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(analists) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return analists.slice(from, to);
    },
    searchAnalists(){
      if(this.name!=''){
        const analists = this.analistsOrigin
        const reg = new RegExp(this.name,'i')
        const a = analists.filter((a)=> reg.test(a.name) || reg.test(a.lastName) || reg.test(a.name+" "+a.lastName))
        this.analists = a
      }else{
        this.analists = this.analistsOrigin
      }
    },
  },
  watch:{
    analists(){
      this.setAnalists()
    },
    name(){
      this.searchAnalists()
    }
  },
  computed:{
    displayedAnalists: function(){
      return this.paginate(this.analists)
    }
  }
})

if(document.getElementById("admin-analists")){const mountadminAnalists = adminAnalists.mount("#admin-analists")}

const adminAssignments= Vue.createApp({
  data(){
    return{
      assignmentsOrigin: [],
      assignments: [],
      clients:[],
      analists:[],
      name:'',
      page:1,
      perPage:20,
      pages:[]
    }
  },
  mounted(){
    this.assignmentsOrigin = JSON.parse(document.getElementById("admin-assignments").getAttribute("data-assignments"));
    this.assignments = this.assignmentsOrigin;
    this.clients = JSON.parse(document.getElementById("admin-assignments").getAttribute("data-clients"));
    this.analists = JSON.parse(document.getElementById("admin-assignments").getAttribute("data-analists"));
  },
  methods:{
    createAssignment(){
      var analists = this.analists;
      var clients = this.clients;
      swal.fire({
        title: "Nueva asignación",
        html: '<label for="my-input" style="margin-bottom: 1.5em;">Analistas</label>'+
        `<select class="selectmultiple select2 form-control select2-multiple" id="analists" name="analists[]" multiple="multiple"></select>`+
        '<label for="my-input" style="margin: 1em auto 1.5em;">Cliente</label>'+
        `<select class="selectsingle form-control select2" style="margin-bottom: 1em;" id="client" name="client"><option></option></select>`,
        denyButtonText: 'Volver, sin guardar',
        confirmButtonText: 'Crear asignación',
        showDenyButton: true,
        focusConfirm: false,
        didOpen : function () {
            $('.selectmultiple').select2({
              language: "es",
              minimumResultsForSearch: 15,
              width: '100%',
              placeholder: "Seleccione 2 analistas",
              allowClear: true,
              data:analists,
              maximumSelectionLength: 2
            });
            $('.selectsingle').select2({
              language: "es",
              minimumResultsForSearch: 15,
              width: '100%',
              placeholder: "Seleccione 1 cliente",
              allowClear: true,
              data:clients,
              // language: {
                
              //   noResults: function() {

              //   return "No existen clientes sin asignar";        
              // }
          });
        },
        preConfirm: () => {
          if (document.getElementById('analists').selectedOptions.length<2) {
            Swal.showValidationMessage('Selecione 2 analistas')   
          }
          if (document.getElementById('client').selectedOptions.length<1 || document.getElementById('client').selectedOptions[0].value=='') {
            Swal.showValidationMessage('Cliente requerido')   
          }

        }
      }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            const analists = []
            analists.push(document.getElementById('analists').selectedOptions[0].value)
            analists.push(document.getElementById('analists').selectedOptions[1].value)
            const client = document.getElementById('client').selectedOptions[0].value
            const obj ={
              analists: analists,
              client:client
            }
            axios.post(`/admin/asignaciones/crear`,obj).then(() => {
              Swal.fire('Asignación creada!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              console.log(err)
            })
          }
        })
    },
    setAssignments() {
      this.pages=[]
      let numberOfPages = Math.ceil(this.analists.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(assignments) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return assignments.slice(from, to);
    },
    searchAssignments(){
      if(this.name!=''){
        const assignments = this.assignmentsOrigin
        const reg = new RegExp(this.name,'i')
        const a = assignments.filter((a)=> reg.test(a.tradeName))
        this.assignments = a
      }else{
        this.assignments = this.assignmentsOrigin
      }
    },
  },
  watch:{
    analists(){
      this.setAssignments()
    },
    name(){
      this.searchAssignments()
    }
  },
  computed:{
    displayedAssignments: function(){
      return this.paginate(this.assignments)
    }
  }
})

if(document.getElementById("admin-assignments")){const mountadminAssignments = adminAssignments.mount("#admin-assignments")}
