<?php 
$link=mysqli_connect('localhost','root',null,'doclib');
if(!$link)
{
	die("failed to connect".mysqli_connect_error(!$link));
}

//echo "select n.id,n.display_name node_keeper n where n.parent_id=".$_REQUEST['docId'];


$result=mysqli_query($link,"select n.id,n.display_name from node_keeper n where n.parent_id=".$_REQUEST['docId']);

if(!$result)
{
	die("failed to get data".mysqli_connect_error(!$link));
}
$data=null;
while($row=mysqli_fetch_assoc($result)){
	
$data[]=$row;
}

$result=mysqli_query($link,"select n.parent_id, n.path  from node_keeper n where n.id=".$_REQUEST['docId']);

if(!$result)
{
	die("failed to get data".mysqli_connect_error(!$link));
}
$value = mysqli_fetch_object($result);

//print_r();

$obj['folderContent']=$data;
$obj['parent']=$value->parent_id;
$obj['path']=$value->path;

echo json_encode($obj);


?>