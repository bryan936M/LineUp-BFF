import { createApp } from "./app.factory";
import { appConfig } from "./env.config";

const app = createApp();
export const PORT = appConfig.port;

app.listen(PORT, () => {
  const mode = appConfig.nodeEnv;
  const message = `Server is listening on port ${PORT} in ${mode} mode`;

  console.log(message);
});
