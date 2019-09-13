var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
path=null;

var ch = "101";

var ppath = "/w/c/";
var theFile = new File(ppath+"XA_P_DRV/lehjxrf tankobon/07vol/"+ch+"/"+ch+".txt");//Юникодную кодировку блокнота не жрёт. w:\c\XA_P_DRV\lehjxrf tankobon\06vol\87\
//массив для мусора
var contents = new Array();
theFile.encoding = "UTF8";
theFile.open("r");
contents = theFile.read();
theFile.close();
var str = contents.toString();
var sp = "\n";
var strline =  str.split(sp);
var laststr = strline.length - 1; 
var i = 0;

var fontName = "MPMangaFontBold"; 

for (i = 1; i<=laststr; i++) { //Пропускаем первую строку, так как там обычно номер главы
    if (strline[i][0]=="0"){
		var fileRef = open(File(ppath+"XA_P_DRV/lehjxrf tankobon/07vol/"+ch+"/PSD/Aho-Girl_v07_ch"+ch+"_p"+strline[i][1]+strline[i][2]+"_d.psd"))
		var ipage = i;//номер строки с номером страницы
		continue
	};

	var nexti = i + 1;
	var nextnexti = nexti + 1;
	//проверка пустой строки
	if (strline[i] =="") continue;
	//говорим что активный документ - наш открытый файл (не обазатяльно, но для наглядности)
	app.activeDocument = fileRef;
	var artLayerRef = app.activeDocument.artLayers.add() 
	artLayerRef.kind = LayerKind.TEXT;
	var textItemRef = artLayerRef.textItem; 
	textItemRef.size = 3.84;
	textItemRef.font = fontName;
	textItemRef.contents = strline[i]
	//textItemRef.position = Array(i, i * 20 + 20) 
	textItemRef.autoKerning = AutoKernType.OPTICAL;
	textItemRef.justification = Justification.CENTER;
	
	switch(strline[i][1]){// ставим основным выбор шрифта
		case "z":
			var fontNamez = "Kursiv95";
			textItemRef.font = fontNamez;
			textItemRef.justification = Justification.RIGHT
			textItemRef.size = 7.2;//7.2  30
			if (strline[i][2]=="1"){posz1()};
			if (strline[i][2]=="2"){posz2()};
			if (strline[i][2]==")"){posz1();slice3(); break;};
			slice4();
			break;
		case "d": var fontNamed = "DomkratYOfix"; textItemRef.font = fontNamed; slice3(); posdef(); break;
		case "l": var fontNamel = "LazyCrazy";    textItemRef.font = fontNamel; slice3(); posdef(); break;
		case "t":
			var fontNamet = "Tahoma";
			textItemRef.font = fontNamet; 
			textItemRef.justification = Justification.LEFT
			slice3();
			posdef();
			break;
		case "c":
			var fontNamec = "ComicSansMS";
			textItemRef.font = fontNamec; 
			textItemRef.size = 5.84;
			textItemRef.justification = Justification.LEFT
			slice3();
			posdef();
			break;
		default:
			textItemRef.font = fontName;
			posdef();
			break;
	}
/* 	switch(strline[i][1]){ //Зачатки позиционирования по конкретным кадрам на странице
		case "1": poslcoma1(); slice3(); break;
		case "2": poslcoma2(); slice3(); break;
		case "3": poslcoma3(); slice3(); break;
		case "4": poslcoma4(); slice3(); break;
		case "5": posrcoma5(); slice3(); break;
		case "6": posrcoma6(); slice3(); break;
		case "7": posrcoma7(); slice3(); break;
		case "8": posrcoma8(); slice3(); break;
		//default:
		//textItemRef.font = fontName;
	} */
	if (strline[nexti]==""&&strline[nextnexti][0]=="0"){
//--------------------------- На последней странице батча
//Error 21: undefined is not an object.
//Line: 133   //   92
//->  	if (strline[nexti]==""&&strline[nextnexti][0]=="0"){
//---------------------------
	//alert("s"+fileName)
	var psdFile = new File(ppath+"XA_P_DRV/lehjxrf tankobon/07vol/"+ch+"/PSD/Aho-Girl_v07_ch"+ch+"_p"+strline[ipage][1]+strline[ipage][2]+"_d.psd");
	PhotoshopSaveOptions = new PhotoshopSaveOptions();
	PhotoshopSaveOptions.alphaChannels = true;
	PhotoshopSaveOptions.annotations = false;
	PhotoshopSaveOptions.embedColorProfile = false;
	PhotoshopSaveOptions.layers = true;
	PhotoshopSaveOptions.spotColors = false;
	activeDocument.saveAs(psdFile, PhotoshopSaveOptions, true, Extension.LOWERCASE);
	activeDocument.close(SaveOptions.DONOTSAVECHANGES)
	continue;
	//	fileclose();
	}
}
function posz1(){textItemRef.position = Array(760, 45)}
function posz2(){textItemRef.position = Array(370, 45)}
function posdef(){			
	//Три строки ниже нагло сперты со скрипта
	//var textPosition = [fileRef.width/2,i * 20 + 20];
	//Строки слипаются меж собой 
//Версия расположения строк подряд с херовым межстрочным интервалом. Так и не пофикшено.
//	var lineHeight = fileRef.height/(strline.length+1);
//	var y0=fileRef.height/2-strline.length*lineHeight/2 + lineHeight/2;
//	var textPosition = [fileRef.width/2,y0+i*lineHeight];
	var lineHeight = fileRef.height/(strline.length+1); //Эта переменная рассчитывается исходя кол-ва строк на странице, а в скрипте нет разделения текста по страницам - в переменной все страницы разом - поэтому такой ебически маленький интервал.
	var y0=fileRef.height/2-strline.length*lineHeight/2 + lineHeight/2;
	var textPosition = [fileRef.width/2,y0+i*lineHeight];	textItemRef.position = textPosition;
	}
/* function poslcoma1(){var textPosition = [580, 70+i*15]; textItemRef.position = textPosition;}
function poslcoma2(){var textPosition = [580, 330+i*15]; textItemRef.position = textPosition;}
function poslcoma3(){var textPosition = [580, 600+i*15]; textItemRef.position = textPosition;}
function poslcoma4(){var textPosition = [580, 870+i*15]; textItemRef.position = textPosition;}
function posrcoma5(){textItemRef.position = Array(205, 70+i*15)}
function posrcoma6(){textItemRef.position = Array(205, 330+i*15)}
function posrcoma7(){textItemRef.position = Array(205, 600+i*15)}
function posrcoma8(){textItemRef.position = Array(205, 870+i*15)} */
//Обрезатор строк
function slice3(){textItemRef.contents = strline[i].slice(3)}
function slice4(){textItemRef.contents = strline[i].slice(4)}