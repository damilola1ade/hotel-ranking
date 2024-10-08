export const useFormValidation = () => {
  const otherValidation = {
    required: {
      value: true,
      message: "This field is required",
    },
    minLength: {
      value: 4,
      message: "Provide a suitable length for this field",
    },
  };

  return {
    otherValidation,
  };
};
