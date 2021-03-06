/**
 * 2C = two of clubs (trebol)
 * 2D = two of diaminds (diamantes)
 * 2H = two of Hearts (Corazones)
 * 2S = Two of Spades (espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const altas = ['A', 'K', 'Q', 'J'];

let puntosJugador = 0,
    puntosComputadora = 0;

//referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#dealer-cartas');



const marcadorDePuntos = document.querySelectorAll('small');


// funcion para crear el deck de cartas  y barajearla 
const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ) {
        for ( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }

    for ( let tipo of tipos ) {
        for ( let alta of altas ) {
            deck.push( alta + tipo );
        }
    }

//  console.log(deck);
    deck = _.shuffle( deck );
   // console.log( deck );

    return deck;
}

crearDeck ();

//Funcion para pedir carta 

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el Deck';
    }
    
    const carta = deck.pop(); //le damos a carta el velor de la ultima posicion de deck y la alimina del arreglo
    //const carta = deck[ _.random(0, deck.length)]; // de esta forma le damos a carta el valor de deck en una posicion random, asi lo resolvi yo pero no es de lo mejor :(
                                                   
    
    // console.log( deck );
    // console.log( carta ); //la carta debe ser de la baraja
    return carta;
}

//pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring( 0, carta.length -1 );
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
    
    // const valor = carta.substring(0, carta.length - 1);
    // //console.log ({ valor });
    // let puntos = 0;

    // if ( isNaN ( valor ) ) {
        
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    //     //console.log('no es un numero')
    // }else {
    //     //console.log('es un numero');
    //     puntos = valor * 1;
    // }

    // console.log( puntos );

}

const valor = valorCarta( pedirCarta() );
//console.log({ valor });

//Eventos


//Pedir Carta
btnPedir.addEventListener('click', () => {
   
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    marcadorDePuntos[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList = 'carta';

    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        turnoComputadora ( puntosJugador );


    }else if ( puntosJugador === 21 ){
        console.warn('21, genial');
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );

    }

});

//Turno compuradora 

const turnoComputadora = ( puntosMinimos) => {
   do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    marcadorDePuntos[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList = 'carta';

    divCartasComputadora.append( imgCarta );

    if ( puntosMinimos > 21 ) {
        break;
    }

    } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );
};


//Boton Detener

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
} );



