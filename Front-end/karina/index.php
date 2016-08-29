<!DOCTYPE html>
<html>
   <head>
      <title>Стримерша Карина говорит то, что ты хочешь - MakeThemTalk.ru</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="Description" content="Конструктор речи, где стримерша Карина говорит все, что ты хочешь. Составь фразу из слов, и говорящая Карина Сычева произнесет ее вслух онлайн.">
      <meta name="Keywords" content="стримерша карина говорит, карина говорит что ты пишешь, говорящая стримерша карина, конструктор речи стримерши карины,  карина сычева говорит, sharishaxd говорит что ты хочешь, заставить карину говорить">
      <meta property="og:url"         content="http://www.nytimes.com/karina" />
		<meta property="og:type"        content="website" />
		<meta property="og:title"       content="Я составил(а) фразу и стримерша Карина произнесла ее! Нажми на ссылку и посмотри." />
		<meta property="og:description" content="Конструктор речи, где стримерша Карина говорит все, что ты хочешь. Составь фразу из слов, и говорящая Карина произнесет ее вслух онлайн!" />
		<meta property="og:image"       content="http://makethemtalk.ru/karina/img/share_img.jpg" />
     
      <link href="favicon.ico" rel="shortcut icon" type="image/x-icon">
		<link rel="stylesheet" href="style.css">           
      <link rel="stylesheet" href="external/toastr/toastr.css">    
      <link rel="stylesheet" href="external/font-awesome-4.6.3/css/font-awesome.min.css">
      <link rel="stylesheet" href="external/jquery.mCustomScrollbar.min.css">
      
      <script>
			if (document.createElement('video').canPlayType == undefined) window.location.pathname="/browser-update.html";
		</script>
      <script type="text/javascript" src="external/jquery-3.1.0.min.js"></script>
		<script type="text/javascript" src="external/toastr/toastr.min.js"></script>
      <script type="text/javascript" src="script.js"></script>
		<script src="external/jquery.mCustomScrollbar.concat.min.js"></script>
      
      <!--ВК (блок комментов)-->
      <script type="text/javascript" src="//vk.com/js/api/openapi.js?122"></script>
      <script type="text/javascript">
		  	VK.init({
				apiId: 5554828,
			 	onlyWidgets: true
		  	});
		</script>
     	
     	<!--GOOGLE ANALYTICS-->
      <script>
		   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  	ga('create', 'UA-81126687-1', 'auto');
		  	ga('send', 'pageview');

		</script>
		
		<!-- Yandex.Metrika counter -->
		<script type="text/javascript">
			 (function (d, w, c) {
				  (w[c] = w[c] || []).push(function() {
						try {
							 w.yaCounter38624775 = new Ya.Metrika({
								  id:38624775,
								  clickmap:true,
								  trackLinks:true,
								  accurateTrackBounce:true
							 });
						} catch(e) { }
				  });

				  var n = d.getElementsByTagName("script")[0],
						s = d.createElement("script"),
						f = function () { n.parentNode.insertBefore(s, n); };
				  s.type = "text/javascript";
				  s.async = true;
				  s.src = "https://mc.yandex.ru/metrika/watch.js";

				  if (w.opera == "[object Opera]") {
						d.addEventListener("DOMContentLoaded", f, false);
				  } else { f(); }
			 })(document, window, "yandex_metrika_callbacks");
		</script>
		<noscript><div><img src="https://mc.yandex.ru/watch/38624775" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->
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
            <img src="img/header.png">
         </div>
         <div id="content">
            <div id="left">
               <div class="content-block video">
                  <div id="video_list">
                     <video poster="img/bgvideoimg.jpg" id="bgvideo" loop preload autoplay style="opacity: 0.5;">          
                        <source src="video/background.mp4">
                        <source src="video/background.ogv">
                     </video> <!-- основное видео, играющее на фоне-->  
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                     <video style="display:none;"></video>
                  </div>
                  <img id="video_start" src="img/green_play.png">       
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
                  <a onclick="Share.vkontakte();"><img src='img/vk-logo.png'></a>
                  <a onclick="Share.odnoklassniki();"><img src='img/ok-logo.png'></a>
                  <a onclick="Share.facebook();"><img src='img/fb-logo.png'></a>
                  <a onclick="Share.twitter();"><img src='img/tw-logo.png'></a>
                  <input id="link" onclick = "this.select();" value="http://makethemtalk.ru/karina" readonly type="text">
                  <img id="copy_link" src="img/copy_link.png" title="Cкопировать ссылку">
               </div>
               <hr class="separator" noshade size=1>
               <div class="content-block description">
                  <h2>О ресурсе</h2>
                  <!--p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo ldectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam. </p-->
                  <p>MakeThemTalk.ru/karina — конструктор речи, где стримерша Карина, так же известная как Sharishaxd, говорит то, что ты хочешь. Достаточно составить фразу из доступных слов, и говорящая Карина Сычева тут же произнесет ее в онлайн режиме. Большой выбор категорий слов позволяет создавать различные фразы и делиться ими с друзьями, а самые интересные и креативные из них попадают в раздел "популярные". Заставь Карину сказать все, что ты хочешь!</p><p>Используемый видеоматериал взят из официальной группы стримерши Карины <a target="_blank" rel="nofollow"  href="https://vk.com/shkuragaming">vk.com/shkuragaming</a>. В настоящее время сайт развивается, а база активно расширяется. Помоги проекту — поделись ссылкой в социальных сетях.</p>
               </div>
            </div>
            <div id="right">
               <div class="content-block words" onmousedown="return false;">
                  <div class="controls">
                     <ul>
                        <li data-type="popular" class="active">Популярные</li>
                        <li data-type="alpha">По алфавиту</li>
                     </ul>
                     <label>
                     	<input id="censor_checkbox" type="checkbox" checked="checked" onchange="wordSection.changeCensor();"> 
                     	<span>Цензура</span>
                     </label>
                  </div>
                  <div style="clear:both;"></div>
                  <div class="word-type">
                       <ul id="word-type" style="opacity:0;">
                     	<li data-type="other">Другое</li>
                     	<li data-type="adverbs">Наречия</li>
                     	<li data-type="adjectives">Прилагат.</li>
                     	<li data-type="verbs">Глаголы</li>
                     	<li data-type="nouns" class="active">Существит.</li>
                     </ul>
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
                     <table class="words-list" id="calpha-adverbs" style="display:none;">
                        <?php
                           createTable($adverbs, true);
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
                     <table class="words-list" id="alpha-adverbs" style="display:none;">
                        <?php
                           createTable($adverbs);
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
            <div id="vk_comments"></div>
         </div>
         <div id="footer">
            <img src="img/logo_footer.png">
            <span class="contact">Связь с разработчиками:<br>contact@makethemtalk.ru</span>
            <span class="copyright"><span>&copy;</span> 2016</span>
         </div>
      </div>
   </body>
</html>