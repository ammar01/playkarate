// src/server/api.ts
import { Task } from "../shared/Task"
import { remultExpress } from "remult/remult-express"

export const api = remultExpress({
    entities: [Task]
  })