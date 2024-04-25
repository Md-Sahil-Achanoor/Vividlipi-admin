import * as XLSX from "xlsx";

export const downloadXlsx = <T extends object>(
  data: T[],
  name: string = "demo.xlsx"
) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  XLSX.writeFile(wb, name);
};

export const readExcelFile = (file: any) => {
  if (file) {
    let jsonData: any = [];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      jsonData = json;
    };
    reader.readAsArrayBuffer(file);
    return jsonData;
  }
};
