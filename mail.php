<?php
if(isset($_POST['name']) && isset($_POST['phone'])){
    $to = "mailtruemaster@gmail.com";
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $subject = 'Заявка на ремонт';
    $message = "<table style='width: 100%;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>Имя: <strong>$name</strong></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>Телефон: <strong>$phone</strong></td>
                </table>";

    $headers = 'MIME-Version: 1.0' . PHP_EOL .
	'Content-Type: text/html; charset=utf-8' . PHP_EOL .
	'From: '.$email.'' . PHP_EOL .
	'Reply-To: '.$email.'' . PHP_EOL;

    if (mail($to, $subject, $message, $headers)) {
        echo('<h1>Ваше сообщение успешно отправлено!</h1>');
    } else {
        echo('<h1>Ошибка сервера, попробуйте через несколько минут.</h1>');
    }
   }
?>
