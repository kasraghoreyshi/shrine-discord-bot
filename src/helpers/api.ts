import axios from "axios";

const baseEndpoint = "https://dbd.tricky.lol/api";

axios.defaults.baseURL = baseEndpoint;

export type ApiPerk = {
  [key in string]: {
    categories: string[];
    name: string;
    description: string;
    role: "killer" | "survivor";
    character: number;
    modifier: string;
    image: string;
    tunables: string[][];
  };
};

export const getPerks = async (): Promise<ApiPerk> => {
  const { data } = await axios.get("/perks", { headers: { locale: "en" } });
  return data;
};

export type ApiShrine = {
  id: number;
  perks: { id: string }[];
  start: number;
  end: number;
};

export const getCurrentShrine = async (): Promise<ApiShrine> => {
  const { data } = await axios.get("/shrine", { headers: { locale: "en" } });
  return data;
};
