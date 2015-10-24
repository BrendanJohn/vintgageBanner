<?php

	// var_dump($_POST);



?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<!-- build-version: 1.27.122.262, build-date: Sat, 20 Jun 2015 02:22:23 GMT -->
		<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
		<title>Sandbox</title>
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
		<div class="paypal-wrapper">
			<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="S453R3X86PX78">
				<div class="form-group">
					<input type="hidden" name="on0" value="First Name">
					<label for="fname">First Name</label>
					<input id="fname" type="text" name="os0" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on1" value="Last Name">
					<label for="lname">Last Name</label>
					<input id="lname" type="text" name="os1" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on2" value="Email">
					<label for="email">Email</label>
					<input type="email" name="os2" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on3" value="Banner Text">
					<label for="banner-text">Banner Text</label>
					<input id="banner-text" type="text" name="os3" maxlength="200">
				</div>
				<div class="form-group">		
					<input type="hidden" name="on4" value="Address">
					<label for="address">Address</label>		
					<input id="address" type="text" name="os4" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on5" value="City">
					<label for="city">City</label>		
					<input id="city" type="text" name="os5" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on6" value="State">
					<label for="state">State</label>		
					<input id="state" type="text" name="os6" maxlength="200">
				</div>
				<div class="form-group">
					<input type="hidden" name="on7" value="Zip">
					<label for="zip">Zip</label>
					<input id="zip" type="text" name="os7" maxlength="200">
				</div>
				<div class="paypal-submit">
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
				</div>
			</form
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="js/index.js"></script>
	</body>
</html>