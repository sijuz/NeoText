import axios from 'axios';

const API_URL = 'https://api.codestorm.pro/api/';
//const API_URL = 'https://chestny-prekt.vital-balance.ru/private/';

axios.defaults.headers.common = {
    Accept: "application/json, text/plain, */*"
};
let createObjFromURI = function() {
    let uri = decodeURI(document.location.search.substr(1));
    let chunks = uri.split('&');
    let params = Object();

    for (let i=0; i < chunks.length ; i++) {
        let chunk = chunks[i].split('=');
        if(chunk[0].search("\[\]") !== -1) {
            if( typeof params[chunk[0]] === 'undefined' ) {
                params[chunk[0]] = [chunk[1]];

            } else {
                params[chunk[0]].push(chunk[1]);
            }


        } else {
            params[chunk[0]] = chunk[1];
        }
    }

    return params;
};

export default class API {

    async send(url, method = 'GET', action, data = {},cb) {
        const response = await axios({
            method,
            url: `${url}${action}`,
            data
        }).catch(error => {
            console.error("Error API:", error);
            cb(error);
        });
        return response ? response.data : [];
    }

    async Get(type) {
        let err = null;
        const response = await this.send(API_URL, "GET", type, null,function(er) {
            err = er;
        }.bind(err));
        console.log("API: ", `Get ${type}`, response);

        if (response.length === 0) {
            response.error = "1";
            response.code = 500;
            response.error2 = "Error: "+JSON.stringify(err);
            console.log("sss",response.error);
            return response;

        } else {
            if (response.error) {
                response.error2 = response.error;
            }
            return response;
        }

    }

    async Post(type,data = {}) {
        let err = null;
        let s = createObjFromURI();
        let dataG = {...s, ...data};
        // console.log("error log: ",document.location);
        const response = await this.send(API_URL, "POST", type, dataG,function(er) {
            err = er;
        }.bind(err));
        console.log("API: ", `POST ${type}`, response);

        if (response.length === 0) {
            response.error = "1";
            response.error_code = 500;
            response.error2 = "Error: "+JSON.stringify(err.message);
            console.log("sss",response.error);
            return response;

        } else {
            if (response.error) {
                response.error2 = response.error;
            }
            return response;
        }
    }
}