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
		$this->link->close();
	 	return $result;
	 }
	 
	 function getLastPackId($table_name){	
		$sqlQuery = "SELECT IF(MAX(id)is NULL, 0, MAX(id)) as id FROM $table_name WHERE 1=1";
		$query = $this->link->query($sqlQuery);
		$rowCountVar = $query->fetch_assoc();
		$this->link->close();
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

		$this->link->close();
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
		$this->link->close();
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
		 $this->link->close();
		 return $rowCountVar;	 
	 }
	 
	 function listFields($table_name){
		$result = array();
		$query = $this->link->query("DESCRIBE $table_name");
		while ($row = $query->fetch_assoc()) {
				array_push($result, $row);
		 }
		$this->link->close();
		return $result;	 
	 }
	 
	 function editData($table_name, $param, $id){
	 	foreach($param as $key=>$value){
			$value = $this->link->real_escape_string($value);
			$query = $this->link->query("UPDATE $table_name SET $key = '$value' WHERE id=$id"); 
		}
		$this->link->close();
		return "1";
	 }
	 
	 function editDataGroup($table_name, $key, $value, $id){
		$value = $this->link->real_escape_string($value);	
		$query = $this->link->query("UPDATE $table_name SET $key = '$value', MODIFIED_DATE=NOW() WHERE id in ($id)"); 
		$this->link->close();
		return "1";
	 }
	 
	 function deleteData($table_name, $id){
		$sqlQuery ="DELETE FROM $table_name where id=$id";
	 	$query = $this->link->query($sqlQuery) or die($this->link->errno);
		$this->link->close();
		return "1";
	 }
	 
	
	 
	 
	 
	 function insertData($table_name, $field_name, $field_value){
		$sqlQuery = "INSERT INTO $table_name ($field_name) VALUES ($field_value)";
	 	$query = $this->link->query($sqlQuery) or die($this->link->errno);	
		$this->link->close();
		return $query;
	 }
	 
 }
 ?>