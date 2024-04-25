import { useState } from "react";
import * as XLSX from "xlsx";

const useExcelReader = () => {
  const [items, setItems] = useState<any>([]);
  const readExcel = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any = XLSX.utils.sheet_to_json(worksheet);
        setItems(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return { items, readExcel, setItems };
};

export default useExcelReader;
