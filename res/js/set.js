var PapeleraMode = false;
var ManoMode = true;
var aReciclar = [];
var MouseDownMode = false;
var BufferX,BufferY;
var aPosSet = ['br1','bn1','bb1','bq1' ,'bk' ,'bb2','bn2','br2',
            'bp1','bp2','bp3','bp4','bp5','bp6','bp7','bp8',
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            'wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8',
            'wr1','wn1','wb1','wq1' ,'wk' ,'wb2','wn2','wr2'];
var CasIniSet,CasFinSet;
var TipoPieza;
var wp = 10;
var bp = 10;
var wr = 4;
var br = 4;
var wn = 4;
var bn = 4;
var wb = 4;
var bb = 4;
var wq = 3;
var bq = 3;

var BorradoConClick = false;

function CreateSet(){
    
    canvas3 = new fabric.Canvas('SetCanvas',{
            hoverCursor: 'pointer'            
    });
    canvas3.backgroundColor = 'white';
    canvas3.selection = false;
    
    var rect = new fabric.Rect({
        left: 60,
        top: 20,
        fill: '#800080',
        width: 50+394,
        height: 50+394,
        selectable: false
    });
    rect.name = 'borde';
    canvas3.add(rect);
    canvas3.item(0).hasControls = canvas3.item(0).hasBorders = false;
    
    var cColorCas = 'rgba(240,217,181,1)';
    
    var nConCas = 1;
    // Casillas
    for (var y=0; y < 8; y++){		
	
        for (var x=0; x < 8; x++){	    
            
            rect = new fabric.Rect({
                left: (x*49)+25+60,
                top: (y*49)+25+20,
                fill: cColorCas,
                width: 49,
                height: 49,
                selectable: false
            });            
            rect.name = 'cas'+nConCas;
            canvas3.add(rect);
            canvas3.item(nConCas).hasControls = canvas3.item(nConCas).hasBorders = false;
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
    
    // Coordenadas
    var text;
    
    text = new fabric.Text('a',{selectable:false,left:106,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('b',{selectable:false,left:155,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('c',{selectable:false,left:204,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('d',{selectable:false,left:253,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('e',{selectable:false,left:302,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('f',{selectable:false,left:351,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('g',{selectable:false,left:400,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('h',{selectable:false,left:449,top:442,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    
    text = new fabric.Text('1',{selectable:false,left:68,top:404,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('2',{selectable:false,left:68,top:355,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('3',{selectable:false,left:68,top:306,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('4',{selectable:false,left:68,top:257,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('5',{selectable:false,left:68,top:208,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('6',{selectable:false,left:68,top:159,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('7',{selectable:false,left:68,top:110,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    text = new fabric.Text('8',{selectable:false,left:68,top:61,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
    canvas3.add(text);
    
    rect = new fabric.Rect({
                left: 210,
                top: 480,
                fill: 'white',
                width: 52,
                height: 52,
                selectable: false
            });            
    rect.name = 'RectPapelera';
    canvas3.add(rect);
    getItemByNameSet('RectPapelera').hasControls = getItemByNameSet('RectPapelera').hasBorders = false;
    
    rect = new fabric.Rect({
                left: 300,
                top: 480,
                fill: 'coral',
                width: 52,
                height: 52,
                selectable: false
            });            
    rect.name = 'RectMano';
    canvas3.add(rect);
    getItemByNameSet('RectMano').hasControls = getItemByNameSet('RectMano').hasBorders = false;    
    
    fabric.Image.fromURL('res/img/trash-2-48.png',function(oImg){        
        oImg.set({left:212,top:482});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.lockMovementX = true;
        oImg.lockMovementY = true;
        oImg.name = 'papelera2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/mano-48.png',function(oImg){        
        oImg.set({left:302,top:482});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.lockMovementX = true;
        oImg.lockMovementY = true;
        oImg.name = 'mano';
        canvas3.add(oImg);
    });
    
    canvas3.on({        
        'mouse:down':function(e){
            BufferX = e.target.left;
            BufferY = e.target.top;
            
            MouseDownMode = true;
            if (e.target.name == 'papelera2'){
                getItemByNameSet('RectPapelera').set('fill','coral');
                getItemByNameSet('RectMano').set('fill','white');
                canvas3.hoverCursor = 'url(res/img/delete-24.png) 0 24, auto';
                canvas3.renderAll();
                PapeleraMode = true;
                ManoMode = false;
            }else if (e.target.name == 'mano') {
                getItemByNameSet('RectPapelera').set('fill','white');
                getItemByNameSet('RectMano').set('fill','coral');
                canvas3.hoverCursor = 'pointer'; 
                canvas3.renderAll();
                PapeleraMode = false;
                ManoMode = true;
            }else if ((e.target.get('type')=='image') && (PapeleraMode == true) && MouseDownMode == true){
                
                if ((e.target.left > 500) || (e.target.left < 70)){ 
                    console.log(e.target.name)
                    getItemByNameSet('RectPapelera').set('fill','white');
                    getItemByNameSet('RectMano').set('fill','coral');
                    canvas3.hoverCursor = 'pointer'; 
                    canvas3.renderAll();
                    PapeleraMode = false;
                    ManoMode = true;                      
                    TipoPieza = 'Exterior';
                }                   
                if ((e.target.left > 85) && (e.target.left < 477) && (e.target.top > 45) && (e.target.top < 437)){                 
                }                
            }else if ((e.target.get('type')=='image') && (ManoMode == true) && MouseDownMode == true){
                // Pieza Exterior
                if ((e.target.left > 500) || (e.target.left < 70)){
                    console.log('Exterior')
                    TipoPieza = 'Exterior';
                // Pieza Interior
                }else{
                    console.log('Interior')
                    TipoPieza = 'Interior';
                    CasIniSet = LeftTopToCasSet(e.target.left,e.target.top,'White',e.target);
                    console.log(CasIniSet)
                }
            }else if ((e.target.left > 85) && (e.target.left < 477) && (e.target.top > 45) && (e.target.top < 437) && (e.target.get('type')!='image')) {
                BorradoConClick = false;
            }
        },
        'mouse:up':function(e){
            if ((e.target.left > 466) || (e.target.left < 70)){
                getItemByNameSet(e.target.name).set({left:BufferX,top:BufferY}); 
                getItemByNameSet(e.target.name).setCoords();
            }
            // Borrando
            if ((e.target.get('type')=='image') && (PapeleraMode == true) && MouseDownMode == true){               
                
                if (e.target.name!='papelera2') {
                    aReciclar.push(e.target.name);
                }                
                console.log(aReciclar)
                BorradoConClick = true;
                for ( var i=0; i < aPosSet.length; i++){
                    if (aPosSet[i] == e.target.name){
                        aPosSet[i] = '0';
                    }
                }
                BufferX = e.target.left;
                BufferY = e.target.top;
                
                if (e.target.name == 'wk') {
                    getItemByNameSet(e.target.name).set({left:512,top:400}); 
                    getItemByNameSet(e.target.name).setCoords();
                }else if (e.target.name == 'bk') {
                    getItemByNameSet(e.target.name).set({left:6,top:400}); 
                    getItemByNameSet(e.target.name).setCoords();
                }else{
                    getItemByNameSet(e.target.name).set({left:612,top:480}); 
                    getItemByNameSet(e.target.name).setCoords();                    
                }
                canvas3.renderAll();
            }            
            MouseDownMode = false;
            if (e.target.get('type')=='image'){                
                if ((e.target.left > (85-27)) && (e.target.left < 477) && (e.target.top > 45-27) && (e.target.top < 437-27) && (PapeleraMode == false)){                    
                    var Cas = LeftTopToCasSet(e.target.left,e.target.top,'White',e.target);
                    console.log(Cas)
                    if (aPosSet[Cas] != '0') {
                        
                        getItemByNameSet(aPosSet[Cas]).set({left:612,top:480}); 
                        getItemByNameSet(aPosSet[Cas]).setCoords();                          
                        canvas3.renderAll();
                        
                        aReciclar.push(aPosSet[Cas]);
                        console.log(aReciclar)
                    }
                    if (TipoPieza == 'Interior') {
                        aPosSet[CasIniSet] = '0';
                    }else{
                        ReponerPieza(e.target);
                    }
                    aPosSet[Cas] = e.target.name;
                }else{
                    
                    if (e.target.name == 'wk') {
                        getItemByNameSet(e.target.name).set({left:512,top:400}); 
                        getItemByNameSet(e.target.name).setCoords();
                    }else if (e.target.name == 'bk') {
                        getItemByNameSet(e.target.name).set({left:6,top:400}); 
                        getItemByNameSet(e.target.name).setCoords();
                    }else{
                        //getItemByNameSet(e.target.name).set({left:512,top:480}); 
                        //getItemByNameSet(e.target.name).setCoords();                    
                    }
                    canvas3.renderAll();
                }
            }
            console.log(aPosSet)
            getItemByNameSet('papelera2').set({left:212,top:482});
            getItemByNameSet('papelera2').setCoords();
            getItemByNameSet('mano').set({left:302,top:482});
            getItemByNameSet('mano').setCoords();
            canvas3.renderAll();
        },
        'mouse:move':function(e){            
            if ((e.target.get('type')=='image') && (PapeleraMode == true) && MouseDownMode == true){
                if ((e.target.left > 85) && (e.target.left < 477) && (e.target.top > 45) && (e.target.top < 437)){                    
                    if (e.target.name == 'wk') {
                        getItemByNameSet(e.target.name).set({left:512,top:400}); 
                        getItemByNameSet(e.target.name).setCoords();
                    }else if (e.target.name == 'bk') {
                        getItemByNameSet(e.target.name).set({left:6,top:400}); 
                        getItemByNameSet(e.target.name).setCoords();
                    }else{
                        getItemByNameSet(e.target.name).set({left:612,top:480}); 
                        getItemByNameSet(e.target.name).setCoords();
                    }
                    canvas3.renderAll();
                    
                    if (BorradoConClick == false) {
                        aReciclar.push(e.target.name);
                        console.log(aReciclar)
                    }                    
                    for ( var i=0; i < aPosSet.length; i++){
                        if (aPosSet[i] == e.target.name){
                            aPosSet[i] = '0';
                        }
                    }                    
                }
            }
        }
    });   
    
    // Create Pieces
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:(0*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:(1*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:(2*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bq.png',function(oImg){        
        oImg.set({left:(3*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bq1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bk.png',function(oImg){        
        oImg.set({left:(4*49)+25+60 +2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bk';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:(5*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:(6*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:(7*49)+25+60+2,top:(0*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br2';
        canvas3.add(oImg);
    });    
      
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(0*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(1*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(2*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(3*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp4';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(4*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp5';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(5*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp6';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(6*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp7';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:(7*49)+25+60+2,top:(1*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp8';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(0*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(1*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(2*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(3*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp4';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(4*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp5';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(5*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp6';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(6*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp7';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:(7*49)+25+60+2,top:(6*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp8';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:(0*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wr1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:(1*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:(2*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wq.png',function(oImg){        
        oImg.set({left:(3*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wq1';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wk.png',function(oImg){        
        oImg.set({left:(4*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wk';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:(5*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:(6*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:(7*49)+25+60+2,top:(7*49)+25+20+2});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wr2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
        oImg.set({left:6,top:100});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bp9';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:6,top:160});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:6,top:220});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:6,top:280});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45bq.png',function(oImg){        
        oImg.set({left:6,top:340});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bq2';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
        oImg.set({left:512,top:100});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wp9';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:512,top:160});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:512,top:220});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:512,top:280});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wr3';
        canvas3.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/merida45wq.png',function(oImg){        
        oImg.set({left:512,top:340});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wq2';
        canvas3.add(oImg);
    });
        
}

function ResetSet(){
    
    aPosSet = ['br1','bn1','bb1','bq1' ,'bk' ,'bb2','bn2','br2',
            'bp1','bp2','bp3','bp4','bp5','bp6','bp7','bp8',
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            'wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8',
            'wr1','wn1','wb1','wq1' ,'wk' ,'wb2','wn2','wr2'];
    
        
    var objects = canvas3.getObjects();    
    aReciclar = [];   
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].get('type')=='image'){
            if ((objects[x].name != 'mano') && (objects[x].name != 'papelera2')) {
                objects[x].set({left:612,top:480}); 
                objects[x].setCoords();
                aReciclar.push(objects[x].name);                        
            }
        }   
    }
    
    getItemByNameSet('br1').set({left:(0*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('br1').setCoords();
    aReciclar.splice(aReciclar.indexOf('br1'),1);
    getItemByNameSet('bn1').set({left:(1*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bn1').setCoords();
    aReciclar.splice(aReciclar.indexOf('bn1'),1);
    getItemByNameSet('bb1').set({left:(2*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bb1').setCoords();
    aReciclar.splice(aReciclar.indexOf('bb1'),1);
    getItemByNameSet('bq1').set({left:(3*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bq1').setCoords();
     aReciclar.splice(aReciclar.indexOf('bq1'),1);
    getItemByNameSet('bk').set({left:(4*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bk').setCoords();
    aReciclar.splice(aReciclar.indexOf('bk'),1);
    getItemByNameSet('bb2').set({left:(5*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bb2').setCoords();
    aReciclar.splice(aReciclar.indexOf('bb2'),1);
    getItemByNameSet('bn2').set({left:(6*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('bn2').setCoords();
    aReciclar.splice(aReciclar.indexOf('bn2'),1);
    getItemByNameSet('br2').set({left:(7*49)+25+60+2,top:(0*49)+25+20+2});
    getItemByNameSet('br2').setCoords();
    aReciclar.splice(aReciclar.indexOf('br2'),1);
    getItemByNameSet('bp1').set({left:(0*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp1').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp1'),1);
    getItemByNameSet('bp2').set({left:(1*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp2').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp2'),1);
    getItemByNameSet('bp3').set({left:(2*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp3').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp3'),1);
    getItemByNameSet('bp4').set({left:(3*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp4').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp4'),1);
    getItemByNameSet('bp5').set({left:(4*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp5').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp5'),1);
    getItemByNameSet('bp6').set({left:(5*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp6').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp6'),1);
    getItemByNameSet('bp7').set({left:(6*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp7').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp7'),1);
    getItemByNameSet('bp8').set({left:(7*49)+25+60+2,top:(1*49)+25+20+2});
    getItemByNameSet('bp8').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp8'),1);
    
    getItemByNameSet('wr1').set({left:(0*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wr1').setCoords();
    aReciclar.splice(aReciclar.indexOf('wr1'),1);
    getItemByNameSet('wn1').set({left:(1*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wn1').setCoords();
    aReciclar.splice(aReciclar.indexOf('wn1'),1);
    getItemByNameSet('wb1').set({left:(2*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wb1').setCoords();
    aReciclar.splice(aReciclar.indexOf('wb1'),1);
    getItemByNameSet('wq1').set({left:(3*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wq1').setCoords();
    aReciclar.splice(aReciclar.indexOf('wq1'),1);
    getItemByNameSet('wk').set({left:(4*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wk').setCoords();
    aReciclar.splice(aReciclar.indexOf('wk'),1);
    getItemByNameSet('wb2').set({left:(5*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wb2').setCoords();
    aReciclar.splice(aReciclar.indexOf('wb2'),1);
    getItemByNameSet('wn2').set({left:(6*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wn2').setCoords();
    aReciclar.splice(aReciclar.indexOf('wn2'),1);
    getItemByNameSet('wr2').set({left:(7*49)+25+60+2,top:(7*49)+25+20+2});
    getItemByNameSet('wr2').setCoords();
    aReciclar.splice(aReciclar.indexOf('wr2'),1);
    getItemByNameSet('wp1').set({left:(0*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp1').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp1'),1);
    getItemByNameSet('wp2').set({left:(1*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp2').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp2'),1);
    getItemByNameSet('wp3').set({left:(2*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp3').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp3'),1);
    getItemByNameSet('wp4').set({left:(3*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp4').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp4'),1);
    getItemByNameSet('wp5').set({left:(4*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp5').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp5'),1);
    getItemByNameSet('wp6').set({left:(5*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp6').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp6'),1);
    getItemByNameSet('wp7').set({left:(6*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp7').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp7'),1);
    getItemByNameSet('wp8').set({left:(7*49)+25+60+2,top:(6*49)+25+20+2});
    getItemByNameSet('wp8').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp8'),1);
    
    getItemByNameSet('bp9').set({left:6,top:100});
    getItemByNameSet('bp9').setCoords();
    aReciclar.splice(aReciclar.indexOf('bp3'),1);
    getItemByNameSet('bn3').set({left:6,top:160});
    getItemByNameSet('bn3').setCoords();
    aReciclar.splice(aReciclar.indexOf('bn3'),1);
    getItemByNameSet('bb3').set({left:6,top:220});
    getItemByNameSet('bb3').setCoords();
    aReciclar.splice(aReciclar.indexOf('bb3'),1);
    getItemByNameSet('br3').set({left:6,top:280});
    getItemByNameSet('br3').setCoords();
    aReciclar.splice(aReciclar.indexOf('br3'),1);
    getItemByNameSet('bq2').set({left:6,top:340});
    getItemByNameSet('bq2').setCoords();
    aReciclar.splice(aReciclar.indexOf('bq2'),1);
    
    getItemByNameSet('wp9').set({left:512,top:100});
    getItemByNameSet('wp9').setCoords();
    aReciclar.splice(aReciclar.indexOf('wp9'),1);
    getItemByNameSet('wn3').set({left:512,top:160});
    getItemByNameSet('wn3').setCoords();
    aReciclar.splice(aReciclar.indexOf('wn3'),1);
    getItemByNameSet('wb3').set({left:512,top:220});
    getItemByNameSet('wb3').setCoords();
    aReciclar.splice(aReciclar.indexOf('wb3'),1);
    getItemByNameSet('wr3').set({left:512,top:280});
    getItemByNameSet('wr3').setCoords();
    aReciclar.splice(aReciclar.indexOf('wr3'),1);
    getItemByNameSet('wq2').set({left:512,top:340});
    getItemByNameSet('wq2').setCoords();
    aReciclar.splice(aReciclar.indexOf('wq2'),1);
    
    getItemByNameSet('papelera2').set({left:212,top:482});
    getItemByNameSet('papelera2').setCoords();
    getItemByNameSet('mano').set({left:302,top:482});
    getItemByNameSet('mano').setCoords();
    
    console.log('aReciclar: ' + aReciclar)
    
    canvas3.renderAll();
    
}

function ClearSet(){
    
    var objects = canvas3.getObjects();    
    aReciclar = [];   
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].get('type')=='image'){
            if ((objects[x].name != 'mano') && (objects[x].name != 'papelera2')) {
                objects[x].set({left:612,top:480}); 
                objects[x].setCoords();
                aReciclar.push(objects[x].name);
            }
        }   
    }
    
    for ( x = 0; x < 64; x++ ){        
        aPosSet[x] = '0';
    }
    
    getItemByNameSet('bp9').set({left:6,top:100});
    getItemByNameSet('bp9').setCoords();
    ResetReciclar('bp9');
    getItemByNameSet('bn3').set({left:6,top:160});
    getItemByNameSet('bn3').setCoords();
    ResetReciclar('bn3');
    getItemByNameSet('bb3').set({left:6,top:220});
    getItemByNameSet('bb3').setCoords();
    ResetReciclar('bb3');
    getItemByNameSet('br3').set({left:6,top:280});
    getItemByNameSet('br3').setCoords();
    ResetReciclar('br3');
    getItemByNameSet('bq2').set({left:6,top:340});
    getItemByNameSet('bq2').setCoords();
    ResetReciclar('bq2');
    getItemByNameSet('bk').set({left:6,top:400});
    getItemByNameSet('bk').setCoords();
    
    getItemByNameSet('wp9').set({left:512,top:100});
    getItemByNameSet('wp9').setCoords();
    ResetReciclar('wp9');
    getItemByNameSet('wn3').set({left:512,top:160});
    getItemByNameSet('wn3').setCoords();
    ResetReciclar('wn3');
    getItemByNameSet('wb3').set({left:512,top:220});
    getItemByNameSet('wb3').setCoords();
    ResetReciclar('wb3');
    getItemByNameSet('wr3').set({left:512,top:280});
    getItemByNameSet('wr3').setCoords();
    ResetReciclar('wr3');
    getItemByNameSet('wq2').set({left:512,top:340});
    getItemByNameSet('wq2').setCoords();
    ResetReciclar('wq2');
    getItemByNameSet('wk').set({left:512,top:400});
    getItemByNameSet('wk').setCoords();
    
    getItemByNameSet('papelera2').set({left:212,top:482});
    getItemByNameSet('papelera2').setCoords();
    getItemByNameSet('mano').set({left:302,top:482});
    getItemByNameSet('mano').setCoords();    
    
    canvas3.renderAll();
    
}

function getItemByNameSet(name){
    
    var object = null,
        objects = canvas3.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            object = objects[x];
            break;
        }   
    }
    
    return object;
    
}

function CheckIfExistSet(name){
    
    var objects = canvas3.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            return true;
        }   
    }
    
    return false;
    
}

function LeftTopToCasSet(xObj,yObj,cColor,oObj){

    var nCol,nFila,nCas;
    
    if ((xObj>=(0*49)+25+60-27) && (xObj<=(1*49)+25+60-27)){
        nCol = 0;
        oObj.set({left:(0*49)+25+60+2});        
    }else if ((xObj>=(1*49)+25+60-27) && (xObj<=(2*49)+25+60-27)){
        nCol = 1;
        oObj.set({left:(1*49)+25+60+2});        
    }else if ((xObj>=((2*49)+25+60-27)) && (xObj<=((3*49)+25+60-27))){
        nCol = 2;
        oObj.set({left:(2*49)+25+60+2});        
    }else if ((xObj>=((3*49)+25+60-27))&&(xObj<=((4*49)+25+60-27))){
        nCol = 3;
        oObj.set({left:(3*49)+25+60+2});        
    }else if ((xObj>=((4*49)+25+60-27))&&(xObj<=((5*49)+25+60-27))){
        nCol = 4;
        oObj.set({left:((4*49)+25+60+2)});        
    }else if ((xObj>=(5*49)+25+60-27)&&(xObj<=(6*49)+25+60-27)){
        nCol = 5;
        oObj.set({left:(5*49)+25+60+2});        
    }else if ((xObj>=(6*49)+25+60-27) &&(xObj<=(7*49)+25+60-27)){
        nCol = 6;
        oObj.set({left:(6*49)+25+60+2});        
    }else if (xObj>=(7*49)+25+60-27){
        nCol = 7;
        oObj.set({left:(7*49)+25+60+2});        
    }    
    
    if ((yObj>=(0*49)+25+20-27) && (yObj<=(1*49)+25+20-27)){
        nFila = 0;
        oObj.set({top:(0*49)+25+20+2});        
    }else if ((yObj>=(1*49)+25+20-27) && (yObj<=(2*49)+25+20-27)){
        nFila = 1;
        oObj.set({top:(1*49)+25+20+2});        
    }else if ((yObj>=(2*49)+25+20-27) && (yObj<=(3*49)+25+20-27)){
        nFila = 2;
        oObj.set({top:(2*49)+25+20+2});        
    }else if ((yObj>=(3*49)+25+20-27) && (yObj<=(4*49)+25+20-27)){
        nFila = 3;
        oObj.set({top:(3*49)+25+20+2});        
    }else if ((yObj>=(4*49)+25+20-27) && (yObj<=(5*49)+25+20-27)){
        nFila = 4;
        oObj.set({top:(4*49)+25+20+2});        
    }else if ((yObj>=(5*49)+25+20-27) && (yObj<=(6*49)+25+20-27)){
        nFila = 5;
        oObj.set({top:(5*49)+25+20+2});        
    }else if ((yObj>=(6*49)+25+20-27) && (yObj<=(7*49)+25+20-27)){
        nFila = 6;
        oObj.set({top:(6*49)+25+20+2});        
    }else if (yObj>=(7*49)+25+20-27){
        nFila = 7;
        oObj.set({top:(7*49)+25+20+2});        
    }
    
    oObj.setCoords();
    canvas3.renderAll();
    
    if (cColor=='White') {
        nCas = (nFila*8)+nCol;
    }else{
        nCas = 63-((nFila*8)+nCol);
    }
    return nCas;

}

function ReponerPieza(Pieza){
    
    var NombrePieza = Pieza.name;
    var Crear = true;
    var ClasePieza = NombrePieza.substr(0,2);
    var PiezaReciclada;
        
    console.log('tamano aReciclar: ' + aReciclar.length)
    
    var LastItem = aReciclar[aReciclar.length-1];
    console.log('LastItem: '+LastItem)
    
    for ( var i = 0; i < aReciclar.length; i++){
        if (aReciclar[i].substr(0,2) == ClasePieza) {
            Crear = false;            
            PiezaReciclada = aReciclar[i];             
            aReciclar.splice(aReciclar.indexOf(PiezaReciclada),1);            
            break;
        }
    }
    
    if (Crear==true){        
        if (ClasePieza == 'bp') {
            ClasePieza = ClasePieza + bp;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){        
                oImg.set({left:6,top:100});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                bp++;
            });            
        }else if (ClasePieza == 'bn') {
            ClasePieza = ClasePieza + bn;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
                oImg.set({left:6,top:160});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                bn++;
            }); 
        }else if (ClasePieza == 'bb') {
            ClasePieza = ClasePieza + bb;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
                oImg.set({left:6,top:220});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                bb++;
            }); 
        }else if (ClasePieza == 'br') {
            ClasePieza = ClasePieza + br;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
                oImg.set({left:6,top:280});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                br++;
            }); 
        }else if (ClasePieza == 'bq') {
            ClasePieza = ClasePieza + bq;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45bq.png',function(oImg){        
                oImg.set({left:6,top:340});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                bq++;
            }); 
        }else if (ClasePieza == 'wp') {
            ClasePieza = ClasePieza + wp;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){        
                oImg.set({left:512,top:100});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                wp++;
            });            
        }else if (ClasePieza == 'wn') {
            ClasePieza = ClasePieza + wn;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
                oImg.set({left:512,top:160});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                wn++;
            }); 
        }else if (ClasePieza == 'wb') {
            ClasePieza = ClasePieza + wb;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
                oImg.set({left:512,top:220});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                wb++;
            }); 
        }else if (ClasePieza == 'wr') {
            ClasePieza = ClasePieza + wr;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
                oImg.set({left:512,top:280});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                wr++;
            }); 
        }else if (ClasePieza == 'wq') {
            ClasePieza = ClasePieza + wq;
            console.log('Pieza creada: ' + ClasePieza)
            fabric.Image.fromURL('res/img/merida45wq.png',function(oImg){        
                oImg.set({left:512,top:340});
                oImg.hasControls = oImg.hasBorders = false;        
                oImg.name = ClasePieza;
                canvas3.add(oImg);
                wq++;
            }); 
        }
    }else{
        if ((Pieza.left > (85-27)) && (Pieza.left < 477) && (Pieza.top > 45-27) && (Pieza.top < 437-27)){                    
            LeftTopToCasSet(Pieza.left,Pieza.top,'White',Pieza);           
        }else{
            getItemByNameSet(Pieza).set({left:BufferX,top:BufferY});
            getItemByNameSet(Pieza).setCoords();            
        }        
        canvas3.renderAll();
        console.log('Nombre pieza reciclada: ' + PiezaReciclada)
        console.log('aReciclar: ' + aReciclar)
        if ((PiezaReciclada!='wk') && (PiezaReciclada!='bk')) {        
            getItemByNameSet(PiezaReciclada).set({left:BufferX,top:BufferY});
            getItemByNameSet(PiezaReciclada).setCoords();
        }
        canvas3.renderAll();
         
    }
    
}

function ResetReciclar(NombrePieza){    
    aReciclar.splice(aReciclar.indexOf(NombrePieza),1);
    console.log('aReciclar: ' + aReciclar)
}

function SendSET(aBuffer2){
    
    for ( var n = 0; n < 64; n++ ){        
        
        aPos[n] = aBuffer2[n];        
        
        if (aPos[n].substr(0,2)=='br') {
            if (!CheckIfExist(aPos[n])){                
                var object = fabric.util.object.clone(getItemByName('br1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='bn') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('bn1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='bb') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('bb1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='bq') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('bq'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='bk') {
            if (!CheckIfExist(aPos[n])){
                var object = fabric.util.object.clone(getItemByName('bk'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='bp') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('bp1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wr') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('wr1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wn') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('wn1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wb') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('wb1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wq') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('wq'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wk') {            
            if (!CheckIfExist(aPos[n])){                
                var object = fabric.util.object.clone(getItemByName('wk'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
        }else if (aPos[n].substr(0,2)=='wp') {
            if (!CheckIfExist(aPos[n])){ 
                var object = fabric.util.object.clone(getItemByName('wp1'));
                object.name = aPos[n];                
                canvas.add(object);                               
            }                                
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
    aFENs = [];
    
    var aBuffer = new Array(5);
    aBuffer[0] = -1; // Nodo padre;
    aBuffer[1] = 0; // Nodo hijo
    aBuffer[2] = 'INI:'; // Move
    aBuffer[3] = '';
    aBuffer[4] = false;
    aBuffer[5] = '';    
    
    aVariantes.push(aBuffer);
    
    NodoPadre = 0;
    BufferNodoPadre = 0;
    //ContPosi = 1;
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
    
    var aBuffer3 = new Array(72);
    var i;
    for (i = 0; i < aBuffer3.length; i++){
        aBuffer3[i] = aPos[i];
    }    
    
    aPosiciones.push(aBuffer3);
    ContPosi = 0;    
    
    $('#DivMoves').append('<div id="diver'+ContPosi+'" style="float:left; border:0px solid black;"></div>');        
    $('#diver' + ContPosi).append('<label id="'+ContPosi+'" onclick="MoveClick(id)" style="float:left; color:green; margin-left:0px; margin-top:4px; font-family:Arial,Helvetica,sans-serif; font-size:18px">INI:</label>');
        
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
    
    // Making Fen String
    var aFEN = new Array(6);
    
    aFEN[3] = '-';
    aFEN[4] = '0';
    aFEN[5] = '1';

    var cTurn;
    if ($('#Turno').val()=='White turn'){
        cTurn = 'w';
    }else{
        cTurn = 'b';
    }
    console.log('Turno: '+cTurn)
    aFEN[1] = cTurn;
    
    var cFENEnroque = '';

    if ($('#EnroqueCortoBlancas').is(':checked')){
        cFENEnroque = cFENEnroque + 'K';
    }
    if ($('#EnroqueLargoBlancas').is(':checked')){
        cFENEnroque = cFENEnroque + 'Q';
    }
    if ($('#EnroqueCortoNegras').is(':checked')){
        cFENEnroque = cFENEnroque + 'k';
    }
    if ($('#EnroqueLargoNegras').is(':checked')){
        cFENEnroque = cFENEnroque + 'q';
    }

    if (cFENEnroque == '') {
        cFENEnroque = '-';
    }

    console.log(cFENEnroque)
    aFEN[2]=cFENEnroque;

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
    aFENs.push(aFEN);    
    var CadenaFEN = aFEN[0] + ' ' + aFEN[1] + ' ' + aFEN[2] + ' ' + aFEN[3] + ' ' + aFEN[4] + ' ' +aFEN[5];

    console.log('FEN: ' + CadenaFEN)

    /*if (Analizando) {
        $('#Variant0').html('');
        $('#ImgLoader').show();
        stockfish.postMessage("stop");    
        stockfish.postMessage("position fen " + CadenaFEN);
        stockfish.postMessage("go depth " + $('#SetDepth').val());    
    }*/

    $('#BtnIni').trigger('click');
    
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
        
    NodoPadre = ContPosi; //Listo para proximo movimiento
    
}