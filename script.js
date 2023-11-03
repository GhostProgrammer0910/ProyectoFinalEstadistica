function calculateBayes() {
    const probabilityA = parseFloat(document.getElementById("probabilityA").value);
    const probabilityB = parseFloat(document.getElementById("probabilityB").value);
    const probabilityBA = parseFloat(document.getElementById("probabilityBA").value);

    const result = (probabilityBA * probabilityA) / probabilityB;
    
    document.getElementById("bayes-result").textContent = result.toFixed(2);
}

document.getElementById("calcularButton").addEventListener("click", function() {
    var pPercentage = parseFloat(document.getElementById("probabilidadExito").value);
    // Convertir porcentaje a probabilidad decimal (dividir por 100)
    var p = pPercentage / 100;
    
    var q = 1 - p; // Probabilidad de fracaso (q)

    // Convertir las probabilidades de vuelta a porcentajes multiplicando por 100
    var probabilidadX1 = p * 100;
    var probabilidadX0 = q * 100;
    var esperanzab = q*0+p*1;
    var varianzab= q*(Math.pow(0-esperanzab, 2))+p*(Math.pow(1-esperanzab, 2));
    var desviacionb=Math.sqrt(varianzab);

    document.getElementById("probabilidadX1").textContent = probabilidadX1.toFixed(2) + "%";
    document.getElementById("probabilidadX0").textContent = probabilidadX0.toFixed(2) + "%";
    document.getElementById("esperanzab").textContent=esperanzab.toFixed(2);
    document.getElementById("varianzab").textContent=varianzab.toFixed(2);
    document.getElementById("desviacionb").textContent=desviacionb.toFixed(2);

});

function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG
}

function Gcf(X,A) {        // Good for X>A+1
	with (Math) {
		var A0=0;
		var B0=1;
		var A1=1;
		var B1=X;
		var AOLD=0;
		var N=0;
		while (abs((A1-AOLD)/A1)>.00001) {
			AOLD=A1;
			N=N+1;
			A0=A1+(N-A)*A0;
			B0=B1+(N-A)*B0;
			A1=X*A0+N*A1;
			B1=X*B0+N*B1;
			A0=A0/B1;
			B0=B0/B1;
			A1=A1/B1;
			B1=1;
		}
		var Prob=exp(A*log(X)-X-LogGamma(A))*A1;
	}
	return 1-Prob
}

function Gser(X,A) {        // Good for X<A+1.
    with (Math) {
		var T9=1/A;
		var G=T9;
		var I=1;
		while (T9>G*.00001) {
			T9=T9*X/(A+I);
			G=G+T9;
			I=I+1;
		}
		G=G*exp(A*log(X)-X-LogGamma(A));
    }
    return G
}

function Gammacdf(x,a) {
	var GI;
	if (x<=0) {
		GI=0
	} else if (x<a+1) {
		GI=Gser(x,a)
	} else {
		GI=Gcf(x,a)
	}
	return GI
}

function compute() {
     Z=parseFloat(document.getElementById("kPoisson").value);
     Lam=parseFloat(document.getElementById("lambda").value);	
    if (Lam<=0) {
		alert("Lambda must be positive.");
	} else if (Z<0) {
		Poiscdf=0
	} else {
		Z=Math.floor(Z)
		Poiscdf=1-Gammacdf(Lam,Z+1);
	}
	Poiscdf=Math.round(Poiscdf*100000)/100000;

    document.getElementById("poisson-result").textContent = Poiscdf;
    document.getElementById("desviacionp").textContent = Math.sqrt(Lam).toFixed(4);
}


function calcularProbabilidad() {
            var media = parseFloat(document.getElementById("media").value);
            var desviacion = parseFloat(document.getElementById("desviacion").value);
            var temperatura = parseFloat(document.getElementById("temperatura").value);
            
            var Z = (temperatura - media) / desviacion;
            var probabilidad = 1 - jStat.normal.cdf(Z, 0, 1);
            
            document.getElementById("probabilidadResultado").textContent = probabilidad.toFixed(4);
        }

function calcularProbabilidad1() {
            const p = parseFloat(document.getElementById("p").value) / 100; // Convertir el porcentaje a decimal
            const n = parseInt(document.getElementById("n").value);
            const k = parseInt(document.getElementById("k").value);

            if (k < 0 || k > n) {
                alert("Datos ingresados incorrectamente");
            } else {
                var esperanzabi =p*n;
                var varianzabi=n*p*(1-p);
                var desviacionbi=Math.sqrt(varianzabi);

                const probabilidad = calcularBinomial(p, n, k);
                document.getElementById("resultado").textContent = `P(X = ${k}) = ${probabilidad.toFixed(4)}`;
                document.getElementById("esperanzabi").textContent=esperanzabi.toFixed(2);
                document.getElementById("varianzabi").textContent=varianzabi.toFixed(2);
                document.getElementById("desviacionbi").textContent=desviacionbi.toFixed(2);

            }
        }

        function calcularBinomial(p, n, k) {
            const coeficienteBinomial = calcularCoeficienteBinomial(n, k);
            const probabilidad = coeficienteBinomial * Math.pow(p, k) * Math.pow(1 - p, n - k);
            return probabilidad;
        }

        function calcularCoeficienteBinomial(n, k) {
            if (k === 0 || k === n) {
                return 1;
            }
            let coeficiente = 1;
            for (let i = 1; i <= k; i++) {
                coeficiente *= (n - i + 1) / i;
            }
            return coeficiente;
        }



