import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
}

const NavigatorTo = ({ to }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NavigatorTo;
