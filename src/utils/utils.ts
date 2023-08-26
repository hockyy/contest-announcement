import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const getLabelFromProblem = (problem) => {
  return `${problem.contestId}-${problem.index}: ${problem.name}`;
};

export const timestampToDateString = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('en-US');
};

export const axiosErrorCatcher = (err: AxiosError) => {
  if (err.response) {
    toast(err.response.data as string);
  }
  toast(err.message);
};
