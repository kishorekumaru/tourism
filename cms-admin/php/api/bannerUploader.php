<?php

define("_IMAGE_BIG_WIDTH","1200");
define("_IMAGE_BIG_HEIGHT","720");
define("_IMAGE_SMALL_WIDTH","350");
define("_IMAGE_SMALL_HEIGHT","250");
define("_IMAGE_THUMB_WIDTH","150");
define("_IMAGE_THUMB_HEIGHT","150");

if ( !empty( $_FILES ) ) {
	


	$photo = $_FILES[ 'file' ][ 'tmp_name' ];
	$real_name = strtolower($_FILES['file']['name']);
	$uploadPath =  ".." . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "com". DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR ;



/**
Process the Image based upon our fixed Width and Height
Process first for Big Size Image
**/
	
function resizeImage($photo, $sent_height, $sent_width, $uploadPath, $info, $real_name){
	
	$image_type = "jpg";
	$real_image_name = explode(".", $real_name);
	
	// image type based on image file name extension:
    if(strstr($real_name,".png")){
        $image_type = "png";
    }else if(strstr($real_name,".jpg")){
        $image_type = "jpg";
    }else if(strstr($real_name,".gif")){
        $image_type = "gif";
    }else{
        die("Unsupported image type");
    }

	
    $x=1;
	while(true){
		$uploaded_image_name = $info. DIRECTORY_SEPARATOR . $real_image_name[0] . "${x}.jpg";
		$image_name = $uploadPath. $uploaded_image_name;
		if(!is_file($image_name))break;
		$x++;
	}
	$uploaded_image_name = $info. DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR. $real_image_name[0] . "${x}.jpg";
	
	$size = getimagesize($photo);
	$width = $size[0];
	$height = $size[1];
	
	
	
	
	// destination resized image:
	$dst = imagecreatetruecolor($width, $height);
	imagecopyresampled($dst, $src, 0, 0, 0, 0, $width, $height, $width, $height);
	
	// write the final jpeg image..
	imagejpeg($dst, $image_name,100) or die("Error: your photo has not been saved. Please contact the administrator");

	// time to clean up
	imagedestroy($src);
	imagedestroy($dst);
	
	return $uploaded_image_name;
}
	
	$big_image = resizeImage($photo,_IMAGE_BIG_HEIGHT,_IMAGE_BIG_WIDTH, $uploadPath, 'big',$real_name);
	$small_image = resizeImage($photo,_IMAGE_SMALL_HEIGHT,_IMAGE_SMALL_WIDTH, $uploadPath, 'small',$real_name);
	$thumb_image = resizeImage($photo,_IMAGE_THUMB_HEIGHT,_IMAGE_THUMB_WIDTH, $uploadPath, 'thumb',$real_name);
	
	$answer = array('big_img' => $big_image, 'small_img' => $small_image, 'thumb_img' => $thumb_image);
	$json = json_encode( $answer );	
	echo $json;
 
} else {

    echo 'No files';

}

?>