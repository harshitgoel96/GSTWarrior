$(document).ready( function () {
    $.extend( $.fn.dataTable.Editor.display.envelope.conf, {
   // windowScroll: false,
    attach:"row"
} );
 
    var editor = new $.fn.dataTable.Editor( {
        table: '#invoiceTable',
 // display: "envelope",
        idSrc:  'id',
    fields: [
        { label: 'First name', name: 'first_name' },
        { label: 'Last name',  name: 'last_name'  },
        // etc
    ]
    } );
  var table =  $('#invoiceTable').DataTable({   
    dom: 'Bfrtip',
    //data:[{id:"1",first_name:"harshit",last_name:"goel"}],
    columns: [
        {  label: 'First name',data: 'first_name' },
        {  label: 'Last name',data: 'last_name' },
        // etc
    ],
    select: true,
    buttons: [
        { extend: 'create', editor: editor },
        { extend: 'edit',   editor: editor },
        { extend: 'remove', editor: editor }
    ]});
      $('#invoiceTable').on( 'click', 'tbody td:not(.dataTables_empty) ', function (e) {
        editor.inline( this );
    } );
    $('#invoiceTable').on( 'click', 'tbody td.dataTables_empty', function (e) {
        console.log('got into the tr');
     // $(this).parent().remove();
      //setTimeout(function(){  ,100});
      //$(".buttons-create").click();
      editor.create( true )
      
    .submit();
     $('#invoiceTable tr td.sorting_1').click();
    } );
} );