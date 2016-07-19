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

//LOADED DATA
var words; //массив слов
//ИЗМЕНЕНО НА PHP
/*
var words = [    
   {value:"вечерами", rate:5, censor:true},24
   {value:"внутри", rate:5, censor:true},1
   {value:"да", rate:5, censor:true},2
   {value:"доту", rate:5, censor:true},3
   {value:"играть", rate:5, censor:true},4
   {value:"киса", rate:5, censor:true},5
   {value:"книжки", rate:5, censor:true},6
   {value:"лапки", rate:5, censor:true},7
   {value:"люблю", rate:5, censor:true},8
   {value:"мечтать", rate:5, censor:true},9
   {value:"милая", rate:5, censor:true},10
   {value:"я", rate:5, censor:true},11
   {value:"мурмурмур", rate:5, censor:true},12
   {value:"носик", rate:5, censor:true},13
   {value:"няша-стесняша", rate:5, censor:true},14
   {value:"особенно", rate:5, censor:true},15
   {value:"полный", rate:5, censor:true},16
   {value:"пушистые", rate:5, censor:true},17
   {value:"скромная", rate:5, censor:true},18
   {value:"счастье", rate:5, censor:true},19
   {value:"такая", rate:5, censor:true},20
   {value:"такие", rate:5, censor:true},21
   {value:"читать", rate:5, censor:true},22
   {value:"я тебя люблю", rate:5, censor:true},23
   
   {value:"пизда", rate:5, censor:false},
   {value:"бояться", rate:12, censor:true},
   {value:"важный", rate:4, censor:true},
   {value:"великий", rate:3, censor:true},
   {value:"вести", rate:6, censor:true},
   {value:"внимание", rate:7, censor:true},
   {value:"военный", rate:10, censor:true},
   {value:"все-таки", rate:11, censor:true},
   {value:"давно", rate:1, censor:true},
   {value:"даже", rate:3, censor:true},
   {value:"действительно", rate:7, censor:true},
   {value:"живой", rate:8, censor:true},
   {value:"задача", rate:9, censor:true},
   {value:"ебать", rate:3, censor:false},
   {value:"известный", rate:2, censor:true},
   {value:"блядь", rate:18, censor:false},
   {value:"информация", rate:14, censor:true},
   {value:"мера", rate:13, censor:true},
   {value:"муж", rate:12, censor:true},
   {value:"наконец", rate:6, censor:true},
   {value:"нахуй", rate:1, censor:false},
   {value:"огромный", rate:0, censor:true},
   {value:"окно", rate:14, censor:true},
   {value:"ответ", rate:2, censor:true},
   {value:"показать", rate:9, censor:true},
   {value:"охуенный", rate:5, censor:false},
   {value:"положение", rate:11, censor:true},
   {value:"поставить", rate:14, censor:true},
   {value:"правило", rate:14, censor:true},
   {value:"правительство", rate:3, censor:true},
   {value:"шлюха", rate:11, censor:false},
   {value:"прийтись", rate:9, censor:true},
   {value:"программа", rate:7, censor:true},
   {value:"производство", rate:16, censor:true},
   {value:"происходить", rate:22, censor:true},
   {value:"простой", rate:3, censor:true},
   {value:"пиздец", rate:12, censor:false},
   {value:"разговор", rate:1, censor:true},
   {value:"рынок", rate:5, censor:true},
   {value:"семья", rate:7, censor:true},
   {value:"сколько", rate:3, censor:true},
   {value:"смерть", rate:13, censor:true},
   {value:"совершенно", rate:10, censor:true},
   {value:"становиться", rate:2, censor:true},
   {value:"стена", rate:2, censor:true},
   {value:"существовать", rate:10, censor:true},
   {value:"сын", rate:14, censor:true},
   {value:"сука", rate:7, censor:false},
   {value:"третий", rate:10, censor:true},
   {value:"труд", rate:5, censor:true},
   {value:"федерация", rate:3, censor:true},
   {value:"хотеться", rate:1, censor:true},
   {value:"центр", rate:2, censor:true}
];

var words = [    
   {value:"пизда", 		rate:5, censor:false},
   {value:"бояться", 	rate:12, censor:true},
   {value:"важный",		rate:4, censor:true},
   {value:"великий", 	rate:3, censor:true},
   {value:"вести", 		rate:6, censor:true},
   {value:"внимание", 	rate:7, censor:true},
   {value:"военный",	   rate:10, censor:true},
   {value:"все-таки",	rate:11, censor:true},
   {value:"давно", 		rate:1, censor:true},
   {value:"даже", 		rate:3, censor:true},
   {value:"действительно", rate:7, censor:true},
   {value:"живой", 		rate:8, censor:true},
   {value:"задача", 		rate:9, censor:true},
   {value:"ебать", 		rate:3, censor:false},
   {value:"известный", 	rate:2, censor:true},
   {value:"блядь", 		rate:18, censor:false},
   {value:"информация", rate:14, censor:true},
   {value:"мера", 		rate:13, censor:true},
   {value:"муж",			rate:12, censor:true},
   {value:"наконец", 	rate:6, censor:true},
   {value:"нахуй", 		rate:1, censor:false},
   {value:"огромный", 	rate:0, censor:true},
   {value:"окно", 		rate:14, censor:true},
   {value:"ответ",		rate:2, censor:true},
   {value:"показать", 	rate:9, censor:true},
   {value:"охуенный", 	rate:5, censor:false},
   {value:"положение", 	rate:11, censor:true},
   {value:"поставить", 	rate:14, censor:true},
   {value:"правило", 	rate:14, censor:true},
   {value:"правительство", rate:3, censor:true},
   {value:"шлюха", 		rate:11, censor:false},
   {value:"прийтись", 	rate:9, censor:true},
   {value:"программа", 	rate:7, censor:true},
   {value:"производство", rate:16, censor:true},
   {value:"происходить", rate:22, censor:true},
   {value:"простой", rate:3, censor:true},
   {value:"пиздец", rate:12, censor:false},
   {value:"разговор", rate:1, censor:true},
   {value:"рынок", rate:5, censor:true},
   {value:"семья", rate:7, censor:true},
   {value:"сколько", rate:3, censor:true},
   {value:"смерть", rate:13, censor:true},
   {value:"совершенно", rate:10, censor:true},
   {value:"становиться", rate:2, censor:true},
   {value:"стена", rate:2, censor:true},
   {value:"существовать", rate:10, censor:true},
   {value:"сын", rate:14, censor:true},
   {value:"сука", rate:7, censor:false},
   {value:"третий", rate:10, censor:true},
   {value:"труд", rate:5, censor:true},
   {value:"федерация",	 rate:3, censor:true},
   {value:"хотеться",		 rate:1, censor:true},
   {value:"центр",		 rate:2, censor:true}
];
*/

//CLIENT DATA OBJECTS
var video = {
   _phrasevid:[],
   _freevid:[], //стэк свободных видеоэлементов
   _mainvid:null, //фоновое основное видео (ссылка на элемент)
   _curvideonum: null, //номер текущего видео в массиве _phrasevid[]
	_timerId:null, //id таймера во время загрузки видео
	isplayed:false,
	isloading:false,
   
   initialize: function() {
      var vid = d.getElementById("video_list").children;
      this._mainvid = vid[0];
      for (var i=1;i<vid.length;i++) this._freevid.push(vid[i]);
   },
   
   add: function(id) {//id добавляемого слова
		//проверка, играет ли видео совершается в добавлении слова во фразу
      var newv = this._freevid.pop();//берем свободный тег видео
      this._phrasevid.push(newv);//добавляем в текущий "плейлист"
      newv.loaded = false;//флажок готовности к проигрыванию
      //setTimeout(function(){newv.loaded=true;}, 5000); //для тестирования загрузки
		newv.oncanplaythrough = function() {this.loaded = true;} //в функции this = видео объект
      newv.children[0].src = 'video/v'+id+'.mp4';      
      newv.children[1].src = 'video/v'+id+'.ogg';      
      newv.children[2].src = 'video/v'+id+'.webm';
      newv.load();
   },
   
   delete: function(numb_in_phrase) {
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
				d.getElementById("video_start").style.opacity="0";//скрываем кнопку play
				d.getElementById("video_loading").style.display="";//показываем иконку загрузки
				d.getElementById("video_list").style.cursor="pointer";//курсор для обертки вокруг видео, т.к. при нажатии - пауза
			}
			self._timerId = setTimeout("video.start();", 400);
         return;
      }
		
		d.getElementById("video_loading").style.display="none"; //скрываем иконку загрузки
      d.getElementById("video_start").style.opacity="0";//скрываем кнопку play
		d.getElementById("video_list").style.cursor="pointer";//курсор для обертки вокруг видео, т.к. при нажатии - пауза
      
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
      this._phrasevid[num].onended = function() {video.playWord(num+1)};//проигрывание следующего по завершению
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
      this._mainvid.style.display="";
		this._mainvid.play();//запускаем фоновое видео
      d.getElementById("video_start").style.opacity="1";//показываем кнопку
		d.getElementById("video_list").style.cursor="default";
      phrase.decolorize();
      this.isplayed = false;
		this._curvideonum = null;
		for (var i = 0; i < this._phrasevid.length; i++)
		{
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
      for (var i=0; i<this._phrasevid.length; i++) 
         if (this._phrasevid[i].loaded == false) return false;
      return true;
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
		
      if (this._curPhrase.length==0) this.showControls();//показать элементы управления
      this._curPhrase.push(newWord);//добавляем в фразу
      this._curIds.push(id);
      this._block.appendChild(newWord);//добавляем на страницу
      this._block.appendChild(d.createTextNode(' '));//добавлили пробел
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
      if (el.parentElement.tagName!='SPAN') return;
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
         if (ph[i].offsetTop!=ph[i+1].offsetTop) {ln[i].style.display="none"; continue;}//на разных строках
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
      for (var i=0; i<this._curPhrase.length;i++)
         this._curPhrase[i].className="";
      for (var i=0; i<this._lines.length; i++)
         this._lines[i].style.backgroundColor="#ececec";
      
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
      if (stype=="popular") res="popular";
      else {
         res="alpha-";
         res += wtype;
      }
      if (this._censor) res = "c"+res;
      return res;
   },
   
   initialize: function() {
      this._curTable = d.getElementById("cpopular");
      this._curSection = d.querySelector('li[data-type="popular"]');
      this._curWordType = d.querySelector('td[data-type="nouns"]');
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
      if (el.tagName!='LI' || el == self._curSection) return;//кликнули на открытый элемент или мимо элемента
      
      var type = el.getAttribute("data-type");
      
      var table = d.getElementById("word-type");
      if (type=="popular") {
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
      if (el.tagName!='TD' || el == self._curSection) return;//кликнули на открытый элемент или мимо элемента
      
      self._curWordType.className="";//деактивировали старый раздел
      self._curWordType = el;//изменили текущий
      self._curWordType.className="active";//активировали его

      self._curTable.style.display = "none";//скрываем старую таблицу
      self._curTable = d.getElementById(self._curTableId);//получаем новую
      self._curTable.style.display="";//показываем новую      
   }   
}


function DOMloaded()
{
   //CONTENT
   words = d.body.firstElementChild.textContent.split('&'); //получаем список слов
	d.body.removeChild(d.body.firstElementChild); //удаляем узел, где были слова
	
	
	checkPhrases(); //проверка популярных фраз на неоходимость добавления переноса
   wordSection.initialize(); //инициализация обработчика навигации по секциям слов
   phrase.initialize(); //инициализация объекта текущей фразы
   video.initialize();//инициализация объекта плэйлиста видео
   checkLocation(); //проверка наличия фразы в ссылке
   
   //EVENTS
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
   d.getElementById("video_start").onclick = function() { 
		if (video.isplayed || video.isloading) video.stop();
		else video.start();
	} //нажатие на кнопку воспроизведения	
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
   var str = window.location.search;
	
	//в запросе нет фразы
	if (str=='' || str=='?') return;
	
	str = str.slice(1); //убираем знак "?"
	
	//проверяем чтоб каждый символ был цифрой или амперсандом
	for (var i = 0; i < str.length; i++)
	{
		if (str[i] != '&' &&  (str[i] < "0" || str[i] > "9")) 
			return;
	}
	
	//массив чисел (id)
	str = str.split("&");
	
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
   if (phrase._curIds.length>0) s='?'+phrase._curIds.join('&');
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