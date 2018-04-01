var brodovi = [];
var visina;
var sirina;
var select = null;
var lastClick = null;
var izbori = [];

//ucitaj tabelu
document.getElementById('podesi').addEventListener('click', function(event){
    sirina = parseInt(document.getElementById('sirina').value);
    visina = parseInt(document.getElementById('visina').value);
    var igra = document.getElementById('igra');
    igra.innerHTML = '';
    var visinaIgre = igra.clientHeight;
    var sirinaIgre = igra.clientWidth;
    var sirinaPolja = sirinaIgre / sirina;
    var visinaPolja = visinaIgre / visina;
    event.preventDefault();
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
        for( i = 1; i < visina*sirina +1; i++){
            var child = document.createElement('div');
            var text = document.createTextNode(i);
            child.appendChild(text);
            child.setAttribute('class', 'polje');
            child.setAttribute('id', i)
            child.style.width = sirinaPolja + 'px';
            child.style.height = visinaPolja + 'px';
            child.style.lineHeight = visinaPolja+'px';
            child.addEventListener('click', addSelector)
            igra.appendChild(child)
        }
    }
});

function addSelector(){
    if(select != null){
        lastClick = select;
        select = parseInt(this.id);
    }else {
        select = parseInt(this.id);
    }
    if(izbori.indexOf(select) != -1){
        for (i=0; i<izbori.length; i++){
            if(izbori[i] != select){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff';
            }
        }
        brodovi.push({
            duzina: 2,
            pozicija: [
                select,
                lastClick
            ]
        });
        document.getElementById(select).style.backgroundColor = 'blue';
        izbori=[];
        select= null;
        lastClick = null;
    }
    else if(select !== lastClick && izbori.indexOf(select) == -1){
        if(lastClick != null && !checkPosition(select)){
            if(checkPosition(lastClick)){
                document.getElementById(lastClick).style.backgroundColor = '#fff';
            }
            for (i=0; i < izbori.length; i++){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff';
            }
        }
        if(checkPosition(select)){
            izbori = [];
            alert('hey ho');
            document.getElementById(select).style.backgroundColor = 'blue';
            if(select+sirina <= sirina*visina){
                if(checkPosition(select+sirina)){
                    izbori.push(select+sirina);
                    document.getElementById(select+sirina).style.backgroundColor = 'yellow';
                }
            }
            if(select-sirina > 0){
                if(checkPosition(select-sirina)){
                    izbori.push(select-sirina);
                    document.getElementById(select-sirina).style.backgroundColor = 'yellow';
                }
            }
            if(Math.ceil((select+1)/sirina) == Math.ceil(select/sirina)){
                if(checkPosition(select+1)){
                    izbori.push(select+1);
                    document.getElementById(select+1).style.backgroundColor = 'yellow';
                }
            }
            if(Math.ceil((select-1)/sirina) == Math.ceil(select/sirina)){
                if(checkPosition(select-1)){
                    izbori.push(select-1);
                    document.getElementById(select-1).style.backgroundColor = 'yellow';
                }
            }
        }
        else if(!checkPosition(select)){
            alert('found')
        }
    }
    else if(lastClick == select) {
        alert('already selected')
    }
}

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