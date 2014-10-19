<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}


/** Function for Day details **/
function catDetails(){
	include_once('../core/class.crud.php');
	$param =json_decode(file_get_contents('php://input'));
	$catCRUD = new crud('category');
    $actionItem = $param->action;
	unset($param->action);
	
	switch($actionItem ){
		case "Insert": {
			$returnArr = $catCRUD->addItems($param);
			break;
		}
		case "Get":{
			$returnArr = $catCRUD->getItems();
			break;
		}
		case "Order":{
			$returnArr = $catCRUD->orderItems($param);
			break;
		}
		case "Edit" :{
			$returnArr = $catCRUD->editItems($param);
			break;
		}
		case "Delete" :{
			$returnArr = $catCRUD->deleteItems($param);
			break;
		}
	}
	echo $_GET['jsoncallback'] .  $returnArr ;
}



/** Function for Link Hotel details **/
function linkHotelDetails(){
	include_once('../core/class.crud.php');
	$param =json_decode(file_get_contents('php://input'));
	$linkCRUD = new crud('link_hotel_master');
    $actionItem = $param->action;
	unset($param->action);
	
	switch($actionItem ){
		case "Insert": {
			$returnArr = $linkCRUD ->addItems($param);
			break;
		}
		case "Get":{
			$returnArr = $linkCRUD ->getItems();
			break;
		}
		case "Order":{
			$returnArr = $linkCRUD ->orderItems($param);
			break;
		}
		case "Edit" :{
			$returnArr = $linkCRUD ->editItems($param);
			break;
		}
		case "Delete" :{
			$returnArr = $linkCRUD ->deleteItems($param);
			break;
		}
	}
	echo $_GET['jsoncallback'] .   $returnArr;
}



?>