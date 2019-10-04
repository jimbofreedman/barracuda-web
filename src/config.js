const config = {
  development: {
    api: {
      endpoint: 'http://localhost:8000/api/',
    },
  },
  test: {
    api: {
      endpoint: 'http://localhost:8000/api/',
    },
  },
  production: {
    api: {
      endpoint: 'https://[add backend]]/api/',
    },
  },
};

export default config[process.env.NODE_ENV];
