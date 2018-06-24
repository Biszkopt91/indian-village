import XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { columnsConfig } from '../config';

export function xlsxToJson(oEvent, onParseEnd) {
    const oFile = oEvent.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result;
        const wb = XLSX.read(data, {type: 'binary'});
        let output = wb.SheetNames.map(function(sheetName) {
            return XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);   
        });

        onParseEnd(output);
    };

    reader.readAsBinaryString(oFile);
}

export function jsonToXlsx(jsonArray, tribeName) {
    var wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonArray, {header: Object.values(columnsConfig)})
    XLSX.utils.book_append_sheet(wb, ws, 'tribe')
    var wopts = { bookType:'xlsx', bookSST:false, type:'array' };
    var wbout = XLSX.write(wb, wopts);
    FileSaver.saveAs(new Blob([wbout],{type:"application/octet-stream"}), `${tribeName}.xlsx`);
}