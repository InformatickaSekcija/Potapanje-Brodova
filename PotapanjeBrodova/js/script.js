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

            // makeShips(sirina, visina);
            ubaci3ku(brodovi,sirina,visina);
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
        for(var i=1; i<=s; i++) {
            result += "<tr>";
            for(var j=1; j<=v; j++){
                id=id+1;
                result += "<td id="+id+">"+id+"</td>";
            }
            result += "</tr>";
        }
        result += "</table>";
        return result;
    }
//ubacuje brod velicine dva
    function ubaci2ku(niz,s,v) {
        var rand;
        var ubaceno;

        while (rand == undefined) {
            rand = Math.floor(Math.random() * s * v) + 1;
            alert('Pokusaj da se ubaci brod da poziciju:'+rand);
            if (brodovi.indexOf(rand)==-1){
                brodovi.push(rand);
                while (ubaceno == undefined) {
                    ubaceno = ubaciPored(rand, s, v, niz);
                }
            }else rand= undefined;


        }
    }
    //ubacuje brod velicine tri
    function ubaci3ku(niz,s,v) {
        var rand, ubaceno = 0;
        var smer;
        while (ubaceno == 0) {

        rand = Math.floor(Math.random() * s * v) + 1;
        alert('Pokusaj da se ubaci brod vecini 3 sa centrom na:' + rand);
        smer = Math.floor(Math.random() * 2) + 1;
        if (smer = 1) {
            if (((Math.floor((rand + 1) / v) == Math.floor(rand / v)) && (niz.indexOf((rand + 1)) == -1)) &&
                ((Math.floor((rand - 1) / v) == Math.floor(rand / v)) && (niz.indexOf(rand + v) == -1))) {
                niz.push(rand);
                niz.push(rand + 1);
                niz.push(rand - 1);
                ubaceno = 1;//ubaci desno i levo
                alert('ubaceno desno i levo');
            }
            else {
                if (((pozicija + v < s * v) && (niz.indexOf(rand + v) == -1)) && ((rand - v >= 0) &&
                        (niz.indexOf(rand + v) == -1))) {
                    niz.push(rand);
                    niz.push(rand + v);
                    niz.push(rand - v);
                    ubaceno = 2;//ubaci gore i dole
                    alert('ubaceno gore i dole');
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
                case 1:if((Math.floor((pozicija+1)/v)==Math.floor(pozicija/v))&&(niz.indexOf((pozicija+1)) == -1)){
                    niz.push((pozicija+1));
                    return 1;//ubaci desno
                }
                case 2:if((pozicija+v<s*v)&&(niz.indexOf(pozicija+v) == -1)){
                    niz.push(pozicija+v);
                    return 2;//ubaci dole
                }
                case 3:if((Math.floor((pozicija-1)/v)==Math.floor(pozicija/v))&&(niz.indexOf(pozicija+v) == -1)){
                    niz.push((pozicija-1));
                    return 3;//ubaci levo
                }
                case 4:if((pozicija-v>=0)&&(niz.indexOf(pozicija+v) == -1)){
                    niz.push(pozicija-v);
                    return 4;//ubaci gore
                }
                default :{
                    return ubaciPored(pozicija,s,v,niz);
                }
            }
        }


