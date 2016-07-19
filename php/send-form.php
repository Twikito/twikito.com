<?php

$name     = trim(stripslashes($_POST['i1']));
$email    = trim(stripslashes($_POST['i2']));
$botkick  = trim(stripslashes($_POST['i3']));
$message  = nl2br(htmlentities(stripslashes(trim($_POST['t'])),ENT_QUOTES));
$remip    = $_SERVER['REMOTE_ADDR'];

if(!preg_match("/^[a-zA-ZàáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ\s]+$/i",$name)){
	echo 'error_name';
}else{
	if(!preg_match("/^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,10}$/i",$email)){
		echo 'error_email';
	}else{
		if($botkick != ""){
			echo 'error_bot';
		}else{
			if($message == ""){
				echo 'error_msg';
			}else{

				$body     = "<div style='max-width:600px'>\r\n";
				$body    .= "Message de ".$name." &lt;".$email."&gt; [".$remip."]<br/><br/>\r\n";
				$body    .= "<div style='background:#f0f0f0;border:1px solid #e0e0e0;padding:10px;color:#000;'>".$message."</div>\r\n";
				$body    .= "</div>\r\n";

				// en-tête du mail
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'From:'.$name.' '.'<'.$email.'>' . "\r\n";
				$headers .= 'Cc:'.$name.' '.'<'.$email.'>' . "\r\n";

				// envoi du mail
				if(mail("hello@twikito.com","[twikito.com] ".$name,$body,$headers)){
					echo 'ok';
				}else{
					echo 'error_send';
				}
			}
		}
	}
}

?>
