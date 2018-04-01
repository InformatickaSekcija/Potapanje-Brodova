var brodovi = [

];
var visina;
var sirina;
var selectovanoPolje = null;


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
            child.addEventListener('click', addEvents)
            igra.appendChild(child)
        }
    }
});
function addEvents(){
    if(selectovanoPolje != null){
        document.getElementById(selectovanoPolje).style.backgroundColor = '#fff';
        if(Math.ceil((selectovanoPolje+1)/sirina) == Math.ceil(selectovanoPolje/sirina)){
            document.getElementById(selectovanoPolje+1).style.background = '#fff';
        }
        if(Math.ceil((selectovanoPolje-1)/sirina) == Math.ceil(selectovanoPolje/sirina)){
            document.getElementById(selectovanoPolje-1).style.background = '#fff';
        }
        if(selectovanoPolje+sirina <= visina*sirina){
            document.getElementById(selectovanoPolje+sirina).style.background = '#fff';
        }
        if(selectovanoPolje-sirina > 0){
            document.getElementById(selectovanoPolje-sirina).style.background = '#fff';
        }
        document.getElementById(selectovanoPolje).classList.remove('touched');
        document.getElementById(selectovanoPolje).classList.add('polje')
    }
    selectovanoPolje = parseInt(this.id)
    console.log(this.id)
    document.getElementById(this.id).classList.add('touched')
    document.getElementById(this.id).style.backgroundColor = 'blue';
    dodaj2();
}

function dodaj2(){
    var zauzeto = false;
    if(brodovi.indexOf(selectovanoPolje) == -1){
        if( (selectovanoPolje - sirina) >0){
            if(brodovi.indexOf(selectovanoPolje - sirina) == -1){
                var highlight = document.getElementById(selectovanoPolje-sirina);
                highlight.style.backgroundColor = '#ffe066';
                highlight.removeEventListener('click', addEvents)
                highlight.addEventListener('click', function(){
                    dodaj2f(parseInt(this.id))
                })
        }
        }
        if ( (selectovanoPolje + sirina) <= visina*sirina ) {
            if (brodovi.indexOf(selectovanoPolje+sirina) == -1){
                var highlight = document.getElementById(selectovanoPolje+sirina);
                highlight.style.backgroundColor = '#ffe066';
                highlight.removeEventListener('click', addEvents)
                highlight.addEventListener('click', function(){
                    dodaj2f(parseInt(this.id))
                })
            }
        }
        if ( Math.ceil((selectovanoPolje-1)/sirina) == Math.ceil(selectovanoPolje/sirina) ){
            if (brodovi.indexOf(selectovanoPolje-1) == -1){
                var highlight = document.getElementById(selectovanoPolje-1);
                highlight.style.backgroundColor = '#ffe066';
                highlight.removeEventListener('click', addEvents)
                highlight.addEventListener('click', function(){
                    dodaj2f(parseInt(this.id))
                })
            }
        }
        if( Math.ceil((selectovanoPolje +1)/sirina) == Math.ceil(selectovanoPolje/sirina) ){
            if (brodovi.indexOf(selectovanoPolje +1) == -1){
                var highlight = document.getElementById(selectovanoPolje+1);
                highlight.style.backgroundColor = '#ffe066';
                highlight.removeEventListener('click', addEvents)
                highlight.addEventListener('click', function(){
                    dodaj2f(parseInt(this.id))
                })
            }
        }
    }else {
        console.log('sorry this spot is taken');
    }
};


function dodaj2f(passed){

    brodovi.push({
        pozicije: [
            selectovanoPolje,
            passed
        ]
    });
    console.log(brodovi)
    if(Math.ceil((selectovanoPolje+1)/sirina) == Math.ceil(selectovanoPolje/sirina)){
        document.getElementById(selectovanoPolje+1).style.background = '#fff';
        document.getElementById(selectovanoPolje+1).removeEventListener('click', function(){dodaj2f});
        document.getElementById(selectovanoPolje+1).addEventListener('click', addEvents)
    }
    if(Math.ceil((selectovanoPolje-1)/sirina) == Math.ceil(selectovanoPolje/sirina)){
        document.getElementById(selectovanoPolje-1).style.background = '#fff';
        document.getElementById(selectovanoPolje-1).removeEventListener('click', function(){dodaj2f});
        document.getElementById(selectovanoPolje-1).addEventListener('click', addEvents)
    }
    if(selectovanoPolje+sirina <= visina*sirina){
        document.getElementById(selectovanoPolje+sirina).style.background = '#fff';
        document.getElementById(selectovanoPolje+sirina).removeEventListener('click',function(){dodaj2f});
        document.getElementById(selectovanoPolje+sirina).addEventListener('click', addEvents)
    }
    if(selectovanoPolje-sirina > 0){
        document.getElementById(selectovanoPolje-sirina).style.background = '#fff';
        document.getElementById(selectovanoPolje-sirina).removeEventListener('click', function(){dodaj2f});
        document.getElementById(selectovanoPolje-sirina).addEventListener('click', addEvents)
    }
    document.getElementById(selectovanoPolje).classList.remove('touched');
    document.getElementById(selectovanoPolje).classList.add('polje')
    selectovanoPolje = null;
    document.getElementById(passed).style.backgroundColor= 'blue';
}