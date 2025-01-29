import { EdgeWorker } from "jsr:@pgflow/edge-worker";

EdgeWorker.start(async (payload: { url: string }) => {
  // do something with the message
  console.log("Scraping URL...", payload.url);
}, {
  queueName: "on-new-sites",
});

/* Send messages to this worker with:
 ```sql
  SELECT pgmq.send(
    queue_name => 'on-new-sites',
    msg => '{"url": "https://example.com"}'::jsonb
  );
  ````
*/
