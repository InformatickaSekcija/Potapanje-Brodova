var potez=0;
var dodato=false;
var brodovi = [];
var maxPoteza = 1000;
var pogodaka=-1;


function Klik(e)
{
    if ((maxPoteza>potez)&&(brodovi.length != pogodaka)){
        if (e.target.className = "dodaj" && dodato == false) {
            //unos sirine i visine, minimum je 5
            var sirina = Math.max(parseInt(prompt("Molim Vas unesite sirinu tabele u poljima", "5")), 5);
            var visina = Math.max(parseInt(prompt("Molim Vas unesite visinu tabele u poljima", "5")), 5);
            var div = e.target.parentNode;

            div.childNodes[3].innerHTML = makeTableHTML(sirina, visina);
            //za testiranje ubacujem dve trojke i dve dvojke
            ubaci4ku(brodovi,sirina,visina);
            ubaci3ku(brodovi,sirina,visina);
            ubaci3ku(brodovi,sirina,visina);
            ubaci2ku(brodovi,sirina,visina);
            ubaci2ku(brodovi,sirina,visina);
            ubaci2ku(brodovi,sirina,visina);
             maxPoteza = Math.round(sirina * visina / 2) + 100;
            div.childNodes[5].innerHTML = 'Maksimalan broj poteza ' + maxPoteza;
            potez = 0;
            div.childNodes[7].innerHTML = 'Trenutni potez ' + potez;
            dodato = true;
            pogodaka=0;
        }
        else if ((brodovi.indexOf(parseInt(e.target.id)) > -1) &&(e.target.style.backgroundColor != "red")) {
            e.target.style.backgroundColor = "red";
            potez++;
            var Doc = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[7];
            pogodaka++;
            Doc.innerHTML = 'Trenutni potez ' + potez;
            if (brodovi.length==pogodaka){
                alert('Pobeda!');
            };
        }
        else if (((e.target.id).length>0)&&(e.target.style.backgroundColor != "blue") && (e.target.style.backgroundColor != "red")){
            e.target.style.backgroundColor = "blue";
            potez++;
            var Doc = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[7];
            Doc.innerHTML = 'Trenutni potez ' + potez;
        }
    }
    else{
        alert('Kraj Igre!');
        dodato=false;
    }
}

//funkcija kojom generišemo tabelu
function ucitajTabelu() {
    var sirina= prompt("Molim Vas unesite sirinu tabele u poljima", "10");
    var visina= prompt("Molim Vas unesite visinu tabele u poljima", "10");
    var div = document.getElementsByClassName('main');
    div.innerHTML += makeTableHTML(sirina,visina);
}

    function makeShips(s,v){
    var rand;
    while(Math.round(s*v/3)>brodovi.length){
        rand=Math.floor(Math.random() * s * v)+1;
        if (brodovi.indexOf(rand)==-1){
            brodovi.push(rand);
        }
    }

    }


    function makeTableHTML(s,v) {
        var result = "<table border=1>";
        var id=-1;
        for(var i=1; i<=v; i++) {
            result += "<tr>";
            for(var j=1; j<=s; j++){
                id=id+1;
                result += "<td id="+id+">"+id+"</td>";
            }
            result += "</tr>";
        }
        result += "</table>";
        return result;
    }
        //napraviti da random bira smer a ne redom: desno, dole, gore, levo
    function ubaci4ku(niz,s,v){
    //bira nasumicno prazno polje
        //pokusava da doda na to polje sa desne, donje, leve i gornje strane
        //ako uspe u bilo kom smeru ubacuje sve elemente niza
        //ako ne uspe izvlaci novo prazno polje
        var rand;
        var ubacen=false;
        do{
            rand = Math.floor(Math.random()*s*v);

            if (brodovi.indexOf(rand)==-1){//ako nema na tom polju brod pokusaj da ubacis

               if ((Math.floor((rand + 3) / s) == Math.floor(rand / s))){//da li je u istom redu desno 3 moguce
                   if ((niz.indexOf((rand)) == -1) &&(niz.indexOf((rand+1)) == -1)&&(niz.indexOf((rand+2)) == -1)
                   &&(niz.indexOf((rand+3)) == -1)) {
                       brodovi.push(rand);
                       brodovi.push(rand+1);
                       brodovi.push(rand+2);
                       brodovi.push(rand+3);
                       ubacen=true;
                       alert('Ubacen brod velicine 4 nadesno na poziciju:'+rand);
                   }
               }else if (rand+3*s<s*v){//da li je u istoj koloni 3 dole moguce

                   if ((niz.indexOf((rand)) == -1) &&(niz.indexOf((rand+s)) == -1)&&(niz.indexOf((rand+2*s)) == -1)
                       &&(niz.indexOf((rand+3*s)) == -1)) {
                       brodovi.push(rand);
                       brodovi.push(rand+s);
                       brodovi.push(rand+2*s);
                       brodovi.push(rand+3*s);
                       ubacen=true;
                       alert('Ubacen brod velicine 4 nadole na poziciju:'+rand);
                   }
               }else if (rand-3*s>=0){//da li je u istoj koloni 3 gore moguce

                   if ((niz.indexOf((rand)) == -1) &&(niz.indexOf((rand-s)) == -1)&&(niz.indexOf((rand-2*s)) == -1)
                       &&(niz.indexOf((rand-3*s)) == -1)) {
                       brodovi.push(rand);
                       brodovi.push(rand-s);
                       brodovi.push(rand-2*s);
                       brodovi.push(rand-3*s);
                       ubacen=true;
                       alert('Ubacen brod velicine 4 nagore na poziciju:'+rand);
                   }
               } else if ((Math.floor((rand - 3) / s) == Math.floor(rand / s))) {//da li je u istom redu levo 3 moguce

                   if ((niz.indexOf((rand)) == -1) &&(niz.indexOf((rand-1)) == -1)&&(niz.indexOf((rand-2)) == -1)
                       &&(niz.indexOf((rand-3)) == -1)) {
                       brodovi.push(rand);
                       brodovi.push(rand-1);
                       brodovi.push(rand-2);
                       brodovi.push(rand-3);
                       ubacen=true;
                       alert('Ubacen brod velicine 4 nalevo na poziciju:'+rand);
                   }
               }
            }

        }while (ubacen==false);
    }
//ubacuje brod velicine dva
    function ubaci2ku(niz,s,v) {
        var rand, smer;
        var ubaceno=0;

        while (ubaceno == 0) {
            rand = Math.floor(Math.random() * s * v);
            if (brodovi.indexOf(rand) == -1) {
                smer = Math.floor(Math.random() * 4) + 1;
                switch (smer) {
                    case 1:
                        if ((Math.floor((rand + 1) / s) == Math.floor(rand / s)) && (niz.indexOf((rand + 1)) == -1)) {
                            niz.push(rand);
                            niz.push(rand + 1);
                            alert('Ubacen brod velicine 2 ubacen na pozicije:' + rand + ' i ' + (rand + 1));
                            ubaceno=1;
                            break;
                        }
                    case 2:
                        if ((rand + s < s * v) && (niz.indexOf(rand + s) == -1)) {
                            niz.push(rand + s);
                            niz.push(rand);
                            alert('Ubacen brod velicine 2 ubacen na pozicije:' + rand + ' i ' + (rand + s));
                            ubaceno=2;
                            break;
                        }
                    case 3:
                        if ((Math.floor((rand - 1) / s) == Math.floor(rand / s)) && (niz.indexOf(rand -1) == -1)) {
                            niz.push((rand - 1));
                            niz.push(rand);
                            alert('Ubacen brod velicine 2 ubacen na pozicije:' + rand + ' i ' + (rand - 1));
                            ubaceno=3;
                            break;
                        }
                    case 4:
                        if ((rand - s >= 0) && (niz.indexOf(rand + s) == -1)) {
                            niz.push(rand - s);
                            niz.push(rand);
                            alert('Ubacen brod velicine 2 ubacen na pozicije:' + rand + ' i ' + (rand - s));
                            ubaceno=4;
                            break;
                        }

                }
            }
        }
    }
    //ubacuje brod velicine tri
    function ubaci3ku(niz,s,v) {
        var rand, ubaceno = 0;
        var smer;
        while (ubaceno == 0) {

        rand = Math.floor(Math.random() * s * v);

        if (niz.indexOf(rand)==-1){//da li moze da se ubaci centra broda?
            smer = Math.floor(Math.random() * 2) + 1;

        if (smer = 1) {
            if (((Math.floor((rand + 1) / s) == Math.floor(rand / s)) && (niz.indexOf((rand + 1)) == -1)) &&
                ((Math.floor((rand - 1) / s) == Math.floor(rand / s)) && (niz.indexOf(rand + s) == -1))) {
                niz.push(rand);
                niz.push(rand + 1);
                niz.push(rand - 1);
                ubaceno = 1;//ubaci desno i levo
                alert('ubacena trojka desno i levo sa centrom na:' + rand);
            }
            else {
                if (((rand + s < s * v) && (niz.indexOf(rand + s) == -1)) && ((rand - s >= 0) &&
                        (niz.indexOf(rand + s) == -1))) {
                    niz.push(rand);
                    niz.push(rand + s);
                    niz.push(rand - s);
                    ubaceno = 2;//ubaci gore i dole
                    alert('ubacena trojka gore i dole sa centrom na:'+rand);
                }
            }
        }
        }
        }
        return ubaceno;

    }
//ubaci pored zadate pozicije, dodaje na poziciju pored u zavisnosti od izvucenog slucajnog broja
        function ubaciPored(pozicija,s,v,niz){
            var rand2=Math.floor(Math.random()*4)+1;
            alert('Pokusaj da se ubaci brodu na poziciju:'+pozicija+' doda brod sa strane'+rand2);
            switch(rand2){
                case 1:if((Math.floor((pozicija+1)/s)==Math.floor(pozicija/s))&&(niz.indexOf((pozicija+1)) == -1)){
                    niz.push((pozicija+1));
                    return 1;//ubaci desno
                }
                case 2:if((pozicija+s<s*v)&&(niz.indexOf(pozicija+s) == -1)){
                    niz.push(pozicija+s);
                    return 2;//ubaci dole
                }
                case 3:if((Math.floor((pozicija-1)/s)==Math.floor(pozicija/s))&&(niz.indexOf(pozicija+s) == -1)){
                    niz.push((pozicija-1));
                    return 3;//ubaci levo
                }
                case 4:if((pozicija-s>=0)&&(niz.indexOf(pozicija+s) == -1)){
                    niz.push(pozicija-s);
                    return 4;//ubaci gore
                }
                default :{
                    return ubaciPored(pozicija,s,v,niz);
                }
            }
        }


