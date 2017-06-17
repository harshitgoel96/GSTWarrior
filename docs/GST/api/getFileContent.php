<?php
$link=mysqli_connect('localhost','root',null,'doclib');
if(!$link)
{
	die("failed to connect".mysqli_connect_error());
}

$result=mysqli_query($link,"select n.file_blob,k.display_name,k.docType  from file_keeper n inner join  node_keeper k on n.id=k.id where n.id=".$_REQUEST['docId']);

if(!$result)
{
	die("failed to get data".mysqli_error(!$link));
}
$value = mysqli_fetch_object($result);

$obj['fileData']=$value->file_blob;
$obj['fileName']=$value->display_name;
echo json_encode($obj);
?>