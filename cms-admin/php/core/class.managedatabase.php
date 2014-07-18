<?Php

 class managedatabase{
	 public $link;
	 function __construct(){
		 include_once("class.database.php");
		 $conn = new database;
		 $this->link = $conn->connect();
		 return $this->link;
	 }
	 
	 
	 function getOrderData($table_name, $order_col, $order_type){
		$result = array();
		$sqlQuery="";
		$sqlQuery = "SELECT * FROM $table_name ORDER BY $order_col $order_type";
		$query = $this->link->query($sqlQuery);
		
		$rowCountVar = $query->num_rows;
		if($rowCountVar > 0){
			while ($row = $query->fetch_assoc()) {
				array_push($result, $row);
			}
		}else{
				array_push($result, 0);
		}

	 	return $result;

	 }
	 
	 function getLastPackId($table_name){	
		$sqlQuery = "SELECT IF(MAX(id)is NULL, 0, MAX(id)) as id FROM $table_name WHERE 1=1";
		$query = $this->link->query($sqlQuery);
		$rowCountVar = $query->fetch_assoc();
		return intval($rowCountVar['id']);
	 }
	 
	 
	 function getCustomId($table_name, $colName, $colValue){	
	 	$result = array();
		$sqlQuery = "SELECT * FROM $table_name WHERE $colName=$colValue";
		$query = $this->link->query($sqlQuery);
		$rowCountVar = $query->num_rows;
		if($rowCountVar > 0){
			while ($row = $query->fetch_assoc()) {
				array_push($result, $row);
			}
		}else{
				array_push($result, 0);
		}
		
	 	return $result;
	 }
	 
	 
	 
	 
	 function getData($table_name, $id=null, $sql=null){
		$result = array();
		$sqlQuery="";
		
		if(isset($sql)){
			$sqlQuery = $sql;
		}else{
			$sqlQuery = "SELECT * FROM $table_name where 1=1";
		}
		
		
		
	 	if(isset($id)){
			$queryStr = $sqlQuery .  " and id=$id ORDER BY id ASC";
		}else{
			$queryStr = $sqlQuery . " ORDER BY id ASC";
		}
		
		$query = $this->link->query($queryStr);
		
		$rowCountVar = $query->num_rows;
		if($rowCountVar > 0){
			while ($row = $query->fetch_assoc()) {
				array_push($result, $row);
			}
		}else{
				array_push($result, 0);
		}
		
	 	return $result;
	 }
	 
	 
	 
	 
	 
	 
	 function validate($sqlQuery){
		$query = $this->link->query($sqlQuery);
		$rowCountVar = $query->num_rows;
		if($rowCountVar > 0){
			while ($row = $query->fetch_assoc()) {
				return intval($row['id']);
			}
			
		}
		 return $rowCountVar;	 
	 }
	 
	 function listFields($table_name){
		$result = array();
		$query = $this->link->query("DESCRIBE $table_name");
		while ($row = $query->fetch_assoc()) {
				array_push($result, $row);
		 }
		 return $result;	 
	 }
	 
	 function editData($table_name, $param, $id){
	 	foreach($param as $key=>$value){
			$query = $this->link->query("UPDATE $table_name SET $key = '$value' WHERE id=$id"); 
		}
		return "1";
	 }
	 
	 function deleteData($table_name, $id){
		$sqlQuery ="DELETE FROM $table_name where id=$id";
	 	$query = $this->link->query($sqlQuery) or die($this->link->errno);
		return "1";
	 }
	 
	
	 
	 
	 
	 function insertData($table_name, $field_name, $field_value){
		$sqlQuery = "INSERT INTO $table_name ($field_name) VALUES ($field_value)";
	 	$query = $this->link->query($sqlQuery) or die($this->link->errno);	
		return $query;
	 }
	 
 }
 ?>