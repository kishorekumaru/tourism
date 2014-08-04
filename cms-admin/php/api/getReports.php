<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}


/** Function for Contact details **/
function contactDetails(){
	include_once('../core/class.crud.php');
	$param =json_decode(file_get_contents('php://input'));
	$catCRUD = new crud('contact_details');
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

/** Function for News details **/
function newsDetails(){
	include_once('../core/class.crud.php');
	$param =json_decode(file_get_contents('php://input'));
	$catCRUD = new crud('package_news');
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




/** Function for News details **/
function testDetails(){
	include_once('../core/class.crud.php');
	$param =json_decode(file_get_contents('php://input'));
	$catCRUD = new crud('client_testimonial');
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




?>