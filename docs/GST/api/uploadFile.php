<?php
$file_Name=$_POST['file_Name'];
$parent_Id=$_POST['parent_Id'];
$file_blob=$_POST['file_blob'];
$file_size=$_POST['file_size'];
$returnObj=null;
$extentionType = array (
	'docx'=>'word',
	'doc'=>'word',
	'docm'=>'word',
	'dot'=>'word',
	
	'xls'=>'excel',
	'xlsx'=>'excel',
	'xlsm'=>'excel',
	'csv'=>'excel',
	
	'pdf'=>'pdf',
	
	'tif'=>'image',
	'gif'=>'image',
	'jpeg'=>'image',
	'jpg'=>'image',
	'jif'=>'image',
	'jfif'=>'image',
	'png'=>'image',
	'bpm'=>'image',
	
);

if(!$file_Name || !$parent_Id || !$file_blob)
{
	$returnObj['result']='Exception';
	$returnObj['message']='Required Param Not sent';
	die( json_encode($returnObj));
}

$extension=substr(strrchr( $file_Name, '.' ),1);
$fileType='File';
if(array_key_exists($extension,$extentionType)){
	$fileType=$extentionType[$extension];
}

$link=mysqli_connect('localhost','root',null,'doclib');
if(!$link)
{
	die("failed to connect".mysqli_connect_error(!$link));
}

$returnObj['fileSize']=strlen ($file_blob);
//$returnObj['before']=$file_blob;
$file_blob=mysqli_real_escape_string($link,$file_blob);
//$returnObj['after']=$file_blob;

$call = mysqli_prepare($link, 'CALL insert_file(?, ?,?,?)');
mysqli_stmt_bind_param($call,'siss', $file_Name, $parent_Id,$file_blob,$fileType);
mysqli_stmt_execute($call);



$returnObj['result']='Success';
$returnObj['message']='Inserted';
echo json_encode($returnObj);

?>