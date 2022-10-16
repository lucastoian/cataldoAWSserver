
const express = require("express");
const router = express.Router();



const accountSid = 'ACaabb761613b479c978d80b22ecc63f82';
const authToken = 'eb52a29ca810248fc796ca3fb29f50d1';
const client = require('twilio')(accountSid, authToken);





router.post(`/send`, async (req,res)=>{

    try{
    let orderId = req.body.orderId;
    let clientNumber = req.body.clientNumber;
    let clientPrefix = req.body.clientPrefix;
    console.log("cerco di mandare un sms a questo numero: " + '+' + clientPrefix + clientNumber);

    client.messages
    .create({
        body: 'Hi there', 
        from: '+12059474811', 
        to: '+' + clientPrefix + clientNumber,
        statusCallback: 'https://cataldoproduction.herokuapp.com/api/v1/sms/recive',
        applicationSid: orderId
})
    .then(message => console.log(message.sid));
    res.sendStatus(200);
}catch(e){
    console.log("errore nel'invio dell'sms " + e);
    res.status(500).json({
      success: false,
      
  })
}
    });
      


    router.post(`/recive`, async (req,res)=>{


        
        console.log("ho ricevuto questo messaggio : " + JSON.stringify(req.body) );
        res.sendStatus(200);

    });


    router.post(`/failed`, async (req,res)=>{

        console.log("errore nel ricevere il messaggio: " + JSON.stringify(req.body) );
        res.sendStatus(200);

    });
             

module.exports = router;
