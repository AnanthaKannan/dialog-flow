const fulfillmentMessages = {
    "platform": "PLATFORM_UNSPECIFIED",
    "payload": {
      "fields": {
        "title_c": {
          "stringValue": "+91 9042141018",
          "kind": "stringValue"
        },
        "title_d": {
          "stringValue": "digital-engineer",
          "kind": "stringValue"
        },
        "message": {
          "stringValue": "card",
          "kind": "stringValue"
        },
        "title_b": {
          "stringValue": "sree.kannan@rapidqube.com",
          "kind": "stringValue"
        },
        "title_a": {
          "stringValue": "Anantha Kannan",
          "kind": "stringValue"
        }
      }
    },
    "message": "payload"
  }

const message = fulfillmentMessages.message;
if(message == 'payload'){
  const payload = fulfillmentMessages.payload.fields;
  const payloadMessage = payload.message.stringValue;
  console.log(payloadMessage);
  if(payloadMessage == 'card'){
    const card = {
      title_a: payload.title_a.stringValue,
      title_b: payload.title_b.stringValue,
      title_c: payload.title_c.stringValue,
      title_d: payload.title_d.stringValue,
    };
    console.log(card)
  }
}
console.log(message)