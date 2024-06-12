
import { cn } from '@/utils/twmerge';
import { PropsWithChildren } from 'react';

interface ToggleProps extends PropsWithChildren<{}> {
  isOn: boolean;
  isDisabled?: boolean;
  defaultClass?: string;
  defaultBGClass?: string;
}

const Toggle = ({
  isOn = false,
  isDisabled,
  defaultClass,
  defaultBGClass,
}: ToggleProps) => {
  return (
    <span
      className={cn(
        `border w-[35px] flex items-center rounded-xl py-0.5 px-0.5`,
        isOn
          ? 'justify-end border-green-600'
          : 'justify-start border-red-600',
        isDisabled && 'justify-start border-gray-400',
        defaultClass
      )}
    >
      <span
        className={cn(
          `w-3.5 h-3.5 rounded-full`,
          isOn ? 'bg-green-600' : 'bg-red-600',
          isDisabled && 'bg-gray-400',
          defaultBGClass
        )}
      ></span>
    </span>
  );
};

export default Toggle;
