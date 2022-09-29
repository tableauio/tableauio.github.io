import * as XLSX from "xlsx/xlsx.mjs";

var spreadsheets = document.querySelectorAll("div.spreadsheet");
for (let i = 0; i < spreadsheets.length; i++) {
  console.log("Clicked index: " + i);
  let spreadsheet = spreadsheets[i];
  spreadsheet
    .querySelector("#download-btn")
    .addEventListener("click", function () {
      let tables = spreadsheet.querySelectorAll("table");
      let sheets = spreadsheet.querySelectorAll("button.nav-link");
      console.log(tables.length);
      if (tables.length != 0) {
        let wb = XLSX.utils.book_new();
        for (var i = 0; i < tables.length; ++i) {
          let ws = XLSX.utils.table_to_sheet(tables[i]);
          XLSX.utils.book_append_sheet(wb, ws, sheets[i].textContent);
        }
        let bookName = spreadsheet.querySelector("#download-btn span").textContent;
        XLSX.writeFile(wb, bookName);
      }
    });
}
