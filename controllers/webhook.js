const { Employe } = require("../model/employ");
const employee = require("./employee");

exports.webhook = async(req, res) => {
    console.log('webhook_api_called');
    if(!req.body) res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')

    const { queryResult } = req.body
    const intent = queryResult.intent.displayName;
    const parameters = queryResult.parameters;
    console.log('intent', intent)
    let resText = null;


    if(intent == 'employee-details'){
        const { name } = parameters;
        console.log('name', name);
        const result = await employee.employeeByName(name);
        console.log('result', result)
        if(result.length == 1) {
            const cardData = result[0]._doc;
            console.log('nameOfmine', cardData);
            const responseObj = {
                "fulfillmentText": resText,
                "fulfillmentMessages": [
                    {
                        "payload": {
                          "title_a": cardData.name,
                          "title_b": cardData.email,
                          "title_c": cardData.phone,
                          "title_d": cardData.position
                        }
                      }
                  ],
                "source":""
            }
            return res.json(responseObj);
        }
        else if(result.length > 1){
            const quesAns = result.map((obj) =>{
                console.log(obj._id)
                const dataname = obj._doc.name;
                return {text: dataname, postback:dataname }
            });
            console.log("quesAns", quesAns)
            const responseObj = {
                "fulfillmentText": resText,
                "fulfillmentMessages": [
                    {
                        "card": {
                          "title": "title",
                          "subtitle": "subtitle",
                          "imageUri": "imageUri",
                          "buttons": [quesAns]
                        }
                      }
                  ],
                "source":""
            }
            return res.json(responseObj);
        }
        else{
            const respon = 'Your name not matched. Please try with another name.'
            const responseObj = {
                "fulfillmentText": respon,
                "fulfillmentMessages":[{"text": { "text":[respon] } }],
                "source":""
            }
            console.log('responseObj', responseObj)
            return res.json(responseObj);
        }
     
    }
    
    else if( intent == 'empId' || intent == 'doj' || intent == 'current-job' ||
         intent == 'reporting-manager' || intent == 'email' || intent == 'leave-balance')
    {
        // get data from mongo db
        const { empId } = parameters;
        console.log('EmpId', empId)
        const result = await Employe.findOne({empId});
        const data = result._doc;

        // conditions with intent
        if(intent == 'empId')
            resText= `Hi!, ${data.name}. I am HR-BOT, How can i help you ?`
        else if(intent == 'doj')
            resText= `Your date of joining is ${data.doj}`
        else if(intent == 'current-job')
            resText= `Your are a ${data.position} in this organization.`
        else if(intent == 'reporting-manager')
            resText= `Your reporting manager is ${data.reporting}`
        else if(intent == 'email')
            resText= `Your Official email id is ${data.email}`
        else if(intent == 'leave-balance')
            resText= `You have ${data.leave_balance} days leave balance.`

        const responseObj = {
            "fulfillmentText": resText,
            "fulfillmentMessages":[{"text": { "text":[resText] } }],
            "source":""
        }
        console.log('responseObj', responseObj)
        return res.json(responseObj);
    }

    else{
        res.sendStatus(400);
    } 
   
}