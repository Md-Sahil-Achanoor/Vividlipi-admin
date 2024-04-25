import React, { FC } from "react";

interface Table {
  colSpan: number;
  children: React.ReactNode;
  parentClass?: string;
}

const NoTableData: FC<Table> = ({ colSpan, children, parentClass = "" }) => {
  return (
    <tr>
      <th colSpan={colSpan}>
        <div className={parentClass + " flex items-center justify-center"}>
          {children}
        </div>
      </th>
    </tr>
  );
};

export default NoTableData;
