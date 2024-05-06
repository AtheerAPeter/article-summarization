import Axios from "axios";
import { summerizeApi } from "./summerizeApi";

export const client = Axios.create({
  baseURL: "/api",
  timeout: 15000,
});

const httpClient = {
  SummerizeApi: summerizeApi(client),
};

export default httpClient;
