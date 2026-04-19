import axios from 'axios';

interface getUserInfoParams{
  latitude: number;
  longitude: number;
}

interface OpencageCurrency{
  iso_code: string;
}

interface OpencageResult{
  annotations: {
    currency: OpencageCurrency
  };

}

interface OpencageResponse{
  results: OpencageResult[];
}

export const getUserInfo = async ({ latitude, longitude }:getUserInfoParams): Promise<OpencageResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpencageResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
