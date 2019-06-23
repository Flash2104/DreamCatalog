import { IResponse } from '../store/models';
import { FormControl } from '@angular/forms';

export function prepareErrorMessage(res: IResponse<any>) {
  let messages: string;
  if (!!res.errors) {
    messages = res.errors.join(';\r\n');
  }
  return messages;
}

export function validateFileTypes(types: string[]) {
  return function (control: FormControl) {
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const file = control.value;
      if (!!file && !!file.name) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            fileType: true
          };
        }
        return null;
      }
      return null;
    };
  }
}


export function validateNumber(control: FormControl): { [key: string]: boolean } {
  if (!!control.value && (isNaN(control.value))) {
    return { numberKey: true };
  }
  return null;
}

export function validateInteger(control: FormControl): { [key: string]: boolean } {
  if (!!control.value && (!Number.isInteger(+control.value))) {
    return { integer: true };
  }
  return null;
}

export function prepareBase64Data(base64: string) {
  const res = base64.split(',')[1];
  return res;
}