const Koa = require("koa");
const app = new Koa();
app.use((ctx) => {
  ctx.body = "Hello World123";
});

app.listen(3000);