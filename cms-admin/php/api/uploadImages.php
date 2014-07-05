<?Php

if(function_exists($_GET['method'])){
	$_GET['method']();
}

function uploadHotel(){
	//$tablename="hotel_gallery";
	//include_once('../core/class.managedatabase.php');
	 $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = '../../com/uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;


}



?>