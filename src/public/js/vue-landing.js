const matrixDetail = Vue.createApp({
  data(){
    return{
      matrix:[
        `<div class="container"><img class="img-fluid w-100" src="/images/landing/matrix/suelo/1.webp" style="object-fit: contain;max-height:532px" alt="" />
        <h2>ANALIZAR EL SUELO PARA EVALUAR SU PRODUCTIVIDAD</h2>
        <p>Los nutrientes presentes en el suelo no están disponibles en las cantidades y proporciones requeridas por las plantas a cultivar. Un adecuado diagnóstico químico del suelo permite evaluar la capacidad del suelo para suministrar nutrientes a la planta y con base en una adecuada interpretación, se pueden definir las deficiencias, toxicidades o interferencia de un nutriente. Un análisis de suelos es el primer paso que se debe tener en cuenta para lograr el rendimiento que se desea.</p><strong>Trabajamos bajo los estándares de control de calidad de la norma ISO - 17025 y las Normas Técnicas Colombianas (NTC). </strong>
        <div class="bottom-content">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="service-details__list list-unstyled m-0">
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ELEMENTOS MAYORES: </strong><br /> Nitrógeno, Fosforo, Potasio.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ELEMENTOS MENORES:</strong><br /> Calcio, Magnesio, Cobre, Zinc, Aluminio.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>MICRONUTRIENTES:</strong><br />Hierro, Manganeso, Cobre, Zinc, Aluminio, Sodio.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>OTROS:</strong><br />C.I.C, Materia Orgánica, pH, CE Textura y Clasificación por Bouyoucos, Silicio y PSI.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ANALISIS DE IONES EN FASE SOLUBLE: </strong><br />Calcio, Magnesio, Potasio, Hierro, Manganeso, Cobre, Zinc, Boro, Fosfatos, Sulfatos, Cloruros, Carbonatos, Bicarbonatos.</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="project-details__images"><img id="matriximage" src="/images/landing/matrix/suelo/2.webp" alt="" /><img id="matriximage" src="/images/landing/matrix/suelo/3.webp" alt="" /></div>
                </div>
            </div>
        </div>
        </div>`,
        `<div class="container"><img class="img-fluid w-100" src="/images/landing/matrix/vegetal/1.webp" style="object-fit: contain;max-height:532px" alt="" />
        <h2>UN ANALISIS EN TEJIDO VEGETAL A TIEMPO</h2>
        <p>El estado nutricional de la planta es una característica imperceptible y sus síntomas visibles aparecen cuando ya existe un balance inadecuado entre los nutrientes. El análisis del tejido vegetal es complementario al análisis de suelo y en conjunto permiten realizar un diagnóstico acertado del estado nutricional de un cultivo; es muy utilizado en la agricultura para: </p>
        <ul class="list-unstyled project-details__check-list">
            <li><i class="fa fa-check-circle"></i>Confirmar el origen de síntomas visibles de deficiencia o detectar condiciones no sintomáticas en la planta.</li>
            <li><i class="fa fa-check-circle"></i>Lograr altos rendimientos y mejor calidad de los frutos hacer correcciones nutricionales de acuerdo a las diferentes etapas de crecimiento de las plantas y el estado nutricional diagnosticado en el análisis foliar.</li>
        </ul><strong>Trabajamos bajo los estándares de control de calidad de la norma ISO - 17025 y las Normas Técnicas Colombianas (NTC).</strong>
        <div class="bottom-content">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="service-details__list list-unstyled m-0">
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ELEMENTOS MAYORES: </strong><br />Nitrógeno, Fósforo, Potasio.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ELEMENTOS SECUNDARIOS:</strong><br />Calcio, Magnesio, Azufre.</li>
                        <li><i class="agrikon-icon-right-arrow"></i><strong>ELEMENTOS MENORES:</strong><br />Manganeso, Zinc, Cobre. hierro, Boro.</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="project-details__images"><img id="matriximage" src="/images/landing/matrix/vegetal/2.webp" alt="" /><img id="matriximage" src="/images/landing/matrix/vegetal/3.webp" alt="" /></div>
                </div>
            </div>
        </div>
        </div>`,
        `<div class="container"><img class="img-fluid w-100" src="/images/landing/matrix/agua/1.webp" style="object-fit: contain;max-height:532px" alt="" />
        <h2>EL AGUA COMO PARTE FUNDAMENTAL EN LA APLICACIÓN DE NUTRIENTES</h2>
        <p>El éxito de la aplicación de nutrientes a través de diferentes sistemas de riego depende fundamentalmente de la calidad del agua de riego que, a su vez, está determinada por la cantidad y tipo de sales que la constituyen. Cuando estas sales se encuentran en concentraciones superiores a las toleradas por los cultivos y los sistemas de riego, el agua debe ser tratada de manera adecuada porque puede afectar el rendimiento del cultivo y las condiciones físicas del suelo incluso si todas las demás condiciones y prácticas agrícolas son favorables.</p>
        <p>Con base en lo anterior, es muy importante realizar un análisis químico del agua de riego básicamente con dos propósitos: </p>
        <ul class="list-unstyled project-details__check-list">
            <li><i class="fa fa-check-circle"></i>Determinar la calidad del agua para el riego y la tolerancia de los cultivos.</li>
            <li><i class="fa fa-check-circle"></i>Establecer su aptitud para fines de riego (fertirrrigación).</li>
        </ul><strong>Trabajamos bajo los estándares de control de calidad de la norma ISO - 17025 y las Normas Técnicas Colombianas (NTC).</strong>
        <div class="bottom-content">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-unstyled project-details__check-list m-0">
                        <li><i class="fa fa-check-circle"></i>pH, Conductividad Eléctrica.</li>
                        <li><i class="fa fa-check-circle"></i>Dureza de cálcica, Magnésica.</li>
                        <li><i class="fa fa-check-circle"></i>Calcio, Magnesio, Potasio.</li>
                        <li><i class="fa fa-check-circle"></i>Alcalinidad, Carbonatos, Bicarbonatos.</li>
                        <li><i class="fa fa-check-circle"></i>Fosfatos, Cloruros.</li>
                        <li><i class="fa fa-check-circle"></i>Amonio, Nitratos.</li>
                        <li><i class="fa fa-check-circle"></i>Sodio, RAS, Clasificación RAS.</li>
                        <li><i class="fa fa-check-circle"></i>Sólidos solubles, en suspensión y Totales.</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="project-details__images"><img id="matriximage" src="/images/landing/matrix/agua/2.webp" /><img id="matriximage" src="/images/landing/matrix/agua/3.webp" /></div>
                </div>
            </div>
        </div>
        </div>`,
        `<div class="container"><img class="img-fluid w-100" src="/images/landing/matrix/abono/1.webp" style="object-fit: contain;max-height:532px" alt="" />
        <h2>CONTROL DE CALIDAD PARA ABONOS Y FERTILIZANTES</h2>
        <p>Los abonos orgánicos cada día adquieren mayor importancia en la agroindustria sin desconocer que los fertilizantes minerales constituyen una amplia e importante fuente de nutrientes que favorecen la fertilidad del suelo. Debido a la gran demanda de materia prima, productos de origen orgánico, mineral y mezclas entre ellos que existe en la actualidad, es indispensable asegurarle al cliente por medio de estrictos análisis fisicoquímicos de Control de Calidad productos que cumplan con todas las necesidades nutricionales que cada cultivo necesita bajo el cumplimiento de las exigencias normativas.</p><strong>Trabajamos bajo los estándares de control de calidad de la norma ISO - 17025 y las Normas Técnicas Colombianas (NTC).</strong>
        <div class="bottom-content">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-unstyled project-details__check-list m-0">
                        <li><i class="fa fa-check-circle"></i>Nitrógeno Total, Carbono Orgánico Total.</li>
                        <li><i class="fa fa-check-circle"></i>Fosforo (Total, Soluble y Asimilable).</li>
                        <li><i class="fa fa-check-circle"></i>Potasio, Calcio, Magnesio, Sodio (Total y Soluble).</li>
                        <li><i class="fa fa-check-circle"></i>Cobre, Hierro, Manganeso, Zinc, Boro, Molibdeno (Total y Soluble).</li>
                        <li><i class="fa fa-check-circle"></i>Ácidos Húmicos y Fúlvicos.</li>
                        <li><i class="fa fa-check-circle"></i>Azufre como sulfato y azufre elemental.</li>
                        <li><i class="fa fa-check-circle"></i>Conductividad eléctrica, % Humedad, Densidad y pH.</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <div class="project-details__images"><img id="matriximage" src="/images/landing/matrix/abono/2.webp" /><img id="matriximage" src="/images/landing/matrix/abono/3.webp" /></div>
                </div>
            </div>
        </div>
      </div>`
      ],
      displayedMatrix:''
    }
  },mounted(){
    let index = parseInt(document.getElementById("matrixDetail").getAttribute("data-index"));
    this.displayedMatrix = this.matrix[index]
  },
})

if(document.getElementById("matrixDetail")){const mountedMatrix = matrixDetail.mount("#matrixDetail")}