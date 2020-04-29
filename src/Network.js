

export default class NetworkModule{
    constructor(){
	    
    }

    async requestLogin(username,password){
        return new Promise(((resolve, reject) => {
            fetch('http://106.54.62.64:8080/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                "userName": username,
                "password": password,
              })
            })
        .then((response) => response.json())
        .then((responseJson) => {
         resolve(responseJson.code);
        })
        .catch((error) => {
          reject(error);
        });
    }))
    }

    async requestRegister(username, password) {
        return new Promise(((resolve, reject) => {
            fetch('http://106.54.62.64:8080/user/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    "userName": username,
                    "password": password,
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log("flame-debug100 requsetRegister ", responseJson.json());
                    resolve(responseJson.code);
                    /*
                    if (responseJson.code === '-1') {
                        Toast.show({
                            text: "The username already exists.",
                            type: "danger"
                        })
                    }
                    if (responseJson.code === '0') {
                        Toast.show({
                            text: "Registered successfully",
                            type: "success"
                        })
                    }
                    */
                })
                .catch((error) => {
                    reject(error);
                });
        }))
    }


    async requestSession(){
        return new Promise(((resolve, reject) => {
            fetch('http://106.54.62.64:8080/user/session')
        .then((response) => response.json())
        .then((responseJson) => {
         resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    }))
    }

    async requestLogout(){
        return new Promise(((resolve, reject) => {
            fetch('http://106.54.62.64:8080/logout')
        .then((response) => response.json())
        .then((responseJson) => {
         resolve(responseJson.code);
        })
        .catch((error) => {
          reject(error);
        });
    }))
    }
/*
    async requestRegister(username,password){

    }
*/
    async postData(username,timestamp,data){
        return new Promise(((resolve, reject) => {
            fetch('http://129.211.88.168:8081/send/cluster-test',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'sendKey':'ksl-heart-disease-group'
            },body: JSON.stringify({
                "user": username,
                "device": "PM",
                "timestamp":timestamp,
                "data":data
              })
            })
        .then((response) => response.json())
        .then((responseJson) => {
         resolve(responseJson.code);
        })
        .catch((error) => {
          reject(error);
        });
    }))
    }
}