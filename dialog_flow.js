const dialogflow = require('dialogflow');
const projectId = 'bikeshopsample-ca7f0'

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
  // console.log('Detected intent', result);
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    const res = {
        query:result.queryText,
        response:result.fulfillmentText,
        intent:result.intent.displayName
    }
    resolve(res)
  } else {
    console.log(`No intent matched.`);
    reject('No intent matched')
  }
}
catch(error){
    console.log(error)
    reject('Oops something went wrong')
}

})
}