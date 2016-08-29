<?php

if ($_GET["phrase"] == null)
{ 
	finish(false, "no_phrase_parametr");
}

//проверяем чтоб каждый символ был цифрой или запятой
for ($i = 0; $i < strlen($_GET["phrase"]); $i++)
{
	if ($_GET["phrase"][$i] != ',' &&  ($_GET["phrase"][$i] < "0" || $_GET["phrase"][$i] > "9")) 
		finish(false, "unexpected_symbol");
}

//массив чисел (id)
$idarr = explode(",", $_GET["phrase"]);

//фраза из больше, чем 15 слов
if (count($idarr) > 15) 
	finish(false, "phrase_too_long");

// Попытка установить соединение с MySQL:
if (!mysql_connect("127.0.0.1:3306", "root", "")) 
{
	//не используется finish() потому что ошибка номер 500 (внутренняя ошибка сервера)
	$filestream = fopen("stats_log.txt", "a"); //открываем файл логов
	$record = "".date("c")." ER ".get_ip()." stats.php?".$_SERVER['QUERY_STRING']." db_connect_error\r\n";
	fwrite($filestream, $record);
	fclose($filestream);
	http_response_code(500);
	exit;
}

mysql_select_db("karinaDB");

//получаем максимальный id
$query = mysql_query("SELECT COUNT(*) FROM words;");
$max_id = (int)mysql_fetch_array($query)[0];

//проверяем, чтоб каждый id не выходил за пределы доступных
for ($i = 0; $i < count($idarr); $i++)
{
	$idarr[$i] = (int)$idarr[$i]; //убираем ведущие нули
	if ($idarr[$i] <= 0 || $idarr[$i] > $max_id) finish(false, "id_out_of_range");
}

/////////////все проверки прошли/////////////////
if (count($idarr) < 3) goto m1;
$strid = implode(",", $idarr); //строка с id

/////////////фраза///////////////
//пытаемся найти текущую фразу в БД
$query = mysql_query("SELECT `phrase` FROM phrases WHERE `phrase`=\"".$strid."\";");
if (mysql_fetch_assoc($query))//если результат вернул не false, т.е. фраза уже есть в БД, то
{
	mysql_query("UPDATE phrases SET `rate`=`rate`+1 WHERE `phrase`=\"".$strid."\";"); //увеличиваем рейтинг
}
else 
{
	mysql_query("INSERT INTO phrases (`phrase`) VALUES (\"".$strid."\");"); //иначе добавляем
}

m1://///////////отдельные слова//////////////
$dif_words; //ассоциативный массив id слов: кладем все слова в него, чтоб учитывать каждое слово max 1 раз во фразе

foreach ($idarr as $id)
{
	//записываем слова в массив (set)
	$dif_words[$id] = $id;
}

foreach ($dif_words as $id)
{
	//увеличивам рейтинг каждого слова
	mysql_query("UPDATE words SET `rate`=`rate`+1 WHERE `id`=".$id.";");
}

finish(true);

function get_ip()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function finish($isOK, $message = "saved")//OK or not
{
	$filestream = fopen("stats_log.txt", "a"); //открываем файл логов
	$record = "".date("c")." ".($isOK ? "OK " : "ER ").get_ip()." stats.php?".$_SERVER['QUERY_STRING']." ".$message."\r\n";
	fwrite($filestream, $record);
	fclose($filestream);
	http_response_code($isOK ? 200 : 400);
	exit;
}
	
?>