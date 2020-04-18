import Verifications from 'verifications';

const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const url = /^(http(s?):\/\/)?((www\.)?)+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/;

const persianAndLatin = /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AFA-Za-z ]+$/;

const number = /^[0-9۰-۹]*\.?[0-9۰-۹]*$/;

const integer = { test: (value) => app._.isInteger(value) };

const string = { test: (value) => app._.isString(value) };

const time = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const nationalCode = {
  test: (code) => Verifications.NationalID.verify(code, 'IR'),
};

export default {
  email,
  url,
  persianAndLatin,
  number,
  integer,
  string,
  nationalCode,
  time,
};
