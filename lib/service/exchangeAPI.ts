import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

interface CredentialsParams {
  amount: number;
  from: string;
  to: string;
}

interface ApilayerResponse {
  query: CredentialsParams;
  info: { rate: number };
  result: number;
}

interface ExchangeCurrencyResponse {
  amount: number;
  from: string;
  to: string;
  rate: number;
  result: number;
}

export const exchangeCurrency = async (
  credentials: CredentialsParams
): Promise<ExchangeCurrencyResponse> => {
  const {
    data: { query, info, result },
  } = await instance.get<ApilayerResponse>('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency: string): Promise<[string, number][]> => {
  const { data } = await instance.get<{ rates: Record<string, number> }>(
    `/latest?symbols&base=${baseCurrency}`
  );

  return Object.entries(data.rates);
};
