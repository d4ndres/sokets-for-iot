const $username = document.querySelector('#username')
const $chatHistory = document.querySelector('#chatHistory')

$username.value = 'User' + Math.floor(Math.random() * 10000)

const wrapperHTML = ({username, message}) => {
  return `<div class="px-2 py-1 w-fit rounded-sm ${username == $username.value? 'self-end bg-blue-200' : 'bg-green-200'}">
    <div class="text-sm">${username}</div>
    <div class="">${message}</div>
  </div>`
}

const socket = io('http://localhost:8081');

socket.on('mensaje-bienvenida', ( payload ) => {
  console.log( payload );
})

socket.on('server2cliente', ( payload ) => {
  if( payload.username == $username.value ) return
  $chatHistory.insertAdjacentHTML('afterbegin', wrapperHTML(payload));
})

const $toSendMessage = document.querySelector('#toSendMessage')
const sendMessage = () => {
  if(!$username.value) {
    console.warn('Please enter your username')
    return
  }
  
  const target = $toSendMessage;
  const message = target.value;
  if(!message) return
  const toSend = {
    username: $username.value,
    message
  }
  console.log(toSend)
  $chatHistory.insertAdjacentHTML('afterbegin', wrapperHTML(toSend));
  socket.emit('cliente2server', toSend)
  target.value = ''
}





