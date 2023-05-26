const fetch = require('node-fetch');

module.exports = function info($p, log, route = {}) { 
  route.info = async function infoHandler(req, res) {      

    // const response = await fetch(`https://zakaz.ecookna.ru:3200/adm/api/keys/85409756-e38d-11ed-a932-3bf6a6840a84`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Basic '+btoa('startokna:Fz53PFJb3BrYJv'),
    //     }
    // });

    const {cat, job_prm, utils: {end} } = $p; 
    // const key_id = '85409756-e38d-11ed-a932-3bf6a6840a84'

    //http://startokna.oknagc.ru:40022/adm/test1/info/test2/test3    // Из test3 пробрасывать в key_id

    const key_ref = '128000255524'
  
    const response = await fetch(`https://zakaz.ecookna.ru:3200/adm/api/keys/${key_ref}`, {
        headers: {
          'authorization': req.headers.authorization
        }
    });
  
    const data = await response.json(); 
    const ref = data.calc_order;

    const dataObj = await $p.doc.calc_order.get(ref).load(); 
    
    if (dataObj.is_new()) {
      end.end500({res, err: {status: 404, message: `Заказ с идентификатором '${key_id}' не существует.`}, log});
    } else {     
      res.end(JSON.stringify(dataObj));
    }    
  };

  // res.info.authorization = async function (req) {   
  //   return true;
  // };
};