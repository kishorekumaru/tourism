<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}


function getAllHotels(){
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$tablename="hotelmaster";
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}
?>