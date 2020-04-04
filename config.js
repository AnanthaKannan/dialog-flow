const dialogflow = require('dialogflow');
// const uuid = require('uuid');
const projectId = 'bikeshopsample-ca7f0'

runSample(projectId)
async function runSample(projectId) {
    console.log('projectId', projectId)
  // A unique identifier for the given session
  const sessionId = 'some_session_id' //uuid.v4();
  console.log('sessionId', sessionId)
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hi',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  // console.log('Detected intent', result);
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}