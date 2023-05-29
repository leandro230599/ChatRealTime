$(() => {
    $("#enviar").click(()=>{
        enviarMensaje({
          nombre: $("#nombre").val(), 
          mensaje:$("#mensaje").val()
        });
        });
      obtenerMensajes();
    })
    
const agregarMensajes = (mensaje) => {
   $("#mensajes").append(`
      <h4> ${mensaje.nombre} </h4>
      <p>  ${mensaje.mensaje} </p>`);
}
   
const obtenerMensajes = () => {
    $.get('http://localhost:3000/mensajes', (data) => {
        data.forEach(element => agregarMensajes(element));
    });
 }
 
const enviarMensaje = (mensaje) => {
   $("#mensaje").val('').focus();
   //$("#mensaje").focus().select();
   $.post('http://localhost:3000/mensajes', mensaje);
 }


const socket = io();
  socket.on('mensaje', (mensaje) => {
    agregarMensajes(mensaje);
});

// const getUserIP = async () => {
//   const response = await fetch('https://api.ipify.org?format=json');
//   const data = await response.json();
// }

// getUserIP().then( (data) => console.log("DEL THEN",data));

const getUserIP = fetch('https://api.ipify.org?format=json')
    .then( (response) => response.json())
    .then( (data) => data.ip);

getUserIP.then( (data) => console.log("DEL THEN ASD",data));