<?php

$json = file_get_contents('php://input');
$json = json_decode($json);

$to = "pavel@pln-b.ru";
$subject = "Отправка формы без заказа с сайта tile.site";
$headers = "From: tile.site@tile.site \n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\n";

$name = $json->infos->name;
$phone = $json->infos->phone;
$message = "<b>Имя: " . $name . "</b><br />" . "<b>Телефон: " . $phone . "</b><hr />";
if (isset($json->infos->comment)) {
	$comment = $json->infos->comment;
	$message .= "<b>Комментарий: </b>" . $comment ."<hr />";
}
if (isset($json->wares[0])) {
	$subject = "Заказ товаров с сайта tile.site";
	$sum = 0;
	foreach ($json->wares as $key => $value) {
		$message .= "Товар " . ($key + 1) . ":<br />" .
		"Название: " . $value->name . "<br />" .
		"Количество: " . $value->quantity . "<br />" .
		"Цвет: <span style='color:" . $value->colorValue . "'>" . $value->color . "</span><br />" .
		"Размер: " . $value->size . "<br />" .
		"На сумму: " . $value->sum . " руб.<br />" .
		"<hr />";
		$sum += $value->sum;
	}
	$message .= "<b><span style='font-size: 18px;'>Сумма заказа: </span><span style='color: #e34052; font-size: 18px;'>" . $sum . " руб.</span>";
}

if( mail($to, $subject, $message, $headers) ){
	echo "success";
} else {
	echo "Серверу не удалось отослать письмо. Попробуйте снова позднее.";
}

?>