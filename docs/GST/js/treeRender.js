$(document).ready(function(){
	window.fileUploadLimit=5242880;
	window.fileData={};
	/*$('#filePreviewModal').on('show.bs.modal', function () {
		//console.log()
    $('.modal .modal-body').css('overflow-y', 'auto'); 
    $('.modal .modal-body').css('height', $(window).height() * 0.7);
	$('.modal .modal-body').css('width', $(window).width() * 0.7);
});*/
	function getFileClass(fileType){
		switch(fileType)
		{
			case 'word': return 'fa-file-word-o';
			case 'excel': return 'fa-file-excel-o';
			case 'pdf': return 'fa-file-pdf-o';
			case 'image': return 'fa-file-image-o';
			default : return ' fa-file';
		}
	}
	function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}
	
	$('#FileInput').on('change',function(){
		var file    = document.querySelector('input[type=file]').files[0];
		var reader  = new FileReader();

		reader.addEventListener("loadend", function () {
			
			var needDisable=false;
			console.log("file loaded  +++  "+humanFileSize(file.size,false));
			
			 
			
			if(file.size>window.fileUploadLimit){
				//$('.submit-file-upload').button('reset');			
				
				//$('.submit-file-upload').attr('disabled',true);
				needDisable=true;
				showMessage('can not upload file larger than '+humanFileSize(window.fileUploadLimit,false));
				 
			}
			else{
				window.fileData.fileName=file.name;
				window.fileData.fileSize=file.size;
				window.fileData.blob= reader.result;
				needDisable=false;
			}
			$('.submit-file-upload').button('reset').delay(1).queue(function(){
				$('.submit-file-upload').attr('disabled',needDisable);
			});
			//preview.src = reader.result;
		}, false);

		reader.addEventListener("loadstart", function () {
			console.log("file load started ");
			 $('.submit-file-upload').button('loading');
			//preview.src = reader.result;
		}, false);
		
		if (file) {
			reader.readAsDataURL(file);
		}
		else{
			 $('.submit-file-upload').attr('disabled',true);
		}
	});
	
	$(document).on('dblclick','li.docItem',function(){
		getContentForDoc($(this).data('doc-id'));
	});
	
	$(document).on('click','li.fileItem',function(){
			
			//$('#previewFrame').prop('src','');
		var filetype=$(this).data('file_type');
		if(filetype==='image'){
			$('#filePreviewModal').modal('show');
			$('#previewFrame').hide();
			$('#fileLoader').show();
		}
		else{
			$('#FileDownloadNoPreview').modal('show');
			//$('#previewFrame').hide();
			$('#fileLoaderNoPreview').show();
		}
		$.get('http://localhost:8080/GST/api/getFileContent.php?docId='+$(this).data('doc-id'),function(obj){
			var data=JSON.parse(obj);
			if(filetype==='image'){
				$('#previewFrame').prop('src',data.fileData);
				$('#previewFrame').prop('download',data.fileName);
				$('#previewFrame').show();
				$('#downloadButton').prop('href',data.fileData);
				$('#downloadButton').prop('download',data.fileName);
				$('.fileNameHolder').text(data.fileName);
				$('#fileLoader').hide();
			}
			else{
				$('#downloadButtonNoPreview').prop('href',data.fileData);
				$('#downloadButtonNoPreview').prop('download',data.fileName);
				$('.fileNameHolder').text(data.fileName);
				$('#fileLoaderNoPreview').hide();
			}
			
			//$('#previewFrame').hide();
			
		});
		
	});
	
	$(".glyphicon-home").click(function(){
		getContentForDoc(1);
	});
	//$.jstree.defaults.core.themes.variant = "large";
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
	
	function uploadFile(){
		if(window.fileData)
		{
			var parentId=$('.add-button-grp').data('current-folder-id');
			//console.log('\n blob ::::  '+ window.fileData.blob.length);
			//after file request has been sent.
			$.post( "http://localhost:8080/GST/api/uploadFile.php", { parent_Id: parentId, file_Name: window.fileData.fileName,file_blob:window.fileData.blob,file_size:window.fileData.fileSize } ).done(function(data){
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
	}
	
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
				
				if(content[i].file_type=='Folder'){
					$('#directoryContent').append("<li class='docItem' data-doc-id='"+content[i].id+"'><i class='jstree-icon jstree-themeicon' role='presentation'></i>"
					+"<span style='line-height: 32px;height: 32px'>"
					+content[i].display_name+"</span></li>");				
					
				}
				else{
					$('#directoryContent').append("<li class='fileItem' data-file_type='"+content[i].file_type+"'  data-doc-id='"+content[i].id+"'><i class='fa "+getFileClass(content[i].file_type)+"' role='presentation'></i>"
					+"&nbsp;<span style='line-height: 32px;height: 32px'>"
					+content[i].display_name+"</span></li>");
				}
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
	$('.submit-file-upload').on('click',function(){
		uploadFile();
	});

	

	loadFolderTree(1);
});