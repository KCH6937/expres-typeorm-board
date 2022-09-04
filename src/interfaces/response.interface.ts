interface Success {
  status: number;
  message: string;
  data?: any;
}

interface Fail {
  status: number;
  message: string;
  errorMessage?: any;
  data?: any;
}
