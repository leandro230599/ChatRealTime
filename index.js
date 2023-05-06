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
   $.post('http://localhost:3000/mensajes', mensaje);
 }

// const socket = io.connect("http://localhost:3000");

// socket.on('mensaje', () => {
//   console.log("Buscando mensajes")
//   obtenerMensajes()
// });