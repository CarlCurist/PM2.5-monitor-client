import { Toast} from "native-base";
import { Global } from './global'

export const AutoConnect = (Name,MACAddr) => {
    if (BLEStatus.isStart == false) {
        BLEStatus.isStart = true
        BluetoothManager.start();
    }

    //当前蓝牙正在连接时不能打开另一个连接进程
    if (BluetoothManager.isConnecting) {
        //console.log('当前蓝牙正在连接时不能打开另一个连接进程');
        return;
    }
    //console.log('flame-debug9 start connect')
    BluetoothManager.connect(MACAddr)
        .then(peripheralInfo => {
            console.log('flame-debug9 connect succeed')
            BLEStatus.connectedDeviceName = Name
            BLEStatus.connectedDeviceMAC = MACAddr

            BLEStatus.isConnected = true;
            BluetoothManager.startNotificationUUID(RWServiceUUID, ReadUUID)
                .then(() => {
                    //console.log('flame-debug9 startNotificationUUID succeed')
                    //this.alert('开启成功');
                })
                .catch(err => {
                    //console.log('flame-debug9 startNotificationUUID fails', err);
                    BluetoothManager.disconnect();
                    Toast.show({
                        text: "Start Notification Fails",
                        type: "danger"
                    })
                })
            Toast.show({
                text: "Connected successfully",
                type: "success"
            })
        })
        //.then()
        .catch(err => {
            Toast.show({
                text: "Connected Fails",
                type: "danger"
            })
        })
}

//export { AutoConnect }