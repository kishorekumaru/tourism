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
	$max_width = $sent_width; 
	$max_height = $sent_height;
	$size = getimagesize($photo);
	$width = $size[0];
	$height = $size[1];
	$x_ratio = $max_width / $width;
	$y_ratio = $max_height / $height;
	
	//Calculate the ratio of the upload image size
	if(($width <= $max_width)&&($height <= $max_height)){
		$tn_width = $width;
		$tn_height = $height;
	}else{
		if(($x_ratio * $height) < $max_height){
			$tn_height = ceil($x_ratio * $height);
			$tn_width = $max_width;
		}else{
			$tn_width = ceil($y_ratio * $width);
			$tn_height = $max_height;
		}
	}
	switch($image_type){
		case "png": $src=imagecreatefrompng($photo); break;
		case "jpg": $src=imagecreatefromjpeg($photo); break;
		case "gif": $src=imagecreatefromgif($photo); break;
	}

	// destination resized image:
	$dst = imagecreatetruecolor($tn_width, $tn_height);
	imagecopyresampled($dst, $src, 0, 0, 0, 0, $tn_width, $tn_height, $width, $height);
	
	// write the final jpeg image..
	imagejpeg($dst, $image_name,100) or die("Error: your photo has not been saved. Please contact the administrator2");

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