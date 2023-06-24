# Função de descoberta de rede para react-native
<p>Exemplo feito em react-native, para descobrir aplicações/apis em rede local</p>


### Tecnologias
<ul>
  <li>react-native (cli)</li>
  <li>react-native-udp</li>
  <li>react-native-network-info</li>
  <li>lodash</li>
</ul>

### Tecnologias 
<ol>
  <li>Baixe o <code>app-release.apk</code> e instale-o em seu dispositivo.</li>
  <li>Baixe um dos servidores https://github.com/CECSMH/udp_echo_servers e siga as instruções de uso.</li>
  <li>Abra o app e seja feliz!</li>
</ol>

### Funcionamento
<p>Consiste em, o dispositivo (que está a procurar) emite uma mensagem em broadcast, 
  no protocolo UDP em uma porta pre-determinada (neste exemplo é a porta 9090) e fica aguardando retorno, já as apis/outras aplicações (que serão encontradas) por sua vez estarão "ouvindo"
  nesta mesma porta, e quando receberem a mensagem, respondem diretamente ao remetente um Json com as informações necessarias(ip, porta, nome....)
</p>
