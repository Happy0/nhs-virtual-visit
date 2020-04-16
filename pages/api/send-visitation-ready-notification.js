import ConsoleNotifyProvider from "../../src/providers/ConsoleNotifyProvider";
import RandomIdProvider from "../../src/providers/RandomIdProvider";
import { NotifyClient } from "notifications-node-client";

const ids = new RandomIdProvider();
const notifier = new ConsoleNotifyProvider();

const origin = process.env.ORIGIN;
const apiKey = process.env.API_KEY;
const templateId = process.env.TEMPLATE_ID;

export default async ({ body, method }, res) => {
  if (method !== "POST") {
    res.statusCode = 406;
    res.end();
    return;
  }

  const callId = ids.generate();
  const waitingRoomUrl = `${origin}/visitors/waiting-room/${callId}`;
  const visitationsUrl = `${origin}/visitations/${callId}?name=Ward`;

  var notifyClient = new NotifyClient(apiKey);

  try {
    await notifyClient.sendSms(templateId, body.contactNumber, {
      personalisation: { call_url: waitingRoomUrl },
      reference: null,
    });

    notifier.notify(body.contactNumber, waitingRoomUrl);

    res.statusCode = 201;
    res.end(JSON.stringify({ id: callId, callUrl: visitationsUrl }));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ err: err.error }));
  }
};