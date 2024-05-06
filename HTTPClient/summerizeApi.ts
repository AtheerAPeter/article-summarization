import { ISummerizeInput, ISummerizeResponse } from "@/interfaces/ISummerize";
import { Axios } from "axios";

export const summerizeApi = (request: Axios) => ({
  summerize: async (input: ISummerizeInput) => {
    const response = await request.post<ISummerizeResponse>("/summerize", {
      link: input.link,
    });
    return response.data;
  },
});
