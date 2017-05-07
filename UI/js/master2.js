$(document).ready( function () {
    console.log("fired");
    var container = document.getElementById('invoiceTable');
    var data =[["","","","",""]];
    var settings={ rowHeaders: true,
        data:data,
          minSpareCols: 0,
  minSpareRows: 1,
    colHeaders: [
        
        'Item',
        'Value',
        'Quantity',
        'Amount',
        'Units'
        
    ]
};
    var hot = new Handsontable(container,settings);
});