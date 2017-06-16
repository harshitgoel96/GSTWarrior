<?php 
$link=mysqli_connect('localhost','root',null,'doclib');
if(!$link)
{
	die("failed to connect".mysqli_connect_error());
}

function buildTree(array &$elements, $parentId = 0) {

    $branch = array();

    foreach ($elements as &$element) {

        if ($element['parent_id'] == $parentId) {
            $children = buildTree($elements, $element['id']);
            if ($children) {
                $element['children'] = $children;
            }
            $branch[$element['id']] = $element;
            unset($element);
        }
    }
    return $branch;
}

//$result=mysqli_query($link,"select * from directory_nodes  nodes join directory_parents_children on nodes.path=child_path where parent_path='/'");
/*
SELECT d.*, p.parent_id AS '_parent'
FROM node_keeper AS a
JOIN closure AS c ON (c.parent_id = a.id)
JOIN node_keeper  AS d ON (c.child_id = d.id)
LEFT OUTER JOIN closure AS p ON (p.child_id = d.id AND p.depth = 1)
WHERE a.id = 1 
ORDER BY c.depth;
*/
$result=mysqli_query($link," SELECT d.id as id,d.parent_id as parent, d.display_name as text , p.parent_id AS '_parent' FROM node_keeper AS a JOIN closure AS c ON (c.parent_id = a.id) JOIN node_keeper  AS d ON (c.child_id = d.id) LEFT OUTER JOIN closure AS p ON (p.child_id = d.id AND p.depth = 1) WHERE a.id = 1  and d.docType='Folder'  ORDER BY c.depth;");

//"SELECT d.id as id,d.parent_id as parent, d.display_name as text , p.parent_id AS '_parent' FROM node_keeper AS a JOIN closure AS c ON (c.parent_id = a.id) JOIN node_keeper  AS d ON (c.child_id = d.id) LEFT OUTER JOIN closure AS p ON (p.child_id = d.id AND p.depth = 1) WHERE a.id = 1  AND c.depth <= 4  ORDER BY c.depth;");
/*
SELECT d.*, p.parent_id AS '_parent' FROM node_keeper AS a JOIN closure AS c ON (c.parent_id = a.id) JOIN node_keeper  AS d ON (c.child_id = d.id) LEFT OUTER JOIN closure AS p ON (p.child_id = d.id AND p.depth = 1) WHERE a.id = 1  AND c.depth <= 4  ORDER BY d.id;

*/

if(!$result)
{
	die("failed to connect".mysqli_connect_error());
}
$data=null;
while($row=mysqli_fetch_assoc($result)){
	// $row = new RowObject($rowData);
	if($row['parent']==0)
	{
		$row['parent']='#';
	}
$data[]=$row;
}


echo json_encode($data);
?>