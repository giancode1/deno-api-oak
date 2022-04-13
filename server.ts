import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

// routes
import todoRouter  from "./routes/todo.router.ts";
// logger
import logger from './middlewares/logger.ts';
// not found
import notFound from './middlewares/notFound.ts';

const port: number = 8080;
const app = new Application();

// order of execution is important;
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

//404 page
app.use(notFound);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

await app.listen({ port });

//deno run --allow-net server.ts
