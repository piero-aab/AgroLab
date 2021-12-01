$(window).on("load", function () {
  if ($(".preloader").length) {
    $(".preloader").fadeOut(1500);
  }
})
document.addEventListener("DOMContentLoaded", function(){
  let message = JSON.parse( document.getElementById("message").getAttribute("data") );
  const position = screen.width<768?'center':'bottom-end'; 

  if (message.success){
    for (let index = 0; index < message.success.length; index++) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: message.success[index].msg,
          showConfirmButton: false,
          timer: 4000
        })
    }
  } 
  if (message.info){
    for (let index = 0; index < message.info.length; index++) {
        Swal.fire({
          position: position,
          icon: 'info',
          title: message.info[index].msg,
          showConfirmButton: false,
          timer: 3500
        })
      
    }
  } 
  if (message.errors){
    for (let index = 0; index < message.errors.length; index++) {
        Swal.fire({
          position: position,
          icon: 'error',
          title: message.errors[index].msg || "Error",
          showConfirmButton: false,
          timer: 3500
        })
      
    }
  } 
});

/*
 *
 * Validate Login
 * 
*/

function validateUserCode(event){
  const userCode = document.getElementById('usercode').value;
  let pattern = /^[0-9]{7,10}$/g;
  //if(! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){
  if(! pattern.test(userCode)){
    event.preventDefault();
    badForm('El código de usuario ingresado no es válido');
    return false;
  }
}

function badForm(message){
  const position = screen.width<768?'center':'bottom-end'; 
  Swal.fire({
    position: position,
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 2500
  })
}

function confirmReturn(message,name,href){
  Swal.fire({
    title: message,
    text: name,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      return (window.location = href);
    }
  })
}


/*
 *
 * Validate Login
 * 
*/


/*
 *
 * Validate Register
 * 
*/

function validateRegister(event){
  const userCode = document.getElementById('usercode').value;
  let pattern = /^[0-9]{7,10}$/g;
  //if(! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){
  if(! pattern.test(userCode)){
  //const email = document.getElementById('email').value;
  //if(! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){
    event.preventDefault();
    badForm('El correo ingresado no es válido');
    return false;
  }

  const password = document.getElementById('pswd').value;
  if(password.length<8){
    event.preventDefault();
    badForm('La contraseña debe tener mínimo 8 dígitos.');
    return false;
  }

  if( checkType(password) !== '2' ){
    event.preventDefault();
    badForm('La contraseña debe contener al menos una letra mayúscula y una minúscula.');
    return false;
  }

  const password2 = document.getElementById('pswd2').value;
  if( password !== password2){
    event.preventDefault();
    badForm('Las contraseñas no coinciden.');
    return false;
  }

}

function checkType(mensaje) {
  
  mensaje = mensaje.trim();

  const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }

  if (regxs.lower.test(mensaje)) { return '0'; }

  if (regxs.upper.test(mensaje)){ return '1'; }

  if (regxs.upperLower.test(mensaje)){ return '2'; }

  return -1;
}

/*
 *
 * Validate Register
 * 
*/

/*
 *
 * Validate Forgot
 * 
*/

function validateEmail(event){
  const email = document.getElementById('email').value;
  const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!reg.test(email)){
    event.preventDefault();
    badForm('El correo ingresado no es válido');
    return false;
  }
}

function badForm(message){
  const position = screen.width<768?'center':'bottom-end'; 
  Swal.fire({
    position: position,
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 2500
  })
}

/*
 *
 * END Validate Forgot
 * 
*/

/*
 *
 * Validate Reset
 * 
*/

function validateReset(event){

  const password = document.getElementById('pswd').value;
  if(password.length<8){
    event.preventDefault();
    badForm('La contraseña debe tener mínimo 8 dígitos.');
    return false;
  }

  if( checkType(password) !== '2' ){
    event.preventDefault();
    badForm('La contraseña debe contener al menos una letra mayúscula y minúscula.');
    return false;
  }

  const password2 = document.getElementById('pswd2').value;
  if( password !== password2){
    event.preventDefault();
    badForm('Las contraseñas no coinciden.');
    return false;
  }

}

function checkType(mensaje) {
  
  mensaje = mensaje.trim();

  const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }

  if (regxs.lower.test(mensaje)) { return '0'; }

  if (regxs.upper.test(mensaje)){ return '1'; }

  if (regxs.upperLower.test(mensaje)){ return '2'; }

  return -1;
}

/*
 *
 * END Validate Reset
 * 
*/
