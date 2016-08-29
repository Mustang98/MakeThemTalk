var d = document;
d.addEventListener("DOMContentLoaded", DOMloaded);

var MAX_WORD_COUNT = 16*3; //слов в каждой категории

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

var Share = {
	description : "Конструктор речи, где стримерша Карина говорит все, что ты хочешь. Составь фразу из слов, и говорящая Карина произнесет ее вслух онлайн!",
	title : "Я составил(а) фразу и стримерша Карина произнесла ее! Нажми на ссылку и посмотри.",
	titletw : "Я составил(а) фразу и стримерша Карина произнесла ее! Нажми на ссылку и посмотри -",
	titleok :  "Я составил(а) фразу и Карина произнесла ее! Нажми на ссылку и посмотри.",
	image : "http://makethemtalk.ru/karina/img/share_img.jpg",
	vkontakte: function() {
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(link.value);
		url += '&title='       + encodeURIComponent(this.title);
		url += '&description=' + encodeURIComponent(this.description);
		url += '&image='       + encodeURIComponent(this.image);
		url += '&noparse=true';
		Share.popup(url, 650, 597);
	},
	odnoklassniki: function() {
		url  = 'https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview';
		url += '&st.shareUrl=' + encodeURIComponent(link.value);
		url += '&st.title='	  + encodeURIComponent(this.titleok);
		url += '&st.description=' + encodeURIComponent(this.description);
		url += '&st.imageUrl=' + encodeURIComponent(this.image);
		Share.popup(url, 580, 350);
	},
	facebook: function() {
		url  = 'http://www.facebook.com/sharer.php?';
		url += 'u=' 			  + encodeURIComponent(link.value);
		Share.popup(url, 626, 436);
	},
	twitter: function() {
		url  = 'https://twitter.com/intent/tweet?';
		url += 'text='      + encodeURIComponent(this.titletw);
		url += '&url='      + encodeURIComponent(link.value);
		Share.popup(url, 626, 436);
	},
	mailru: function(purl, ptitle, pimg, text) {
		url  = 'http://connect.mail.ru/share?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&imageurl='    + encodeURIComponent(pimg);
		Share.popup(url)
	},

	popup: function(url, width, height) {
		t = (screen.height - height) / 2;
      l = (screen.width - width) / 2;
		window.open(url,'', "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + ",menubar=0,scrollbars=0,status=0,toolbar=0");
	}
};

//LOADED DATA
var words; //массив слов

//CLIENT DATA OBJECTS
var video = {
   _phrasevid:[], //ссылки на элементы видео текущей фразы 
   _freevid:[], //стэк свободных видеоэлементов
   _mainvid:null, //фоновое основное видео (ссылка на элемент)
   _curvideonum: null, //номер текущего видео в массиве _phrasevid[]
	_timerId:null, //id таймера во время загрузки видео
	_format:null, //формат видео, который может воспроизводить данный браузер
	isplayed:false,
	isloading:false,
   
   initialize: function() {
      var vid = d.getElementById("video_list").children;
      this._mainvid = vid[0];
      for (var i = 1; i < vid.length; i++) this._freevid.push(vid[i]);
		
		if (this._mainvid.canPlayType("video/mp4") == "maybe") 
			this._format = ".mp4";
		else if (this._mainvid.canPlayType("video/ogg") == "maybe")
			this._format = ".ogv";
		else window.location.pathname="/browser-update.html";
   },
   
   add: function(id) {//id добавляемого слова
		//проверка, играет ли видео совершается в добавлении слова во фразу
      var newv = this._freevid.pop();//берем свободный тег видео
      this._phrasevid.push(newv);//добавляем в текущий "плейлист"
      newv.loaded = false;//флажок готовности к проигрыванию
      //setTimeout(function(){newv.loaded=true;}, 5000); //для тестирования загрузки
		newv.addEventListener("canplaythrough"/*"canplay"*/, function() {this.loaded = true;}); //в функции this = видео объект
      var srcElement = d.createElement("SOURCE");		
		srcElement.src = 'video/v' + id + this._format; 
		newv.appendChild(srcElement);
      newv.load();
   },
   
   delete: function(numb_in_phrase) {
		this._phrasevid[numb_in_phrase].removeChild(this._phrasevid[numb_in_phrase].children[0]); //удаляем source
      this._freevid.push(this._phrasevid[numb_in_phrase]);//добавляем текущий тег видео в свободные
      this._phrasevid.splice(numb_in_phrase,1);//удаляем из текущего "плейлиста"
   },
   
   start: function() {
      var self = video;

      if (self._phrasevid.length == 0) 
      {
         notification("error", "Добавьте слова для воспроизведения из таблицы справа.", "Фраза пуста");
         return;
      }
      if (self.canPlay() == false)
      {
         if (self.isloading == false) 
			{
				self.isloading = true;
				d.getElementById("video_start").style.opacity = "0";//скрываем кнопку play
				d.getElementById("video_loading").style.display = "";//показываем иконку загрузки
				d.getElementById("video_list").style.cursor = "pointer";//курсор для обертки вокруг видео, т.к. при нажатии - пауза
			}
			self._timerId = setTimeout("video.start();", 400);
         return;
      }
		
		d.getElementById("video_loading").style.display = "none"; //скрываем иконку загрузки
      d.getElementById("video_start").style.opacity = "0";//скрываем кнопку play
		d.getElementById("video_list").style.cursor = "pointer";//курсор для обертки вокруг видео, т.к. при нажатии - пауза
      
		sendPhrase(phrase._curIds.join(",")); //отправляем на сервер информацию о запущенной фразе
      self.isloading = false;
		self.isplayed = true;
		self._mainvid.pause();//ставим на паузу фоновое видео
      self.playWord(0);
   },
   
   playWord: function(num) {//получаем номер в текущей фразе
		if (num == this._phrasevid.length) //проиграли всю фразу
      {
         this._phrasevid[num - 1].style.display = "none";//скрываем предыдущее видео          
         phrase.colorize(num-1, "viewed");//затемняем предыдущее слово
         this.finish();
         return;
      }
		this._phrasevid[num].addEventListener("ended", video._nextCall);//проигрывание следующего по завершению
      
		if (num == 0) this._mainvid.style.display = "none";//скрываем главное видео (играем 1е слово фразы)
      else 
      {
         this._phrasevid[num - 1].style.display = "none";//скрываем предыдущее видео
         phrase.colorize(num-1, "viewed");//затемняем предыдущее слово
      }
		
		this._curvideonum = num;
		this._phrasevid[num].play();//включаем текущее
      this._phrasevid[num].style.display = "";//показываем текущее видео
      phrase.colorize(num, "active");//подсвечиваем текущее слово
	},
   
   finish: function() {
      this._mainvid.style.display = "";
		this._mainvid.play();//запускаем фоновое видео
      d.getElementById("video_start").style.opacity = "1";//показываем кнопку
		d.getElementById("video_list").style.cursor = "default";
      phrase.decolorize();
      this.isplayed = false;
		this._curvideonum = null;
		for (var i = 0; i < this._phrasevid.length; i++)
		{
			this._phrasevid[i].removeEventListener("ended", this._nextCall); //убираем обработчик окночания проигрывания
			this._phrasevid[i].currentTime = 0; //перематываем в начало, иначе при повторном запуске показывается конечный кадр
			this._phrasevid[i].pause();				
		}
   },
   
	stop: function() {
		var self = video;
		if (self.isloading)
		{
			self.isloading = false;
			clearTimeout(self._timerId);
			d.getElementById("video_loading").style.display = "none";
			d.getElementById("video_start").style.opacity="1";//показываем кнопку
			d.getElementById("video_list").style.cursor="default";
		}
		else if (self.isplayed)
		{
			self._phrasevid[self._curvideonum].pause(); //останавливаем текущее видео
			self._phrasevid[self._curvideonum].style.display = "none";//скрываем его     
			self.finish();
		}
	},
	
   canPlay: function() {
      for (var i = 0; i < this._phrasevid.length; i++) 
         if (this._phrasevid[i].loaded == false) return false;
      return true;
   },
	
	_nextCall: function() {
		video.playWord(video._curvideonum + 1);
	}
}

var phrase = {
   _curPhrase: [], //массив ссылок на элементы слов фразы
   _curIds: [], //массив id слов фразы
   _lines: [], //массив линий между словами (все 15)
   _block: null, //контейнер слов (элементов)
   _last:null, //последнее слово во фразе (сам элемент)
   LINE_HEIGHT:3,
   
   initialize: function()
   {
      this._block = d.getElementById("phrase-cover");
      this._lines = d.getElementById("lines").children;
      this.updateLines();
   },
   
   add: function(id)//через id чтоб инициализировать из ссылки
   {
      if (this._curPhrase.length == 15) {
         notification("error", "Добавление невозможно, так как достигнута максимальная длина фразы. ", "Максимум 15 слов");
         return ;
      }
      
      var newWord = d.createElement('SPAN');//создание
      newWord.textContent = words[id];
      
      var newImg = d.createElement('IMG');
      newImg.src = "img/close.png";
      newImg.setAttribute('title','Нажмите для удаления');
      newWord.appendChild(newImg);/*
      var newImg = d.createElement('SPAN');
      newImg.className = "glyphicon glyphicon-remove";
      newImg.setAttribute('title','Нажмите для удаления');
      newWord.appendChild(newImg);	*/	
		
      if (this._curPhrase.length == 0) this.showControls();//показать элементы управления
      this._curPhrase.push(newWord);//добавляем в фразу
      this._curIds.push(id);
      this._block.appendChild(newWord);//добавляем на страницу
      this._block.appendChild(d.createTextNode(' '));//добавили пробел
      this._last = newWord;
      
      //внешнее
      this.updateLines();
      updateLink();
      video.add(id);
   },
   
   remove: function(event) 
   {
      var self = phrase; 
      var el = event.target;
      if (el.parentElement.tagName != 'SPAN') return;
      if (video.isplayed) 
      {
         notification("error", "Данная операция недоступна во время воспроизведения.", "Дождитесь окончания видео");
         return;
      }
		if (video.isloading) 
      {
         notification("error", "Данная операция недоступна во время загрузки.", "Дождитесь окончания видео");
         return;
      }
      
      el = el.parentElement;//удаляемый span
      var numb = Array.prototype.indexOf.call(self._block.children,el);//номер элемента
      if (numb == self._curPhrase.length-1) self.removeLast();//последний элемент
      else
      {         
         self._block.removeChild(el.nextSibling);//удаляем лишний пробел
         self._block.removeChild(el);//удаляем элемент
         self._curPhrase.splice(numb,1);         
         self._curIds.splice(numb,1);
         
         //внешнее      
         self.updateLines();
         updateLink();
         video.delete(numb);
      }
   },
   
   removeLast: function(event)
   {
      if (video.isplayed) 
      {
         notification("error", "Данная операция недоступна во время воспроизведения.", "Дождитесь окончания видео");
         return;
      }
		if (video.isloading) 
      {
         notification("error", "Данная операция недоступна во время загрузки.", "Дождитесь окончания видео");
         return;
      }
      
      var self = phrase; //т.к. this занят
      self._curPhrase.pop();
      self._curIds.pop();
      var el = self._last;
      self._last = el.previousElementSibling;      
      self._block.removeChild(el.nextSibling);//удаляем лишний пробел
      self._block.removeChild(el);
      if (self._curPhrase.length == 0) {
         self.hideControls();
         self._last = null;
      }
      
      //внешнее
      self.updateLines();
      updateLink();
      video.delete(self._curPhrase.length);//т.к. последний удалили, то его номер равен length
   },
   
   removeAll: function(event)
   {
      if (video.isplayed) 
      {
         notification("error", "Данная операция недоступна во время воспроизведения.", "Дождитесь окончания видео");
         return;
      }
		if (video.isloading) 
      {
         notification("error", "Данная операция недоступна во время загрузки.", "Дождитесь окончания видео");
         return;
      }
      
      var self = phrase; //т.к. this занят
      while (self._curPhrase.length) self.removeLast();
   },
   
   showControls: function()
   {
      this._block.previousElementSibling.style.display="none";
      this._block.nextElementSibling.style.display="";
   },
   
   hideControls: function()
   {
      this._block.previousElementSibling.style.display="";
      this._block.nextElementSibling.style.display="none";
   },
   
   updateLines: function()
   {
      var ph = this._curPhrase;
      var ln = this._lines;
      for (var i = 0; i < ph.length - 1; i++)
      {
         if (ph[i].offsetTop != ph[i+1].offsetTop) {ln[i].style.display="none"; continue;}//на разных строках
         ln[i].style.top = (ph[i].offsetTop+(ph[i].offsetHeight-this.LINE_HEIGHT)/2)+"px";//отступ сверху
         ln[i].style.left = (ph[i].offsetLeft + ph[i].offsetWidth/2)+"px";//отступ слева
         ln[i].style.width = (ph[i+1].offsetLeft - ph[i].offsetLeft-ph[i].offsetWidth/2+ph[i+1].offsetWidth/2)+"px";//ширина
         ln[i].style.display = "";//показываем
      }
      for (var i=Math.max(0,ph.length-1);i<ln.length;i++) ln[i].style.display = "none";//скрываем лишние
   },
   
   colorize: function(numb_in_phrase, cl)
   {
      this._curPhrase[numb_in_phrase].className = cl;
      if (numb_in_phrase) 
         this._lines[numb_in_phrase-1].style.backgroundColor="lightgreen";
   },
   
   decolorize: function()
   {
      for (var i = 0; i < this._curPhrase.length; i++)
         this._curPhrase[i].className = "";
      for (var i = 0; i < this._lines.length; i++)
         this._lines[i].style.backgroundColor = "#e8e8e8";
      
   }
};

var wordSection = {
   _curTable:null,
   _curWordType:null, //текущая верхняя вкладка
   _curSection:null, //текущая левая вкладка
   _censor:true,
   
   get _curTableId() {
      var stype = this._curSection.getAttribute("data-type");
      var wtype = this._curWordType.getAttribute("data-type");
      var res="";
      if (stype == "popular") res = "popular";
      else 
		{
         res = "alpha-";
         res += wtype;
      }
      if (this._censor) res = "c"+res;
      return res;
   },
   
   initialize: function() {
		$(".words-cover").mCustomScrollbar({
			theme : "dark-3",
			scrollInertia : 0,
			autoExpandScrollbar: false,
			alwaysShowScrollbar : 1
		});
      this._curTable = d.getElementById("cpopular");
      this._curSection = d.querySelector('li[data-type="popular"]');
      this._curWordType = d.querySelector('li[data-type="nouns"]');
   },
   
   changeCensor: function() {
      var self = wordSection;//т.к. this занят
      self._censor = !self._censor;		
      self._curTable.style.display="none";//скрываем текущую таблицу
      self._curTable = d.getElementById(self._curTableId); //получаем новую
      self._curTable.style.display = "";//открываем новую
	},
   
   changeSection: function(event) {
      var self = wordSection;//т.к. this занят
      var el = event.target;
      if (el.tagName != 'LI' || el == self._curSection) return;//кликнули на открытый элемент или мимо элемента
      
      var type = el.getAttribute("data-type");
      
      var table = d.getElementById("word-type"); //таблица выбора типа (вертикальная)
      if (type == "popular") {
			table.style.transitionDuration="0s"; 
			table.style.opacity = "0";
		}//убрали раздел части речи
      else {
			table.style.transitionDuration=".7s"; 
			table.style.opacity = "1";
		} //иначе показали

      self._curSection.className="";//деактивировали старый раздел
      self._curSection = el;//изменили текущий
      self._curSection.className="active";//активировали его

      self._curTable.style.display = "none";//скрываем старую таблицу
      self._curTable = d.getElementById(self._curTableId);//получаем новую
      self._curTable.style.display="";//показываем новую      		
   },
   
   changeWordType: function(event) {
      var self = wordSection;//т.к. this занят
      var el = event.target;
      if (el.tagName != 'LI' || el == self._curWordType) return;//кликнули на открытый элемент или мимо элемента
      
      self._curWordType.className="";//деактивировали старый раздел
      self._curWordType = el;//изменили текущий
      self._curWordType.className="active";//активировали его

      self._curTable.style.display = "none";//скрываем старую таблицу
		self._curTable = d.getElementById(self._curTableId);//получаем новую
      self._curTable.style.display="";//показываем новую     		
		$(".words-cover").mCustomScrollbar("scrollTo", "top", {scrollEasing: "linear", scrollInertia:0}); //сбрасываем скроллбар вверх
	}   
}


function DOMloaded()
{
   //CONTENT
   words = d.body.firstElementChild.textContent.split('&'); //получаем список слов
	d.body.removeChild(d.body.firstElementChild); //удаляем узел, где были слова
	
	d.getElementById("censor_checkbox").checked = true;
	checkPhrases(); //проверка популярных фраз на неоходимость добавления переноса
   wordSection.initialize(); //инициализация обработчика навигации по секциям слов
   phrase.initialize(); //инициализация объекта текущей фразы
   video.initialize();//инициализация объекта плэйлиста видео
   updateLink(); //в Firefox баг - в inpute остается старое значение после перезагрузки, поэтому убираем принудительно
	checkLocation(); //проверка наличия фразы в ссылке
   
   //EVENTS
   d.getElementById("bgvideo").addEventListener("durationchange", setRandomTime);//установка рандомного начала видео
   d.getElementById("pop-phrases").onmouseover = popPhrasesMouseOver;//наведение на поп. фразу
   d.getElementById("pop-phrases").onmouseout = popPhrasesMouseOut;//отведение от поп. фразы
   d.querySelector("div.controls").onclick = wordSection.changeSection;//нажатие на изменение категории слов
   d.querySelector("div.word-type").onclick = wordSection.changeWordType;//нажатие на изменение части речи
   d.querySelector("div.words-cover").onclick = wordClick;//нажитие на слово в таблице -> добавление во фразу
   d.getElementById("clear_last").onclick = phrase.removeLast;//нажитие на "стереть последнее"
   d.getElementById("clear_all").onclick = phrase.removeAll;//нажатие на "стереть все"
   d.getElementById("phrase-cover").onclick = phrase.remove;//нажатие на удаление слова из фразы
	d.getElementById("video_loading").onclick = video.stop;//нажатие на видео => если играет, то стоп.
	d.getElementById("video_list").onclick = video.stop;//нажатие на видео => если играет, то стоп.
	d.getElementById("copy_link").onclick = copyLink;//нажатие на кнопку копирования ссылки	
   d.getElementById("video_start").onclick = video_startClick; //нажатие на кнопку воспроизведения	
	
	VK.Widgets.Comments('vk_comments', {
		width: 1130,
		limit: 10,
		autoPublish: 1
	}, "1");
}

//LOADED CONTENT PROCESSING
function checkPhrases() {
   var s, a, ul = d.getElementById('pop-phrases');
   
	for (var i = 0; i < ul.children.length; i++)
   {
      a = ul.children[i].firstElementChild;
      if (ul.children[i].offsetHeight - a.offsetHeight > 5) 
		{
			var s = a.textContent;
			var ind = s.lastIndexOf(" ");
			a.innerHTML = s.slice(0, ind) + " <br>" + s.slice(ind + 1);
		}
   }
}

function checkLocation() {
   var str = decodeURIComponent(window.location.search);
	
	//в запросе нет фразы
	if (str=='' || str=='?') return;
	
	str = str.slice(1); //убираем знак "?"
	
	//проверяем чтоб каждый символ был цифрой или точкой
	for (var i = 0; i < str.length; i++)
	{
		if (str[i] != '.' &&  (str[i] < "0" || str[i] > "9")) 
			return;
	}
	
	//массив чисел (id)
	str = str.split(".");
	
	//фраза из больше, чем 15 слов
	if (str.length > 15) 
		return;
	
	var max_id = words.length - 1; //масимальный id
	
	//проверяем, чтоб каждый id не выходил за пределы доступных
	for (var i = 0; i < str.length; i++)
	{
		str[i] = +str[i]; //убираем ведущие нули
		if (str[i] <= 0 || str[i] > max_id) return;
	}
	
   for (var i = 0; i < str.length; i++) phrase.add(str[i]);
}

//EVENTS
function setRandomTime(event) {
	this.currentTime = this.duration * Math.random();
	this.muted = true;
}

function popPhrasesMouseOver(event) {
   var elem = event.target;
   if (elem.tagName != 'A') return;
   elem.nextElementSibling.style.visibility = "visible";
}

function popPhrasesMouseOut(event) {
   var elem = event.target;
   if (elem.tagName != 'A') return;
   elem.nextElementSibling.style.visibility = "hidden";
}

function wordClick(event) {
   var el = event.target;
   if (el.tagName != 'SPAN') return;
   if (video.isplayed) notification("error", "Данная операция недоступна во время воспроизведения.", "Дождитесь окончания видео");
	else if (video.isloading) notification("error", "Данная операция недоступна во время загрузки.", "Дождитесь окончания видео");
   else phrase.add(el.id.slice(1));
	return false;
}

function video_startClick(event) {
	if (video.isplayed || video.isloading) video.stop();
	else video.start();
}

//ELSE INERMEDIATE FUNCTIONS
function sendPhrase(ids) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "stats.php?phrase="+ids, true);
	xhr.send();
	xhr.onreadystatechange = function() {
  		if (xhr.readyState != 4) return;
		if (xhr.status != 200) console.log(xhr.status + ': ' + xhr.statusText);
  }
}

function notification(type, message, title){
   if (title == undefined) toastr[type](message);
	else toastr[type](message, title);
}

function updateLink() {
   var s='';
   if (phrase._curIds.length>0) s='?'+phrase._curIds.join('.');
   d.getElementById("link").value = "http://makethemtalk.ru/karina"+s;
}

function copyLink() {
	window.getSelection().removeAllRanges(); //убираем все текущие выделения
	d.getElementById("link").select(); //выделяем ссылку в input'е
	try {  
		var result = document.execCommand('copy'); //пытаемся скопировать
    	if (result == false) throw new Error("unsuccessful");
    	notification("success", "Ссылка на текущую фразу успешно скопирована", "Готово");
	} 
	catch(e) {  
		notification("warning", "Скопируйте ссылку под видео вручную или воспользуйтеь более новым браузером.", "Функция не поддерживается вашим браузером");	  
	}
	
	window.getSelection().removeAllRanges(); //убираем все текущие выделения (т.е. выделенный input)
}