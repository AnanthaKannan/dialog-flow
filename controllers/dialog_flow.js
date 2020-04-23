// @ts-check
const dialogflow = require('dialogflow');
const projectId = 'hr-bot-agbkvh'

module.exports.dialog_flow = (text) =>{
return new Promise( async (resolve, reject) =>{
    
  const sessionId = 'some_session_id' //uuid.v4();
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  try{
  const responses = await sessionClient.detectIntent(request);

  const result = responses[0].queryResult;
  result._id = responses[0].responseId;
  const fulfillmentMessages = result.fulfillmentMessages[0];
  console.log('response', result)



  if (!result.intent) {
    console.log(`No intent matched.`);
    reject('No intent matched')
  }
    const message = fulfillmentMessages.message;
    let card, quickresponse;
    if(message == 'payload'){
      const payload = fulfillmentMessages.payload.fields;
      const payloadMessage = payload.message.stringValue;
      console.log(payloadMessage);
      if(payloadMessage == 'card'){
         card = {
          title_a: payload.title_a.stringValue,
          title_b: payload.title_b.stringValue,
          title_c: payload.title_c.stringValue,
          title_d: payload.title_d.stringValue,
          imgurl: payload.imgurl.stringValue
        };
        console.log(card)
      }
      else if(payloadMessage == 'quickresponse'){
        const listResponse = payload.data.listValue.values;
        quickresponse = quickresponse = listResponse.map(obj => {
          const text = obj.structValue.fields.text.stringValue;
          return {  text, callback: text }
        });
        console.log(quickresponse)
      }
    }

    console.log(`  Intent: ${result.intent.displayName}`);
    const res = {
        query:result.queryText,
        response:result.fulfillmentText,
        intent:result.intent.displayName,
        card,
        quickresponse
    }
    resolve(res)

  }
catch(error){
    console.log(error)
    reject('Oops something went wrong')
}

})
}