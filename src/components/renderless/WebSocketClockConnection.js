import {mapActions, mapGetters} from "vuex";
import {IP_CLOCK_MODULE, PERIOD_CLOCK_MODULE, SETTINGS_CLOCK_MODULE} from "../../store/namespaces";
import {
    GET_IP_CLOCK,
    GET_WEB_SOCKETS_CONNECTION, SET_IS_BED_TIME, SET_TIME_CLOCK,
    SET_WEB_SOCKETS_CONNECTION,
    SET_WEB_SOCKETS_CONNECTION_STATUS, SET_WEEK_END_SETTINGS, SET_WEEK_SETTINGS
} from "../../store/mutation-types";

const WebSocketClockConnection = {
    data() {
        return {
            ws: false,
            intervalStatus:null
        }
    },
    
    computed: {
        ...mapGetters({
                ipClock: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`,
                connection: `${SETTINGS_CLOCK_MODULE}${GET_WEB_SOCKETS_CONNECTION}`
            }
        ),
    },
    methods: {
        ...mapActions([
            `${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION}`,
            `${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`,
            `${SETTINGS_CLOCK_MODULE}${SET_WEEK_SETTINGS}`,
            `${SETTINGS_CLOCK_MODULE}${SET_WEEK_END_SETTINGS}`,
            `${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`,
            `${PERIOD_CLOCK_MODULE}${SET_TIME_CLOCK}`,
        ]),
        onOpenWsConnection() {
            console.log("connected");
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION}`](true);
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`]('OPEN');
            this.sendMessage("ask_for_status");
            this.intervalStatus = setInterval( () => this.sendMessage("ask_for_status"), 10000)
        },
        onErrorWsConnection(e) {
            console.log("error", e);
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION}`](false);
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`]('CLOSED');
            this[`${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`](null)
        },
        onCloseWsConnection(e) {
            console.log("close", e);
            if(this.intervalStatus){
                clearInterval(this.intervalStatus)
                this.intervalStatus = null
            }
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION}`](false);
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`]('CLOSED');
            this[`${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`](null)
            this[`${PERIOD_CLOCK_MODULE}${SET_TIME_CLOCK}`](null)
        },
        onMessageWsConnection(e){
            let payload = JSON.parse(e.data)
            switch (payload.msg){
                case 'config_from_arduino' :
                    this.onConfigFromArduino(payload.datas);
                    break;
                case 'status_from_arduino' :
                    this.onStatusFromArduino(payload.datas);
                    break;
                default:
                    console.log(`Message reçu mais type "${payload.msg}" inconnu !`);
                    return;
            }
        },
        onConfigFromArduino(config){
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEEK_SETTINGS}`]({wakeUpTime:config.min_reveil_week, bedTime:config.max_reveil_week});
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEEK_END_SETTINGS}`]({wakeUpTime:config.min_reveil_weekend, bedTime:config.max_reveil_weekend});
        },
        onStatusFromArduino(status){
            this[`${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`](status.isNight)
            this[`${PERIOD_CLOCK_MODULE}${SET_TIME_CLOCK}`](status.date)
        },
        sendMessage(type, payload=null){
            if(this.ws && this.ws.readyState === WebSocket.OPEN){
                // Build message
                const message = {
                    msg_from_app: type,
                    ...payload,
                }
                this.ws.send(JSON.stringify(message));
            }
        },
        launch_connection(){
            this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`]('CONNECTING');
            this.ws = new WebSocket(`ws://${this.ipClock}`);
            this.ws.onopen = (e) => this.onOpenWsConnection(e)
            this.ws.onerror = (e) => this.onErrorWsConnection(e)
            this.ws.onclose = (e) => this.onCloseWsConnection(e)
            this.ws.onmessage = event => this.onMessageWsConnection(event)
        },

    },
    created() {
        this[`${SETTINGS_CLOCK_MODULE}${SET_WEB_SOCKETS_CONNECTION_STATUS}`]('CONNECTING');
        this.ws = new WebSocket(`ws://${this.ipClock}`);
        this.ws.onopen = (e) => this.onOpenWsConnection(e)
        this.ws.onerror = (e) => this.onErrorWsConnection(e)
        this.ws.onclose = (e) => this.onCloseWsConnection(e)
        this.ws.onmessage = event => this.onMessageWsConnection(event)
    },
    unmounted() {
        if(this.intervalStatus){
            clearInterval(this.intervalStatus)
            this.intervalStatus = null
        }
    },
    render() {
        return []
    },
}
export default WebSocketClockConnection
