import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const NonAuth = ({ children }: Props) => {
  return <>{children}</>;
};

export default NonAuth;
