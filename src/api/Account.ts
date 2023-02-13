import axios from "axios";

export default class Account {
  private token?: string;

  constructor(
    private email: string,
    private password: string,
    existingToken?: string,
  ) {
    this.token = existingToken;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token token=${this.token}`;
  }

  async login(): Promise<string> {
    return await axios
      .post(
        "/v1/sign_in",
        {
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        this.token = res.data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token token=${this.token}`;

        return res.data.token;
      });
  }

  async getToken(): Promise<string> {
    if (!this.token) return await this.login();

    return this.token;
  }

  async getInformation(): Promise<RawUser> {
    return await axios.get("/v1/account").then(res => res.data);
  }

  async getSubscriptions(): Promise<RawSubscription[]> {
    return await axios.get("/v1/account/subscriptions").then(res => res.data);
  }
}
