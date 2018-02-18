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
//ubacuje dvojku, dodati proveru za rand da li već postoji brod na toj poziciji
    function ubaci2ku(niz,s,v) {
        var rand,rand2,rez;
        var ubaceno;
        rand=Math.floor(Math.random() * s * v)+1;
        niz.push(rand);
        while (ubaceno == undefined) {
            ubaceno=ubaciPored(rand,s,v,niz);
        }
        alert(rand+' '+ubaceno);
    }

    function ubaci3ku(niz,s,v){

    }
//ubaci pored zadate pozicije, dodaje na poziciju pored u zavisnosti od izvucenog slucajnog broja,
//dodati da proverava da li je nešto ubačeno i ako nije da ponavlja dok ne ubaci
        function ubaciPored(pozicija,s,v,niz){
            var rand2=Math.floor(Math.random()*4)+1;
            alert(rand2);
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


