import * as XLSX from 'xlsx'

export const downloadSampleExcel = () => {
  const dropdownValues = ['Option 1', 'Option 2', 'Option 3']

  // Create a new worksheet
  const ws = XLSX.utils.aoa_to_sheet([['Header 1', 'Header 2', 'Header 3']]) // Example headers

  // Set data validation for a specific column (e.g., column B)
  const range = { s: { c: 1, r: 0 }, e: { c: 1, r: 1048576 } } // Adjust range as needed
  const rule = {
    type: 'list',
    values: dropdownValues,
  }
  ws['!dataValidation'] = [rule, range]

  // Create a new workbook
  const wb = XLSX.utils.book_new()

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Write the workbook to a file
  XLSX.writeFile(wb, 'example.xlsx')
}

export const downloadXlsx = <T extends object>(
  data: T[],
  name: string = 'demo.xlsx',
) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  const rows = ws['!rows'] || []
  // console.log(`\n\n ~ rows:`, ws, wb, rows)
  for (let i = 0; i < rows.length; i++) {
    // const row = rows[i]
    // console.log(`\n\n row:`, row)
  }
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  XLSX.writeFile(wb, name)
}

export const readExcelFile = (file: any) => {
  if (file) {
    let jsonData: any = []
    const reader = new FileReader()
    reader.onload = (e: any) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      // workbook.Workbook
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      // console.log(`\n\n ~ worksheet:`, worksheet);
      const json = XLSX.utils.sheet_to_json(worksheet)
      jsonData = json
    }
    reader.readAsArrayBuffer(file)
    return jsonData
  }
}
