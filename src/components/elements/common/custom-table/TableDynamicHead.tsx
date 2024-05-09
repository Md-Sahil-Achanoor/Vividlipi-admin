import Pagination from "@/components/atoms/Pagination";
import { Dispatch, FC, SetStateAction } from "react";

interface Table {
  children: React.ReactNode;
  customHead: () => React.ReactNode;
  reInitialize?: boolean;
  tableClass?: string;
  isPaginationHide?: boolean;
  totalPage?: number;
  setPage?: Dispatch<SetStateAction<number>>;
}

const TableDynamicHead: FC<Table> = ({
  children,
  customHead,
  reInitialize = false,
  tableClass,
  totalPage,
  setPage = () => {},
}) => {
  // const { totalPage } = useAppSelector((state) => state.common);
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto primary-scrollbar-horizontal">
        <div className="min-w-full inline-block ">
          <div className={`overflow-x-hidden customTable ${tableClass}`}>
            <table className="h-full rounded-lg min-w-full divide-y divide-gray-200 border-collapse ">
              <thead>
                <tr className="text-content-primary dark:text-white">
                  {customHead()}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPage && totalPage > 1 && (
        <Pagination
          reInitialize={reInitialize}
          totalPage={totalPage}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TableDynamicHead;
