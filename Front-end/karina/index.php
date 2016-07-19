<!DOCTYPE html>
<html>
   <head>
      <title>Стримерша Карина говорит то, что ты хочешь - MakeThemTalk.ru</title>
      <meta charset="utf-8">
      <meta name="Description" content="Конструктор речи, где стримерша Карина говорит все, что ты хочешь. Составь фразу из слов, и говорящая Карина Сычева тут же произнесет ее вслух.">
      <meta name="Keywords" content="стримерша карина говорит, карина говорит что ты пишешь, говорящая стримерша карина, конструктор речи стримерши карины,  карина сычева говорит, sharishaxd говорит что ты хочешь, заставить карину говорить">
      <link href="favicon.ico" rel="shortcut icon" type="image/x-icon">
		<link rel="stylesheet" href="style.css">           
      <link rel="stylesheet" href="toastr/toastr.css">    
      <link rel="stylesheet" href="font-awesome-4.6.3/css/font-awesome.min.css">
      <script type="text/javascript" src="jquery-3.1.0.min.js"></script>
		<script type="text/javascript" src="toastr/toastr.min.js"></script>
      <script type="text/javascript" src="script.js"></script>
      <!--ВК КОММЕНТЫ-->
      <script type="text/javascript" src="//vk.com/js/api/openapi.js?124"></script>
     	<!--ВК ПОДЕЛИТЬСЯ-->
      <script type="text/javascript" src="http://vk.com/js/api/share.js?93" charset="windows-1251">/*Скрипт вк*/</script>
   </head>
   <body>
      <?php
			include "methods.php";
			getDataFromDB();
		?>
      <!-- Блок для сохранения слов -->
		<p style="display:none;"><?php printWords(); ?></p>      
      <div id="page">
         <div id="header">
            <span>MakeThemTalk</span>
         </div>
         <div id="content">
            <div id="left">
               <div class="content-block video">
                  <div id="video_list">
                     <video id="bgvideo" loop autoplay onplay="bgvideo.muted = true;" style="opacity: 0.5;">          
                        <source src="smile.mp4">
                     </video> <!-- основное видео, играющее на фоне-->  
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                     <video style="display:none;">
                        <source>
                        <source>
                        <source>
                     </video>
                  </div>
                  <img id="video_start" src="img/green_play.png" style="">       
                  <i id="video_loading" class="fa fa-spinner fa-inverse fa-pulse fa-5x" style="display:none;"></i>
               </div>
               <div class="content-block phrase">
                  <div id="lines">
                     <hr><hr><hr><hr><hr><hr><hr><hr><hr><hr><hr><hr><hr><hr><hr>
                  </div>
                  <p>Добавьте слова для воспроизведения<img src="img/arrow.png"></p>
                  
                  <!--span title="Нажмите для удаления" class="viewed">Я </span> 
                  <span title="Нажмите для удаления" class="viewed">просить </span> 
                  <span title="Нажмите для удаления" class="viewed">оба </span> 
                  <span title="Нажмите для удаления" class="viewed">начать </span> 
                  <span title="Нажмите для удаления" class="viewed">брат </span> 
                  <span title="Нажмите для удаления" class="viewed">бросить </span> 
                  <span title="Нажмите для удаления" class="viewed">следующий </span> 
                  <span title="Нажмите для удаления" class="viewed active">собственный </span> 
                  <span title="Нажмите для удаления" >школа </span> 
                  <span title="Нажмите для удаления" >личный </span> 
                  <span title="Нажмите для удаления" >отношение </span> 
                  <span title="Нажмите для удаления" >парень </span> 
                  <span title="Нажмите для удаления" >труд </span-->
                  <!--ФРАЗА, ПОТОМ СЛОВА, ПОТОМ ЭЛЕМЕНТЫ УПРАВЛЕНИЯ-->
                  <div id="phrase-cover"></div>
                  <div style="display:none;" class="ctrls">
                     <img id="clear_last" src="img/clear.png" title="Стереть последнее">
                     <img id="clear_all" src="img/clear_all.png" title="Стереть все">
                  </div>   
					</div>
               <hr class="separator" noshade size=1>
               <div class="content-block share">
                  <script type="text/javascript">
                     <!--
                     document.write(VK.Share.button({
                       url: 'http://mydsfdsite.com',
                       title: 'Хороший сайт',
                       description: 'Это мой собственный сайт, я его очень долго делал',
                       image: 'http://mysite.com/mypic.jpg',
                       noparse: true
                     },
                     {
                        type:"custom",
                        text:"<img style='border:0;' src='img/vk-logo.png'>"                        
                     }));
                     -->
                  </script>
                  <img src="img/ok-logo.png">
                  <img src="img/fb-logo.png">
                  <img src="img/go-logo.png">
                  <input id="link" onclick = "this.select();" value="http://makethemtalk.ru/karina" readonly type="text">
                  <img id="copy_link" src="img/copy_link.png" title="Cкопировать ссылку">
               </div>
               <hr class="separator" noshade size=1>
               <div class="content-block description">
                  <h2>О ресурсе</h2>
                  <!--p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo ldectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam. </p-->
                  <p>MakeThemTalk.ru - конструктор речи, где стримерша Карина, так же известная как Sharishaxd, говорит то, что ты хочешь. Достаточно составить фразу из доступных слов, и говорящая Карина Сычева тут же произнесет ее вслух. Данный ресурс позволит создавать различные фразы и делиться ими с друзьями, а самые интересные и креативные фразы с говорящей Кариной попадут в раздел "популярные". Заставь Карину сказать все, что ты хочешь! Весь используемый видеоматериал взят из официальной группы стримерши Карины <a href="vk.com/shkuragaming">vk.com/shkuragaming</a>. В настоящее время сайт развивается, а база активно расширяется. </p>
               </div>
            </div>
            <div id="right">
               <div class="content-block words">
                  <div class="controls">
                     <ul>
                        <li data-type="popular" class="active">Популярные</li>
                        <li data-type="alpha">По алфавиту</li>
                     </ul>
                     <label>
                     	<input type="checkbox" checked=true onchange="wordSection.changeCensor();"> 
                     	<span>Цензура</span>
                     </label>
                  </div>
                  <div style="clear:both;"></div>
                  <div class="word-type">
                     <table id="word-type" style="opacity:0;">
                        <tr><td data-type="other">Другое</td>
                            <td data-type="adjectives">Прилагательные</td>
                            <td data-type="verbs">Глаголы</td>
                            <td data-type="nouns" class="active">Существительные</td></tr>
                     </table>
                  </div>
                  <div class="words-cover" onmousedown="return false;">
                     <table class="words-list" id="calpha-nouns" style="display:none">
                        <?php
                           createTable($nouns, true);
                        ?>
                     </table>
                     <table class="words-list" id="calpha-verbs" style="display:none;">
                        <?php
                           createTable($verbs, true);
                        ?>
                     </table>
                     <table class="words-list" id="calpha-adjectives" style="display:none;">
                        <?php
                           createTable($adjectives, true);
                        ?>
                     </table>
                     <table class="words-list" id="calpha-other" style="display:none;">
                        <?php
                           createTable($other, true);
                        ?>
                     </table>
                     <table class="words-list" id="alpha-nouns" style="display:none;">
                        <?php
                           createTable($nouns);
                        ?>
                     </table>
                     <table class="words-list" id="alpha-verbs" style="display:none;">
                        <?php
                           createTable($verbs);
                        ?>
                     </table>
                     <table class="words-list" id="alpha-adjectives" style="display:none;">
                        <?php
                           createTable($adjectives);
                        ?>
                     </table>
                     <table class="words-list" id="alpha-other" style="display:none;">
                        <?php
                           createTable($other);
                        ?>
                     </table>                     
                     <table class="words-list" id="popular" style="display:none;">
                        <?php
                           createTable($popular);
                        ?>
                     </table>
                     <table class="words-list" id="cpopular" style="">
                        <?php
                           createTable($cpopular);
                        ?>
                     </table> 
                  </div>
               </div>
               <div class="content-block pop-phrases">
                  <h2>Популярные фразы</h2>
                  <ul id="pop-phrases">
                     <?php
								showPhrases();
							?>
                     <!--li><a href="#1">Я скромная няша, я няша-стесняша</a><img src="img/play_phrase.png"></li>
                     <li><a href="#1">Кариночка любит играть в доту, а ты долбаеб, как и твоя мамка</a><img src="img/play_phrase.png"></li>
                     <li><a href="#">Я шлюха</a><img src="img/play_phrase.png"></li>
                     <li><a href="#">Я скромная няша, я няша-стесняша</a><img src="img/play_phrase.png"></li>
                     <li><a href="#1">Карина любит играть в доту, а ты долбоеб лох</a><img src="img/play_phrase.png"></li>
                     <li><a href="#">Я шлюха милая а ты нет</a><img src="img/play_phrase.png"></li>
                     <li><a href="#">Привет, давай познакомимся, я красивая и думаю о жизни вечерами</a><img src="img/play_phrase.png"></li>
                     <li><a href="#">Что ты думаешь если так будет все и всегда</a><img src="img/play_phrase.png"></li--> 
                  </ul>
               </div>
            </div>
            <div style="clear:both"></div>
            <div id="comments"></div>
         </div>
         <div id="footer">
            <img src="img/logo_footer1.png">
            <span class="contact">Связь с разработчиками:<br>contact@makethemtalk.ru</span>
            <span class="copyright"><span>&copy;</span> 2016</span>
         </div>
      </div>
   </body>
</html>