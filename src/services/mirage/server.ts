import { Server, Model, Factory, belongsTo, hasMany, Response } from "miragejs";
import { login, signup } from "./routes/user";
import * as diary from "./routes/diary";

export const handleErrors = (error: any, message = "An error ocurred") => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "development",

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: "bilal",
        password: "bilal",
        email: "test@email.com",
      }),
    },

    seeds: (server): any => {
      server.create("user");
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";

      this.get("/diaries/entries/:id", diary.getEntries);
      this.get("/diaries/:id", diary.getDiaries);

      this.post("/auth/login", login);
      this.post("/auth/signup", signup);

      this.post("/diaries/", diary.create);
      this.post("/diaries/entry/:id", diary.addEntry);

      this.put("/diaries/entry/:id", diary.updateEntry);
      this.put("/diaries/:id", diary.updateDiary);
    },
  });
};
