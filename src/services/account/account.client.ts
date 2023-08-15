import axios from "axios";
import { createAxiosConfig } from "../client.ts";

export const accountServiceClient = axios.create(
  createAxiosConfig("/account/api"),
);
