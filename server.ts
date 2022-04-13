import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

const port: number = 8080;

const router = new Router();
router.get("/", (context) => {
  context.response.body = {
    message: "Hello World",
  };
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

//Opening the server
// console.log('Running on port ', port);
app.addEventListener("listen", ({ hostname, port, secure }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

await app.listen({ port });

//deno run --allow-net server.ts
