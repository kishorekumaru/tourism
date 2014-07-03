<?Php

include_once('../includes/config.php');

class database{
	protected $db_conn;
	public $db_name = DB_NAME;
	public $db_host = DB_HOST;
	public $db_user = DB_USER;
	public $db_pass = DB_PASS;
	
	function connect(){
		try{
			$this->db_conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
			if ($this->db_conn->connect_errno) {
				echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
			}
			return $this->db_conn;
		}catch (Exception $e){
			return $e->getMessage();
		}
	}
	
}

?>