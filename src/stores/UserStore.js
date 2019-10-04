import { observable, action, computed } from 'mobx';

export default class UserStore {
  @observable user = null;

  @observable loading = true;

  @observable loginFailed = false;

  constructor(httpClient) {
    this.httpClient = httpClient;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  @computed get isLoggedIn() {
    return this.user != null;
  }

  @action login(credentials) {
    this.loginFailed = false;
    this.loading = true;
    this.httpClient.post('auth/login', {
      data: {
        type: 'loginViews',
        attributes: credentials,
      },
    }).then(() => {
      this.getUser();
    })
      .catch((error) => {
        if (error.response.status === 400) {
        // bad username/password
          this.loginFailed = true;
        } else {
          console.log('error', error);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @action logout() {
    this.loading = true;
    this.httpClient.post('auth/logout', {
      data: {
        type: 'logoutViews',
      },
    }).then(() => {
      this.user = null;
    })
    // .catch((error) => {
    //
    // });
      .finally(() => {
        this.loading = false;
      });
  }

  @action getUser() {
    this.loading = true;
    this.httpClient.get('users/me').then((response) => {
      this.user = response.data.data;
    })
      .catch((error) => {
        if (error.response.status === 401) {
        // not logged in
          this.user = null;
        } else {
          console.log('error', error);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
