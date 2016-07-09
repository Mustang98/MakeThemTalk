var d = document;
d.addEventListener("DOMContentLoaded", DOMloaded);

var MAX_WORD_COUNT = 16*3; //в каждой категории

//LOADED DATA
var phrases = [
   {code:"35&17&21&18&0&1&15&11&23&40", rate:158},
   {code:"14&6&1&23&8", rate:147},
   {code:"24&34&9&8&10&11&45&47&40", rate:147},
   {code:"1&36", rate:130},
   {code:"31&6&11&23&9", rate:122},
   {code:"21&1&15&11&23&39&7&14", rate:101},
   {code:"10&9", rate:93},
   {code:"21&1&15&11&23&39&7&14&21&1&15&11&23&39&7&14", rate:90}
];

/*
var words = [    
   {value:"вечерами", rate:5, censor:true},
   {value:"внутри", rate:5, censor:true},
   {value:"да", rate:5, censor:true},
   {value:"доту", rate:5, censor:true},
   {value:"играть", rate:5, censor:true},
   {value:"киса", rate:5, censor:true},
   {value:"книжки", rate:5, censor:true},
   {value:"лапки", rate:5, censor:true},
   {value:"люблю", rate:5, censor:true},
   {value:"мечтать", rate:5, censor:true},
   {value:"милая", rate:5, censor:true},
   {value:"я", rate:5, censor:true},
   {value:"мурмурмур", rate:5, censor:true},
   {value:"носик", rate:5, censor:true},
   {value:"няша-стесняша", rate:5, censor:true},
   {value:"особенно", rate:5, censor:true},
   {value:"полный", rate:5, censor:true},
   {value:"пушистые", rate:5, censor:true},
   {value:"скромная", rate:5, censor:true},
   {value:"счастье", rate:5, censor:true},
   {value:"такая", rate:5, censor:true},
   {value:"такие", rate:5, censor:true},
   {value:"читать", rate:5, censor:true},
   {value:"я тебя люблю", rate:5, censor:true},
   
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
];*/

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

var categories = {
   nouns:"0&12&15&16&17&18&22&23&26&28&29&30&32&33&37&38&39&41&44&46&47&49&50&52",
   adjectives:"2&3&6&11&14&21&25&35&48",
   verbs:"1&4&13&24&27&31&34&43&45&51",
   other:"5&7&8&9&10&19&20&36&40&42",
   //popular:"0&23&1&22&2&21&3&20&4&19&5&18&6&17&7&16&8&15&9&14&10&13&11&12&5",
   popular:"34&15&33&28&27&22&46&16&41&17&36&1&18&7&30&26&6&48&42&45&12&31&24&11&5",
   cpopular:"34&33&28&27&22&46&16&41&17&1&18&7&26&6&48&42&45&12&31&24&11&5&44&29&21"
};

//CLIENT DATA OBJECTS
var video = {
   _phrasevid:[],
   _freevid:[], //стэк свободный видеоэлементов
   _mainvid:null, //фоновое основное видео (ссылка на элемент)
   isplayed:false,
   
   initialize: function() {
      var vid = d.getElementById("video_list").children;
      this._mainvid = vid[0];
      for (var i=1;i<vid.length;i++) this._freevid.push(vid[i]);
   },
   
   add: function(id) {//id добавляемого слова
		//проверка совершается в добавлении слова во фразу
      var newv = this._freevid.pop();//берем свободный тег видео
      this._phrasevid.push(newv);//добавляем в текущий "плейлист"
      newv.loaded = false;//флажок готовности к проигрыванию
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
         notification("Фраза пуста. Добавьте слова из таблицы справа"); 
         return;
      }
      if (self.canPlay() == false)
      {
         notification("Видео еще не загружено, сделай TimeOut/события или прочую хуйету"); 
         return;
      }
      d.getElementById("video_start").style.opacity="0";//скрываем кнопку play
      d.getElementById("video_stop").style.opacity="";//открываем доступ к кнопке stop
      d.getElementById("video_stop").style.zIndex="50";
      //вообще убрать паузу, при нажатии в любое место останавливать
      
      self.isplayed = true;
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
      
      this._phrasevid[num].style.display = "";//показываем текущее видео
      phrase.colorize(num, "active");//подсвечиваем текущее слово
      this._phrasevid[num].play();//включаем текущее

   },
   
   finish: function() {
      this._mainvid.style.display="";
      d.getElementById("video_stop").style.opacity="0";//скрываем доступ к кнопке stop
      d.getElementById("video_start").style.opcity="1";//показываем кнопку
      phrase.decolorize();
      this.isplayed = false;
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
         notification("Максимум 15 слов");
         return ;
      }
      
      var newWord = d.createElement('SPAN');//создание
      newWord.textContent = words[id].value;
      
      var newImg = d.createElement('IMG');
      newImg.src = "img/close.png";
      newImg.setAttribute('title','Нажмите для удаления');
      newWord.appendChild(newImg);
      
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
         notification("Дождитесь окончания видео");
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
         notification("Дождитесь окончания видео");
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
         notification("Дождитесь окончания видео");
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
   showWords();//наполнение таблицы словами
   showPhrases(); //наполнения популярных фраз
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
   d.getElementById("video_start").onclick = video.start;//нажатие на кнопку воспроизведения
}

//LOADED CONTENT INSERTION
function showPhrases() {
   var a, img, newph;
   var ul = d.getElementById('pop-phrases');
   for (var i = 0; i < phrases.length; i++)
   {
      newph = d.createElement('LI');
      a = d.createElement('A');
      a.setAttribute('href','/karina?'+phrases[i].code);
      a.textContent = parsePhrase(phrases[i].code);
      img = d.createElement('IMG');
      img.setAttribute('src', 'img/play_phrase.png');    
      newph.appendChild(a);
      newph.appendChild(img);
      ul.appendChild(newph);
      if (newph.offsetHeight-a.offsetHeight>5) a.innerHTML = parsePhrase(phrases[i].code, true);
   }
}

function showWords() {
   var tables = d.querySelector('div.words-cover').children;
   fillTable(tables[0],categories.nouns, true);
   fillTable(tables[1],categories.verbs, true);
   fillTable(tables[2],categories.adjectives, true);
   fillTable(tables[3],categories.other, true);
   fillTable(tables[4],categories.nouns);
   fillTable(tables[5],categories.verbs);
   fillTable(tables[6],categories.adjectives);
   fillTable(tables[7],categories.other);
   fillTable(tables[8],categories.popular);
   fillTable(tables[9],categories.cpopular);
}

function checkLocation() {
   var str = window.location.search;
   if (str=='' || str=='?') return;
   str = str.slice(1).split('&');
   for (var i=0; i<str.length;i++) phrase.add(str[i]);
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
   if (video.isplayed) notification("Дождитесь окончания видео");
   else phrase.add(el.id.slice(1));
}

//ELSE INERMEDIATE FUNCTIONS
function parsePhrase(s, br) {
   var r="";
   s = s.split('&');
   for (var i=0;i < s.length;i++) s[i] = words[s[i]].value;
   s[0] = s[0][0].toUpperCase() + s[0].slice(1);
   if (br) s[s.length-2]+="<br>";
   return s.join(' ');
}

function fillTable(table, code, censor) {//table to fill, code of words, censor or not
   var s = code.split('&');
   var rows = table.rows;
   var t=-1, sp, height = rows.length, width = rows[0].cells.length;
   for (var j=0; j<width; j++) //заполняем таблицу по столбцам
      for (var i=0; i<height; i++)
      {
         t++; //текущее рассматриваемое слово
         if (t>=s.length) return; //если положили все слова - выходим
         if (censor && words[s[t]].censor==false) {i--; continue;} //если слово класть нельзя, идем дальше (ячейка та же)
         sp = d.createElement('SPAN');
         sp.id = 'n'+s[t]; //id слова - его код
         sp.innerHTML = words[s[t]].value;
         rows[i].cells[j].appendChild(sp);
      }
}

function notification(message){
   alert(message);
}

function updateLink(){
   var s='';
   if (phrase._curIds.length>0) s='?'+phrase._curIds.join('&');
   d.getElementById("link").value = "https://MakeThemTalk.ru/karina"+s;
}