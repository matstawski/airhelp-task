//importing libraries
import http from "k6/http";
import { check, group, } from 'k6';

export let options = {
     // *******************************************************************
    // * Please do change here if You want to start a different scenario *
    // *******************************************************************
    stages: [
        { target: 10, duration: "20s" },
       //{ target: 550, duration: "5s" },
        // { target: 250, duration: "10s" },
        // { target: 250, duration: "300s" },
        // { target: 0, duration: "1ms" },
        // { target: 0, duration: "30s" },
        // { target: 250, duration: "1ms" },
        // { target: 250, duration: "150s" },
        // { target: 0, duration: "1ms" },
        // { target: 200, duration: "30s" },
        // { target: 200, duration: "300s" }
    ],
    thresholds: {
        "http_req_duration": ["p(95)<1000"],
        "http_req_duration": ["avg<500"],
        "check_failure_rate": ["rate<0.05"]
    },
 };

//setting up the test env
export function setup() {
     
    //authorization in the System as client/test
     let auth = http.post("http://host.docker.internal:8080/login?username=client&password=test");
     
     //connecting to /api/select/products/ to get the product id; for testing purposes I decided to select product number 3
     let api_id_products = http.get('http://host.docker.internal:8080/api/select/products/');
     let api_id_products_body = JSON.parse(api_id_products.body);
     let api_id_products_product_id = JSON.stringify(api_id_products_body[2]["id"]);
     api_id_products_product_id = api_id_products_product_id.replace(/\"/g, "");
    
    return api_id_products_product_id;     
};

export default function(api_id_products_product_id) { 
    group('PART 1: Creating new orders.', function() {

        //authorization in the System as client/test
        let auth = http.post("http://host.docker.internal:8080/login?username=client&password=test");
        
        //creating input dictionary
        // I decided to use Test product 3, random quantity in range (1,20)
        let formdata = {
            "client": {
                "city": "Warsaw",
                "firstName": "Client",
                "flatNo": 0,
                "homeNo": 0,
                "id": "",
                "lastName": "Test 1",
                "password": "",
                "role": "CLIENT",
                "street": "",
                "username": "",
                "zipCode": 0
              },
              "completeDate": "",
              "id": "",
              "items": [
                {
                  "product": {
                    "category": {
                      "id": "",
                      "name": "Test 2"
                    },
                    "company": "TEST",
                    "description": "",
                    "expirationDate": "",
                    "id":api_id_products_product_id,
                    "name": "Testowy produkt 3",
                    "price": 4
                  },
                  "quantity": Math.floor(Math.random() * 19) + 1
                },
              ],
              "orderDate": "",
              "status": "DRAFT",  
        }

        let headers = {
            "content-type": "application/json;charset=UTF-8",
            "Accept": "application/json",
        };
        
        //sending the order request
        let res = http.post("http://host.docker.internal:8080/api/orders/", JSON.stringify(formdata), {headers: headers});
        check(res, {
        "Status is 200": (r) => r.status === 200,
        "content-type is application/json": (res) => res.headers['Content-Type'] === "application/json;charset=UTF-8"
    });
})
};