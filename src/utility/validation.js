import * as yup from "yup";

export const AddRecipeSchema = yup.object().shape({
  Name: yup.string().min(2).max(100).required("Please Enter your Name"),
  imageUrl: yup.string().required("please upload image recipe"),
  Ingredients: yup
    .array()
    .of(yup.string())
    .min(1)
    .max(40)
    .required("Please Enter Ingredients"),
  Cooktime: yup
    .number()
    .min(1)
    .max(200)
    .required("Please Enter Cooktime")
    .positive(),
  Serving: yup
    .number()
    .min(1)
    .max(10)
    .required("Please Enter Serving Per Person")
    .positive(),
  votes: yup
    .number()
    .min(1)
    .max(5)
    .required("Please Enter vote count")
    .positive(),
  Description: yup.string().min(3).required("Please Enter description"),
  prepSteps: yup
    .array()
    .of(yup.string())

    .required("Please Enter Preparation Steps"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Please enter your password").min(3).max(20),
});

export const validateInputs = async (name, value, errors) => {
  let errorObj = {
    isError: false,
    errorMessage: "",
  };
  switch (name) {
    case "Name": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "Ingredients": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "Cooktime": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "Serving": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "votes": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "Description": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "prepSteps": {
      await yup
        .reach(AddRecipeSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "email": {
      await yup
        .reach(loginSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    case "password": {
      await yup
        .reach(loginSchema, name)
        .validate(value)
        .catch((err) => {
          errorObj = {
            isError: true,
            errorMessage: err.errors[0],
          };
        });
      break;
    }
    default: {
      errorObj = {
        ...errorObj,
        isError: false,
        errorMessage: "",
      };
    }
  }

  return errorObj;
};

export const validateSchema = async (schema, data) => {
  let errorObj = {
    isError: false,
    errorMessage: "",
  };

  if (schema && data) {
    await schema.validate(data).catch((err) => {
      errorObj = {
        ...errorObj,
        isError: true,
        errorMessage: err.errors,
      };
    });
  }
  return errorObj;
};
