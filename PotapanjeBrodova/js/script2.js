$(document).ready(function () {
   $('.podesi').click(function () {
       var igra = $('.igra');
       var visina = parseInt($('.visina').val());
       var sirina = parseInt($('.sirina').val());
       var sir = parseInt($('.igra').width());
       var vis = parseInt($('.igra').height());
       var Width = sir/sirina;
       var Height = vis/visina-1;
       var widthRe = Width;
       igra.empty(); // praznimo vec kreirana polja pre ponovnog definisanja
       if(visina > 20 || sirina > 20 ){
           alert('Visina i sirina moraju da budu maximalno 20.');
       }
       else if(visina <= 5 || sirina < 5){
           alert('Visina i sirina moraju da budu vece od 5.')
       }
       else {
           makeTable(); // for petlja za pravljenje tabele
           for (i=0; i < $('.field').length; i++){
               $('.field')[i].append(i)                //For petlja za dodavanje broja svakom polju
           }
       }
       function makeTable () {
           for (i = 1; i <= sirina; i++) {
               igra.append('<div class="colum num' + i + '" style="width:' + Width + 'px;max-width:' + Width + 'px;float: left; display: inline-block; height: 648px;"></div>');
               for (j = 0; j < visina; j++) {
                   $('.num' + i).append('<div class="field numb' + i + j + '" style="width:' + widthRe + 'px;max-width:' + widthRe + 'px; height:' + Height + 'px; margin: 1px; border: 1px solid black; text-align: center; vertical-align: middle; display: table"></div>');
               }
           }
       }
   });
   $('.field').click(function () {
       $(this).css({"background-color": "blue", "font-size": "100%"});
   })
});

