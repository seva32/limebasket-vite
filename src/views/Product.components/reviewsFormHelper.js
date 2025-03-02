/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable default-case */
export const reduceFormValues = (formElements, reviewName, reviewComments) => {
  const arrElements = Array.prototype.slice.call(formElements);
  const formValues = arrElements
    .filter((elem) => elem.name.length > 0)
    .map((x) => {
      const { typeMismatch } = x.validity;
      const { name, type, value, checked } = x;
      return {
        name,
        type,
        typeMismatch, // checks for incorrect format (e.g. incorrect email)
        value,
        checked,
        valid: x.checkValidity(), // api validation
      };
    })
    .reduce((acc, currVal) => {
      const { name, value, valid, typeMismatch, checked, type } = currVal;
      let fieldName; // to save value that already exist in field
      let errMsg;

      if (name.includes('reviewName')) {
        fieldName = reviewName.fieldName;
        errMsg = []; // start with empty arr, reviewName.errMsg may have err from prev submit
      } else if (name.includes('reviewComments')) {
        fieldName = reviewComments.fieldName;
        errMsg = []; // start with empty arr, reviewComments.errMsg may have err from prev submit
      } else if (name.includes('rate')) {
        fieldName = 'rate';
      }

      const trimedvValue = value.trim();

      // if text values are empty or rate radio isnt checked exclude them
      if (
        (currVal.name !== 'rate' && trimedvValue) ||
        (currVal.name === 'rate' && currVal.checked)
      ) {
        acc[currVal.name] = {
          value: trimedvValue,
          valid,
          typeMismatch,
          checked,
          type,
          fieldName,
          errMsg,
        };
      }
      return acc;
    }, {});
  return formValues;
};

export const checkAllFieldsValid = (formValues, setAllFieldsRequired) => {
  const formKeys = Object.keys(formValues);

  // name, rating and comments not empty
  if (formKeys.length < 3) {
    setAllFieldsRequired(true);
    return;
  }
  setAllFieldsRequired(false);

  formKeys.forEach((field) => {
    switch (field) {
      case 'reviewName':
      case 'reviewComments':
        Object.keys(formValues[field]).forEach((subField) => {
          // valid must be true and typeMismatch false
          if (subField === 'valid' && !formValues[field][subField]) {
            formValues[field].errMsg = [
              ...formValues[field].errMsg,
              'Invalid input.',
            ];
          }
          if (subField === 'typeMismatch' && formValues[field][subField]) {
            formValues[field].errMsg = [
              ...formValues[field].errMsg,
              'Invalid format.',
            ];
          }
          if (subField === 'value') {
            // sanitize value
            // eslint-disable-next-line no-useless-escape
            const regex = /[\<\>\"\'\%\;\(\)\&\+]/g;
            formValues[field][subField] = formValues[field][subField].replace(
              regex,
              '',
            );
            if (formValues[field][subField].trim().length > 180) {
              formValues[field].errMsg = [
                ...formValues[field].errMsg,
                'Max number of characters: 180.',
              ];
            }
          }
        });
        break;

      case 'rate':
        if (!formValues[field].checked) {
          console.log('Oops');
        }
        break;
    }
  });
};
