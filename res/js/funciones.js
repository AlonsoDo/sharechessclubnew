function SendChatText(){
        
    var cNickName = $('#nick-id').val();
    var cTxtChat = $('#TxtMsg').val();    
                
    connection.getSocket().emit('MiEvento',{
        NickSender: cNickName,
        CustomMessage: cTxtChat,
        Chanel: cChanel,
        SubEvent: 'Chat'
    });    
                
    $('#DivTextChat').append('<span style="color:red; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            cNickName + ': ' + '</span>' + 
                            '<span style="color:green; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTxtChat + '</span><br>');
    $('#DivTextChat').animate({scrollTop: $('#DivTextChat').prop('scrollHeight')}, 500);
    $('#TxtMsg').val('');
}

var cColorSide = 'White';
var aPos;
var aPosiciones;
var ContPosi;
var CasIniSel,CasFinSel;
var CasIniSelCas,CasFinSelCas;
var Click1;
var CasIni,CasFin
var oPiezaIni;
var ObjFin;
var Moving;
var aCas = ['a8','b8','c8','d8','e8','f8','g8','h8',
            'a7','b7','c7','d7','e7','f7','g7','h7',
            'a6','b6','c6','d6','e6','f6','g6','h6',
            'a5','b5','c5','d5','e5','f5','g5','h5',
            'a4','b4','c4','d4','e4','f4','g4','h4',
            'a3','b3','c3','d3','e3','f3','g3','h3',
            'a2','b2','c2','d2','e2','f2','g2','h2',
            'a1','b1','c1','d1','e1','f1','g1','h1'
            ];
var NodoPadre;
var BufferNodoPadre;
var aVariantes;
var TotalNodos;
var BufferMoveClick;
var BufferContPosi;
var ClickOnMove;
var NodoPadre2;
var ContPosi2;
var VarianteDesplegada;
var SobreVariante;
var ContadorPiezasSet = 20;
var ContRect = 1;
var aColorCas = [];
var UltimoMovimiento = false;
var BufferNodoPadre2;
var BufferContPosi2;
var Symbol = '';
var aFENs = [];

function Reset(){
    
    Symbol = '';
    UltimoMovimiento = false;
    aPosiciones = [];
    ContPosi = 0;    
    NodoPadre = -1;
    aVariantes = [];
    TotalNodos = 0;
    ClickOnMove = false;
    
    var aBuffer = new Array(5);
    aBuffer[0] = -1; // Nodo padre;
    aBuffer[1] = 0; // Nodo hijo
    aBuffer[2] = 'INI:'; // Move
    aBuffer[3] = ''; //Text
    aBuffer[4] = false; //VarianteVista
    aBuffer[5] = Symbol;
    aVariantes.push(aBuffer);
    
    NodoPadre = 0;
    BufferNodoPadre = 0;
    ContPosi = 1;
    BufferContPosi = 1;
    TotalNodos = 1;
    
    aPos = ['br1','bn1','bb1','bq' ,'bk' ,'bb2','bn2','br2',
            'bp1','bp2','bp3','bp4','bp5','bp6','bp7','bp8',
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            'wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8',
            'wr1','wn1','wb1','wq' ,'wk' ,'wb2','wn2','wr2',
            '0'  ,'0'  ,'0'  ,''   ,'0'  ,'0'  ,'0'  ,'0'];
    
    //aPos[64] = Casilla buffer si hay captura
    //aPos[65] = CasIni
    //aPos[66] = CasFin
    //aPos[67] = Cadena move
    //aPos[68] = PeonIniCor
    //aPos[69] = DamaFinCor
    
    Click1 = false;
    Moving = false;    
    
    var aBuffer2 = new Array(72);
    var i;
    for (i = 0; i < aBuffer2.length; i++){
        aBuffer2[i] = aPos[i];
    }    
    
    aPosiciones.push(aBuffer2);
    ContPosi = aPosiciones.length-1;       
        
    $('#DivMoves').append('<div id="diver'+ContPosi+'" style="float:left; border:0px solid black;"></div>');        
    $('#diver' + ContPosi).append('<label id="'+ContPosi+'" onclick="MoveClick(id)" style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px">INI:</label>');
        
    BufferMoveClick = ContPosi;
    $('#'+ContPosi).css('background-color','yellow');
    
    VarianteDesplegada = true;
    SobreVariante = false;
    
    //Ocultar botones navegacion hasta que haya movimientos nuevos
    $('#'+ContPosi).hide();
    $('#BtnIni').hide();
    $('#BtnEnd').hide();
    $('#BtnNext').hide();
    $('#BtnPrev').hide();
    
    ContadorPiezasSet = 20;
    
    rectRed = false;
    rectBlue = false;
    rectCoral = false;
    rectBlack = false;
    
    //ContRect = 1;
    
    nConCas = 1;
    
    aColorCas = [];
    
    aFENs = [];
    
    var aFEN = new Array(6);
    
    aFEN[0] = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    aFEN[1] = 'w';
    aFEN[2] = 'KQkq';
    aFEN[3] = '-';
    aFEN[4] = '0';
    aFEN[5] = '1';
    
    aFENs.push(aFEN);
    
    console.log(aFENs);

}

function ReverseMove(Top,Left,Name){
    
    getItemByName(Name).set({top:442-Top-49+2,left:442-Left-49+2});
    getItemByName(Name).setCoords();
    
}

function LeftTopToCas(xObj,yObj,cColor,oObj){

    var nCol,nFila,nCas;
    
    if (xObj<=49){
        nCol = 0;
        oObj.set({left:27});        
    }else if ((xObj>=49)&&(xObj<=98)){
        nCol = 1;
        oObj.set({left:76});        
    }else if ((xObj>=98)&&(xObj<=147)){
        nCol = 2;
        oObj.set({left:125});        
    }else if ((xObj>=147)&&(xObj<=196)){
        nCol = 3;
        oObj.set({left:174});        
    }else if ((xObj>=196)&&(xObj<=245)){
        nCol = 4;
        oObj.set({left:223});        
    }else if ((xObj>=245)&&(xObj<=294)){
        nCol = 5;
        oObj.set({left:272});        
    }else if ((xObj>=294)&&(xObj<=343)){
        nCol = 6;
        oObj.set({left:321});        
    }else if (xObj>=343){
        nCol = 7;
        oObj.set({left:370});        
    }
    
    if (yObj<=49){
        nFila = 0;
        oObj.set({top:27});        
    }else if ((yObj>=49)&&(yObj<=98)){
        nFila = 1;
        oObj.set({top:76});        
    }else if ((yObj>=98)&&(yObj<=147)){
        nFila = 2;
        oObj.set({top:125});        
    }else if ((yObj>=147)&&(yObj<=196)){
        nFila = 3;
        oObj.set({top:174});        
    }else if ((yObj>=196)&&(yObj<=245)){
        nFila = 4;
        oObj.set({top:223});        
    }else if ((yObj>=245)&&(yObj<=294)){
        nFila = 5;
        oObj.set({top:272});        
    }else if ((yObj>=294)&&(yObj<=343)){
        nFila = 6;
        oObj.set({top:321});        
    }else if (yObj>=343){
        nFila = 7;
        oObj.set({top:370});        
    }
    
    oObj.setCoords();
    canvas.renderAll();
    
    if (cColor=='White') {
        nCas = (nFila*8)+nCol;
    }else{
        nCas = 63-((nFila*8)+nCol);
    }
    return nCas;

}

function ConvertToSymbol(Pieza){
    
    var Symbol = '';
    
    if (Pieza=='wr') {
        Symbol = '&#114;';
    }else if (Pieza=='br') {
        Symbol = '&#116;';
    }else if (Pieza=='wn') {
        Symbol = '&#104;';
    }else if (Pieza=='bn') {
        Symbol = '&#106;';
    }else if (Pieza=='wb') {
        Symbol = '&#98;';
    }else if (Pieza=='bb') {
        Symbol = '&#110;';
    }else if (Pieza=='wq') {
        Symbol = '&#113;';
    }else if (Pieza=='bq') {
        Symbol = '&#119;';
    }else if (Pieza=='wk') {
        Symbol = '&#107;';
    }else if (Pieza=='bk') {
        Symbol = '&#108;';
    }else if (Pieza=='wp') {
        Symbol = '&#112;';
    }else if (Pieza=='bp') {
        Symbol = '&#111;';
    }
    return Symbol;
}

function MakeMove(CodiPromo){
    
    //stockfish.postMessage("stop");
    
    var aFEN = new Array(6);
    
    aFEN[3] = '-';
    aFEN[4] = '0';
    aFEN[5] = '1';
    
    var cFENEnroque;
    
    if (NodoPadre!=-1){
        cFENEnroque = aFENs[NodoPadre][2];
    }else{
        cFENEnroque = aFENs[0][2];
    }    
    
    var Pieza;
    var cMove = '';
    var ColorPiezaIni = aPos[CasIni].substring(0,1);
    var ColorPiezaFin = aPos[CasFin].substring(0,1);
    var PiezaIni = aPos[CasIni];    
    var cPiezaMove = aPos[CasIni].substring(1,2);    
    cPiezaMove = cPiezaMove.toUpperCase();
    Pieza = aPos[CasIni].substring(0,2);
    
    if (ColorPiezaIni == 'w') {
        aFEN[1] = 'b';        
    }else{
        aFEN[1] = 'w';        
    }
    
    if (Pieza == 'wk') {
        cFENEnroque = cFENEnroque.replace('K','');
        cFENEnroque = cFENEnroque.replace('Q','');        
    }
    
    if (Pieza == 'bk') {
        cFENEnroque = cFENEnroque.replace('k','');
        cFENEnroque = cFENEnroque.replace('q',''); 
    }
    
    if (Pieza == 'wr' && CasIni == 63) {
        cFENEnroque = cFENEnroque.replace('K','');
    }
    
    if (Pieza == 'wr' && CasIni == 56) {
        cFENEnroque = cFENEnroque.replace('Q','');
    }
    
    if (Pieza == 'br' && CasIni == 0) {
        cFENEnroque = cFENEnroque.replace('q','');
    }
    
    if (Pieza == 'br' && CasIni == 7) {
        cFENEnroque = cFENEnroque.replace('k','');
    }
    
    if (cFENEnroque == '') {
        cFENEnroque = '-';
    }
    
    console.log('Enroque: ' + cFENEnroque)
    
    aFEN[2] = cFENEnroque;        
    
    aPos[65] = CasIni;
    aPos[66] = CasFin;
    
    aPos[68] = '0';
    aPos[69] = '0';
    
    // Casilla final vacia    
    if (aPos[CasFin]=='0'){  
        
        aPos[64] = '0';
                
        aPos[CasIni] = '0';
        aPos[CasFin] = PiezaIni;
        
        //cMove = cPiezaMove;
        Symbol = ConvertToSymbol(Pieza);
        cMove = cMove + aCas[CasIni] + '-' + aCas[CasFin];
        aPos[67] = cMove;
        
        if (cPiezaMove=='P'){
            
            var CasPeon;
            if (ColorPiezaIni == 'w') {
                if ((CasIni - CasFin) == 16) {
                    CasPeon = aCas[CasIni-8];
                }else{
                    CasPeon = '-';
                }
            }else{
                if ((CasFin - CasIni) == 16) {
                    CasPeon = aCas[CasIni+8];
                }else{
                    CasPeon = '-';
                }
            }
            
            aFEN[3] = CasPeon;
    
            console.log('Peon: ' + CasPeon)
            
            cMove = aCas[CasIni] + '-' + aCas[CasFin];
            aPos[67] = cMove;
            
            // Check Peon al paso
            if (IsPaP()){
                //alert('PaP');
            }            
            
            //Coronacion blancas
            if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){
                
                if (CodiPromo=='1'){     //Dama                
                    aPos[CasFin] = 'wq'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wq'+PiezaIni;
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=Q';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wq'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wq'));
                        object.name = 'wq'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='2'){      //Torre
                    aPos[CasFin] = 'wr'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wr'+PiezaIni;
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=R';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wr'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wr1'));
                        object.name = 'wr'+PiezaIni;
                        canvas.add(object);                    
                    }
                }else if (CodiPromo=='3'){      //Caballo
                    aPos[CasFin] = 'wn'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wn'+PiezaIni;
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=N';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wn'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wn1'));
                        object.name = 'wn'+PiezaIni;
                        canvas.add(object);                    
                    }
                }else if (CodiPromo=='4'){      //Alfil
                    aPos[CasFin] = 'wb'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wb'+PiezaIni;
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=B';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wb'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wb1'));
                        object.name = 'wb'+PiezaIni;
                        canvas.add(object);                    
                    }
                }
                
            }
            
            //Coronacion negras
            if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
                
                if (CodiPromo=='5'){     //Dama                
                    aPos[CasFin] = 'bq'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bq'+PiezaIni;                                
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=Q';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bq'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bq'));
                        object.name = 'bq'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='6'){     //Torre                
                    aPos[CasFin] = 'br'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'br'+PiezaIni;                                
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=R';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('br'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('br1'));
                        object.name = 'br'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='7'){     //Caballo                
                    aPos[CasFin] = 'bn'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bn'+PiezaIni;                                
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=N';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bn'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bn1'));
                        object.name = 'bn'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='8'){     //Alfil                
                    aPos[CasFin] = 'bb'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bb'+PiezaIni;                                
                    cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=B';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bb'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bb1'));
                        object.name = 'bb'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }
                
            }
                        
        }        
        
        //Enroques
        if (cPiezaMove=='K'){
            
            var wr,br;
            
            if ((CasIni==60)&&(CasFin==62)){
                wr = aPos[63];
                aPos[63] = '0';
                aPos[61] = wr;
                cMove = 'OO';
                aPos[67] = cMove;
            }else if ((CasIni==60)&&(CasFin==58)){
                wr = aPos[56];
                aPos[56] = '0';
                aPos[59] = wr;
                cMove = 'OOO';
                aPos[67] = cMove;
            }else if ((CasIni==4)&&(CasFin==6)){
                br = aPos[7];
                aPos[7] = '0';
                aPos[5] = br;
                cMove = 'OO';
                aPos[67] = cMove;
            }else if ((CasIni==4)&&(CasFin==2)){
                br = aPos[0];
                aPos[0] = '0';
                aPos[3] = br;
                cMove = 'OOO';
                aPos[67] = cMove;
            }
        }        
        
    // Captura
    }else if (((ColorPiezaIni=='w')&&(ColorPiezaFin=='b')) || ((ColorPiezaIni=='b')&&(ColorPiezaFin=='w'))){
                
        Pieza = aPos[CasIni].substring(0,2);
        Symbol = ConvertToSymbol(Pieza);
        
        cMove = '';
        aPos[64] = aPos[CasFin];         
        
        aPos[CasIni] = '0';
        aPos[CasFin] = PiezaIni;
        
        cMove =  cMove + aCas[CasIni] + 'x' + aCas[CasFin];
        aPos[67] = cMove;
        
        if (cPiezaMove=='P'){            
            
            cMove = aCas[CasIni] + 'x' + aCas[CasFin];
            aPos[67] = cMove;
            
            //Coronacion blancas
            if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){                
                
                if (CodiPromo=='1'){     //Dama                
                    aPos[CasFin] = 'wq'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wq'+PiezaIni;
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=Q';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wq'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wq'));
                        object.name = 'wq'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='2'){      //Torre
                    aPos[CasFin] = 'wr'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wr'+PiezaIni;
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=R';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wr'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wr1'));
                        object.name = 'wr'+PiezaIni;
                        canvas.add(object);                    
                    }
                }else if (CodiPromo=='3'){      //Caballo
                    aPos[CasFin] = 'wn'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wn'+PiezaIni;
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=N';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wn'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wn1'));
                        object.name = 'wn'+PiezaIni;
                        canvas.add(object);                    
                    }
                }else if (CodiPromo=='4'){      //Alfil
                    aPos[CasFin] = 'wb'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'wb'+PiezaIni;
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=B';
                    aPos[67] = cMove;                
                    
                    if (!CheckIfExist('wb'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('wb1'));
                        object.name = 'wb'+PiezaIni;
                        canvas.add(object);                    
                    }
                }                
                
            }
            
            //Coronacion negras
            if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
                                
                if (CodiPromo=='5'){     //Dama                
                    aPos[CasFin] = 'bq'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bq'+PiezaIni;                                
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=Q';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bq'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bq'));
                        object.name = 'bq'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='6'){     //Torre                
                    aPos[CasFin] = 'br'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'br'+PiezaIni;                                
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=R';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('br'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('br1'));
                        object.name = 'br'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='7'){     //Caballo                
                    aPos[CasFin] = 'bn'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bn'+PiezaIni;                                
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=N';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bn'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bn1'));
                        object.name = 'bn'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }else if (CodiPromo=='8'){     //Alfil                
                    aPos[CasFin] = 'bb'+PiezaIni;                
                    aPos[68] = PiezaIni;
                    aPos[69] = 'bb'+PiezaIni;                                
                    cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=B';
                    aPos[67] = cMove;
                    
                    if (!CheckIfExist('bb'+PiezaIni)){                    
                        var object = fabric.util.object.clone(getItemByName('bb1'));
                        object.name = 'bb'+PiezaIni;
                        canvas.add(object);                    
                    }                
                }                
                
            }            
            
        }        
                
    }
        
    CasFinSel.visible = true;
    Click1 = false;
    DrawPos();
            
    var aBuffer = new Array(72);
    var i;
    for (i = 0; i < aBuffer.length; i++){
        aBuffer[i] = aPos[i];
    } 
    
    BufferNodoPadre = ContPosi;    
    
    aPosiciones.push(aBuffer);
    ContPosi = aPosiciones.length-1;    
    
    //Nodo Padre
    if (ClickOnMove){
        ClickOnMove = false;
        NodoPadre = BufferMoveClick;
    }else{
        NodoPadre = BufferNodoPadre;
    }
    
    var aBuffer2 = new Array(6);
    aBuffer2[0] = NodoPadre;
    aBuffer2[1] = ContPosi;  //Mi nodo
    aBuffer2[2] = aPos[67]; //Move
    aBuffer2[3] = ''; // Texto
    aBuffer2[4] = false; // VarianteVista
    aBuffer2[5] = Symbol;
    
    aVariantes.push(aBuffer2);
    
    BufferNodoPadre2 = NodoPadre;
    BufferContPosi2 = ContPosi;    
    
    var HayHermano = false;
    var ContHermanos = 0;
    var UltimoHermano;
    
    //Check si hay hermanos para label en color rojo
    for (var x = 0; x < aVariantes.length; x++){
        if (NodoPadre==aVariantes[x][0]){
            ContHermanos++;
        }
        if (ContHermanos>1){
            HayHermano = true;
            break;
        }
    }    
    
    if (HayHermano){
        
        //Mostrar todos los hermanos , label red
        $('#DivMoves').html('');
        for (var x = 0; x < aVariantes.length; x++){
            if (NodoPadre==aVariantes[x][0]){
                $('#DivMoves').append('<div class="line"></div>');
                $('#DivMoves').append('<div style="float:left; margin-top:0px;" id="diver' +aVariantes[x][1] + '"><label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label><label id="'+aVariantes[x][1]+'" onclick="MoveClick(id)" style="float:left; color:red; margin-left:0px; margin-top:4px; font-size:17px; font-family:Arial,Helvetica,sans-serif;">' + aVariantes[x][2] + '</label></div>');
                ShowLine(aVariantes[x][1]);
                UltimoHermano = aVariantes[x][1];
            }
        }
        $('#'+UltimoHermano).css('background-color','yellow');
        BufferMoveClick = UltimoHermano;
        
        VarianteDesplegada = false;
        
    }else{            
        
        $('#'+BufferMoveClick).css('background-color','white');
        
        $('<div id="diver'+ContPosi+'" style="float:left; margin-top:0px; border:0px solid black;"></div>').insertAfter('#diver'+BufferMoveClick);
        $('#diver' + ContPosi).append('<label style="float:left; color:green; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + Symbol + '</label>');
        $('#diver' + ContPosi).append('<label style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+ContPosi+'" onclick="MoveClick(id)">' + cMove + '</label>');
                
        $('#'+ContPosi).css('background-color','yellow');
        BufferMoveClick = ContPosi;
        
        VarianteDesplegada = true;
        
    }    
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();
    
    // Crear FEN
    var cFEN = '';
    var Cont = 0;
    for ( var i = 0; i < 8; i++) {
        var ContCeros = 0;        
        for ( var j = 0; j < 8; j++) {
            if (aPos[Cont] == '0') {                
                ContCeros++;
                if (ContCeros == 8) {
                    cFEN = cFEN + '8';
                    ContCeros = 0;
                }
            }else{
                if (ContCeros > 0) {
                    cFEN = cFEN + ContCeros.toString();
                    ContCeros = 0;
                }
                if (aPos[Cont].substring(0,2) == 'br') {
                    cFEN = cFEN + 'r';
                }else if (aPos[Cont].substring(0,2) == 'bn') {
                    cFEN = cFEN + 'n';
                }else if (aPos[Cont].substring(0,2) == 'bb') {
                    cFEN = cFEN + 'b';
                }else if (aPos[Cont].substring(0,2) == 'bq') {
                    cFEN = cFEN + 'q';
                }else if (aPos[Cont].substring(0,2) == 'bk') {
                    cFEN = cFEN + 'k';
                }else if (aPos[Cont].substring(0,2) == 'bp') {
                    cFEN = cFEN + 'p';    
                }else if (aPos[Cont].substring(0,2) == 'wp') {
                    cFEN = cFEN + 'P';    
                }else if (aPos[Cont].substring(0,2) == 'wr') {
                    cFEN = cFEN + 'R';
                }else if (aPos[Cont].substring(0,2) == 'wn') {
                    cFEN = cFEN + 'N';
                }else if (aPos[Cont].substring(0,2) == 'wb') {
                    cFEN = cFEN + 'B';
                }else if (aPos[Cont].substring(0,2) == 'wq') {
                    cFEN = cFEN + 'Q';
                }else if (aPos[Cont].substring(0,2) == 'wk') {
                    cFEN = cFEN + 'K'; 
                }               
            }            
            Cont++;
        }        
        if (ContCeros > 0) {
            cFEN = cFEN + ContCeros.toString();
        }
        cFEN = cFEN + '/'
    }
    
    var cFEN = cFEN.substring(0, cFEN.length-1);
    aFEN[0] = cFEN;
    //console.log('cFEN[0] ' + cFEN)
    
    aFENs.push(aFEN);

    //aFEN[0]='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: ContPosi,
        Variantes: aVariantes,
        FENs: aFENs,
        HayHermano: HayHermano,
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick,
        TipoMove: 'Normal'
    });

    console.log('Make Move: ' + CadenaFEN)
    if (Analizando) {
        $('#Variant0').html('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }
    
    NodoPadre = ContPosi; //Listo para proximo movimiento
    
    UltimoMovimiento = true;     
        
};

function DrawPos() {

var x,y;
var Cont;
var objects = canvas.getObjects();

    for (x=0; x < objects.length; x++){
        if (canvas.item(x).get('type')=='image') {
            canvas.item(x).set({top:27,left:440});
            canvas.item(x).setCoords();            
        }        
    }
    canvas.renderAll();   
    
    if (cColorSide=='White'){        
        Cont = 0;        
        for (y=0; y < 8; y++){            
            for (x=0; x < 8; x++){
                if (aPos[Cont]!='0'){
                    if (CheckIfExist(aPos[Cont])){
                        if (getItemByName(aPos[Cont]).get('type')=='image') {  
                            getItemByName(aPos[Cont]).set({top:(y*49)+27,left:(x*49)+27});
                            getItemByName(aPos[Cont]).setCoords();
                        }
                    }                                      
                }                
                // Primer click
                if (Click1){
                    CasFinSel.visible = false;
                    if (CasIni==Cont){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }
                }else{                    
                    //Casillas ultimo movimiento
                    if ((CasIniSel.visible)&&(aPos[65]==Cont)){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                    
                    }
                    if ((CasFinSel.visible)&&(aPos[66]==Cont)){
                        CasFinSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }                    
                }                
                Cont++;
            }            
        }
    }else{ //Black
        Cont = 63;        
        for (y=0; y < 8; y++){            
            for (x=0; x < 8; x++){
                if (aPos[Cont]!='0'){                    
                    if (CheckIfExist(aPos[Cont])){
                        if (getItemByName(aPos[Cont]).get('type')=='image') { 
                            getItemByName(aPos[Cont]).set({top:(y*49)+27,left:(x*49)+27});
                            getItemByName(aPos[Cont]).setCoords();
                        }
                    }                    
                }
                // Primer click
                if (Click1){
                    CasFinSel.visible = false;
                    if (CasIni==Cont){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }
                }else{                    
                    //Casillas ultimo movimiento
                    if ((CasIniSel.visible)&&(aPos[65]==Cont)){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                    
                    }
                    if ((CasFinSel.visible)&&(aPos[66]==Cont)){
                        CasFinSel.set({top:(y*49)+25,left:(x*49)+25});
                    }                    
                }
                Cont--;
            }            
        }
    }
    
    CasFinSel.setCoords();
    CasIniSel.setCoords();
    canvas.renderAll();    
    
}

var canvas;
var canvas2;
var canvas3;
var rectRed = false;
var rectBlue = false;
var rectCoral = false;
var rectBlack = false;
var rect;
var ColorPiezaIni;
var ColorPiezaFin;

function CargarRecursos(){
    
    canvas2 = new fabric.Canvas('SquareCanvas',{
            hoverCursor: 'pointer'
    });
    
    //cuadrado rojo
    rect = new fabric.Rect({
        left: 8,
        top: 8,
        fill: 'red',
        width: 22,
        height: 22,
        selectable: false
    });
    rect.name = 'rectRed';
    canvas2.add(rect);
    canvas2.item(0).hasControls = canvas2.item(0).hasBorders = false;
    
    //cuadrado azul
    rect = new fabric.Rect({
        left: 8 + 30,
        top: 8,
        fill: 'blue',
        width: 22,
        height: 22,
        selectable: false
    });
    rect.name = 'rectBlue';
    canvas2.add(rect);
    canvas2.item(1).hasControls = canvas2.item(1).hasBorders = false;
    
    //cuadrado coral
    rect = new fabric.Rect({
        left: 8 + 30 + 30,
        top: 8,
        fill: 'coral',
        width: 22,
        height: 22,
        selectable: false
    });
    rect.name = 'rectCoral';
    canvas2.add(rect);
    canvas2.item(2).hasControls = canvas2.item(2).hasBorders = false;
    
    fabric.Image.fromURL('res/img/borrar.png',function(oImg){        
        oImg.set({left:8 + 30 + 30 + 30,top:8});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.lockMovementX = true;
        oImg.lockMovementY = true;
        oImg.name = 'rectBlack';
        canvas2.add(oImg);
    });    
    
    canvas2.on({
        'mouse:down':function(e){
            if (e.target.name == 'rectRed'){
                rectRed = true;                
            }else if (e.target.name == 'rectBlue') {
                rectBlue = true;
            }else if (e.target.name == 'rectCoral') {
                rectCoral = true;
            }else if (e.target.name == 'rectBlack') {
                DibujarCasillas();
                aColorCas = [];
                connection.getSocket().emit('MiEvento',{
                Chanel: cChanel,
                SubEvent: 'SendBorrarCas'        
            });
            }
        }
    });
    
    canvas = new fabric.Canvas('BoardCanvas',{
            hoverCursor: 'pointer'            
    });
    
    canvas.backgroundColor = '#800080';
    canvas.selection = false;
    
    canvas.on({
                
        'object:moving':function(e){            
            
            Moving = true;
            
            /*connection.getSocket().emit('MiEvento',{
                Chanel: cChanel,
                SubEvent: 'Moving',
                Top: e.target.top,
                Left: e.target.left,
                Name: e.target.name,
                ColorSide: cColorSide
            });*/
            
            CasIniSel.visible = true;                     
                               
        },
    
        'mouse:down':function(e){             
            
            if (rectRed) {
                CasIni = LeftTopToRec(e.target.left,e.target.top,cColorSide,e.target);
                rectRed = false;
                DibujarCas('red',CasIni);
                SaveRect('red',CasIni);
                SendRect(aColorCas);
            }else if (rectBlue) {
                CasIni = LeftTopToRec(e.target.left,e.target.top,cColorSide,e.target);
                rectBlue = false;
                DibujarCas('blue',CasIni);
                SaveRect('blue',CasIni);
                SendRect(aColorCas);
            }else if (rectCoral) {
                CasIni = LeftTopToRec(e.target.left,e.target.top,cColorSide,e.target);
                rectCoral = false;
                DibujarCas('coral',CasIni);
                SaveRect('coral',CasIni);
                SendRect(aColorCas);
            }else{            
            
                // Primer click
                if (Click1==false){
                    
                    if (e.target.get('type')=='image'){                    
                        
                        canvas.bringToFront(e.target);
                        CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);                    
                        
                        console.log(CasIni)
                        
                        ColorPiezaIni = aPos[CasIni].substring(0,1);                    
                        
                        CasIniSel.set({top:e.target.top-2,left:e.target.left-2});
                        CasIniSelCas = CasIni;
                        CasIniSel.visible = true;
                        CasFinSel.visible = false;
                        oPiezaIni = e.target;                   
                        Click1 = true;                    
                        
                    }
                    
                }else{ //Segundo click
                    
                    if (Moving==false){                    
                                        
                        CasFin = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                        
                        console.log('Cas:'+CasFin)
                        
                        ColorPiezaFin = aPos[CasFin].substring(0,1);                    
                        
                        if (ColorPiezaIni!=ColorPiezaFin){                        
                            
                            //Prevent desplazar casilla
                            e.target.set({top:e.target.top-2,left:e.target.left-2});
                            
                            //var ObjFin = e.target;
                            ObjFin = e.target;
                            
                            if (IsPromotion()){
                                $('#dialog-promo').dialog('open');
                            }else{
                                MakeMove('0');
                            }
                                                    
                        
                        }else if (CasIni==CasFin){                        
                            
                            CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                                                    
                            if (CasIniSel.visible){
                                CasIniSel.visible = false;
                                //Desactivar objeto
                                Click1 = false;
                            }else{
                                CasIniSel.visible = true;
                            }
                            
                        }else if (ColorPiezaIni==ColorPiezaFin){
                                                    
                            oPiezaIni = e.target;
                            CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                            CasIniSel.set({top:e.target.top-2,left:e.target.left-2});
                            CasIniSel.visible = true;
                            CasFinSel.visible = false;
                            
                        }                    
                        
                    }
                }
                
                CasIniSel.setCoords();
                canvas.renderAll();
                
            }
                        
        },
        
        'mouse:up':function(e){            
                
            if (Moving){
                
                CasFin = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                
                //Misma Casilla
                if (CasIni==CasFin){
                    
                    CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);    
                    oPiezaIni = e.target;
                    
                    Moving = false;
                    
                }else{ 
                    
                    var NameObjFin = aPos[CasFin];
                    if (NameObjFin=='0'){
                        NameObjFin = aPos[CasIni];
                    }else{
                        NameObjFin = aPos[CasFin];
                    }
                    //var ObjFin = getItemByName(NameObjFin);                                       
                    ObjFin = getItemByName(NameObjFin);
                    
                    if (IsPromotion()){
                        $('#dialog-promo').dialog('open');
                    }else{
                        MakeMove('0');
                    }                                        
                    
                    Moving = false;                   
                    
                }                                                  
            
            }            
            
        }
    
    });
    
    var cColorCas = 'rgba(240,217,181,1)';
        
    //Casilla inicial seleccionada
    CasIniSel = new fabric.Rect({
        left: 25,
        top: 25,
        fill: '',
        width: 48,
        height: 48,
        selectable: false
    });
    CasIniSel.set({strokeWidth:2,stroke:'rgba(100,200,200,1)'});
    canvas.add(CasIniSel);
    canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
    
    //Casilla Final seleccionada
    CasFinSel = new fabric.Rect({
        left: 25+49,
        top: 25+49,
        fill: '',
        width: 48,
        height: 48,
        selectable: false
    });
    CasFinSel.set({strokeWidth:2,stroke:'rgba(100,200,200,1)'});
    canvas.add(CasFinSel);
    canvas.item(1).hasControls = canvas.item(1).hasBorders = false;
    
    CasIniSel.visible = false;
    CasFinSel.visible = false;
    
    //Borde del tablero
    rect = new fabric.Rect({
        left: 24,
        top: 24,
        fill: cColorCas,
        width: 394,
        height: 394,
        selectable: false
    });
    
    canvas.add(rect);
    canvas.item(2).hasControls = canvas.item(2).hasBorders = false;
    
    var nConCas = 1;
    // Casillas
    for (y=0; y < 8; y++){		
	
        for (x=0; x < 8; x++){	    
            
            rect = new fabric.Rect({
                left: (x*49)+25,
                top: (y*49)+25,
                fill: cColorCas,
                width: 49,
                height: 49,
                selectable: false
            });            
            rect.name = 'cas'+nConCas;
            canvas.add(rect);
            canvas.item(nConCas).hasControls = canvas.item(nConCas).hasBorders = false;
            nConCas = nConCas + 1;            
			
	    if (cColorCas == 'rgba(240,217,181,1)'){
		cColorCas = 'rgba(181,136,99,1)';
	    }else{
		cColorCas = 'rgba(240,217,181,1)';
	    }
            
	}		
	if (cColorCas == 'rgba(240,217,181,1)'){
	    cColorCas = 'rgba(181,136,99,1)';
	}else{
	    cColorCas = 'rgba(240,217,181,1)';
	}
        
    }
    
    // Create Pieces
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:2+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:51+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:100+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bq.png',function(oImg){        
        oImg.set({left:149+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bq';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bk.png',function(oImg){        
        oImg.set({left:198+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bk';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:247+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:296+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:345+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br2';
        canvas.add(oImg);
    });
    
    //Peones negras
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(0*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp1';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(1*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp2';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(2*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp3';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(3*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp4';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(4*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp5';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(5*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp6';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(6*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp7';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(7*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp8';
        canvas.add(oImg);            
    });
    
    //Peones blancas
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(0*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp1';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(1*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp2';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(2*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp3';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(3*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp4';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(4*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp5';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(5*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp6';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(6*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp7';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(7*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp8';
        canvas.add(oImg);            
    });    
    
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:2+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wr1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:51+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:100+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wq.png',function(oImg){        
        oImg.set({left:149+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wq';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wk.png',function(oImg){        
        oImg.set({left:198+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wk';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:247+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:296+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:345+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wr2';         
        canvas.add(oImg);
    });    
    
    ColocarCoordenadas('White');
    
    canvas.bringToFront(CasIniSel);
    canvas.bringToFront(CasFinSel);    
    
}

function ColocarCoordenadas(cColor){

    var text;
    
    //Horizontal
    if (cColor=='White'){
        text = new fabric.Text('a',{selectable:false,left:45,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'a';
        canvas.add(text);        
        text = new fabric.Text('b',{selectable:false,left:94,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'b';
        canvas.add(text);
        text = new fabric.Text('c',{selectable:false,left:143,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'c';
        canvas.add(text);
        text = new fabric.Text('d',{selectable:false,left:192,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'd';
        canvas.add(text);
        text = new fabric.Text('e',{selectable:false,left:241,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'e';
        canvas.add(text);
        text = new fabric.Text('f',{selectable:false,left:290,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'f';
        canvas.add(text);
        text = new fabric.Text('g',{selectable:false,left:339,top:421,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'g';
        canvas.add(text);
        text = new fabric.Text('h',{selectable:false,left:388,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = 'h';
        canvas.add(text);
    }
    
    //Vertical
    if (cColor=='White'){
        text = new fabric.Text('8',{selectable:false,left:6,top:45,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '8';
        canvas.add(text);
        text = new fabric.Text('7',{selectable:false,left:6,top:94,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '7';
        canvas.add(text);
        text = new fabric.Text('6',{selectable:false,left:6,top:143,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '6';
        canvas.add(text);
        text = new fabric.Text('5',{selectable:false,left:6,top:192,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '5';
        canvas.add(text);
        text = new fabric.Text('4',{selectable:false,left:6,top:241,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '4';
        canvas.add(text);
        text = new fabric.Text('3',{selectable:false,left:6,top:290,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '3';
        canvas.add(text);
        text = new fabric.Text('2',{selectable:false,left:6,top:339,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '2';
        canvas.add(text);
        text = new fabric.Text('1',{selectable:false,left:6,top:388,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        text.name = '1';
        canvas.add(text);
    }
}

function FlipCoordenadas(cColor){
    
     //Horizontal
    if (cColor=='White'){
        getItemByName('a').set({left:45,top:423});
        getItemByName('a').setCoords();
        getItemByName('b').set({left:94,top:423});
        getItemByName('b').setCoords();
        getItemByName('c').set({left:143,top:423});
        getItemByName('c').setCoords();
        getItemByName('d').set({left:192,top:423});
        getItemByName('d').setCoords();
        getItemByName('e').set({left:241,top:423});
        getItemByName('e').setCoords();
        getItemByName('f').set({left:290,top:423});
        getItemByName('f').setCoords();
        getItemByName('g').set({left:339,top:421});
        getItemByName('g').setCoords();
        getItemByName('h').set({left:388,top:423});
        getItemByName('h').setCoords();        
    }else{        
        getItemByName('a').set({left:388,top:423});
        getItemByName('a').setCoords();
        getItemByName('b').set({left:339,top:423});
        getItemByName('b').setCoords();
        getItemByName('c').set({left:290,top:423});
        getItemByName('c').setCoords();
        getItemByName('d').set({left:241,top:423});
        getItemByName('d').setCoords();
        getItemByName('e').set({left:192,top:423});
        getItemByName('e').setCoords();
        getItemByName('f').set({left:143,top:423});
        getItemByName('f').setCoords();
        getItemByName('g').set({left:94,top:421});
        getItemByName('g').setCoords();
        getItemByName('h').set({left:45,top:423});
        getItemByName('h').setCoords();
    }
    
    //Vertical
    if (cColor=='White'){
        getItemByName('1').set({left:6,top:388});
        getItemByName('1').setCoords();
        getItemByName('2').set({left:6,top:339});
        getItemByName('2').setCoords();
        getItemByName('3').set({left:6,top:290});
        getItemByName('3').setCoords();
        getItemByName('4').set({left:6,top:241});
        getItemByName('4').setCoords();
        getItemByName('5').set({left:6,top:192});
        getItemByName('5').setCoords();
        getItemByName('6').set({left:6,top:143});
        getItemByName('6').setCoords();
        getItemByName('7').set({left:6,top:94});
        getItemByName('7').setCoords();
        getItemByName('8').set({left:6,top:45});
        getItemByName('8').setCoords();
    }else{
        getItemByName('1').set({left:6,top:45});
        getItemByName('1').setCoords();
        getItemByName('2').set({left:6,top:94});
        getItemByName('2').setCoords();
        getItemByName('3').set({left:6,top:143});
        getItemByName('3').setCoords();
        getItemByName('4').set({left:6,top:192});
        getItemByName('4').setCoords();
        getItemByName('5').set({left:6,top:241});
        getItemByName('5').setCoords();
        getItemByName('6').set({left:6,top:290});
        getItemByName('6').setCoords();
        getItemByName('7').set({left:6,top:339});
        getItemByName('7').setCoords();
        getItemByName('8').set({left:6,top:388});
        getItemByName('8').setCoords();
    }   
    
}

function getItemByName(name){
    
    var object = null,
        objects = canvas.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            object = objects[x];
            break;
        }   
    }
    
    return object;
    
}

function CheckIfExist(name){
    
    var objects = canvas.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            return true;
        }   
    }
    
    return false;
    
}

function IsPromotion(){
    
    var cPiezaMove = aPos[CasIni].substring(1,2);    
    cPiezaMove = cPiezaMove.toUpperCase();    
    
    if (cPiezaMove == 'P'){
        if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){
            $('#wqpromo').show();
            $('#wrpromo').show();
            $('#wnpromo').show();
            $('#wbpromo').show();
            $('#bqpromo').hide();
            $('#brpromo').hide();
            $('#bnpromo').hide();
            $('#bbpromo').hide();
            return true;
        }else if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
            $('#wqpromo').hide();
            $('#wrpromo').hide();
            $('#wnpromo').hide();
            $('#wbpromo').hide();
            $('#bqpromo').show();
            $('#brpromo').show();
            $('#bnpromo').show();
            $('#bbpromo').show();
            return true;
        }            
    }    
    
    return false;
    
}

function IsPaP(){
    
    // Blancas derecha
    if ((CasIni>23)&&(CasIni<31)&&(CasFin>16)&&(CasFin<24)){
        if ((CasIni-CasFin)==7){
            aPos[CasIni+1] = '0';
            return true;    
        }        
    }
    
    // Blancas izquierda
    if ((CasIni>24)&&(CasIni<32)&&(CasFin>15)&&(CasFin<23)){
        if ((CasIni-CasFin)==9){
            aPos[CasIni-1] = '0';
            return true;    
        }        
    }
    
    // Negras derecha
    if ((CasIni>31)&&(CasIni<39)&&(CasFin>40)&&(CasFin<48)){
        if ((CasFin-CasIni)==9){
            aPos[CasIni+1] = '0';
            return true;    
        }        
    }
    
    // Negras izquierda
    if ((CasIni>32)&&(CasIni<40)&&(CasFin>39)&&(CasFin<47)){
        if ((CasFin-CasIni)==7){
            aPos[CasIni-1] = '0';
            return true;    
        }        
    }
    
    return false;
    
}

function MoveClick(id){
    
    UltimoMovimiento = false;
    
    if ($('#'+id).css('color')=='rgb(128, 0, 0)') {
        $('#'+id).css('color','rgb(255, 0, 0)');
        aVariantes[id][4]=false;
    }else if ($('#'+id).css('color')=='rgb(255, 0, 0)'){
        $('#'+id).css('color','rgb(128, 0, 0)');
        aVariantes[id][4]=true;
    }
    
    var cText = aVariantes[id][3];
    var cMove = aVariantes[id][2];
    
    console.log(cText);
    console.log(cMove);
    
    if (cText != '' ) {
        $('#DivTextChat').append('<span style="color:red; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            cMove + ': ' + '</span>' + 
                            '<span style="color:green; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cText + '</span><br>');
        $('#DivTextChat').animate({scrollTop: $('#DivTextChat').prop('scrollHeight')}, 500);
        
        $('#addtxt').val(cText);        
        
    }else{
        $('#addtxt').val('');
    }
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: id,
        Variantes: aVariantes,
        FENs: aFENs,
        //HayHermano: false,
        //NodoPadre: -1,
        //BufferMoveClick: 0,
        TipoMove: 'TxT'
    });
    
    $('#'+BufferMoveClick).css('background-color','white'); 
    
    $('#'+id).css('background-color','yellow');
    
    //Ir a posicion
    for (var i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[id][i];
    }    
    
    ContPosi = id;

    var aFEN = aFENs[ContPosi];
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    console.log(CadenaFEN)
    if (Analizando) {
        $('#bestmovelabel').text('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;
        // Primer click
        if (Click1){
            Click1 = false;
        }
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();
    
    for (var x = 0; x < aVariantes.length; x++){
        // Buscar nodo padre
        if (ContPosi==aVariantes[x][1]){                   
            NodoPadre = aVariantes[x][0];
            if (NodoPadre==-1){
                NodoPadre = 0;
            }
            break;
        }                
    }
    
    BufferMoveClick = id;
    ClickOnMove = true;
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'MoveClickEvent',
        Posiciones: aPosiciones,
        ContPosi: ContPosi,
        Variantes: aVariantes, 
        FENs: aFENs,               
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick
    });    
    
}

function MoveClick2(id){
    
    UltimoMovimiento = false;
        
    $('#DivMoves').html('');
    
    $('#'+BufferMoveClick).css('background-color','white');
    
    //Ir a posicion
    for (var i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[id][i];
    }    
    
    ContPosi = id;

    var aFEN = aFENs[ContPosi];
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    console.log(CadenaFEN)
    if (Analizando) {
        $('#bestmovelabel').text('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;
        // Primer click
        if (Click1){
            Click1 = false;
        }
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();
    
    for (var x = 0; x < aVariantes.length; x++){
        // Buscar nodo padre
        if (ContPosi==aVariantes[x][1]){                   
            NodoPadre = aVariantes[x][0];
            if (NodoPadre==-1){
                NodoPadre = 0;
            }
            break;
        }                
    }
    
    BufferMoveClick = id;
    ClickOnMove = true;
    
    // Buscar nodos hijos
    for (var x = 0; x < aVariantes.length; x++){
        
        if (NodoPadre==aVariantes[x][0]){
            
            $('#DivMoves').append('<div class="line"></div>');            
            
            // Variante vista
            if (aVariantes[x][4] == true) {                
                 
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:rgb(128, 0, 0); margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                           
            }else{                
                
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                                
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                            
            }            
            
            ShowLine(aVariantes[x][1]);            
        }
    }    
    
    $('#'+id).css('background-color','yellow');
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'MoveClick2Event',
        Posiciones: aPosiciones,
        ContPosi: ContPosi,
        Variantes: aVariantes, 
        FENs: aFENs,               
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick
    });
    
}

function MoveClick5(id){
    
    UltimoMovimiento = false;        
        
    $('#'+BufferMoveClick).css('background-color','white');
    
    //Ir a posicion
    for (var i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[id][i];
    }    
    
    ContPosi = id;
    NodoPadre = id - 1;

    var aFEN = aFENs[ContPosi];
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    console.log(CadenaFEN)
    if (Analizando) {
        $('#bestmovelabel').text('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;
        // Primer click
        if (Click1){
            Click1 = false;
        }
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();    
    
    BufferMoveClick = id;
    ClickOnMove = true;       
    
    $('#'+id).css('background-color','yellow');
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'MoveClick5Event',
        Posiciones: aPosiciones,
        ContPosi: ContPosi,
        Variantes: aVariantes, 
        FENs: aFENs,               
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick
    });
    
}

function ShowLine(Nodo){    
    
    for (var x = 0; x < aVariantes.length ; x++){
    
        if (aVariantes[x][0]==Nodo){ //Padre
            
            //Check si tiene hermanos
            var HayHermano = false;
            var ContHermanos = 0;
            var NodoHermano;            
            
            NodoHermano = aVariantes[x][0];
            ContHermanos = 0;
            
            //Check si hay hermanos
            for (var i = 0; i < aVariantes.length; i++){
                if (NodoHermano==aVariantes[i][0]){
                    ContHermanos++;
                }
                if (ContHermanos>1){
                    HayHermano = true;
                    break;
                }
            }
            
            if (HayHermano){                
                
                $('#DivMoves').append('<label id="'+aVariantes[x][1]+'" onclick="MoveClick2(id)" style="float:left; color:purple; margin-left:5px; margin-top:0px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">' + '(...+)' + '</label>');
                        
            }else{
                
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:green; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                                
                ShowLine(aVariantes[x][1]);                
            
            }
            
            break;
        
        }
    
    }    
    
}

function ShowLineBack(Cont){
    
    //Check si tiene hermanos
    var HayHermano = false;
    var ContHermanos = 0;
    var NodoHermano;
        
    for (var x = 0; x < aVariantes.length; x++){
                               
        if (NodoPadre2==aVariantes[x][1]){
            
            NodoPadre2 = aVariantes[x][0];
            ContPosi2 = aVariantes[x][1];
                        
            HayHermano = false;
            NodoHermano = aVariantes[x][0];
            ContHermanos = 0;
            
            //Check si hay hermanos
            for (var i = 0; i < aVariantes.length; i++){
                if (NodoHermano==aVariantes[i][0]){
                    if (NodoHermano != (-2)) {
                        ContHermanos++;
                    }                    
                }
                if (ContHermanos>1){
                    HayHermano = true;
                    break;
                }
            }
            
            if (HayHermano){                
                $('#DivMoves').append('<div class="line"></div>');
                ShowLineHijos();
                VarianteDesplegada = true;
                break;
            }else{
                Cont++;                
                ShowLineBack(Cont);
            }            
            
            if (NodoPadre2==-1){                
                ContPosi2 = aVariantes[x][1];
                $('#DivMoves').html('');                
                ShowLine(-1);
                break;
            }                       
            
        }
        
    }    
    
}

function ShowLineHijos(){
    
    //Mostrar todos los hermanos , label red
    $('#DivMoves').html('');
    for (var x = 0; x < aVariantes.length; x++){
        if (NodoPadre2==aVariantes[x][0]){
            $('#DivMoves').append('<div class="line"></div>');            
            if (aVariantes[x][4]==true) {                
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:rgb(128, 0, 0); margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
            }else{                
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
            }            
            ShowLine(aVariantes[x][1]);                            
        }
    }   
    
}

function FinalLine(){
    
    var Cont = 0;
    var Buffer = 0;
    
    for (var x = 0; x < aVariantes.length; x++){
        if (aVariantes[x][0]==ContPosi){
            Cont++;
            Buffer = aVariantes[x][1];
        }
    }
    
    if (Cont==1){
        
        $('#'+ContPosi).css('background-color','white');
        ContPosi = Buffer;
        $('#'+ContPosi).css('background-color','yellow');
        BufferMoveClick = ContPosi;
        
        if (ContPosi==0){
            CasIniSel.visible = false;
            CasFinSel.visible = false;            
        }else{
            CasIniSel.visible = true;
            CasFinSel.visible = true;
        }
        
        // Primer click
        if (Click1){
            Click1 = false;
        }
        
        //Ir a posicion
        for (var i = 0; i < aPos.length; i++){
            aPos[i] = aPosiciones[ContPosi][i];
        }        
        DrawPos();
        
        for (var x = 0; x < aVariantes.length; x++){
            // Buscar nodo padre
            if (ContPosi==aVariantes[x][1]){                   
                NodoPadre = aVariantes[x][0];
                if (NodoPadre==-1){
                    NodoPadre = 0;
                }
                break;
            }                
        }
        
        FinalLine();
        
    }
    
}

function GetMove(Message){
    
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i,j;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }

    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
                        
    if (aPosiciones.length > 1){
        CasIniSel.visible = true;
        CasFinSel.visible = true;    
    }    
                        
    //Posicion Actual
    ContPosi = Message.ContPosi;
    NodoPadre = Message.NodoPadre;   
    
    DrawPos();    
    
    var UltimoHermano;
    
    if (Message.HayHermano){
        
        //Mostrar todos los hermanos , label red
        $('#DivMoves').html('');
        for (var x = 0; x < aVariantes.length; x++){
            if (NodoPadre==aVariantes[x][0]){
                $('#DivMoves').append('<div class="line"></div>');               
                $('#DivMoves').append('<div style="float:left; margin-top:0px;" id="diver' +aVariantes[x][1] + '"><label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label><label id="'+aVariantes[x][1]+'" onclick="MoveClick(id)" style="float:left; color:red; margin-left:0px; margin-top:4px; font-size:17px; font-family:Arial,Helvetica,sans-serif;">' + aVariantes[x][2] + '</label></div>');
                ShowLine(aVariantes[x][1]);
                UltimoHermano = aVariantes[x][1];
            }
        }
        $('#'+UltimoHermano).css('background-color','yellow');
        BufferMoveClick = UltimoHermano;
        
        VarianteDesplegada = false;
        
    }else{        
        
        NodoPadre2 = NodoPadre;
        ContPosi2 = ContPosi;        
            
        ShowLineBack(0);                
        
        $('#'+ContPosi).css('background-color','yellow');
        BufferMoveClick = ContPosi;
        
        VarianteDesplegada = true;
        
    }    
    
    NodoPadre = ContPosi; //Listo para proximo movimiento
    
    // Primer click
    if (Click1){
        Click1 = false;
    }
    
    if (Message.TipoMove=='FEN'){       
        
        $('#DivMoves').html('');       
        
        $('#DivMoves').append('<div id="diver'+ContPosi+'" style="float:left; border:0px solid black;"></div>');        
        $('#diver' + ContPosi).append('<label id="'+ContPosi+'" onclick="MoveClick(id)" style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px">INI:</label>');
                
        BufferMoveClick = ContPosi;
        $('#'+ContPosi).show();
        $('#'+ContPosi).css('background-color','yellow');
        
        $('#BtnIni').hide();
        $('#BtnPrev').hide();
        $('#BtnNext').hide();
        $('#BtnEnd').hide();
        
        CasIniSel.visible = false;
    
        Click1 = true;
            
        DrawPos();
        
        Click1 = false;
        
    }else if (Message.TipoMove=='Load'){
        
        $('#DivMoves').html('');        
        ShowLine(-1);
        
        CasIniSel.visible = false;
    
        Click1 = true;
            
        DrawPos();
        
        Click1 = false;
        
    }else if (Message.TipoMove=='LoadPGN') {
        
        CheckPromos();
        
        $('#DivMoves').html('');
        
        ContPosi = 0;      
                
        ShowLine(-1);
                
        CasIniSel.visible = false;
    
        Click1 = true;
        
        //Ir a posicion
        for (var i = 0; i < aPos.length; i++){
            aPos[i] = aPosiciones[Message.ContPosi][i];
        }
        
        var Index = Message.ContPosi;
        $('#'+Index).css('background-color','yellow');
        BufferMoveClick = Index;
        ContPosi = Message.ContPosi;        
            
        DrawPos();
        
        Click1 = false;
        
        $('#BtnIni').show();
        $('#BtnPrev').show();
        $('#BtnNext').show();
        $('#BtnEnd').show();        
        
    }else if (Message.TipoMove=='ClearAll'){    
    
        $('#DivMoves').html('');
        
        Reset();            
        
        $('#BtnIni').hide();
        $('#BtnPrev').hide();
        $('#BtnNext').hide();
        $('#BtnEnd').hide();
        
        CasIniSel.visible = false;
    
        Click1 = true;
            
        DrawPos();
        
        Click1 = false;  
    
    }else if (Message.TipoMove=='TxT') {        
        
        console.log(aVariantes[ContPosi][2])
        console.log(aVariantes[ContPosi][3])
        
        // Comprobar si movimiento tiene comentario
        if (aVariantes[ContPosi][3] != '') {    
        
            var cMove = aVariantes[ContPosi][2];
            var cText = aVariantes[ContPosi][3];
            
            $('#DivTextChat').append('<span style="color:red; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                                    cMove +  ': ' + '</span>' + 
                                    '<span style="color:green; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                                    aVariantes[ContPosi][3] + '</span><br>');
            $('#DivTextChat').animate({scrollTop: $('#DivTextChat').prop('scrollHeight')}, 500);
            
            $('#' + ContPosi).text(cMove);
            
            $('#addtxt').val(cText);
        
        }else{
            $('#addtxt').val('');
        }
        
    }
    
}

function BtnIniEvent(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }   
    
    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
                        
    NodoPadre = -1;
    NodoPadre2 = -1;
            
    ContPosi = 0;
    ContPosi2 = 0;
    
    //Posicion Actual
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }                    
            
    $('#DivMoves').html('');
    ShowLine(-1);            
            
    $('#'+ContPosi).css('background-color','yellow');
    BufferMoveClick = ContPosi;
                        
    CasIniSel.visible = false;
    CasFinSel.visible = false;
               
    DrawPos();
    
}

function BtnEndEvent(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }

    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
    
    NodoPadre = Message.NodoPadre;   
    ContPosi = Message.ContPosi;
    
    $('#DivMoves').html('');
    
    var HayHermano = false;
    var ContHermanos = 0;
    var UltimoHermano;
    
    //Check si hay hermanos para label en color rojo
    for (var x = 0; x < aVariantes.length; x++){
        if (NodoPadre==aVariantes[x][0]){
            ContHermanos++;
        }
        if (ContHermanos>1){
            HayHermano = true;
            break;
        }
    }    
    
    if (HayHermano){
        
        //Mostrar todos los hermanos , label red        
        for (var x = 0; x < aVariantes.length; x++){
            if (NodoPadre==aVariantes[x][0]){
                $('#DivMoves').append('<div class="line"></div>');                
                $('#DivMoves').append('<div style="float:left; margin-top:0px;" id="diver' +aVariantes[x][1] + '"><label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label><label id="'+aVariantes[x][1]+'" onclick="MoveClick(id)" style="float:left; color:red; margin-left:0px; margin-top:4px; font-size:17px; font-family:Arial,Helvetica,sans-serif;">' + aVariantes[x][2] + '</label></div>');
                ShowLine(aVariantes[x][1]);                
            }
        }
                
        VarianteDesplegada = false;
        
    }else{
        
        NodoPadre2 = NodoPadre;
        ContPosi2 = ContPosi;
        
        ShowLineBack(0);
        
        //Posicion Actual
        for (var i = 0; i < aPos.length; i++){
            aPos[i] = aPosiciones[ContPosi][i];
        }
        
        $('#'+ContPosi).css('background-color','yellow');
        BufferMoveClick = ContPosi;
        
        DrawPos();
        
        VarianteDesplegada = true;
        
    }    
    
}

function MoveClickEvent(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }

    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
    
    NodoPadre = Message.NodoPadre;
    ContPosi = Message.ContPosi;    
    
    //Posicion Actual
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }    
    
    $('#DivMoves').html('');    
    
    var HayHermano = false;
    var ContHermanos = 0;
    var UltimoHermano;
    
    //Check si hay hermanos para label en color rojo
    for (var x = 0; x < aVariantes.length; x++){
        if (NodoPadre==aVariantes[x][0]){
            ContHermanos++;
        }
        if (ContHermanos>1){
            HayHermano = true;
            break;
        }
    }    
    
    if (HayHermano){
        
        //Mostrar todos los hermanos , label red
        
        for (var x = 0; x < aVariantes.length; x++){
            if (NodoPadre==aVariantes[x][0]){
                $('#DivMoves').append('<div class="line"></div>');                
                
                 // Variante vista
                if (aVariantes[x][4] == true) {                
                     
                    $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                    
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:rgb(128, 0, 0); margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                                    
                }else{                
                    
                    $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                                    
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                                    
                }               
                
                ShowLine(aVariantes[x][1]);                
            }
        }
                
        VarianteDesplegada = false;
        
    }else{
        
        NodoPadre2 = NodoPadre;
        ContPosi2 = ContPosi;
        
        ShowLineBack(0);
        
        VarianteDesplegada = true;
        
    }     
    
    $('#'+ContPosi).css('background-color','yellow');
    BufferMoveClick = ContPosi;
    ClickOnMove = true;
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;                
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();
    
}

function MoveClick2Event(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }

    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
    
    NodoPadre = Message.NodoPadre;
    ContPosi = Message.ContPosi; 
    
    //Posicion Actual
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }
    
    $('#DivMoves').html('');    
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;        
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();    
    
    BufferMoveClick = ContPosi;
    ClickOnMove = true;
    
    // Buscar nodos hijos
    for (var x = 0; x < aVariantes.length; x++){
        if (NodoPadre==aVariantes[x][0]){
            $('#DivMoves').append('<div class="line"></div>');
                        
             // Variante vista
            if (aVariantes[x][4] == true) {                
                 
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:rgb(128, 0, 0); margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                            
            }else{                
                
                $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');
                                
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                            
            }             
            
            ShowLine(aVariantes[x][1]);            
        }
    }    
    
    $('#'+BufferMoveClick).css('background-color','yellow');
    
}

function MoveClick5Event(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }
    
    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }

    NodoPadre = Message.NodoPadre;
    ContPosi = Message.ContPosi; 
    
    //Posicion Actual
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }
    
    //$('#DivMoves').html('');    
    
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;        
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos();
    
    $('#'+BufferMoveClick).css('background-color','white');
    
    BufferMoveClick = ContPosi;
    ClickOnMove = true;        
    
    $('#'+BufferMoveClick).css('background-color','yellow');
    
}

function BtnPrevEvent(Message){
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }

    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }
    
    NodoPadre = Message.NodoPadre;
    ContPosi = Message.ContPosi;        
    
    $('#DivMoves').html('');    
            
    NodoPadre2 = Message.NodoPadre2;
    ContPosi2 = Message.ContPosi2;
    
    ShowLineBack(0);
    
    if (NodoPadre2==-1){
        $('#DivMoves').html('');
        ShowLine(-1);    
    }    
    
    $('#'+ContPosi).css('background-color','yellow');
    BufferMoveClick = ContPosi;
    
    //Posicion Actual
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }
            
    if (ContPosi==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;        
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    DrawPos(); 
    
}

function BtnNextEvent(Message){
    
    var HayHermano = false;
    var ContHermanos = 0;
    var NodoHermano;
    
    $('#0').show();
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();    
    
    Click1 = false;
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];
                                                
    var x,i;
    
    for ( x = 0; x < Message.Posiciones.length; x++){                            
        aPosiciones.push(Message.Posiciones[x]);                          
    }
    
    CheckPromos();
    
    for ( x = 0; x < Message.Variantes.length; x++){                            
        aVariantes.push(Message.Variantes[x]);                          
    }
    
    for ( x = 0; x < Message.FENs.length; x++){
        aFENs.push(Message.FENs[x]);
    }

    NodoPadre = Message.NodoPadre;
    ContPosi = Message.ContPosi;        
    
    $('#DivMoves').html('');    
            
    NodoPadre2 = Message.NodoPadre;
    ContPosi2 = Message.ContPosi;    
            
    ShowLineBack(0);
    
    if (NodoPadre2==-1){
        $('#DivMoves').html('');
        ShowLine(-1);    
    }    
    
    SobreVariante = Message.SobreVariante;
    VarianteDesplegada = Message.VarianteDesplegada;
    
     if (SobreVariante){
        SobreVariante = false;
        MoveClick2(ContPosi);
    }else{            
            
        for (var x = 0; x < aVariantes.length ; x++){                    
            if (aVariantes[x][1]==ContPosi){                    
                NodoHermano = aVariantes[x][0];                        
                //Check si hay hermanos
                for (var i = 0; i < aVariantes.length; i++){
                    if (NodoHermano==aVariantes[i][0]){
                        ContHermanos++;
                    }
                    if (ContHermanos>1){
                        HayHermano = true;
                        break;
                    }
                }                    
            }            
        }
        
        if ((HayHermano)&&(VarianteDesplegada==false)){
            //Mostrar todos los hermanos , label red
            $('#DivMoves').html('');
            for (var x = 0; x < aVariantes.length; x++){
                if (NodoHermano==aVariantes[x][0]){
                    $('#DivMoves').append('<div class="line"></div>');                    
                    $('#DivMoves').append('<div id="diver'+aVariantes[x][1]+'" style="float:left; border:0px solid black;"></div>');                    
                    
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:red; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + aVariantes[x][5] + '</label>');
                    $('#diver' + aVariantes[x][1]).append('<label style="float:left; color:rgb(128, 0, 0); margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+aVariantes[x][1]+'" onclick="MoveClick(id)">' + aVariantes[x][2] + '</label>');
                                                           
                    //Mostrar hijos
                    ShowLine(aVariantes[x][1]);                            
                }
            }
            VarianteDesplegada = true;
            $('#'+ContPosi).css('background-color','yellow');
            BufferMoveClick = ContPosi;
        }else{            
            //Control de variantes normal
            var Cont = 0;
            for (var x = 0; x < aVariantes.length ; x++){
                if (aVariantes[x][0]==ContPosi){
                    Cont++;
                }
            }
            if (Cont==0){
                
                //Fin de variante
            
            }else if (Cont==1){
                
                //Buscar hijo
                NodoPadre = ContPosi;
                for (var x = 0; x < aVariantes.length ; x++){
                    if (aVariantes[x][0]==NodoPadre){
                        ContPosi = aVariantes[x][1];   
                    }
                }
                
                $('#'+BufferMoveClick).css('background-color','white'); 
                $('#'+ContPosi).css('background-color','yellow');
                BufferMoveClick = ContPosi;                   
                
                var i;
                for (i = 0; i < aPos.length; i++){
                    aPos[i] = aPosiciones[ContPosi][i];
                }
                
                if (ContPosi==0){
                    CasIniSel.visible = false;
                    CasFinSel.visible = false;
                    // Primer click
                    if (Click1){
                        Click1 = false;
                    }
                }else{
                    CasIniSel.visible = true;
                    CasFinSel.visible = true;
                }
                
                DrawPos();                    
                
            }else if (Cont>1){
               
               if (SobreVariante==false){
                
                    SobreVariante = true;
                    
                    //Buscar primer hijo
                    NodoPadre = ContPosi;
                    for (var x = 0; x < aVariantes.length ; x++){
                        if (aVariantes[x][0]==NodoPadre){
                            ContPosi = aVariantes[x][1];
                            break;
                        }
                    }
                     
                    $('#'+BufferMoveClick).css('background-color','white'); 
                    $('#'+ContPosi).css('background-color','yellow');
                    BufferMoveClick = ContPosi;
                
                }
                
            }
        }
            
    }    
    
}

function SavePos(){
    
    var aObjPosi = [];
    var aObjVari = [];
    var aObjFENs = [];
    var aObjAll = [];
    
    for (var i = 0; i < aPosiciones.length; i++){
        aObjPosi.push({"Posi":aPosiciones[i]});
    }
    
    for (var i = 0; i < aVariantes.length; i++){
        aObjVari.push({"NodoPadre":aVariantes[i][0],"NodoHijo":aVariantes[i][1],"Movi":aVariantes[i][2],"Text":aVariantes[i][3],"VarianteVista":aVariantes[i][4],"Symbol":aVariantes[i][5]});
    }

    for (var i = 0; i < aFENs.length; i++){
        aObjFENs.push({"PosiFEN":aFENs[i]}); 
    }
    
    aObjAll.push({"Posiciones":aObjPosi,"Variantes":aObjVari,"PosiFENs":aObjFENs});
    
    var blob = new Blob([JSON.stringify(aObjAll)],{type:'text/plain;charset=utf-8'});
    
    saveAs(blob,$('#room-id').val());
    
}

function LoadPos(result){
    
    var aObjAll = eval('(' + result + ')');     
    
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob){
        // Great success! All the File APIs are supported.       
    }else{
        alert('The File APIs are not fully supported in this browser.');
        return;
    }    
    
    Reset();
    $('#DivMoves').html('');    
    
    aPosiciones = [];
    aVariantes = [];
    aFENs = [];

    for (var i = 0; i < aObjAll[0].PosiFENs.length; i++){
        aFENs.push(aObjAll[0].PosiFENs[i].PosiFEN);
    }
    
    for (var i = 0; i < aObjAll[0].Posiciones.length; i++){
        aPosiciones.push(aObjAll[0].Posiciones[i].Posi);
    }
    
    for (var i = 0; i < aObjAll[0].Variantes.length; i++){
        var Vista = aObjAll[0].Variantes[i].VarianteVista;
        if (Vista != true) {
            Vista = false;
        }
        aVariantes.push([aObjAll[0].Variantes[i].NodoPadre,aObjAll[0].Variantes[i].NodoHijo,aObjAll[0].Variantes[i].Movi,aObjAll[0].Variantes[i].Text,Vista,aObjAll[0].Variantes[i].Symbol]);
    }    
    
    $('#BtnIni').show();
    $('#BtnPrev').show();
    $('#BtnNext').show();
    $('#BtnEnd').show();
        
    CasIniSel.visible = false;
    
    //Click1 = true;    
        
    Click1 = false;    
        
    ShowLine(-1);
    
    $('#0').show();
    
    ContPosi = 0;
    NodoPadre = -1;
    BufferMoveClick = 0;
    $('#BufferMoveClick').css('background-color','yellow');
    
    DrawPos();
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: 0,
        Variantes: aVariantes,
        FENs: aFENs,
        HayHermano: false,
        NodoPadre: -1,
        BufferMoveClick: 0,
        TipoMove: 'Load'
    });
    
    $('#BtnIni').trigger('click');
    
}

function ClearAll(){
    
    $('#DivMoves').html('');
    
    Reset();            
    
    $('#BtnIni').hide();
    $('#BtnPrev').hide();
    $('#BtnNext').hide();
    $('#BtnEnd').hide();
    
    CasIniSel.visible = false;
    
    Click1 = true;
        
    DrawPos();
    
    Click1 = false;      
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: 0,
        Variantes: aVariantes,
        FENs: aFENs,
        HayHermano: false,
        NodoPadre: -1,
        BufferMoveClick: 0,
        TipoMove: 'ClearAll'
    });
    
}

function IntroFen(){    
    
    var FenString = $('#fen-id').val();    
    var i = 0;
    var j = 0;
    var cPos = '';    

    if ($('#fen-id').val()==''){    
        alert('You must enter a correct value in FEN character string.');
        return
    }

    var aFEN = FenString.split(" ");
    aFENs = [];
    aFENs.push(aFEN);
    
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    console.log(CadenaFEN)
    /*if (Analizando) {
        $('#bestmovelabel').text('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }*/
   
    for ( i = 0; i < FenString.length; i++ ){
    
        if (i>71){
            break;
        }
        var Letra = FenString.substr(i,1);
        
        if (Letra=='/'){
            j++;
        }else if (isNumber(Letra)){            
            for ( var k=0; k<parseInt(Letra); k++ ){
                cPos = cPos + '0';
                j++;
                if (j>71) {
                    break;
                }
            }
        }else if (Letra==''){
            cPos = cPos + '0';
            j++;
        }else{            
            cPos = cPos + Letra;
            j++;
        }
        
        if (j>71){
            break;
        }
        
    }
    
    var flag_Q = 1;
    var flag_R = 1;
    var flag_N = 1;
    var flag_B = 1;        
    var flag_P = 1;
    
    var flag_q = 1;
    var flag_r = 1;
    var flag_n = 1;
    var flag_b = 1;        
    var flag_p = 1;  
    
    for ( var n = 0; n < 64; n++ ){
        
        var Letra = cPos.substr(n,1);
        aPos[n] = Letra;
        if (aPos[n]=='r') {
            if (!CheckIfExist('br'+flag_r)){ 
                var object = fabric.util.object.clone(getItemByName('br1'));
                object.name = 'br'+flag_r;                
                canvas.add(object);                               
            }            
            aPos[n] = 'br'+flag_r;
            flag_r++;            
        }else if (aPos[n]=='n') {
            if (!CheckIfExist('bn'+flag_n)){ 
                var object = fabric.util.object.clone(getItemByName('bn1'));
                object.name = 'bn'+flag_n;                
                canvas.add(object);                               
            }            
            aPos[n] = 'bn'+flag_n;
            flag_n++;                       
        }else if (aPos[n]=='b') {
            if (!CheckIfExist('bb'+flag_b)){ 
                var object = fabric.util.object.clone(getItemByName('bb1'));
                object.name = 'bb'+flag_b;                
                canvas.add(object);                               
            }            
            aPos[n] = 'bb'+flag_b;
            flag_b++;         
        }else if (aPos[n]=='q') {
            if (!CheckIfExist('bq'+flag_q)){ 
                var object = fabric.util.object.clone(getItemByName('bq'));
                object.name = 'bq'+flag_q;                
                canvas.add(object);                               
            }            
            aPos[n] = 'bq'+flag_q;
            flag_q++;             
        }else if (aPos[n]=='k') {
            aPos[n] = 'bk';                        
        }else if (aPos[n]=='p') {
            if (!CheckIfExist('bp'+flag_p)){ 
                var object = fabric.util.object.clone(getItemByName('bp1'));
                object.name = 'bp'+flag_p;                
                canvas.add(object);                               
            }            
            aPos[n] = 'bp'+flag_p;
            flag_p++;           
        }else if (aPos[n]=='P') {
            if (!CheckIfExist('wp'+flag_P)){ 
                var object = fabric.util.object.clone(getItemByName('wp1'));
                object.name = 'wp'+flag_P;                
                canvas.add(object);                               
            }            
            aPos[n] = 'wp'+flag_P;
            flag_P++;            
        }else if (aPos[n]=='R') {
            if (!CheckIfExist('wr'+flag_R)){ 
                var object = fabric.util.object.clone(getItemByName('wr1'));
                object.name = 'wr'+flag_R;                
                canvas.add(object);                               
            }            
            aPos[n] = 'wr'+flag_R;
            flag_R++;           
        }else if (aPos[n]=='N') {
             if (!CheckIfExist('wn'+flag_N)){ 
                var object = fabric.util.object.clone(getItemByName('wn1'));
                object.name = 'wn'+flag_N;                
                canvas.add(object);                               
            }            
            aPos[n] = 'wn'+flag_N;
            flag_N++;            
        }else if (aPos[n]=='B') {
            if (!CheckIfExist('wb'+flag_B)){ 
                var object = fabric.util.object.clone(getItemByName('wb1'));
                object.name = 'wb'+flag_B;                
                canvas.add(object);                               
            }            
            aPos[n] = 'wb'+flag_B;
            flag_B++;             
        }else if (aPos[n]=='Q') {
             if (!CheckIfExist('wq'+flag_Q)){ 
                var object = fabric.util.object.clone(getItemByName('wq'));
                object.name = 'wq'+flag_Q;                
                canvas.add(object);                               
            }            
            aPos[n] = 'wq'+flag_Q;
            flag_Q++;          
        }else if (aPos[n]=='K') {
            aPos[n] = 'wk';                       
        }else{
            aPos[n] = '0';
        }
    }    
    
    $('#DivMoves').html('');
    
    aPosiciones = [];
    ContPosi = 0;    
    NodoPadre = -1;
    aVariantes = [];
    TotalNodos = 0;
    ClickOnMove = false;
    
    var aBuffer = new Array(6);
    aBuffer[0] = -1; // Nodo padre;
    aBuffer[1] = 0; // Nodo hijo
    aBuffer[2] = 'INI:'; // Move
    aBuffer[3] = '';
    aBuffer[4] = false;
    aBuffer[5] = '';
    aVariantes.push(aBuffer);
    
    NodoPadre = 0;
    BufferNodoPadre = 0;    
    BufferContPosi = 1;
    TotalNodos = 1;    
    
    aPos[64] = '0'; //Casilla buffer si hay captura
    aPos[65] = '0'; //CasIni
    aPos[66] = '0'; //CasFin
    aPos[67] = '';  //Cadena move
    aPos[68] = '0'; //PeonIniCor
    aPos[69] = '0'; //DamaFinCor
    aPos[70] = '0';
    aPos[71] = '0';
    
    Click1 = false;
    Moving = false;    
    
    var aBuffer2 = new Array(72);
    var i;
    for (i = 0; i < aBuffer2.length; i++){
        aBuffer2[i] = aPos[i];
    }    
    
    aPosiciones.push(aBuffer2);
    ContPosi = 0;    
        
    $('#DivMoves').append('<div id="diver'+ContPosi+'" style="float:left; border:0px solid black;"></div>');        
    $('#diver' + ContPosi).append('<label id="'+ContPosi+'" onclick="MoveClick(id)" style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px">INI:</label>');
        
    BufferMoveClick = ContPosi;
    $('#'+ContPosi).show();
    $('#'+ContPosi).css('background-color','yellow');
    
    VarianteDesplegada = true;
    SobreVariante = false;
    
    CasIniSel.visible = false;
    
    Click1 = true;
        
    DrawPos();
    
    Click1 = false;       
    
    //Ocultar botones navegacion hasta que haya movimientos nuevos    
    $('#BtnIni').hide();
    $('#BtnEnd').hide();
    $('#BtnNext').hide();
    $('#BtnPrev').hide();    
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: 0,
        Variantes: aVariantes,
        HayHermano: false,
        NodoPadre: -1,
        BufferMoveClick: 0,
        TipoMove: 'FEN',
        FENs: aFENs
    });

    $('#BtnIni').trigger('click');
    
    NodoPadre = ContPosi; //Listo para proximo movimiento    
    
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function CargarPGN() {
    
    var aPromo = [];
        
    var oInfo = chess.header();
    FillChatPGNHeaders('White',oInfo.White);
    FillChatPGNHeaders('Black',oInfo.Black);
    FillChatPGNHeaders('Event',oInfo.Event);
    FillChatPGNHeaders('Date',oInfo.Date);
    FillChatPGNHeaders('Result',oInfo.Result);
    
    var BufferHistory = [];
    BufferHistory = chess.history({ verbose: true });
    chess.reset();        
    ClearAll();    
    
    var FenString;    
    var h = 0;
    var i = 0;
    var j = 0;
    var cPos;
    var aPosi = new Array(72);
    
    NodoPadre = -1;
    BufferNodoPadre = -1;
    ContPosi = 0;
    BufferContPosi = 0;
    TotalNodos = 1;    
    
    $('#0').show();
    BufferMoveClick = ContPosi;    
    
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();
    
    NodoPadre = 0
    BufferNodoPadre = 0;
    ContPosi = 1;
    BufferContPosi = 1;
    TotalNodos = 1;    
    
    for ( h = 0; h < BufferHistory.length; h++) {        
       
        chess.move(BufferHistory[h].san);
        
        aPos[65] = CasToIndex(BufferHistory[h].from);
        aPos[66] = CasToIndex(BufferHistory[h].to);
        
        FenString = chess.fen(); 
        console.log(FenString)
        var aFEN = FenString.split(" ");
        aFENs.push(aFEN);
        
        cPos = '';
        
        for ( i = 0; i < 64; i++ ){
    
            if (i>71){
                break;
            }
            var Letra = FenString.substr(i,1);
            
            if (Letra=='/'){
                j++;
            }else if (isNumber(Letra)){            
                for ( var k=0; k<parseInt(Letra); k++ ){
                    cPos = cPos + '0';
                    j++;
                    if (j>71) {
                        break;
                    }
                }
            }else if (Letra==''){
                cPos = cPos + '0';
                j++;
            }else{            
                cPos = cPos + Letra;
                j++;
            }
            
            if (j>71){
                break;
            }
            
        }        
        
        j = 0;
                
        var flag_Q = 1;
        var flag_R = 1;
        var flag_N = 1;
        var flag_B = 1;        
        var flag_P = 1;
        
        var flag_q = 1;
        var flag_r = 1;
        var flag_n = 1;
        var flag_b = 1;        
        var flag_p = 1;
        
        var Symbol = '';
        
        for ( var n = 0; n < 64; n++ ){
    
            var Letra = cPos.substr(n,1);
            aPosi[n] = Letra;
            
            if (aPosi[n]=='Q') {                
                aPos[n] = 'wq'+flag_Q;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('wq'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('wq'+flag_Q);                    
                }
                flag_Q++;
            }else if (aPosi[n]=='R') {
                aPos[n] = 'wr'+flag_R;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('wr1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('wr'+flag_R);                    
                }
                flag_R++;
            }else if (aPosi[n]=='N') {
                aPos[n] = 'wn'+flag_N;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('wn1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('wn'+flag_N);                    
                }
                flag_N++;
            }else if (aPosi[n]=='B') {
                aPos[n] = 'wb'+flag_B;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('wb1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('wb'+flag_B);                    
                }
                flag_B++;
            }else if (aPosi[n]=='P') {                
                aPos[n] = 'wp'+flag_P;
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('wp1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('wp'+flag_P);                    
                }
                flag_P++;
            }else if (aPosi[n]=='K') {
                aPos[n] = 'wk';                
            }else if (aPosi[n]=='q') {
                aPos[n] = 'bq'+flag_q;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('bq'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('bq'+flag_q);                    
                }
                flag_q++;
            }else if (aPosi[n]=='r') {
                aPos[n] = 'br'+flag_r;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('br1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('br'+flag_r);                    
                }
                flag_r++;
            }else if (aPosi[n]=='n') {
                aPos[n] = 'bn'+flag_n;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('bn1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('bn'+flag_n);                    
                }
                flag_n++;
            }else if (aPosi[n]=='b') {
                aPos[n] = 'bb'+flag_b;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('bb1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('bb'+flag_b);                    
                }
                flag_b++;
            }else if (aPosi[n]=='p') {
                aPos[n] = 'bp'+flag_p;                
                if (!CheckIfExist(aPos[n])){
                    var object = fabric.util.object.clone(getItemByName('bp1'));
                    object.name = aPos[n];                
                    canvas.add(object);
                    //aPromo.push('bp'+flag_p);                    
                }
                flag_p++;
            }else if (aPosi[n]=='k') {
                aPos[n] = 'bk';                
            }else{
                aPos[n] = '0';                
            }
            
        }
        
        Symbol = '';
        
        var CasPieza = BufferHistory[h].to;
        var Index = CasToIndex(CasPieza);
        var Pieza = aPos[Index];        
        Pieza = Pieza.substr(0,2);
                
        if (Pieza == 'p') {
            Pieza = 'bp';            
        }else if (Pieza == 'P') {
            Pieza = 'wp';            
        }else if (Pieza == 'n') {
            Pieza = 'bn';
        }else if (Pieza == 'N') {
            Pieza = 'wn';
        }else if (Pieza == 'r') {
            Pieza = 'br';
        }else if (Pieza == 'R') {
            Pieza = 'wr';
        }else if (Pieza == 'b') {
            Pieza = 'bb';
        }else if (Pieza == 'B') {
            Pieza = 'wb';
        }else if (Pieza == 'q') {
            Pieza = 'bq';
        }else if (Pieza == 'Q') {
            Pieza = 'wq';
        }else if (Pieza == 'k') {
            Pieza = 'bk';
        }else if (Pieza == 'K') {
            Pieza = 'wk';
        }
        
        Symbol = ConvertToSymbol(Pieza);
        
        //Capture
        var Capture = '-';
        if (BufferHistory[h].flags == 'c') {
            Capture = 'x';
        }
        
        var PiezaCor = '';
        var To = BufferHistory[h].to;
        if (BufferHistory[h].flags == 'np') {
            PiezaCor = '=' + ((chess.get(To)).type).toUpperCase();            
        } else if (BufferHistory[h].flags == 'cp') {
            Capture = 'x';
            PiezaCor = '=' + ((chess.get(To)).type).toUpperCase();
        }        
        
        var aBuffer = new Array(6);
        aBuffer[0] = NodoPadre; // Nodo padre;
        aBuffer[1] = ContPosi; // Nodo hijo
        aBuffer[2] = BufferHistory[h].from + Capture + BufferHistory[h].to + PiezaCor; 
        aBuffer[3] = '';
        aBuffer[4] = false;
        aBuffer[5] = Symbol;
        aVariantes.push(aBuffer);        
        
        var aBuffer2 = new Array(72);
        var k;
        for (k = 0; k < aBuffer2.length; k++){
            aBuffer2[k] = aPos[k];
        }
        
        aBuffer2[64] = '0';        
        aBuffer2[65] = CasToIndex(BufferHistory[h].from);
        aBuffer2[66] = CasToIndex(BufferHistory[h].to);
        aBuffer2[67] = '';
        aBuffer2[68] = '0';
        aBuffer2[69] = '0';
        aBuffer2[70] = '0';
        aBuffer2[71] = '0';           
        
        aPosiciones.push(aBuffer2);     
        
        $('#DivMoves').append('<div id="diver'+ContPosi+'" style="float:left; border:0px solid black;"></div>');        
        $('#diver' + ContPosi).append('<label style="float:left; color:green; margin-left:0px; margin-top:0px; font-family:Chess; font-size:23px">' + Symbol + '</label>');
        $('#diver' + ContPosi).append('<label style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:17px" id="'+ContPosi+'" onclick="MoveClick5(id)">' + BufferHistory[h].from + Capture + BufferHistory[h].to + PiezaCor + '</label>');
                
        NodoPadre++;
        BufferNodoPadre++;
        ContPosi ++;
        BufferContPosi++;
        TotalNodos++;        
    }
    
    console.log(chess.ascii());    
    
    NodoPadre = -1;
    BufferNodoPadre = -1;
    ContPosi = 0;
    BufferContPosi = 0;
    TotalNodos = 1;
    
    //Ir a posicion
    for (var i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[ContPosi][i];
    }
    DrawPos();
    
    var Index = ContPosi;
    
    BufferMoveClick = Index;    
    
    $('#BtnIni').show();
    $('#BtnEnd').show();
    $('#BtnNext').show();
    $('#BtnPrev').show();
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendMove',
        Posiciones: aPosiciones,
        ContPosi: ContPosi,
        Variantes: aVariantes,
        FENs: aFENs,
        HayHermano: false,
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick,
        TipoMove: 'LoadPGN',
        Promo : aPromo
    });
    
    NodoPadre = -1;
    BufferNodoPadre = -1;
    ContPosi = 0;
    BufferContPosi = 0;
    TotalNodos = 1;
    $('#BtnIni').trigger('click');
}

function MoveClick3(id){
        
    UltimoMovimiento = false;
    
    $('#'+BufferMoveClick).css('background-color','white'); 
    
    $('#'+id).css('background-color','yellow');    
    
    console.log(id);
    
    //Ir a posicion
    for (var i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[id][i];
    }
    
    ContPosi = id;
    BufferMoveClick = ContPosi;

    var aFEN = aFENs[ContPosi];
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];
    
    console.log(CadenaFEN)
    if (Analizando) {
        $('#bestmovelabel').text('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }
    
    DrawPos();
    
}

function CasToIndex(Cas){
    
    var Index = -1;
    
    for (var i = 0; i < 64; i++) {
        if ( aCas[i] == Cas ) {
            Index = i;
        }
    }
    return Index;
    
}

function FillChatPGNHeaders(Nick,Txt) {
    
    var cNickName = Nick;
    var cTxtChat = Txt;   
                
    connection.getSocket().emit('MiEvento',{
        NickSender: cNickName,
        CustomMessage: cTxtChat,
        Chanel: cChanel,
        SubEvent: 'Chat'
    });    
                
    $('#DivTextChat').append('<span style="color:red; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            cNickName + ': ' + '</span>' + 
                            '<span style="color:green; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTxtChat + '</span><br>');
    $('#DivTextChat').animate({scrollTop: $('#DivTextChat').prop('scrollHeight')}, 500);
    
}

function AddText() {    
    
    var cMove = $('#' + ContPosi).text();
    
    if (cMove != '(...+)') {
        
        $('#DivTextChat').append('<span style="color:red; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                                cMove +  ': ' + '</span>' + 
                                '<span style="color:green; font-size:15px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                                $('#addtxt').val() + '</span><br>');
        $('#DivTextChat').animate({scrollTop: $('#DivTextChat').prop('scrollHeight')}, 500);
        
        $('#' + ContPosi).text(cMove + '(T)');
        
        aVariantes[ContPosi][2] = cMove + '(T)';
        aVariantes[ContPosi][3] =  $('#addtxt').val();
        
        connection.getSocket().emit('MiEvento',{
            Chanel: cChanel,
            SubEvent: 'SendMove',
            Posiciones: aPosiciones,
            ContPosi: ContPosi,
            Variantes: aVariantes,
            FENs: aFENs,
            //HayHermano: false,
            //NodoPadre: -1,
            //BufferMoveClick: 0,
            TipoMove: 'TxT'
        });
    
    }
    
}

function DibujarCasillas(){
    
    var nConCas = 1;
    var cColorCas = 'rgba(240,217,181,1)';
    
    // Casillas
    for (var y=0; y < 8; y++){		
	
        for (var x=0; x < 8; x++){	    
            
            getItemByName('cas'+nConCas).fill = cColorCas;
            
            nConCas = nConCas + 1;            
			
	    if (cColorCas == 'rgba(240,217,181,1)'){
		cColorCas = 'rgba(181,136,99,1)';
	    }else{
		cColorCas = 'rgba(240,217,181,1)';
	    }
            
	}		
	if (cColorCas == 'rgba(240,217,181,1)'){
	    cColorCas = 'rgba(181,136,99,1)';
	}else{
	    cColorCas = 'rgba(240,217,181,1)';
	}
        
    }
    
    canvas.renderAll();
        
}

function LeftTopToRec(xObj,yObj,cColor,oObj){

    var nCol,nFila,nCas;
    
    if (xObj<=49){
        nCol = 0;
        oObj.set({left:27-2});        
    }else if ((xObj>=49)&&(xObj<=98)){
        nCol = 1;
        oObj.set({left:76-2});        
    }else if ((xObj>=98)&&(xObj<=147)){
        nCol = 2;
        oObj.set({left:125-2});        
    }else if ((xObj>=147)&&(xObj<=196)){
        nCol = 3;
        oObj.set({left:174-2});        
    }else if ((xObj>=196)&&(xObj<=245)){
        nCol = 4;
        oObj.set({left:223-2});        
    }else if ((xObj>=245)&&(xObj<=294)){
        nCol = 5;
        oObj.set({left:272-2});        
    }else if ((xObj>=294)&&(xObj<=343)){
        nCol = 6;
        oObj.set({left:321-2});        
    }else if (xObj>=343){
        nCol = 7;
        oObj.set({left:370-2});        
    }
    
    if (yObj<=49){
        nFila = 0;
        oObj.set({top:27-2});        
    }else if ((yObj>=49)&&(yObj<=98)){
        nFila = 1;
        oObj.set({top:76-2});        
    }else if ((yObj>=98)&&(yObj<=147)){
        nFila = 2;
        oObj.set({top:125-2});        
    }else if ((yObj>=147)&&(yObj<=196)){
        nFila = 3;
        oObj.set({top:174-2});        
    }else if ((yObj>=196)&&(yObj<=245)){
        nFila = 4;
        oObj.set({top:223-2});        
    }else if ((yObj>=245)&&(yObj<=294)){
        nFila = 5;
        oObj.set({top:272-2});        
    }else if ((yObj>=294)&&(yObj<=343)){
        nFila = 6;
        oObj.set({top:321-2});        
    }else if (yObj>=343){
        nFila = 7;
        oObj.set({top:370-2});        
    }
    
    oObj.setCoords();
    canvas.renderAll();
    
    if (cColor=='White') {
        nCas = (nFila*8)+nCol;
    }else{
        nCas = 63-((nFila*8)+nCol);
    }
    return nCas;

}

function DibujarCas(Color,CasIni){
    
    if (cColorSide == 'White') {
                
        getItemByName('cas'+(CasIni+1)).set('fill',Color);            
                
    }else{
        
        getItemByName('cas'+(63-CasIni+1)).set('fill',Color);
        
    }
    canvas.renderAll();
    
}

function SaveRect(Color,CasIni){
    
    var aBuffer = new Array(2);
    
    aBuffer[0] = CasIni;
    aBuffer[1] = Color;
    
    console.log(CasIni);
    
    aColorCas.push(aBuffer);
    
    console.log(aColorCas);
    
}

function RecolocarRect() {
    
    for ( var i = 0; i < aColorCas.length; i++) {
        if (cColorSide == 'White') {
            getItemByName('cas'+((aColorCas[i][0])+1)).set('fill',aColorCas[i][1]);
        }else{
            getItemByName('cas'+(63-(aColorCas[i][0])+1)).set('fill',aColorCas[i][1]);
        }
    }
    canvas.renderAll();
    
}

function SendRect(aColorCas){
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'SendColorCas',
        aColorCas: aColorCas        
    });
    
}

function DeleteMove(){
    
    var Padre;
    var Ultimo = true;
    var Hijo = ContPosi;
    
    if (UltimoMovimiento == false) {
        NodoPadre2 = NodoPadre;
        ContPosi2 = ContPosi;
    }else{
        UltimoMovimiento = false;
        NodoPadre2 = BufferNodoPadre2;
        ContPosi2 = BufferContPosi2;        
    }
    
    
    // Prevent not delete INI Position    
    if (ContPosi != 0) {
        
        // Check Ultimo movimiento
        for ( var i = 0; i < aVariantes.length; i++){            
            // Buscar hijos
            Padre = ContPosi;            
            if (Padre == aVariantes[i][0]) {
                Ultimo = false;
                break;
            }          
        }
            
        // En medio
        if (Ultimo == false) {                
            
            $('#' + ContPosi).remove();
            
            // Buscar NodoPadre
            for (var x = 0; x < aVariantes.length; x++){                
                if (aVariantes[x][1] == ContPosi){
                    NodoPadre = aVariantes[x][0];
                    break;
                }
            }            
            
            // Buscar hijos
            for (var x = 0; x < aVariantes.length; x++){
                if (aVariantes[x][0] == Hijo){
                    aVariantes[x][0] = NodoPadre;
                }                
            }     
            
            aVariantes[ContPosi][0] = -2;
                        
            ContPosi = NodoPadre;
            
            
            // Buscar NodoPadre
            for (var x = 0; x < aVariantes.length; x++){                
                if (aVariantes[x][1] == ContPosi){
                    NodoPadre = aVariantes[x][0];
                    break;
                }
            }                 
            
        // Move Final
        }else{            
            
            $('#' + ContPosi).remove();            
                        
            aVariantes[ContPosi][0] = -2;
            
            for (var x = 0; x < aVariantes.length; x++){                               
                if (NodoPadre2==aVariantes[x][1]){                        
                    NodoPadre = aVariantes[x][0];
                    ContPosi = aVariantes[x][1];                    
                    break;                        
                }                
            }
            
        }
                        
        connection.getSocket().emit('MiEvento',{
            Chanel: cChanel,
            SubEvent: 'BtnPrevEvent',
            Posiciones: aPosiciones,
            ContPosi: ContPosi,
            Variantes: aVariantes,  
            FENs: aFENs,              
            NodoPadre: NodoPadre,
            BufferMoveClick: BufferMoveClick,
            ContPosi2: ContPosi2,
            NodoPadre2: NodoPadre2
        });
        
        ShowLineBack(0);            
        
        $('#'+ContPosi).css('background-color','yellow');
        BufferMoveClick = ContPosi;
                    
        if (ContPosi==0){
            CasIniSel.visible = false;
            CasFinSel.visible = false;
            // Primer click
            if (Click1){
                Click1 = false;
            }
        }else{
            CasIniSel.visible = true;
            CasFinSel.visible = true;
        }
        
        var i;
        for (i = 0; i < aPos.length; i++){
            aPos[i] = aPosiciones[ContPosi][i];
        }
        
        DrawPos();         
    
    }
    
}

function CutMoves(Nodo){    
    
    // Prevent not delete INI Position    
    if (Nodo != 0) {        
        for (var x = 0; x < aVariantes.length ; x++){            
            if (aVariantes[x][0]==Nodo){ //Padre                     
                var Hijo = aVariantes[x][1];
                aVariantes[x][0] = -2;
                $('#'+Hijo).remove();
                CutMoves(Hijo);                     
            }                 
        }        
    }   
    
}

function CutMoves2(Nodo){
    
    // Prevent not delete INI Position    
    if (NodoPadre != 0) {        
        for (var x = 0; x < aVariantes.length ; x++){            
            if (aVariantes[x][0]==Nodo){ //Padre                     
                var Hijo = aVariantes[x][1];
                aVariantes[x][0] = -2;
                $('#'+Hijo).remove();
                CutMoves2(Hijo);                     
            }                 
        }
        $('#'+Nodo).remove();
        aVariantes[Nodo][0] = -2;
    }   
    
}

function RestorePosi(Nodo) {    
    
    for (var x = 0; x < aVariantes.length; x++){                               
        if (NodoPadre==aVariantes[x][1]){                    
            NodoPadre = aVariantes[x][0];
            ContPosi = aVariantes[x][1];                    
            break;                    
        }                
    }
    
    NodoPadre2 = NodoPadre;
    ContPosi2 = Nodo;   //ContPosi nuevo 
    
    ShowLineBack(0);
    
    $('#'+Nodo).css('background-color','yellow');
    BufferMoveClick = Nodo;
    ContPosi = Nodo;
    
    if (Nodo==0){
        CasIniSel.visible = false;
        CasFinSel.visible = false;
        // Primer click
        if (Click1){
            Click1 = false;
        }
    }else{
        CasIniSel.visible = true;
        CasFinSel.visible = true;
    }
    
    var i;
    for (i = 0; i < aPos.length; i++){
        aPos[i] = aPosiciones[Nodo][i];
    }
    
    DrawPos();
    
    UltimoMovimiento = false
    
    connection.getSocket().emit('MiEvento',{
        Chanel: cChanel,
        SubEvent: 'BtnPrevEvent',
        Posiciones: aPosiciones,
        ContPosi: Nodo,
        Variantes: aVariantes,  
        FENs: aFENs,              
        NodoPadre: NodoPadre,
        BufferMoveClick: BufferMoveClick,
        ContPosi2: ContPosi2,
        NodoPadre2: NodoPadre2
    });
    
}

function CheckHayHermanos(Nodo) {
    
    var HayHermano = false;
    var ContHermanos = 0;
    var NodoHermano;
    
    for (var x = 0; x < aVariantes.length ; x++){                    
        if (aVariantes[x][1]==Nodo){
            NodoHermano = aVariantes[x][0];                        
            //Check si hay hermanos
            for (var i = 0; i < aVariantes.length; i++){
                if (NodoHermano==aVariantes[i][0]){
                    if (NodoHermano != (-2)) {
                        ContHermanos++;                        
                    }                    
                }
                if (ContHermanos>1){
                    HayHermano = true;
                    break;
                }
            }                    
        }            
    }    
        
    return HayHermano;
    
}

function CheckPromos() {
    
    for (var x = 0; x < aPosiciones.length; x++){
        for (var i = 0; i < aPos.length; i++){
            aPos[i] = aPosiciones[x][i];
            if (i < 64) {
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wq'){
                        var object = fabric.util.object.clone(getItemByName('wq'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wr'){
                        var object = fabric.util.object.clone(getItemByName('wr1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wn'){
                        var object = fabric.util.object.clone(getItemByName('wn1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wb'){
                        var object = fabric.util.object.clone(getItemByName('wb1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wk'){
                        var object = fabric.util.object.clone(getItemByName('wk'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='wp'){
                        var object = fabric.util.object.clone(getItemByName('wp1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='bq'){
                        var object = fabric.util.object.clone(getItemByName('bq'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='br'){
                        var object = fabric.util.object.clone(getItemByName('br1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='bn'){
                        var object = fabric.util.object.clone(getItemByName('bn1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='bb'){
                        var object = fabric.util.object.clone(getItemByName('bb1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='bk'){
                        var object = fabric.util.object.clone(getItemByName('bk'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
                if (!CheckIfExist(aPos[i])){
                    if (aPos[i].substring(0,2)=='bp'){
                        var object = fabric.util.object.clone(getItemByName('bp1'));
                        object.name = aPos[i];
                        canvas.add(object);
                    }
                }
            }
        }    
    }
    
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

function ConvertVariant(Tipo,cMoves){

    if (Tipo==0){
        $('#Variant0').html('');
    }else if (Tipo==1){
        $('#Variant1').html('');
    }else if (Tipo==2){
        $('#Variant2').html('');
    }else if (Tipo==3){
        $('#Variant3').html('');
    }
    
    var aMoves = cMoves.split(" ");
    var aCadenaFEN = aFENs[ContPosi];
    var cCadFEN = aCadenaFEN[0] + " " + aCadenaFEN[1] + " " + aCadenaFEN[2] + " " + aCadenaFEN[3] + " " + aCadenaFEN[4] + " " + aCadenaFEN[5];
    
    chess2.load(cCadFEN);
    
    for (var x = 0; x < aMoves.length; x++){
        var oRest = chess2.move(aMoves[x], {sloppy: true}); 
        DrawVariant(Tipo,oRest); 
        if (x==10){
            break;
        }         
    }

}

function DrawVariant(Tipo,oRest){

    //Capture
    var Capture = '-';
    if (oRest.flags == 'c') {
        Capture = 'x';
    }
    
    //Coronacion
    var PiezaCor = '';
    var To = oRest.to;
    if (oRest.flags == 'np') {
        PiezaCor = '=' + ((chess2.get(To)).type).toUpperCase();            
    }else if (oRest.flags == 'cp') {
        Capture = 'x';
        PiezaCor = '=' + ((chess2.get(To)).type).toUpperCase();
    }  
    
    var Symbol;
    var cMove = oRest.from + Capture + oRest.to + PiezaCor;

    //Enroques
    if (oRest.color=='w'){
        if (oRest.piece=='k'){
            if (oRest.from=='e1'){
               if (oRest.to=='g1'){
                   cMove = 'OO';
               }else if (oRest.to=='c1'){
                   cMove = 'OOO'
               }
            }
        }
    }else{
        if (oRest.piece=='k'){
            if (oRest.from=='e8'){
                if (oRest.to=='g8'){
                    cMove = 'OO';
                }else if (oRest.to=='c8'){
                    cMove = 'OOO'
                }
            }
        }
    }
     
    if (oRest.color=='w'){
        if (oRest.piece=='p'){
            Symbol = '&#112;';             
        }else if (oRest.piece=='n'){
            Symbol = '&#104;';
        }else if (oRest.piece=='b'){
            Symbol = '&#98;';
        }else if (oRest.piece=='r'){
            Symbol = '&#114;';
        }else if (oRest.piece=='q'){
            Symbol = '&#113;';
        }else if (oRest.piece=='k'){
            Symbol = '&#107;';
        }
    }else{
        if (oRest.piece=='p'){
            Symbol = '&#111;';            
        }else if (oRest.piece=='n'){
            Symbol = '&#106;';
        }else if (oRest.piece=='b'){
            Symbol = '&#110;';
        }else if (oRest.piece=='r'){
            Symbol = '&#116;';
        }else if (oRest.piece=='q'){
            Symbol = '&#119;';
        }else if (oRest.piece=='k'){
            Symbol = '&#108;';
        }
    }

    if (Tipo==0){
        $('#Variant0').append('<label style="color:green; float:left; margin-left:5px; margin-top:4px; font-family:Chess; font-weight:bold; font-size:23px">' + Symbol + '</label>');  
        $('#Variant0').append('<label style="color:green; float:left; margin-left:0px; margin-top:8px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:17px">' + cMove + '</label>');  
    }else if (Tipo==1){
        $('#Variant1').append('<label style="color:green; float:left; margin-left:5px; margin-top:4px; font-family:Chess; font-weight:bold; font-size:23px">' + Symbol + '</label>');  
        $('#Variant1').append('<label style="color:green; float:left; margin-left:0px; margin-top:8px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:17px">' + cMove + '</label>');  
    }else if (Tipo==2){
        $('#Variant2').append('<label style="color:green; float:left; margin-left:5px; margin-top:4px; font-family:Chess; font-weight:bold; font-size:23px">' + Symbol + '</label>');  
        $('#Variant2').append('<label style="color:green; float:left; margin-left:0px; margin-top:8px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:17px">' + cMove + '</label>');  
    }else if (Tipo==3){
        $('#Variant3').append('<label style="color:green; float:left; margin-left:5px; margin-top:4px; font-family:Chess; font-weight:bold; font-size:23px">' + Symbol + '</label>');  
        $('#Variant3').append('<label style="color:green; float:left; margin-left:0px; margin-top:8px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:17px">' + cMove + '</label>');  
    }

}

function BuscarLugar(Elemento){

    var Lugar = -1;
    
    for ( var i = 0; i < aAnalizeResult.length; i++){

        if (aAnalizeResult[i]==Elemento){
            Lugar = i;
            break;
        }

    }
    
    console.log('Lugar: ' + Lugar)

    return Lugar;
}