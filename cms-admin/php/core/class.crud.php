<?Php

class crud{
	
	public $resultantSet;
	public $tableName;
	public $manageDB;
	
	function __construct($tableName){
		include_once('class.managedatabase.php');
		$this->manageDB = new managedatabase();
		$this->tableName = $tableName;
		
		return $this->tableName;
	}
	
	function addItems($param){
	
		try{
			foreach($param as $key=>$value){
					$field_names[]= $key;
					$field_value[] = "'" . addslashes($value) . "'";
			}
			
			
			$field_names = implode(",",$field_names); 
			$field_value = implode(",", $field_value); 
	
	
		
			$insert = $this->manageDB->insertData($this->tableName, $field_names, $field_value);
			
			if($insert == 1){
				$result = "1";
			}else{
				$result = "0";
			}
		}catch (Exception $e){
			return $e->getMessage();
		}
		
		return  $result;
	}
	
	
	function getItems(){
		try{
			$data = $this->manageDB->getData($this->tableName);
			$data = json_encode($data);
		}catch (Exception $e){
			return $e->getMessage();
		}
		return $data ;
	}


	function orderItems($param){
		try{
			$data = $this->manageDB->getOrderData($this->tableName, $param->col, $param->ORDER);
			$data = json_encode($data);
		}catch (Exception $e){
			return $e->getMessage();
		}
		return $data ;
	}
	
	
	function editItems($param){
		try{
			$data = $this->manageDB->editData($this->tableName, $param, $param->id);
			$data = json_encode($data);
		}catch (Exception $e){
			return $e->getMessage();
		}
		return $data ;
	}
	
	
	function deleteItems($param){
		try{
			$data = $this->manageDB->deleteData($this->tableName, $param->id);
			$data = json_encode($data);
		}catch (Exception $e){
			return $e->getMessage();
		}
		return $data ;
	}
	
}
?>