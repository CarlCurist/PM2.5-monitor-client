import { Toast} from "native-base";
import { Global } from './global'
import './Storage'

export const AutoConnect = (Name, MACAddr) => {
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
            console.log('flame-debug9 connect succeed',Name,MACAddr)
            BLEStatus.connectedDeviceName = Name
            BLEStatus.connectedDeviceMAC = MACAddr

            BLEStatus.isConnected = true;
            BluetoothManager.startNotificationUUID(RWServiceUUID, ReadUUID)
                .then(() => {
                    Toast.show({
                        text: "Connected successfully",
                        type: "success"
                    })

                    device_storage.save({
                        key: 'device', // Note: Do not use underscore("_") in key!
                        data: {
                            name: Name,
                            mac: MACAddr,
                        },

                        // if expires not specified, the defaultExpires will be applied instead.
                        // if set to null, then it will never expire.
                        expires: null
                    });
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