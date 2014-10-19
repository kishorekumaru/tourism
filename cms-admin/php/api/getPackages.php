<?Php


if(function_exists($_GET['method'])){
	$_GET['method']();
}



function editPackImgDesc(){
	$table_name ='package_gallery';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


/** Function for set Featured Details **/
function setFeatured(){
	$table_name ='packagemaster';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->editDataGroup($table_name,'isFeatured', $param->isFeatured, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


function setHotelFeatured(){
	$table_name ='hotelmaster';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->editDataGroup($table_name,'isFeatured', $param->isFeatured, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}
/** Function for Day details **/
function addDayDetails(){
	$table_name ='package_day_details';
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

function getDayDetails(){
	$tablename="package_day_details";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;
}

//Functions for Image Handler
function addImageDetails(){
	$table_name ='package_gallery';
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	foreach($param as $key=>$value){
		$field_names[]= $key;
		$field_value[] = "'" . $value  . "'";
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


function getImageDetails(){
	$tablename="package_gallery";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getData($tablename);
	$data = json_encode($data);
	echo $_GET['jsoncallback'] . $data ;

}


//function to delete the images from the folder
function deleteImagesFrmFolder(){
	$param =json_decode(file_get_contents('php://input'));
	$separator = DIRECTORY_SEPARATOR;
	$separator = "/";
	$uploadPath =  ".." . $separator . ".." . $separator . "com". $separator . "uploads" . $separator;
	$bigImage =	$uploadPath . $param->big_img;
	$smallImage =	$uploadPath . $param->small_img;
	$thumbImage =	$uploadPath . $param->thumb_img;
	 
	try{
		unlink($bigImage);
		unlink($smallImage);
		unlink($thumbImage);
	}catch(Exception $e){
			echo $e->getMessage();
			return;
	}
	echo $_GET['jsoncallback'] . "1";
}


function deleteImageDetails(){
	$table_name ='package_gallery';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}





//Function for Package Master
function addPackages(){
	$table_name ='packagemaster';
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



function editDayDetails(){
	$table_name ='package_day_details';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->editData($table_name,$param, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}


function deleteDetails(){
	$table_name ='package_day_details';
	$param =json_decode(file_get_contents('php://input'));	
	include_once('../core/class.managedatabase.php');
	$init = new managedatabase;
	$data = $init->deleteData($table_name, $param->id);
	echo $_GET['jsoncallback'] . $data ;
}





//Package Handler

function getPackLastId(){
	$tablename="packagemaster";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getLastPackId($tablename);
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


//Hotel Package Count

function getHotelLastId(){
	$tablename="hotelmaster";
	include_once('../core/class.managedatabase.php');
	$param =json_decode(file_get_contents('php://input'));
	$init = new managedatabase;
	$data = $init->getLastPackId($tablename);
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

?>