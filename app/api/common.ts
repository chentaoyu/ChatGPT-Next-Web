import { NextRequest } from "next/server";
import axios, { AxiosRequestConfig } from "axios";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");
  let config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
  };
  if (req.body) {
    config.data = await req.json();
  }

  return axios(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, config);
}
