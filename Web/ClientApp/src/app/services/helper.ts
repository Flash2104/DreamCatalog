import { IResponse } from '../store/models';

  export function prepareErrorMessage(res: IResponse<any>) {
    let messages: string;
    if (!!res.errors) {
      messages = res.errors.join(';\r\n');
    }
    return messages;
  }
