<?php

// Dareboost wants it? Not a problem.
header('X-Content-Type-Options: "nosniff"');

// Get the raw POST data
$data = file_get_contents('php://input');

// Only continue if it’s valid JSON that is not just `null`, `0`, `false` or an
// empty string, i.e. if it could be a CSP violation report.
if ($data = json_decode($data, true)) {

	// Prettify the JSON-formatted data
//	$data = json_encode(
//		$data,
//		JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
//	);

	// Simply mail the CSP violation report
//	if(mail("hello@twikito.com","CSP violation", $data, 'Content-Type: text/plain;charset=utf-8')){
//		echo('ok');
//	}else{
//		echo('oups');
//	}


	$filename = '../csp-report.json';
	// read the file if present
	$handle = @fopen($filename, 'r+');

	// create the file if needed
	if ($handle === null){
		$handle = fopen($filename, 'w+');
	}

	if ($handle){
		// seek to the end
		fseek($handle, 0, SEEK_END);

		// are we at the end of is the file empty
		if (ftell($handle) > 0){
			// move back a byte
			fseek($handle, -1, SEEK_END);

			// add the trailing comma
			fwrite($handle, ',', 1);

			// add the new json string
			fwrite($handle, json_encode($data) . ']');
		}else{
			// write the first event inside an array
			fwrite($handle, json_encode(array($data)));
		}

		// close the handle on the file
		fclose($handle);
	}

}
?>
