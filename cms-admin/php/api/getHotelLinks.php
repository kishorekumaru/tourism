<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}

function editHotelImgDesc(){
	$table_name ='hotel_gallery';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}

function getHotelLink(){
	$tablename="link_hotels";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = $value ;
	}
	$data = $init->getCustomId($tablename, $field_names[0], $field_value[0]);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}




function addHotelLink(){
	$table_name ='link_hotels';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = "'" . addslashes($value) . "'";
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


function deleteHotelLinks(){
	$table_name ='link_hotels';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}



function editHotelLinks(){
	$table_name ='link_hotels';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


function deleteHotelLinksMaster(){
	$table_name ='link_hotels';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deletePackageData($table_name, $param->package_id);
	echo $_GET['jsoncallback'] . $data ;
}



//Functions for Image Handler
function addHotelImageDetails(){
	$table_name ='hotel_gallery';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = "'" . addslashes($value) . "'";
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


function getHotelImageDetails(){
	$tablename="hotel_gallery";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function getBannerDetails(){
	$tablename="banner_images";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

function deleteHotelImageDetails(){
	$table_name ='hotel_gallery';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}

?>