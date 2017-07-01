export class dataAdapter {
  constructor() {
    if (new.target === dataAdapter) {
      throw new Error();
    }
  }

  preprocess(data) {
    return data;
  }

  toServer(data) {
    return data;
  }
}

const defaultDataAdapter = new class extends dataAdapter {}();
export default class dataModel {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load(adapter = defaultDataAdapter) {
    return fetch(this.urlRead)
      .then((resp) => {
        return resp.json();
      })
      .then(adapter.preprocess);
  }

  send(data, adapter = defaultDataAdapter) {
    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(this.urlWrite, requestSettings)
      .then(this.onUpload);
  }
}
