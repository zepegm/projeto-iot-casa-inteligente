function getOpcoes(lbs, vals, desc_label, cor, borda, medida) {
    var opcoes = {
        type: 'bar',
                            
        data: {
            labels: lbs,
                        
            datasets: [
                {
                    label: desc_label,
                    data: vals,
                    backgroundColor: cor,
                    borderColor: borda,
                    borderWidth: 1
                }                                      
            ]              
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + medida;
                            }
                            return label;
                        }
                    }
                }
            }
        }                                               
    }
    
    return opcoes;
}

$("#menu_principal .list-group-item").on('click', function(e) {

    if ($(this).hasClass('active')) {
        $("#menu_principal .list-group-item").removeClass('active');

        var id_mes = $(".accordion-collapse.collapse.show").attr('data-mes');
        var nome = $(".accordion-collapse.collapse.show").attr('data-nome');

        $.ajax({
            url: "consulta.php",
            method: "POST",                	
            data: {'id_mes':id_mes},
            success: function(data) {
                //console.log(data);
                lista = JSON.parse(data);
                //console.log(lista);
    
                $("#conteudo_grafico").empty();
    
                $("#conteudo_grafico").append("<div id='content_consumo_wh' class='col-sm-12'></div>");
                $("#content_consumo_wh").append('<p class="fs-4 text-center">Consumo diário em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o mês de <span class="fw-bold text-danger">' + nome + '</span></p>');
                $("#content_consumo_wh").append('<canvas id="uso_wh_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_cozinha_temp' class='col-sm-6'></div>");
                $("#content_cozinha_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Cozinha</span></p>');
                $("#content_cozinha_temp").append('<canvas id="cozinha_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_cozinha_umid' class='col-sm-6'></div>");
                $("#content_cozinha_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Cozinha</span></p>');
                $("#content_cozinha_umid").append('<canvas id="cozinha_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_sala_temp' class='col-sm-6'></div>");
                $("#content_sala_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Sala</span></p>');
                $("#content_sala_temp").append('<canvas id="sala_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_sala_umid' class='col-sm-6'></div>");
                $("#content_sala_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Sala</span></p>');
                $("#content_sala_umid").append('<canvas id="sala_umid_grafico"></canvas>');  
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_lava_temp' class='col-sm-6'></div>");
                $("#content_lava_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Lavanderia</span></p>');
                $("#content_lava_temp").append('<canvas id="lava_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_lava_umid' class='col-sm-6'></div>");
                $("#content_lava_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Lavanderia</span></p>');
                $("#content_lava_umid").append('<canvas id="lava_umid_grafico"></canvas>');      
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_escritorio_temp' class='col-sm-6'></div>");
                $("#content_escritorio_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Escritório</span></p>');
                $("#content_escritorio_temp").append('<canvas id="escritorio_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_escritorio_umid' class='col-sm-6'></div>");
                $("#content_escritorio_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Escritório</span></p>');
                $("#content_escritorio_umid").append('<canvas id="escritorio_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_banheiro_temp' class='col-sm-6'></div>");
                $("#content_banheiro_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Banheiro</span></p>');
                $("#content_banheiro_temp").append('<canvas id="banheiro_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_banheiro_umid' class='col-sm-6'></div>");
                $("#content_banheiro_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Banheiro</span></p>');
                $("#content_banheiro_umid").append('<canvas id="banheiro_umid_grafico"></canvas>');      
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_externo_temp' class='col-sm-6'></div>");
                $("#content_externo_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área <span class="fw-bold">Externa</span></p>');
                $("#content_externo_temp").append('<canvas id="externo_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_externo_umid' class='col-sm-6'></div>");
                $("#content_externo_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área <span class="fw-bold">Externa</span></p>');
                $("#content_externo_umid").append('<canvas id="externo_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_passar_temp' class='col-sm-6'></div>");
                $("#content_passar_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto de Passar</span></p>');
                $("#content_passar_temp").append('<canvas id="passar_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_passar_umid' class='col-sm-6'></div>");
                $("#content_passar_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto de Passar</span></p>');
                $("#content_passar_umid").append('<canvas id="passar_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_quarto_crianca_temp' class='col-sm-6'></div>");
                $("#content_quarto_crianca_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto dos Filhos</span></p>');
                $("#content_quarto_crianca_temp").append('<canvas id="quarto_crianca_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_quarto_crianca_umid' class='col-sm-6'></div>");
                $("#content_quarto_crianca_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto dos Filhos</span></p>');
                $("#content_quarto_crianca_umid").append('<canvas id="quarto_crianca_umid_grafico"></canvas>');
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_quarto_pais_temp' class='col-sm-6'></div>");
                $("#content_quarto_pais_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto dos Pais</span></p>');
                $("#content_quarto_pais_temp").append('<canvas id="quarto_pais_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_quarto_pais_umid' class='col-sm-6'></div>");
                $("#content_quarto_pais_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto dos Pais</span></p>');
                $("#content_quarto_pais_umid").append('<canvas id="quarto_pais_umid_grafico"></canvas>');                            
    
                var lbs = [];
                var vals1 = []; // wh eletro
                var vals2 = []; // wh luz
    
                var vals3 = []; // temp cozinha
                var vals4 = []; // umid cozinha
    
                var vals5 = []; // temp sala
                var vals6 = []; // umid sala
    
                var vals7 = []; // temp lava
                var vals8 = []; // umid lava   
    
                var vals9 = []; // temp escritorio
                var vals10 = []; // umid escritorio
    
                var vals11 = []; // temp banheiro
                var vals12 = []; // umid banheiro    
                
                var vals13 = []; // temp externo
                var vals14 = []; // umid externo    
                
                var vals15 = []; // temp passar
                var vals16 = []; // umid passar                              
    
                var vals17 = []; // temp quarto_crianca
                var vals18 = []; // umid quarto_crianca      
    
                var vals19 = []; // temp quarto_pais
                var vals20 = []; // umid quarto_pais
    
                for (var i = 0; i < lista.length; i++) {
                    lbs.push("Dia " + lista[i]['dia']);
                    vals1.push(lista[i]['eletro']);
                    vals2.push(lista[i]['luz']);
                    vals3.push(lista[i]['cozinha_temp']);
                    vals4.push(lista[i]['cozinha_umid']);
                    vals5.push(lista[i]['sala_temp']);
                    vals6.push(lista[i]['sala_umid']);    
                    vals7.push(lista[i]['lava_temp']);
                    vals8.push(lista[i]['lava_umid']);      
                    vals9.push(lista[i]['escritorio_temp']);
                    vals10.push(lista[i]['escritorio_umid']);
                    vals11.push(lista[i]['banheiro_temp']);
                    vals12.push(lista[i]['banheiro_umid']);
                    vals13.push(lista[i]['externo_temp']);
                    vals14.push(lista[i]['externo_umid']);
                    vals15.push(lista[i]['passar_temp']);
                    vals16.push(lista[i]['passar_umid']);
                    vals17.push(lista[i]['quarto_crianca_temp']);
                    vals18.push(lista[i]['quarto_crianca_umid']);
                    vals19.push(lista[i]['quarto_pais_temp']);
                    vals20.push(lista[i]['quarto_pais_umid']);                                
                }
    
                let grafico_quarto_pais_temp = document.getElementById('quarto_pais_temp_grafico').getContext('2d');
                let chart_quarto_pais_temp = new Chart(grafico_quarto_pais_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals19,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_quarto_pais_umid = document.getElementById('quarto_pais_umid_grafico').getContext('2d');
                let chart_quarto_pais_umid = new Chart(grafico_quarto_pais_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals20,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_wh = document.getElementById('uso_wh_grafico').getContext('2d');
                let chart_wh = new Chart(grafico_wh, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Eletrodoméstico',
                                data: vals1,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgb(75, 192, 192)',
                                borderWidth: 1
                            },
                            {
                                label: 'Luz',
                                data: vals2,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgb(255, 159, 64)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " Wh";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                }); 
    
                let grafico_cozinha_temp = document.getElementById('cozinha_temp_grafico').getContext('2d');
                let chart_cozinha_temp = new Chart(grafico_cozinha_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals3,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_cozinha_umid = document.getElementById('cozinha_umid_grafico').getContext('2d');
                let chart_cozinha_umid = new Chart(grafico_cozinha_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals4,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }                                                                    
                    }                                              
                });
    
                let grafico_sala_temp = document.getElementById('sala_temp_grafico').getContext('2d');
                let chart_sala_temp = new Chart(grafico_sala_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals5,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_sala_umid = document.getElementById('sala_umid_grafico').getContext('2d');
                let chart_sala_umid = new Chart(grafico_sala_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals6,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_lava_temp = document.getElementById('lava_temp_grafico').getContext('2d');
                let chart_lava_temp = new Chart(grafico_lava_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals7,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_lava_umid = document.getElementById('lava_umid_grafico').getContext('2d');
                let chart_lava_umid = new Chart(grafico_lava_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals8,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_escritorio_temp = document.getElementById('escritorio_temp_grafico').getContext('2d');
                let chart_escritorio_temp = new Chart(grafico_escritorio_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals9,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_escritorio_umid = document.getElementById('escritorio_umid_grafico').getContext('2d');
                let chart_escritorio_umid = new Chart(grafico_escritorio_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals10,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_banheiro_temp = document.getElementById('banheiro_temp_grafico').getContext('2d');
                let chart_banheiro_temp = new Chart(grafico_banheiro_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals11,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_banheiro_umid = document.getElementById('banheiro_umid_grafico').getContext('2d');
                let chart_banheiro_umid = new Chart(grafico_banheiro_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals12,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_externo_temp = document.getElementById('externo_temp_grafico').getContext('2d');
                let chart_externo_temp = new Chart(grafico_externo_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals13,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_externo_umid = document.getElementById('externo_umid_grafico').getContext('2d');
                let chart_externo_umid = new Chart(grafico_externo_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals14,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });  
                
                let grafico_passar_temp = document.getElementById('passar_temp_grafico').getContext('2d');
                let chart_passar_temp = new Chart(grafico_passar_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals15,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_passar_umid = document.getElementById('passar_umid_grafico').getContext('2d');
                let chart_passar_umid = new Chart(grafico_passar_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals16,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });                            
    
                let grafico_quarto_crianca_temp = document.getElementById('quarto_crianca_temp_grafico').getContext('2d');
                let chart_quarto_crianca_temp = new Chart(grafico_quarto_crianca_temp, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Temperatura',
                                data: vals17,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " ºC";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
                let grafico_quarto_crianca_umid = document.getElementById('quarto_crianca_umid_grafico').getContext('2d');
                let chart_quarto_crianca_umid = new Chart(grafico_quarto_crianca_umid, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Umidade',
                                data: vals18,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " %";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }                                               
                });
    
            }
        });           


    } else {
        $("#menu_principal .list-group-item").removeClass('active');
        $(this).addClass('active');
        var dia = $(this).attr('data-value');
        var desc = $(this).text();

        $.ajax({
            url: "consulta.php",
            method: "POST",                	
            data: {'dia':dia},
            success: function(data) {
                //console.log(data);
                lista = JSON.parse(data);
                
                $("#conteudo_grafico").empty();
                $("#conteudo_grafico").append("<div id='content_consumo_wh_diario' class='col-sm-12'></div>");
                $("#content_consumo_wh_diario").append('<p class="fs-4 text-center">Consumo (<span class="text-danger fw-bold">Wh</span>) de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante o dia de <span class="text-danger fw-bold">' + desc + '</span></p>');
                $("#content_consumo_wh_diario").append('<canvas id="uso_wh_grafico"></canvas>');

                $("#conteudo_grafico").append("<hr>");

                $("#conteudo_grafico").append("<div id='content_cozinha_temp' class='col-sm-6'></div>");
                $("#content_cozinha_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da <span class="fw-bold">Cozinha</span> durante o dia.</p>');
                $("#content_cozinha_temp").append('<canvas id="cozinha_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_cozinha_umid' class='col-sm-6'></div>");
                $("#content_cozinha_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Cozinha</span> durante o dia.</p>');
                $("#content_cozinha_umid").append('<canvas id="cozinha_umid_grafico"></canvas>');

                $("#conteudo_grafico").append("<hr>");

                $("#conteudo_grafico").append("<div id='content_sala_temp' class='col-sm-6'></div>");
                $("#content_sala_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da <span class="fw-bold">Sala</span> durante o dia.</p>');
                $("#content_sala_temp").append('<canvas id="sala_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_sala_umid' class='col-sm-6'></div>");
                $("#content_sala_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Sala</span> durante o dia.</p>');
                $("#content_sala_umid").append('<canvas id="sala_umid_grafico"></canvas>');  
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_lava_temp' class='col-sm-6'></div>");
                $("#content_lava_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da <span class="fw-bold">Lavanderia</span> durante o dia.</p>');
                $("#content_lava_temp").append('<canvas id="lava_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_lava_umid' class='col-sm-6'></div>");
                $("#content_lava_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Lavanderia</span> durante o dia.</p>');
                $("#content_lava_umid").append('<canvas id="lava_umid_grafico"></canvas>');      
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_escritorio_temp' class='col-sm-6'></div>");
                $("#content_escritorio_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) do <span class="fw-bold">Escritório</span> durante o dia.</p>');
                $("#content_escritorio_temp").append('<canvas id="escritorio_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_escritorio_umid' class='col-sm-6'></div>");
                $("#content_escritorio_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Escritório</span> durante o dia.</p>');
                $("#content_escritorio_umid").append('<canvas id="escritorio_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_banheiro_temp' class='col-sm-6'></div>");
                $("#content_banheiro_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) do <span class="fw-bold">Banheiro</span> durante o dia.</p>');
                $("#content_banheiro_temp").append('<canvas id="banheiro_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_banheiro_umid' class='col-sm-6'></div>");
                $("#content_banheiro_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Banheiro</span> durante o dia.</p>');
                $("#content_banheiro_umid").append('<canvas id="banheiro_umid_grafico"></canvas>');      
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_externo_temp' class='col-sm-6'></div>");
                $("#content_externo_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da <span class="fw-bold">Área Externa</span> durante o dia.</p>');
                $("#content_externo_temp").append('<canvas id="externo_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_externo_umid' class='col-sm-6'></div>");
                $("#content_externo_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da <span class="fw-bold">Área Externa</span> durante o dia.</p>');
                $("#content_externo_umid").append('<canvas id="externo_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_passar_temp' class='col-sm-6'></div>");
                $("#content_passar_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) do <span class="fw-bold">Quarto de Passar</span> durante o dia.</p>');
                $("#content_passar_temp").append('<canvas id="passar_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_passar_umid' class='col-sm-6'></div>");
                $("#content_passar_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) do <span class="fw-bold">Quarto de Passar</span> durante o dia.</p>');
                $("#content_passar_umid").append('<canvas id="passar_umid_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_quarto_crianca_temp' class='col-sm-6'></div>");
                $("#content_quarto_crianca_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) do <span class="fw-bold">Quarto dos Filhos</span> durante o dia.</p>');
                $("#content_quarto_crianca_temp").append('<canvas id="quarto_crianca_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_quarto_crianca_umid' class='col-sm-6'></div>");
                $("#content_quarto_crianca_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) do <span class="fw-bold">Quarto dos Filhos</span> durante o dia.</p>');
                $("#content_quarto_crianca_umid").append('<canvas id="quarto_crianca_umid_grafico"></canvas>');
                
                $("#conteudo_grafico").append("<hr>");
    
                $("#conteudo_grafico").append("<div id='content_quarto_pais_temp' class='col-sm-6'></div>");
                $("#content_quarto_pais_temp").append('<p class="fs-5 text-center"><span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) do <span class="fw-bold">Quarto dos Pais</span> durante o dia.</p>');
                $("#content_quarto_pais_temp").append('<canvas id="quarto_pais_temp_grafico"></canvas>');
    
                $("#conteudo_grafico").append("<div id='content_quarto_pais_umid' class='col-sm-6'></div>");
                $("#content_quarto_pais_umid").append('<p class="fs-5 text-center"><span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) do <span class="fw-bold">Quarto dos Pais</span> durante o dia.</p>');
                $("#content_quarto_pais_umid").append('<canvas id="quarto_pais_umid_grafico"></canvas>');    

                var lbs = [];
                var val_eletro = [];
                var val_luz = [];
                var val_cozinha_t = [];
                var val_cozinha_u = [];
                var val_sala_t = [];
                var val_sala_u = [];
                var val_lava_t = [];
                var val_lava_u = [];
                var val_escritorio_t = [];
                var val_escritorio_u = [];
                var val_banheiro_t = [];
                var val_banheiro_u = [];
                var val_externo_t = [];
                var val_externo_u = [];
                var val_passar_t = [];
                var val_passar_u = [];
                var val_quarto_crianca_t = [];
                var val_quarto_crianca_u = [];
                var val_quarto_pais_t = [];
                var val_quarto_pais_u = [];

                for (var i = 0; i < lista.length; i++) {
                    lbs.push(lista[i]['hora']);
                    val_eletro.push(lista[i]['eletro']);
                    val_luz.push(lista[i]['luz']);
                    val_cozinha_t.push(lista[i]['cozinha_temp']);
                    val_cozinha_u.push(lista[i]['cozinha_umid']);
                    val_sala_t.push(lista[i]['sala_temp']);
                    val_sala_u.push(lista[i]['sala_umid']);  
                    val_lava_t.push(lista[i]['lava_temp']);
                    val_lava_u.push(lista[i]['lava_umid']);
                    val_escritorio_t.push(lista[i]['escritorio_temp']);
                    val_escritorio_u.push(lista[i]['escritorio_umid']);
                    val_banheiro_t.push(lista[i]['banheiro_temp']);
                    val_banheiro_u.push(lista[i]['banheiro_umid']);
                    val_externo_t.push(lista[i]['externo_temp']);
                    val_externo_u.push(lista[i]['externo_umid']);
                    val_passar_t.push(lista[i]['passar_temp']);
                    val_passar_u.push(lista[i]['passar_umid']);
                    val_quarto_crianca_t.push(lista[i]['quarto_crianca_temp']);
                    val_quarto_crianca_u.push(lista[i]['quarto_crianca_umid']);
                    val_quarto_pais_t.push(lista[i]['quarto_pais_temp']);
                    val_quarto_pais_u.push(lista[i]['quarto_pais_umid']);
                } 
                
                let grafico_wh = document.getElementById('uso_wh_grafico').getContext('2d');
                let chart_wh = new Chart(grafico_wh, {
                    type: 'bar',
                                        
                    data: {
                        labels: lbs,
                                    
                        datasets: [
                            {
                                label: 'Eletrodoméstico',
                                data: val_eletro,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgb(75, 192, 192)',
                                borderWidth: 1
                            },
                            {
                                label: 'Luz',
                                data: val_luz,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgb(255, 159, 64)',
                                borderWidth: 1
                            }                                      
                        ]              
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
    
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + " Wh";
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
                
                let grafico_cozinha_temp = document.getElementById('cozinha_temp_grafico').getContext('2d');
                let chart_cozinha_temp = new Chart(grafico_cozinha_temp, getOpcoes(lbs, val_cozinha_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_cozinha_umid = document.getElementById('cozinha_umid_grafico').getContext('2d');
                let chart_cozinha_umid = new Chart(grafico_cozinha_umid, getOpcoes(lbs, val_cozinha_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));

                let grafico_sala_temp = document.getElementById('sala_temp_grafico').getContext('2d');
                let chart_sala_temp = new Chart(grafico_sala_temp, getOpcoes(lbs, val_sala_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_sala_umid = document.getElementById('sala_umid_grafico').getContext('2d');
                let chart_sala_umid = new Chart(grafico_sala_umid, getOpcoes(lbs, val_sala_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));

                let grafico_lava_temp = document.getElementById('lava_temp_grafico').getContext('2d');
                let chart_lava_temp = new Chart(grafico_lava_temp, getOpcoes(lbs, val_lava_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_lava_umid = document.getElementById('lava_umid_grafico').getContext('2d');
                let chart_lava_umid = new Chart(grafico_lava_umid, getOpcoes(lbs, val_lava_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));

                let grafico_escritorio_temp = document.getElementById('escritorio_temp_grafico').getContext('2d');
                let chart_escritorio_temp = new Chart(grafico_escritorio_temp, getOpcoes(lbs, val_escritorio_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_escritorio_umid = document.getElementById('escritorio_umid_grafico').getContext('2d');
                let chart_escritorio_umid = new Chart(grafico_escritorio_umid, getOpcoes(lbs, val_escritorio_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));

                let grafico_banheiro_temp = document.getElementById('banheiro_temp_grafico').getContext('2d');
                let chart_banheiro_temp = new Chart(grafico_banheiro_temp, getOpcoes(lbs, val_banheiro_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_banheiro_umid = document.getElementById('banheiro_umid_grafico').getContext('2d');
                let chart_banheiro_umid = new Chart(grafico_banheiro_umid, getOpcoes(lbs, val_banheiro_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));
                
                let grafico_externo_temp = document.getElementById('externo_temp_grafico').getContext('2d');
                let chart_externo_temp = new Chart(grafico_externo_temp, getOpcoes(lbs, val_externo_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_externo_umid = document.getElementById('externo_umid_grafico').getContext('2d');
                let chart_externo_umid = new Chart(grafico_externo_umid, getOpcoes(lbs, val_externo_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));
                
                let grafico_passar_temp = document.getElementById('passar_temp_grafico').getContext('2d');
                let chart_passar_temp = new Chart(grafico_passar_temp, getOpcoes(lbs, val_passar_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_passar_umid = document.getElementById('passar_umid_grafico').getContext('2d');
                let chart_passar_umid = new Chart(grafico_passar_umid, getOpcoes(lbs, val_passar_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));
                
                let grafico_quarto_crianca_temp = document.getElementById('quarto_crianca_temp_grafico').getContext('2d');
                let chart_quarto_crianca_temp = new Chart(grafico_quarto_crianca_temp, getOpcoes(lbs, val_quarto_crianca_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_quarto_crianca_umid = document.getElementById('quarto_crianca_umid_grafico').getContext('2d');
                let chart_quarto_crianca_umid = new Chart(grafico_quarto_crianca_umid, getOpcoes(lbs, val_quarto_crianca_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));

                let grafico_quarto_pais_temp = document.getElementById('quarto_pais_temp_grafico').getContext('2d');
                let chart_quarto_pais_temp = new Chart(grafico_quarto_pais_temp, getOpcoes(lbs, val_quarto_pais_t, 'Temperatura', 'rgba(255, 99, 132, 0.2)', 'rgb(255, 99, 132)', " ºC"));

                let grafico_quarto_pais_umid = document.getElementById('quarto_pais_umid_grafico').getContext('2d');
                let chart_quarto_pais_umid = new Chart(grafico_quarto_pais_umid, getOpcoes(lbs, val_quarto_pais_u, 'Umidade', 'rgba(54, 162, 235, 0.2)', 'rgb(54, 162, 235)', " %"));                


            }
        });        
    }
});


$("#menu_principal").on('hidden.bs.collapse	', function (e) {
    $("#menu_principal .list-group-item").removeClass('active');
    var open = $('.accordion-button[aria-expanded="true"]').length;
    
    if (open == 0) {
        $.ajax({
        url: "consulta.php",
        method: "POST",                	
        data: {'reset':true},
        success: function(data) {
            //console.log(data);
            lista = JSON.parse(data);
            //console.log(lista);

            $("#conteudo_grafico").empty();

            $("#conteudo_grafico").append("<div id='content_consumo_wh_media' class='col-sm-6'></div>");
            $("#content_consumo_wh_media").append('<p class="fs-4 text-center" id="title_eletro_graf">Média por dia do consumo em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o período</p>');
            $("#content_consumo_wh_media").append('<canvas id="uso_wh_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_consumo_wh_total' class='col-sm-6'></div>");
            $("#content_consumo_wh_total").append('<p class="fs-4 text-center" id="title_eletro_graf_total">Total do consumo em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o período</p>');
            $("#content_consumo_wh_total").append('<canvas id="uso_wh_grafico_total"></canvas>');

            var lbs = [];
            var vals1 = [];
            var vals2 = [];
            var vals3 = [];
            var vals4 = [];

            for (var i = 0; i < lista.length; i++) {
                lbs.push(lista[i]['mes']);
                vals1.push(lista[i]['media_eletro']);
                vals2.push(lista[i]['media_luz']);
                vals3.push(lista[i]['total_eletro']);
                vals4.push(lista[i]['total_luz']);
            }
            let grafico_wh = document.getElementById('uso_wh_grafico').getContext('2d');
            let chart_wh = new Chart(grafico_wh, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Eletrodoméstico',
                            data: vals1,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1
                        },
                        {
                            label: 'Luz',
                            data: vals2,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgb(255, 159, 64)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " Wh";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            }); 

            let grafico_wh_total = document.getElementById('uso_wh_grafico_total').getContext('2d');
            let chart_wh_total = new Chart(grafico_wh_total, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Eletrodoméstico',
                            data: vals3,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1
                        },
                        {
                            label: 'Luz',
                            data: vals4,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgb(255, 159, 64)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " Wh";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });  

        }
    });                         
    }
});


$('#menu_principal').on('shown.bs.collapse', function (e) {
   var id_mes = $(e.target).attr('data-mes');
   var nome = $(e.target).attr('data-nome');

   $.ajax({
        url: "consulta.php",
        method: "POST",                	
        data: {'id_mes':id_mes},
        success: function(data) {
            //console.log(data);
            lista = JSON.parse(data);
            //console.log(lista);

            $("#conteudo_grafico").empty();

            $("#conteudo_grafico").append("<div id='content_consumo_wh' class='col-sm-12'></div>");
            $("#content_consumo_wh").append('<p class="fs-4 text-center">Consumo diário em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o mês de <span class="fw-bold text-danger">' + nome + '</span></p>');
            $("#content_consumo_wh").append('<canvas id="uso_wh_grafico"></canvas>');

            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_cozinha_temp' class='col-sm-6'></div>");
            $("#content_cozinha_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Cozinha</span></p>');
            $("#content_cozinha_temp").append('<canvas id="cozinha_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_cozinha_umid' class='col-sm-6'></div>");
            $("#content_cozinha_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Cozinha</span></p>');
            $("#content_cozinha_umid").append('<canvas id="cozinha_umid_grafico"></canvas>');

            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_sala_temp' class='col-sm-6'></div>");
            $("#content_sala_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Sala</span></p>');
            $("#content_sala_temp").append('<canvas id="sala_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_sala_umid' class='col-sm-6'></div>");
            $("#content_sala_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Sala</span></p>');
            $("#content_sala_umid").append('<canvas id="sala_umid_grafico"></canvas>');  
            
            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_lava_temp' class='col-sm-6'></div>");
            $("#content_lava_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área da <span class="fw-bold">Lavanderia</span></p>');
            $("#content_lava_temp").append('<canvas id="lava_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_lava_umid' class='col-sm-6'></div>");
            $("#content_lava_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área da <span class="fw-bold">Lavanderia</span></p>');
            $("#content_lava_umid").append('<canvas id="lava_umid_grafico"></canvas>');      
            
            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_escritorio_temp' class='col-sm-6'></div>");
            $("#content_escritorio_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Escritório</span></p>');
            $("#content_escritorio_temp").append('<canvas id="escritorio_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_escritorio_umid' class='col-sm-6'></div>");
            $("#content_escritorio_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Escritório</span></p>');
            $("#content_escritorio_umid").append('<canvas id="escritorio_umid_grafico"></canvas>');

            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_banheiro_temp' class='col-sm-6'></div>");
            $("#content_banheiro_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Banheiro</span></p>');
            $("#content_banheiro_temp").append('<canvas id="banheiro_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_banheiro_umid' class='col-sm-6'></div>");
            $("#content_banheiro_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Banheiro</span></p>');
            $("#content_banheiro_umid").append('<canvas id="banheiro_umid_grafico"></canvas>');      
            
            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_externo_temp' class='col-sm-6'></div>");
            $("#content_externo_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área <span class="fw-bold">Externa</span></p>');
            $("#content_externo_temp").append('<canvas id="externo_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_externo_umid' class='col-sm-6'></div>");
            $("#content_externo_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área <span class="fw-bold">Externa</span></p>');
            $("#content_externo_umid").append('<canvas id="externo_umid_grafico"></canvas>');

            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_passar_temp' class='col-sm-6'></div>");
            $("#content_passar_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto de Passar</span></p>');
            $("#content_passar_temp").append('<canvas id="passar_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_passar_umid' class='col-sm-6'></div>");
            $("#content_passar_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto de Passar</span></p>');
            $("#content_passar_umid").append('<canvas id="passar_umid_grafico"></canvas>');

            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_quarto_crianca_temp' class='col-sm-6'></div>");
            $("#content_quarto_crianca_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto dos Filhos</span></p>');
            $("#content_quarto_crianca_temp").append('<canvas id="quarto_crianca_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_quarto_crianca_umid' class='col-sm-6'></div>");
            $("#content_quarto_crianca_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto dos Filhos</span></p>');
            $("#content_quarto_crianca_umid").append('<canvas id="quarto_crianca_umid_grafico"></canvas>');
            
            $("#conteudo_grafico").append("<hr>");

            $("#conteudo_grafico").append("<div id='content_quarto_pais_temp' class='col-sm-6'></div>");
            $("#content_quarto_pais_temp").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Temperatura</span> (<span class="text-danger fw-bold">ºC</span>) da área do <span class="fw-bold">Quarto dos Pais</span></p>');
            $("#content_quarto_pais_temp").append('<canvas id="quarto_pais_temp_grafico"></canvas>');

            $("#conteudo_grafico").append("<div id='content_quarto_pais_umid' class='col-sm-6'></div>");
            $("#content_quarto_pais_umid").append('<p class="fs-5 text-center">Média da <span class="fw-bold">Umidade</span> (<span class="text-danger fw-bold">%</span>) da área do <span class="fw-bold">Quarto dos Pais</span></p>');
            $("#content_quarto_pais_umid").append('<canvas id="quarto_pais_umid_grafico"></canvas>');                            

            var lbs = [];
            var vals1 = []; // wh eletro
            var vals2 = []; // wh luz

            var vals3 = []; // temp cozinha
            var vals4 = []; // umid cozinha

            var vals5 = []; // temp sala
            var vals6 = []; // umid sala

            var vals7 = []; // temp lava
            var vals8 = []; // umid lava   

            var vals9 = []; // temp escritorio
            var vals10 = []; // umid escritorio

            var vals11 = []; // temp banheiro
            var vals12 = []; // umid banheiro    
            
            var vals13 = []; // temp externo
            var vals14 = []; // umid externo    
            
            var vals15 = []; // temp passar
            var vals16 = []; // umid passar                              

            var vals17 = []; // temp quarto_crianca
            var vals18 = []; // umid quarto_crianca      

            var vals19 = []; // temp quarto_pais
            var vals20 = []; // umid quarto_pais

            for (var i = 0; i < lista.length; i++) {
                lbs.push("Dia " + lista[i]['dia']);
                vals1.push(lista[i]['eletro']);
                vals2.push(lista[i]['luz']);
                vals3.push(lista[i]['cozinha_temp']);
                vals4.push(lista[i]['cozinha_umid']);
                vals5.push(lista[i]['sala_temp']);
                vals6.push(lista[i]['sala_umid']);    
                vals7.push(lista[i]['lava_temp']);
                vals8.push(lista[i]['lava_umid']);      
                vals9.push(lista[i]['escritorio_temp']);
                vals10.push(lista[i]['escritorio_umid']);
                vals11.push(lista[i]['banheiro_temp']);
                vals12.push(lista[i]['banheiro_umid']);
                vals13.push(lista[i]['externo_temp']);
                vals14.push(lista[i]['externo_umid']);
                vals15.push(lista[i]['passar_temp']);
                vals16.push(lista[i]['passar_umid']);
                vals17.push(lista[i]['quarto_crianca_temp']);
                vals18.push(lista[i]['quarto_crianca_umid']);
                vals19.push(lista[i]['quarto_pais_temp']);
                vals20.push(lista[i]['quarto_pais_umid']);                                
            }

            let grafico_quarto_pais_temp = document.getElementById('quarto_pais_temp_grafico').getContext('2d');
            let chart_quarto_pais_temp = new Chart(grafico_quarto_pais_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals19,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_quarto_pais_umid = document.getElementById('quarto_pais_umid_grafico').getContext('2d');
            let chart_quarto_pais_umid = new Chart(grafico_quarto_pais_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals20,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_wh = document.getElementById('uso_wh_grafico').getContext('2d');
            let chart_wh = new Chart(grafico_wh, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Eletrodoméstico',
                            data: vals1,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1
                        },
                        {
                            label: 'Luz',
                            data: vals2,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgb(255, 159, 64)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " Wh";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            }); 

            let grafico_cozinha_temp = document.getElementById('cozinha_temp_grafico').getContext('2d');
            let chart_cozinha_temp = new Chart(grafico_cozinha_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals3,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_cozinha_umid = document.getElementById('cozinha_umid_grafico').getContext('2d');
            let chart_cozinha_umid = new Chart(grafico_cozinha_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals4,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }                                                                    
                }                                              
            });

            let grafico_sala_temp = document.getElementById('sala_temp_grafico').getContext('2d');
            let chart_sala_temp = new Chart(grafico_sala_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals5,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_sala_umid = document.getElementById('sala_umid_grafico').getContext('2d');
            let chart_sala_umid = new Chart(grafico_sala_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals6,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_lava_temp = document.getElementById('lava_temp_grafico').getContext('2d');
            let chart_lava_temp = new Chart(grafico_lava_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals7,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_lava_umid = document.getElementById('lava_umid_grafico').getContext('2d');
            let chart_lava_umid = new Chart(grafico_lava_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals8,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_escritorio_temp = document.getElementById('escritorio_temp_grafico').getContext('2d');
            let chart_escritorio_temp = new Chart(grafico_escritorio_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals9,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_escritorio_umid = document.getElementById('escritorio_umid_grafico').getContext('2d');
            let chart_escritorio_umid = new Chart(grafico_escritorio_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals10,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_banheiro_temp = document.getElementById('banheiro_temp_grafico').getContext('2d');
            let chart_banheiro_temp = new Chart(grafico_banheiro_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals11,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_banheiro_umid = document.getElementById('banheiro_umid_grafico').getContext('2d');
            let chart_banheiro_umid = new Chart(grafico_banheiro_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals12,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_externo_temp = document.getElementById('externo_temp_grafico').getContext('2d');
            let chart_externo_temp = new Chart(grafico_externo_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals13,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_externo_umid = document.getElementById('externo_umid_grafico').getContext('2d');
            let chart_externo_umid = new Chart(grafico_externo_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals14,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });  
            
            let grafico_passar_temp = document.getElementById('passar_temp_grafico').getContext('2d');
            let chart_passar_temp = new Chart(grafico_passar_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals15,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_passar_umid = document.getElementById('passar_umid_grafico').getContext('2d');
            let chart_passar_umid = new Chart(grafico_passar_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals16,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });                            

            let grafico_quarto_crianca_temp = document.getElementById('quarto_crianca_temp_grafico').getContext('2d');
            let chart_quarto_crianca_temp = new Chart(grafico_quarto_crianca_temp, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Temperatura',
                            data: vals17,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " ºC";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

            let grafico_quarto_crianca_umid = document.getElementById('quarto_crianca_umid_grafico').getContext('2d');
            let chart_quarto_crianca_umid = new Chart(grafico_quarto_crianca_umid, {
                type: 'bar',
                                    
                data: {
                    labels: lbs,
                                
                    datasets: [
                        {
                            label: 'Umidade',
                            data: vals18,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }                                      
                    ]              
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + " %";
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }                                               
            });

        }
    });   
    
   
});