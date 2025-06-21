import { http } from "../../common/http";
import { appConfig } from "../../common/config";
export const generateTask = (userPrompt) => {
  return http.post(`${appConfig.BASE_URL}/api/ai/generate`, { userPrompt });
};
