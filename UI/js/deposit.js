$(document).ready( function () {
    console.log("fired");
    var container = document.getElementById('depositTable');
    var data =[["","","","","",""]];
    var settings={ rowHeaders: true,
        data:data,
          minSpareCols: 0,
  minSpareRows: 1,
    colHeaders: [
        
        'Recieved from',
        'Cheque number',
        'Cheque date',
        'bank name',
        'bank branch',
        'amount'
        
    ],
    colWidths: [400,150,150,150,120,150],
  columns: [
    {type: 'text'},
    {type: 'numeric'},
    {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
    {type: 'text'},
    {type: 'text'},
    {type: 'numeric', format: '0.00'}
    
  ]
  
};
var sumArr=[];
var updateTotal=function(){
    var sum=parseFloat(0);
    for(var i=0;i<sumArr.length;i++)
    {
        sum+=parseFloat(sumArr[i]);
    }
    $('#totalField').text(sum.toFixed(2));
}

    var hot = new Handsontable(container,settings);
    hot.addHook('afterValidate',function(isValid,value,row,prop,source
    ){
        if(prop ===5&&isValid){
            sumArr[row]=value;
            updateTotal();
        }
    });
});