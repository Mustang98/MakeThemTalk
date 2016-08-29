<?php
$TABLE_RAWS = 16; 
$TABLE_COLS = 3;

//полученные из БД данные
$word_number;
$words[0] = null; //массив слов
$iscensor[0] = null; //массив флажков, цензурное ли слово

$nouns;
$adjectives;
$verbs;
$adverbs;
$other;
$popular;
$cpopular;
$phrases;

//загрузка данных из БД
function getDataFromDB() 
{
	global $word_number, $words, $iscensor, $nouns, $adjectives, $verbs, $adverbs, $other, $popular, $cpopular, $phrases;

	// Попытка установить соединение с MySQL:
	if (!mysql_connect("127.0.0.1:3306", "root", "")) 
	{
		echo "Ошибка подключения к серверу MySQL";
		exit;
	}

	mysql_select_db("karinaDB");
	
	//---------------------------------------------------------------------
	//-----------------Получаем слова по алфавиту--------------------------
	$query = mysql_query("SELECT `id`, `value`, `censor`, `type` FROM words ORDER BY `value`;"); //получаем все слова, отсортированные по алфавиту
	$word_number = mysql_num_rows($query); //количество слов всего

	for ($i = 0; $i < $word_number; $i++)
	{ 
		$word = mysql_fetch_assoc($query); //получаем очередную запись
		$words[$word["id"]] = $word["value"]; //сохраняем в массив слов
		$iscensor[$word["id"]] = $word["censor"]; //запоминаем, цензурное ли слово

		switch ($word["type"]) {
			case 'n': $nouns[] = $word["id"]; break;
			case 'a': $adjectives[] = $word["id"]; break;
			case 'v': $verbs[] = $word["id"]; break;
			case 'd': $adverbs[] = $word["id"]; break; //наречия			
			case 'o': $other[] = $word["id"]; break;
		}
	}
	
	
	//---------------------------------------------------------------------
	//----------------Получаем слова по популярности-----------------------
	$query = mysql_query("SELECT `id` FROM words ORDER BY `rate` DESC LIMIT 45;"); //получаем id 25 самых популярных слов
	$record;
	while ($record = mysql_fetch_assoc($query)) //сохраняем в массив
	{
		$popular[] = $record["id"];
	}
	
	$query = mysql_query("SELECT `id` FROM words WHERE `censor`=1 ORDER BY `rate` DESC LIMIT 45;"); //получаем id 25 самых популярных цензурных слов
	while ($record = mysql_fetch_assoc($query)) //сохраняем в массив
	{
		$cpopular[] = $record["id"];
	}
	
	//---------------------------------------------------------------------
	//----------------Получаем топ 8 фраз ---------------------------------
	$query = mysql_query("SELECT `phrase` FROM phrases ORDER BY `rate` DESC LIMIT 8;"); //получаем id 8 самых популярных фраз
	$record;
	while ($record = mysql_fetch_assoc($query)) //сохраняем в массив
	{
		$phrases[] = $record["phrase"];
	}
	
	mysql_close();	
}

//формирование и вывод таблицы категории
function createTable(&$arrind, $censor = false) //массив индексов, цензурно или нет  
{
	global $words, $iscensor, $TABLE_RAWS, $TABLE_COLS;
	$table; $raws_num; real_len;//двумерный массив id слов, количество строк, кол-во подходящих слов
	$length = count($arrind); //количество слов
	if ($censor == false)  $real_len = $length; 
	else 
	{
		//если цензура, считаем количество цензурных в цикле
		foreach ($arrind as $ind)
			if ($iscensor[$ind]) $real_len++;
	}
	//распределяем поровну между столбцами
	if ($real_len % $TABLE_COLS == 0) $raws_num = $real_len / 3;
	else $raws_num = $real_len / 3;
	
	$t = 0; //текущее рассматриваемое слово

	for ($j = 0; $j < $TABLE_COLS; $j++) //заполняем таблицу по столбцам
		for ($i = 0; $i < $raws_num; $i++)
		{
			if ($t >= $length) break; //если положили все слова - выходим
			if ($censor && $iscensor[$arrind[$t]] == false) 
			{
				$i--; 
				$t++;
				continue; //если слово класть нельзя, идем дальше (ячейка та же)
			} 
			$table[$i][$j] = $arrind[$t];
			$t++;
		}

	//выводим таблицу
	echo "<tbody>\n";
	for ($i = 0; $i < $raws_num; $i++) //заполняем таблицу по столбцам
	{
		echo "<tr>";
		for ($j = 0; $j < $TABLE_COLS; $j++)
		{
			echo "<td>";
			if ($table[$i][$j] != null) 
				echo "<span id=n".$table[$i][$j].">".$words[$table[$i][$j]]."</span>";

			echo "</td>";
		}
		echo "</tr>\n";
	}
	echo "</tbody>";
}

//отображение популярных фраз
function showPhrases() 
{
	global $phrases;
   
	foreach ($phrases as $phrase)
   {
      echo "<li>\n";
		echo "<a href=\"/karina?".str_replace(",",".",$phrase)."\" >".parsePhrase($phrase)."</a>\n";
      echo "<img src=\"img/play_phrase.png\">";    
   	echo "</li>\n";
	}
}

//формирование фразы по коду
function parsePhrase(&$codestr) 
{
	global $words;
	
   $r = ""; //результат
   $arr = explode(",", $codestr); //массив строк id
	$len = count($arr);
	
   for ($i = 0; $i < $len; $i++) 
	{
		$arr[$i] = $words[(int)$arr[$i]]; //заменяем id на слова
	}
	
	//utf занимает 2 байта. В стандартных методах 1 символ = 1 байт
	$ch = mb_strtoupper(substr($arr[0], 0, 2), "utf-8"); //получаем 1й символ и увеличиваем его
	$arr[0] = substr_replace($arr[0], $ch, 0, 2); //заменяем первый символ на увеличенный
	return implode(" ", $arr); //соединяем назад в строку
}

//вывод слов в соответствии с увеличением их id
function printWords()
{
	global $word_number, $words;
	echo "null&";
	for ($i = 1; $i < $word_number; $i++)
	{
		echo $words[$i]."&";
	}
	echo $words[$word_number];	
}

?>		