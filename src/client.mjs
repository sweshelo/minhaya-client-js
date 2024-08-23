export class MinhayaAPIClient {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = null;
    this.baseUrl = "https://api-v1.minhaya.com";
    this.commonHeaders = {
      "User-Agent": "Ktor client",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-charset": "UTF-8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "ja",
      "platform": process.env.PLATFORM,
      "minhaya-res-version": process.env.MINHAYA_VERSION,
      "device": process.env.DEVICE,
      "os-version": process.env.OS_VERSION,
    };
  }

  async initialize() {
    await this.getAccessToken();
  }

  async getAccessToken() {
    const response = await this.makeRequest("/access_token", "POST", {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken: null,
      refreshToken: null,
    });
    this.accessToken = response.accessToken;
  }

  async makeRequest(endpoint, method = "GET", body = null) {
    const headers = { ...this.commonHeaders };
    if (this.accessToken) {
      headers["authorization"] = `Bearer ${this.accessToken}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!response.ok) {
      console.log(await response.json())
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // TODO: unauthorizedになる
  async getQuizById(quizId) {
    return await this.makeRequest(`/quiz?quizId=${quizId}`);
  }
}