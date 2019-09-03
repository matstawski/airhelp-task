//importing libraries
import http from "k6/http";
import { check, group, } from 'k6';

//Options 
export let options = {
    setupTimeout: "90s",
    thresholds: {
        "http_req_duration": ["p(95)<1000"],
        "http_req_duration": ["avg<500"],
        "check_failure_rate": ["rate<0.05"]
    }
};

//setting up the test env
export function setup() {
     
    //authorization in the System as employee/test
     let auth = http.post("http://host.docker.internal:8080/login?username=employee&password=test");
     
     //orders API, get length
    let api_id_orders_test = http.get('http://host.docker.internal:8080/api/orders/');
    let api_id_orders_test_body = JSON.parse(api_id_orders_test.body);
    let elements_number = JSON.stringify(api_id_orders_test_body["totalElements"]);
    elements_number = elements_number.replace(/\"/g, "");

     //orders API, getting ID
     let api_id_orders = http.get('http://host.docker.internal:8080/api/orders/?size=' + elements_number);
    // console.log(api_id_orders.body);
     let api_id_orders_body = JSON.parse(api_id_orders.body);
     let api_id_orders_body2 = JSON.stringify(api_id_orders_body.content[0]["id"]);
     api_id_orders_body2 = api_id_orders_body2.replace(/\"/g, "");
  
    
     //getting ids of already placed orders
     var x = elements_number;
     var array_of_ids = [];
     
     for (var i = 0; i < x; i++) {  
       let next_id = JSON.stringify(api_id_orders_body.content[i]["id"]).replace(/\"/g, "");  
       array_of_ids.push(next_id);
     }
    return array_of_ids;        
};

export default function(array_of_ids) 
{ 
    group('PART 2: Accepting orders.', function() 
    {
        //authorization in the System as client/test
        let auth = http.post("http://host.docker.internal:8080/login?username=client&password=test");
        console.log("auth" + auth.status);
        //calculating number of elements
        var elements_number_array = array_of_ids.length;

        //for every id from the orders I do replace status from "DRAFT" to "ACCEPTED"
        for (var i=0; i<elements_number_array; i++){
        let get_json = http.get("http://host.docker.internal:8080/api/orders/" + array_of_ids[i]);
        let stringified = JSON.stringify(get_json.body).replace("DRAFT","ACCEPTED");
        let formdata = JSON.parse(stringified);
        let headers = {
            "content-type": "application/json;charset=UTF-8",
            "Accept": "application/json",
        };
        //sending the request
        let res = http.put("http://host.docker.internal:8080/api/orders/" + array_of_ids[i], formdata, {headers: headers});
        check(res, {
                "Status is 200": (r) => r.status === 200, 
                "content-type is application/json": (res) => res.headers['Content-Type'] === "application/json;charset=UTF-8"
            }  
        )}   
    })
};