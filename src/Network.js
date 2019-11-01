

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
          console.error(error);
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
          console.error(error);
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
          console.error(error);
          reject(error);
        });
    }))
    }
}