import { ValidationOptions } from "react-hook-form/dist/types"
import { intl } from "Renderer/utils/intl"

export const phoneNumberValidator: ValidationOptions = {
  minLength: {
    value: 5,
    message: intl.formatMessage(
      { id: "form.error.tooShort" },
      { minLength: 5 }
    ),
  },
  maxLength: {
    value: 15,
    message: intl.formatMessage(
      { id: "form.error.tooLong" },
      { maxLength: 15 }
    ),
  },
  pattern: {
    value: /^\+?\d+$/im,
    message: intl.formatMessage({ id: "form.error.phoneNumber.numbersOnly" }),
  },
}

export const emailValidator: ValidationOptions = {
  pattern: {
    value: /^\S+@\S+(\.\S+)+$/im,
    message: intl.formatMessage({ id: "form.error.invalidEmail" }),
  },
}