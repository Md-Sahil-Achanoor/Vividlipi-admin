import { useCallback, useReducer } from "react";

// type Data = {
//   data: Array<{ name: string; id: string }>;
// };

type State<T = any> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

type Action<T, T2> =
  | { type: "LOADING" }
  | { type: "IDLE" }
  | { type: "SUCCESS"; data: T }
  | { type: "FAILED"; message: T2 };

const asyncReducer = <T extends object, T2 extends string>(
  state: State<T>,
  action: Action<T, T2>,
): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, data: null, isLoading: true, isError: false };
    case "SUCCESS":
      return { ...state, data: action.data, isLoading: false, isError: false };
    case "FAILED":
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.message || "",
      };
    default:
      return state;
  }
};

const useAsync = <T extends object>(
  initialState?: State<T>,
): [
  state: State<T>,
  run: (promise: Promise<T>) => void,
  apiCall: (promise: Promise<T>) => void,
] => {
  const [state, dispatch] = useReducer(asyncReducer, {
    data: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    ...initialState,
  });

  const apiCall = <T extends object>(promise: Promise<T>) => {
    dispatch({ type: "LOADING" });
    promise.then(
      (data: T) => {
        dispatch({ type: "SUCCESS", data });
      },
      (error: any) =>
        dispatch({
          type: "FAILED",
          message: error?.response?.data?.message || "Failed to load data",
        }),
    );
  };

  const run = useCallback(
    <T extends object>(promise: Promise<T>) => apiCall<T>(promise),
    [],
  );
  return [state, run, apiCall];
};

export default useAsync;
