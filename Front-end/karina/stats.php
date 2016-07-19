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
	finish(false, "db_connect_error");
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

/////////////отдельные слова//////////////
foreach ($idarr as $id)
{
	//увеличивам рейтинг каждого слова
	mysql_query("UPDATE words SET `rate`=`rate`+1 WHERE `id`=".$id.";");
}

finish(true);

function finish($isOK, $message = "saved")//OK or not
{
	$filestream = fopen("stats_log.txt", "a"); //открываем файл логов
	$record = "".date("c")." ".($isOK ? "OK " : "ER ")."stats.php?".$_SERVER['QUERY_STRING']." ".$message."\r\n";
	fwrite($filestream, $record);
	fclose($filestream);
	http_response_code($isOK ? 200 : 400);
	exit;
}
	
?>