import { NetworkInfo } from "react-native-network-info";
import { Buffer } from "buffer";
import dgram from 'react-native-udp';
import _ from 'lodash';


export default class UdpNDService {
    port = 9090;
    broadcast_address = '';
    subnet_mask = '';
    ipv4 = '';
    client = null
    interval;
    founded = [];

    constructor(port = 9090){
        this.port = port
    }

    static instance;
    /**
     * inicia uma nova instancia do serviço
     * @returns {UdpNDService}
     */
    static init() { return UdpNDService.instance = new UdpNDService(); };
    /**
     * Para o serviço e fecha o socket
     */
    static stop() { return UdpNDService.instance.stop() };
     /**
     * Busca servidores na rede, tempo 1.5s
     * @param {function} callback - função de callback que receberá um array com resultado da busca
     * @param {object} payload - dados que serão enviados no echo
     */
    static search_echo(callback, payload = {}) { UdpNDService.instance.search_echo(callback, payload) };
    /**
     * Criar o socket udp
     * @returns {UdpNDService}
     */
    static async start() { return UdpNDService.instance.start(); };



    /**
     * Criar o socket udp
     * @returns {UdpNDService}
     */
    async start() {
        this.ipv4 = await get_ipv4_addreess();

        this.subnet_mask = await get_subnet_mask();

        this.broadcast_address = calc_broadcast_address(this.ipv4, this.subnet_mask);

        this.client = dgram.createSocket('udp4');
        
        await this.client.bind();

        this.client.on('message', (message, info) => {
            if (_.find(this.founded, e => e.address == info.address)) return;

            this.founded.push({ ...info, payload: parse_if_json_string(message.toString()) });
        });

        return this;
    };
    /**
     * Busca servidores na rede, tempo 1.5s
     * @param {function} callback - função de callback que receberá um array com resultado da busca
     * @param {object} payload - dados que serão enviados no echo
     */
    search_echo(callback, payload = {}) {
        let tries = 0;
        this.founded = [];

        const sender = () => {
            const packet = Buffer.from(JSON.stringify(payload));

            this.client.send(packet, 0, packet.length, this.port, this.broadcast_address, (function (err) {
                
                if (err) console.error(err.message)
                return true
            }));
        };

        this.interval = setInterval(() => {
            sender();

            if (tries >= 2) {
                clearInterval(this.interval);
                callback && callback(this.founded);
            };
            tries++;
        }, 500);
    };
    /**
     * Para o serviço e fecha o socket
     */
    stop() {
        clearInterval(this.interval);
        this.client.close();
    };
};


async function get_ipv4_addreess() { return await NetworkInfo.getIPV4Address() };
async function get_subnet_mask() { return await NetworkInfo.getSubnet() };

//calculo de endereço de broadcast
function calc_broadcast_address(ipv4, subnet_mask) {
    const ipv4_bin = _.map(_.split(ipv4, '.'), p => num2bin(+p));
    const mask_inveted_bin = _.map(_.split(subnet_mask, '.'), w => _.map(_.split(num2bin(+w), ''), e => e == 0 ? 1 : 0).join(''));
    const result = [];

    for (let i = 0; i < 4; i++) {
        let octa = '';

        const ip_bits = ipv4_bin[i], mask_bits = mask_inveted_bin[i];

        for (let j = 0; j < 8; j++)  octa += (+ip_bits[j] || +mask_bits[j]);

        result.push(octa);
    };

    return _.join(_.map(result, e => bin2num(e)), '.');
};

function num2bin(dec) { return ("000000000" + dec.toString(2)).substr(-8) };

function bin2num(bin) { return parseInt(bin, 2); };

function parse_if_json_string(str) {
    try { return JSON.parse(str); }
    catch (e) { return str; }
};