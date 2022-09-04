const success = (status: number, message: string, data?: any): Success => {
  return {
    status,
    message,
    data,
  };
};

const fail = (
  status: number,
  message: string,
  errorMessage?: any,
  data?: any
): Fail => {
  return {
    status,
    message,
    errorMessage,
    data,
  };
};

export { success, fail };
