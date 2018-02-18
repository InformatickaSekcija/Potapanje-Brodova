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
       if (!visina || !sirina){    //Proveravamo da li su uneti sirina i visina
           alert('Unesite visinu i sirinu!')
       }
       if(visina > 20 || sirina > 20 ){    //Proveravamo unete vrednosti, ako su vece od 20, alert NO!
           alert('Visina i sirina moraju da budu maximalno 20.');
       }
       else if(visina < 5 || sirina < 5){     //Proveravamo unete vrednosti, ako su manje od 5, alert NO!
           alert('Visina i sirina moraju da budu vece od 5.')
       }
       else {
           makeTable(); // for petlja za pravljenje tabele
           for (i=0; i < $('.field').length; i++){
               $('.field')[i].append(i+1)                //For petlja za dodavanje broja svakom polju
           }
       }
       function makeTable () {
           for (i = 1; i <= sirina; i++) {
               igra.append('<div class="colum num' + i + '" style="width:' + Width + 'px;max-width:' + Width + 'px;float: left; display: inline-block; height: 648px;"></div>');
               for (j = 0; j < visina; j++) {
                   $('.num' + i).append('<a href="#" class="oboji"><div class="field numb' + i + j + '" style="width:' + widthRe + 'px;max-width:' + widthRe + 'px; height:' + Height + 'px; margin: 1px; border: 1px solid black; text-align: center; vertical-align: middle; display: table"></div></a>');
               }
           }
       }
   });
   $(document).on('click', '.oboji', function () {
       $(this).children('.field').css('background-color','blue');
   })
});

