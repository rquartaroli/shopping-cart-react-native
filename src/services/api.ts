import axios from 'axios';

/* 
  A configuração atual funcionará normalmente se a aplicação for executada em emuladores.

  ### DISPOSITIVO FÍSICO (MOBILE) ###
  Caso queira executar em seu dispositivo físico, altere a config da baseURL para o IP de sua máquina local
  Exemplo: 'http://192.168.0.0:3333'
  Após isso, lembre-se de alterar também o script de server do package.json com o IP que você acabou de alterar aqui,
  Exemplo: "json-server server.json --host 192.168.0.0 -p 3333 --delay 700"
  Lembrando que seu dispositivo físico precisa estar conectado na mesma rede que sua máquina local
  PS: Lembre-se também de deixar rodando o JSON SERVER antes de executar a aplicação para que tudo funcione normalmente
*/
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;