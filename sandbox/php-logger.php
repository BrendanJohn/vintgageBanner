<?php



	/*



		Remote and local debugging of php files.



		Saves content to the file php-log.txt as default.

		Call _SS to enable tcp logging.



		include_once('php-logger.php');

		_SS();

		_L('Hello Steve');		



	*/	



	define('DEBUGGER_LOADED', true);	

	$php_logger = new PHPLogger(3);



	function _L() {



		global $php_logger;



		$args = func_get_args();



 		if( count($args) > 0 ) $php_logger->log( $args );



	}



	function _LP($val) {



		global $php_logger;



		$php_logger->log_p( $val );



	}



	function _LG() {



		global $php_logger;



		$args = func_get_args();



		$php_logger->group( $args[0] );



	}



	function _SS($mode = 2) {



		global $php_logger;



		$php_logger->mode = $mode;



	}				



	class PHPLogger {



		private $path;

		private $content;

		public $mode;



		public function __construct($mode, $path = "") {

				

			$this->content = array();

			$this->mode = $mode;



			if($path == "") {

				$this->path = "C:/Users/Public/Rapidity/Temp/PHPLog.txt";

			}else{

				$this->path = "php-log.txt";

			}				



		}



		public function __destruct() {

		

			$content = implode("\r\n", $this->content);



			try{



				if($this->mode == 1) {

					file_put_contents($this->path, $content);	

				}else if($this->mode == 2) {



					$ip = '73.44.38.227';

					$port = 5210;



					$client = stream_socket_client("tcp://$ip:$port", $errno, $errorMessage);

		

					if($client === false) {



						echo $errorMessage;



					}else{



						$length = strlen($content);

						$post = "TEXT $length|$content";



						fwrite($client, $post);

						stream_get_contents($client);

						fclose($client);

						



					}



				}else if($this->mode == 3) {



					$url = "http://73.44.38.227:8080/_system/Websites/meeting/Builds/Release/debugger.php";

					$url = "http://pixelninjadesign.com/test/log.php";



					$length = strlen($content);



					$data = array('content' => $content, 'from' => gethostname());



					$options = array(

					    'http' => array(

					        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",

					        'method'  => 'POST',

					        'content' => http_build_query($data),

					    ),

					);



					$context  = stream_context_create($options);

					$result = file_get_contents($url, false, $context);



					//var_dump($result);



				}



			}catch(Exception $e) {



  				$err = $e->getMessage();

  				// Do something with err.



			}			

		

		}		



		public function log() {

			

			$args = func_get_args();



			$count = count($args);



			if( $count == 1 ) {				



				$args = $args[0];



			};



			$count = count($args);



			if( $count == 1 ) {				



				$text = $args[0];



			}else if( $count > 1 ) {

				

				//var_dump($args);



				$text = $this->format($args);



			};			



			// var_dump( $text );



			//echo $text;



			array_push($this->content, $text);

		

		}



		public function log_p($var) {



			$var = print_r($var, true);

			$var = str_replace("\n", "\r\n", $var);

			$var = array($var);

			$this->log( $var );



		}



		public function group() {



			$args = func_get_args();



			$title = $args[0] == "" ? "" : " ".$args[0]." ";

			$title = "*$title*********************************************";

			$title = array($title);



			$this->log( $title );



		}



		function format() {



		    $args = func_get_args();

			$args = $args[0];



		    if (count($args) == 0) {

		        return;

		    }

		    if (count($args) == 1) {

		        return $args[0];

		    }

		    $str = array_shift($args);

		    $str = preg_replace_callback('/\\{(0|[1-9]\\d*)\\}/', create_function('$match', '$args = '.var_export($args, true).'; return isset($args[$match[1]]) ? $args[$match[1]] : $match[0];'), $str);

		    return $str;



		}



	}



?>