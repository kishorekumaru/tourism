<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}


function validateUser(){
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;

	$query = "select * from adminusers where admin_username='$param->admin_username' and admin_password='$param->admin_password'";

	$data = $init->validate($query);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}


?>