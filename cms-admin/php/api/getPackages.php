<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}


function addPackages(){
	$table_name ='packagemaster';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = "'" . $value . "'";
	}
	$init = new managedatabase;
	
	$field_names = implode(",",$field_names); 
	$field_value = implode(",",$field_value); 


	$insert = $init->insertData($table_name, $field_names, $field_value);
	
	if($insert == 1){
		$result = "1";
	}else{
		$result = "0";
	}
	
	echo $_GET['jsoncallback'] .  $insert ;
}

function getPackageCount(){
	$tablename="packagemaster";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getCount($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function deletePackage(){
	$table_name ='packagemaster';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}

function getAllPackages(){
	$tablename="packagemaster";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}



function editPackages(){
	$table_name ='packagemaster';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


function getPackByOrder(){
	$tablename="packagemaster";
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->getOrderData($tablename, $param->col, $param->ORDER);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function getAllHotels(){
	$tablename="hotelmaster";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function getByOrder(){
	$tablename="hotelmaster";
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->getOrderData($tablename, $param->col, $param->ORDER);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function deleteHotels(){
	$table_name ='hotelmaster';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}



function editHotels(){
	$table_name ='hotelmaster';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


function addHotels(){
	$table_name ='hotelmaster';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = "'" . $value . "'";
	}
	$init = new managedatabase;
	
	$field_names = implode(",",$field_names); 
	$field_value = implode(",",$field_value); 


	$insert = $init->insertData($table_name, $field_names, $field_value);
	
	if($insert == 1){
		$result = "1";
	}else{
		$result = "0";
	}
	
	echo $_GET['jsoncallback'] .  $insert ;
}

?>