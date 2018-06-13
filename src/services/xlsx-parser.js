import XLSX from 'xlsx';

export function xlsxToJson(oEvent, onParseEnd) {
    const oFile = oEvent.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = e.target.result;
        const wb = XLSX.read(data, {type: 'binary'});
        let output = wb.SheetNames.map(function(sheetName) {
            return XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   
        });

        onParseEnd(output);
    };

    reader.readAsBinaryString(oFile);
}