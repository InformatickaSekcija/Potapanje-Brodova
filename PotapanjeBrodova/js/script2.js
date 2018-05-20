var selection = null;
var lastClick = null;
var izbori = [];
var izbori2 = [];
var brodovi = [];
var sirina = 10;
var visina = 10;

document.getElementById('podesi').addEventListener('click', function(event){
    // sirina = parseInt(document.getElementById('sirina').value);
    // visina = parseInt(document.getElementById('visina').value);
    visina = 10;
    sirina = 10;
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
        //napravi div za svako polje od 1 do visina*sirna +1
        for( i = 1; i < visina*sirina +1; i++){
            var child = document.createElement('div'); //kreiramo div
            var text = document.createTextNode(i); //pravimo ispisanu brojnu vrednost
            child.appendChild(text); //dodajemo text na div
            child.setAttribute('class', 'polje'); 
            child.setAttribute('id', i)
            child.style.width = sirinaPolja + 'px';
            child.style.height = visinaPolja + 'px';
            child.style.lineHeight = visinaPolja+'px';
            child.addEventListener('click', hey)
            igra.appendChild(child)
        }
    }
});

//cisti boje i nizove
function clearUnselected(){
    for (i=3; i>-1; i--){
        if(izbori[i]){
            if(checkPosition(izbori[i])){
                document.getElementById(izbori[i]).style.backgroundColor = '#fff';
            }
            izbori.pop();
        }
        if(izbori2[i]){
            if(checkPosition(izbori2[i])){
                document.getElementById(izbori2[i]).style.backgroundColor = '#fff';
            }
            izbori2.pop();
        }
    }
}

// push brod u niz
function InsertSelection(f1, f2, f3, f4){
    var selected = [];
    selected.push(f1);
    if(f2) selected.push(f2);
    if(f3) selected.push(f3);
    if(f4) selected.push(f4);
    brodovi.push({
        duzina: selected.length,
        pozicija: selected
    });
    console.log(brodovi)
};

// Proverava da li je polje levo od izabranog zauzeto
function checkLeft(f, diference, sirina, arr, color){
    if(Math.ceil((f-diference)/sirina) == Math.ceil(f/sirina) && checkPosition(f-diference)){
        arr.push(f-diference);
        document.getElementById(f-diference).style.backgroundColor = color;
    }
}

// Proverava da li je polje desno od izabranog zauzeto
function checkRight(f, diference, sirina, arr, color){
    if(Math.ceil((f+diference)/sirina) == Math.ceil(f/sirina) && checkPosition(f+diference)){
        arr.push(f+diference);
        document.getElementById(f+diference).style.backgroundColor = color;
    }
}

// Proverava da li je polje iznad od izabranog zauzeto
function checkUp(f, diference, visina, arr, color){
    if((f - (visina*diference)) > 0 && checkPosition(f-(visina*diference))){
        arr.push(f - (visina*diference));
        document.getElementById(f - (visina*diference)).style.backgroundColor = color;
    }
}

// Proverava da li je polje ispod od izabranog zauzeto
function checkDown(f, diference,sirina, visina, arr, color){
    if((f + (visina*diference)) < (visina*sirina)  && checkPosition(f+(visina*diference))){
        arr.push(f + (visina*diference));
        document.getElementById(f + (visina*diference)).style.backgroundColor = color;
    }
}

function checkPer(f, diference, sirina, visina, arr, color){
    checkDown(f, diference, sirina, visina, arr, color);
    checkUp(f, diference, visina, arr, color);
    checkLeft(f, diference,sirina,arr,color);
    checkRight(f, diference,sirina,arr,color);
}

function highlightSelection(f, height, width, arr1, arr2, test){
    if(test != null){
        clearUnselected();
    }
    document.getElementById(f).style.backgroundColor = 'blue';
    for(i=1; i< 3; i++){
        if(i= 1){
            checkPer(f, i, width, height, arr1, 'yellow');
            console.log(izbori)
        }
        if(i= 2){
            if(checkPosition(f+1)) checkRight(f, i, width, arr2, 'orange');
            if(checkPosition(f-1)) checkLeft(f, i, width, arr2, 'orange');
            if(checkPosition(f-height)) checkUp(f, i, height, arr2, 'orange');
            if(checkPosition(f+height)) checkDown(f, i, width, height, arr2, 'orange');
        }
    }
}

function colorPlaced(f1,f2,f3,f4){
    clearUnselected(izbori, izbori2);
    document.getElementById(f1).style.backgroundColor = 'blue';
    if(f2) document.getElementById(f2).style.backgroundColor = 'blue';
    if(f3) document.getElementById(f3).style.backgroundColor = 'blue';
    if(f4) document.getElementById(f4).style.backgroundColor = 'blue';
}

function selectandplace(arr1, arr2, test){
    alert(test)
    if(selection != null){
        lastClick = selection;
        selection = test;
    } else {
        selection = test;
    }
   if(selection != lastClick && (izbori.indexOf(selection) !== -1 || izbori2.indexOf(selection) !== -1)){
        alert('hoy')
        if(izbori.indexOf(selection) !== -1){
            alert('i');
            InsertSelection(selection, lastClick);                        
            colorPlaced(selection, lastClick);
            selection = null;
            lastClick = null;
        }
        else if(izbori2.indexOf(selection) !== -1){
            alert('i2')
            var middle =(selection + lastClick)/2;
            InsertSelection(selection, middle, lastClick);
            colorPlaced(selection, middle, lastClick);
            selection = null;
            lastClick = null;
        }
    }
    else if(selection != lastClick && izbori.indexOf(selection) == -1 && izbori2.indexOf(selection) == -1){
        if(checkPosition(selection)){
            if(lastClick != null){
                document.getElementById(lastClick).style.backgroundColor = '#fff';
            }
            alert('hi')
            highlightSelection(selection, visina, sirina, arr1, arr2, lastClick);
        } else {
            alert('There\'s a ship placed here');
        }
    }
    else if(selection == lastClick){
        InsertSelection(selection);
        colorPlaced(selection);
    }
    else{
        alert(izbori.indexOf(selection))
    }
}

function hey(){
    var id = parseInt(this.id)
    selectandplace(izbori, izbori2, id);
}

// Ako je brod nadjen, vraca false, inace, true;
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