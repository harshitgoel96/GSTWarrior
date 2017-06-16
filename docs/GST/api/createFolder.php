<?php
$folderName=$_REQUEST['FolderName'];
$parentId=$_REQUEST['ParentId'];
$returnObj=null;
if(!$folderName || !$parentId)
{
	$returnObj['result']='Exception';
	$returnObj['message']='Required Param Not sent';
	die( json_encode($returnObj));
}

$link=mysqli_connect('localhost','root',null,'doclib');
if(!$link)
{
	die("failed to connect".mysqli_connect_error(!$link));
}

$call = mysqli_prepare($link, 'CALL insert_folder(?, ?)');
mysqli_stmt_bind_param($call,'si', $folderName, $parentId);
mysqli_stmt_execute($call);

$returnObj['result']='Success';
$returnObj['message']='Folder Added';
echo json_encode($returnObj);

?>