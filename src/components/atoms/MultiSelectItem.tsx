import { BsX } from "react-icons/bs";
import { AccessObject, AccessObjectKey } from "../../types";

interface Props<T> {
  defaultName: string;
  data: T[];
  onClick: (data: T) => void;
  displayName: AccessObjectKey;
  isRemoveAble?: boolean;
}

const MultiSelectItem = <T extends Partial<AccessObject>>({
  data,
  defaultName,
  displayName,
  onClick,
  isRemoveAble = false,
}: Props<T>) => {
  // console.log(`\n\n  data: ====>`, data);
  if (data?.length !== 0) {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {data?.map((item) => (
          <div
            className="flex justify-between items-center gap-1 bg-gray-200 rounded-md p-1"
            key={item?.id}
          >
            <span>{item[displayName]}</span>
            {!isRemoveAble && (
              <span
                className="cursor-pointer bg-white rounded-md p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(item);
                }}
              >
                <BsX className="text-red-600 text-lg" />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
  return <span className="text-sm truncate">{defaultName}</span>;
};

export default MultiSelectItem;
