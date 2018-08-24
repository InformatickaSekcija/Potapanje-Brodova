var brodovi = [];//glavni niz
const visina = 10;
const sirina = 10;
var select = null;//trenutno selektovano polje
var lastClick = null;//prethodno selektovano polje
var izbori = [];//bliži prsten susednih(4) polja
var izbori2 = [];//dalji prsten susednih(4) polja

//ucitaj tabelu
document.getElementById('podesi').addEventListener('click', function(event){
    // sirina = parseInt(document.getElementById('sirina').value);
    // visina = parseInt(document.getElementById('visina').value);
    var igra = document.getElementById('igra');
    igra.innerHTML = '';
    var visinaIgre = igra.clientHeight;
    var sirinaIgre = igra.clientWidth;
    var sirinaPolja = sirinaIgre / sirina;
    var visinaPolja = visinaIgre / visina;


        //napravi div za svako polje od 1 do visina*sirna +1
        for( i = 1; i <= visina*sirina ; i++){
            var child = document.createElement('div'); //kreiramo div
            var text = document.createTextNode(i); //pravimo ispisanu brojnu vrednost
            child.appendChild(text); //dodajemo text na div
            child.setAttribute('class', 'polje');
            child.setAttribute('id', i)
            child.style.width = sirinaPolja + 'px';
            child.style.height = visinaPolja + 'px';
            child.style.lineHeight = visinaPolja+'px';//centriranje teksta
            child.addEventListener('click', addSelector)
            igra.appendChild(child);
    }
});
//funkcije -> da li je klik u izbori1 ili izbori2 - sve u izbori -> jer ce biti i izbori3
function addSelector(){
    if(select != null){ //u slucaju da smo selectovali neki element proslim klikom, tu vrednost prebacujemo u lastClick variablu
        lastClick = select;
        select = parseInt(this.id);
    }else {
        select = parseInt(this.id); // ako nismo imali nista selectovano samo definisemo select kao id kliknutog polja
    }
    if(izbori.indexOf(select) != -1){
        for (i=0; i<izbori.length; i++){
            if(izbori[i] != select){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff';
            }
        }
        for (i=0; i<izbori2.length; i++){
            document.getElementById(izbori2[i]).style.backgroundColor = '#fff';
        }
        brodovi.push({
            duzina: 2,
            pozicija: [
                select,
                lastClick
            ]
        });
        document.getElementById(select).style.backgroundColor = 'blue';
        console.log(brodovi)
        izbori=[];
        izbori2=[];
        select= null;
        lastClick = null;
    }
    else if(izbori2.indexOf(select) != -1){
        for (i=0; i<izbori2.length; i++){
            if(izbori2[i] != select){
                document.getElementById(izbori2[i]).style.backgroundColor = '#fff';
            }
        }
        for (i=0; i<izbori.length; i++){
            document.getElementById(izbori[i]).style.backgroundColor = '#fff';
        }
        var middle = (select+lastClick)/2;
        brodovi.push({
            duzina: 3,
            pozicija: [
                select,
                middle,
                lastClick
            ]
        });
        document.getElementById(select).style.backgroundColor = 'blue';
        document.getElementById(middle).style.backgroundColor = 'blue';
        console.log(brodovi)
        izbori=[];
        izbori2=[];
        select= null;
        lastClick = null;
    }
    else if(select !== lastClick && izbori.indexOf(select) == -1){
        if(!checkPosition(select)){
            alert('found')
            select = lastClick;
            lastClick = null;
        }
        else if(lastClick != null && !checkPosition(select)){
            alert(lastClick)
            if(checkPosition(lastClick)){
                document.getElementById(lastClick).style.backgroundColor = '#fff';
            }
            for (i=0; i < izbori.length; i++){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff';
            }
            for (i=0; i < izbori2.length; i++){
                document.getElementById(izbori2[i]).style.backgroundColor = '#fff';
            }
        }
        else if(checkPosition(select)){
            alert('click')
            if(lastClick != null && checkPosition(lastClick)){
                document.getElementById(lastClick).style.backgroundColor = '#fff';
            }
            for (i = 0; i< izbori.length; i++){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff'
            }
            for (i = 0; i< izbori2.length; i++){
                document.getElementById(izbori2[i]).style.backgroundColor = '#fff'
            }
            izbori = [];
            izbori2 = [];
            document.getElementById(select).style.backgroundColor = 'blue';
            if(select+sirina <= sirina*visina){
                if(checkPosition(select+sirina)){
                    izbori.push(select+sirina);
                    document.getElementById(select+sirina).style.backgroundColor = 'yellow';
                }
                if(select+(sirina*2) <= sirina*visina){
                    if(checkPosition(select+(sirina*2))){
                        izbori2.push(select+(sirina*2));
                        document.getElementById(select+(sirina*2)).style.backgroundColor = 'orange';
                    }
                }
            }
            if(select-sirina > 0){
                if(checkPosition(select-sirina)){
                    izbori.push(select-sirina);
                    document.getElementById(select-sirina).style.backgroundColor = 'yellow';
                }
                if(select-(sirina*2) > 0){
                    if(checkPosition(select-(sirina*2))){
                        izbori2.push(select-(sirina*2));
                        document.getElementById(select-(sirina*2)).style.backgroundColor = 'orange';
                    }
                }
            }
            if(Math.ceil((select+1)/sirina) == Math.ceil(select/sirina)){
                if(checkPosition(select+1)){
                    izbori.push(select+1);
                    document.getElementById(select+1).style.backgroundColor = 'yellow';
                }
                if(Math.ceil((select+2)/sirina) == Math.ceil(select/sirina)){
                    if(checkPosition(select+2)){
                        izbori2.push(select+2);
                        document.getElementById(select+2).style.backgroundColor = 'orange';
                    }
                }
            }
            if(Math.ceil((select-1)/sirina) == Math.ceil(select/sirina)){
                if(checkPosition(select-1)){
                    izbori.push(select-1);
                    document.getElementById(select-1).style.backgroundColor = 'yellow';
                }
                if(Math.ceil((select-2)/sirina) == Math.ceil(select/sirina)){
                    if(checkPosition(select-2)){
                        izbori2.push(select-2);
                        document.getElementById(select-2).style.backgroundColor = 'orange';
                    }
                    
                }
            }
        }
    }
    else if(lastClick == select) {
        alert('already selected')
    }
}
//proveri da li je na nekoj poziciji brod
function checkPosition(position){
    var m = brodovi.length;
    while (m-- > -1){
        if(brodovi[m]){
            if(brodovi[m].pozicija.indexOf(position) !== -1){
                return false
                break;
            }
            else if(brodovi[m].pozicija.indexOf(position) !== -1 && m == -1){
                return true
            }
        }else {
            return true
        }
    }
}
