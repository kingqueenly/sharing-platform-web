/**
 * Created by AMC on 2017/5/19.
 */
import  {FormControl} from '@angular/forms';

const EMAIL_REGEXP = new RegExp("^[.a-z0-9]+@[a-z0-9]+[.]{1,1}[a-z]{1,3}$");
const PHONE_REGEXP = new RegExp("^[0-9- \+]*$");

export function validateEmail(c: FormControl) {
  return EMAIL_REGEXP.test(c.value) ? null : {
    email: {
      valid: false,
      errorMsg: 'email not valid'
    }
  };
}

export function validatePhone(c: FormControl){
  return PHONE_REGEXP.test(c.value) ? null : {
    mobile: {
      valid: false,
      errorMsg: 'mobile nat valid'
    }
  };
}
