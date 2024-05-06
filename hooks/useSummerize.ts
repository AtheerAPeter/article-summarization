import httpClient from "@/HTTPClient";
import { useMutation } from "react-query";

export const useSummerize = () => {
  const summerizeMutation = useMutation(httpClient.SummerizeApi.summerize);

  return {
    summerizeMutation,
  };
};
