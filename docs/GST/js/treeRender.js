$(document).ready(function(){
	$(document).on('dblclick','li.docItem',function(){
		getContentForDoc($(this).data('doc-id'));
	});
	$(".glyphicon-home").click(function(){
		getContentForDoc(1);
	});
	$.jstree.defaults.core.themes.variant = "large";
	window.tree_Ready=false;
	window.shouldExpandTree=false;
	window.expandTreeId=1;
	function loadFolderTree(folderId){
	$.get("http://localhost:8080/GST/api/main.php",function(data){
		
		console.log(data);
		console.log($('#treePlace'));
		$('#treePlace').jstree("destroy");
		$('#treePlace').jstree({ 'core' : {
			
			'data' : JSON.parse(data)
		} });
		window.shouldExpandTree=true;
		window.expandTreeId=folderId;
		//$('#treePlace').jstree().refresh();
	});
	}
	$('#treePlace').on('select_node.jstree',function(event,data){
		console.log('node select event');
		getContentForDoc(data.node.id);
	});
	
	$('#treePlace').on('ready.jstree',function(event,data){
		console.log('node ready event');
		window.tree_Ready=true;
		if(window.shouldExpandTree)
		{
			getContentForDoc(window.expandTreeId);
		
			expandNode(window.expandTreeId);
		}
	});
	
	function addFolder(name){
		
		var parentId=$('.add-button-grp').data('current-folder-id');
		//alert(name+" :: at parent  :: "+parentId);
		$.get("http://localhost:8080/GST/api/createFolder.php?ParentId="+parentId+"&FolderName="+name,function(data){
			var obj=JSON.parse(data);
			if(obj.result=='Success')
			{
				getContentForDoc(parentId);
			}
			else{
				showMessage(obj.message);
			}
			$('.modal').modal('hide');
			loadFolderTree();
		});
	}
	
	function showMessage(message){
		alert(message);
	}
	
	function getContentForDoc(docId){
		
		$.get("http://localhost:8080/GST/api/getContent.php?docId="+docId,function(data){
			$('#directoryContent').html("");
			var dataObj= JSON.parse(data);
			var content=dataObj.folderContent;
			$.each(content,function(i){
				$('#directoryContent').append("<li class='docItem' data-doc-id='"+content[i].id+"'><i class='jstree-icon jstree-themeicon' role='presentation'></i>"
				+"<span style='line-height: 32px;height: 32px'>"
				+content[i].display_name+"</span></li>")				
			});
			if(dataObj.parent>0){
			$('#directoryContent').prepend("<li class='docItem' data-doc-id='"+dataObj.parent+"'><i class='jstree-icon jstree-themeicon' role='presentation'></i>"
				+"<span style='line-height: 32px;height: 32px'>..</span></li>");
				
				
			}
			$('.add-button-grp').data('parent-id',dataObj.parent);
			$('.add-button-grp').data('current-folder-id',docId);
			$('#pathPlace').text(dataObj.path);
			//var selector="#\\"+docId.toString().charCodeAt(0).toString(16);
			//console.log("tried opening "+selector);
			//$("#treePlace").jstree("open_node", $(selector));
		//	expandNode(docId);
			
		});
	}
	
	$('#folderNameInput').keyup(function(){
		//console.log('keyup');
        if($(this).val().length !=0 && !$(this).is(':invalid'))
            $('.submit-folder-request').attr('disabled', false);            
        else
            $('.submit-folder-request').attr('disabled',true);
    });
	$('.submit-folder-request').click(function(){
		addFolder($('#folderNameInput').val());
	});
	function expandNode(nodeID) {
    // Expand all nodes up to the root (the id of the root returns as '#')
	

	}
	loadFolderTree(1);
});