///  <reference path="https://raw.githubusercontent.com/supabase/edge-runtime/c8f8a7b3395a904bef7ac1d44028d8f1b809829b/types/global.d.ts" />

const FUNCTIONS_BASE = "/home/deno/functions/";

console.log("main function started");

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const { pathname } = url;
  const path_parts = pathname.split("/");
  const service_name = path_parts[1];

  if (!service_name || service_name === "") {
    const error = { msg: "missing function name in request" };
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const worker = await createWorker(service_name);
    return await worker.fetch(req);
  } catch (e) {
    // @ts-ignore Error type
    const error = { msg: e.toString() };
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

async function createWorker(workerName: string) {
  const servicePath = `${FUNCTIONS_BASE}/${workerName}`;
  console.error(`starting user worker: ${servicePath}`);

  const memoryLimitMb = 150;
  const workerTimeoutMs = 1 * 60 * 1000;
  const noModuleCache = false;
  const importMapPath = `${FUNCTIONS_BASE}/deno.json`;
  const envVarsObj = Deno.env.toObject();
  const envVars = Object.keys(envVarsObj).map((k) => [k, envVarsObj[k]]);

  return await EdgeRuntime.userWorkers.create({
    servicePath,
    memoryLimitMb,
    workerTimeoutMs,
    noModuleCache,
    importMapPath,
    envVars,
  });
}
