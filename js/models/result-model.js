import dataModel from './data-model.js';
import {dataAdapter} from './data-model.js';

const resultAdapter = new class extends dataAdapter {

}();

class ResultModel extends dataModel {
  send(data) {
    super.send(data, resultAdapter);
  }
}

export default new ResultModel();
