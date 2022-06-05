const Nightmare = require('nightmare');
const { evaluate } = require('nightmare/lib/actions');
const nightmare = Nightmare({ show: true })
const url = 'https://www.inm.gob.mx/sae/publico/pt/solicitud.html'

const delay = 100
const nome = 'joyce'
const sobrenome = 'vadia'
const sexo = 2 // feminino


// for (let i = 0; i < 3; i++) {
//     console.log(`Tentativa ${i}`);
    
// }

nightmare
        .goto(url)
        .wait('input[id="nombre"]')
        .type('input[id="nombre"]', nome)
        .type('input[id="apellidos"]', sobrenome)
        .select('select[id="sexo"]', 2) //Feminino
        .type('input[id="fechaNacimiento"]', '22/04/1989')
        .select('select[id="nacionalidad"]', 26) //Brasil
        .select('select[id="estadoCivil"]', 139) //Solteira
        .select('select[id="paisNacimiento"]', 26) //Brasil
        .select('select[id="tipoDocumentoPasaporte"]', 1)
        .type('input[id="numeroPasaporte"]', "9999999999")
        .select('#paisExpedicionPasaporte', 26)
        .type('input[id="fechaExpedicionPasaporte"]', "22/04/2020")
        .type('input[id="fechaVencimientoPasaporte"]', "14/05/2026")
        .select('select[id="motivo"]', 904) // Turismo
        .select('#residencia', 26)
        .type('input[id="fechaViaje"]', "15/06/2022")
        .type('input[id="tiempoViaje"]', 10) // dias
        .select("#visitoMexico", false) // true-sim false-nao
        .select("#religion", 167) // 167-catolica apostolica
        .select("#actividad", 112) //112 - trabalha
        .select("#expulsado", false)
        .select("#antecedentes", false)
        .click('#procesar')
        .wait(2000)
        .click('#aceptar')
        .wait(8000)
        .evaluate(() => {
            const negada_display = getComputedStyle(document.getElementById('solicitudNegada')).getPropertyValue('display');
            const aprovada_display = getComputedStyle(document.getElementById('solicitudPreautorizada')).getPropertyValue('display');
            if (negada_display == 'block' & aprovada_display == 'none') {
                return 'Pedido não processado'
            } else {
                return 'Talvez deu certo'
            }

            return aprovada_display;
        })
        .run((err, msg) => console.log(msg))
        .end()
