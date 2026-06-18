export function getErrorMessage(error) {

  const apiError =
    error?.response?.data;

  if (
    apiError?.errors?.length
  ) {

    return apiError.errors[0].message;
  }

  return (
    apiError?.message ||
    error?.message ||
    "Something went wrong"
  );
}