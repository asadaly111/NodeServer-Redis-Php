<?php
require __DIR__.'/predis/autoload.php';

Predis\Autoloader::register();

try {
    $redis = new Predis\Client();
	$redis->publish('order_notification', json_encode(['msg' => 'the message is been sent to channel 1']));
}catch (Exception $e) {

	die($e->getMessage());
	
}



