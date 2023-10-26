<?php

	require "./database/database.php";
    
    $meses = DBRead_Simple("SELECT MONTHNAME(`date`) AS mes, MONTH(`date`) AS id FROM house GROUP BY mes");
    
    $index = 0;

    foreach ($meses as $mes) {
        $dias = DBRead_Simple("SELECT DATE_FORMAT(`date`, '%d/%m/%Y') AS data, DATE_FORMAT(`date`, '%Y-%m-%d') AS value FROM house WHERE MONTH(`date`) = " . $mes['id'] . " GROUP BY data");
        $meses[$index]['dias'] = $dias;
        $index += 1;
        //print_r($mes);
    }

    //print_r($meses[0]);

    $datas = DBRead_Simple("SELECT DATE_FORMAT(min(`date`), '%d/%m/%Y') AS de, DATE_FORMAT(max(`date`), '%d/%m/%Y') AS ate FROM house");

    // consulta dos dados
    $uso_wh = DBRead_Simple("SELECT MONTH(`date`) AS mes_id, MONTHNAME(`date`) AS mes, ROUND(SUM(Appliances) / COUNT(DISTINCT(DATE(`date`))), 0) AS media_eletro, ROUND(SUM(lights) / COUNT(DISTINCT(DATE(`date`))), 0) AS media_luz, SUM(Appliances) AS total_eletro, SUM(lights) AS total_luz FROM house GROUP BY mes ORDER BY mes_id");

?>

<html>
    <head>
        <title>Relatório de Dados - Sensores de Casa Inteligente</title>

        <!-- Bootstrap core CSS -->
        <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="./font-awesome/css/fontawesome.min.css" rel="stylesheet">
        <link href="./font-awesome/css/brands.css" rel="stylesheet">
        <link href="./font-awesome/css/solid.css" rel="stylesheet">        
      

        <link rel="shortcut icon" type="image/png" href="favicon.ico"/>    
    </head>
    <body class='bg-light'>
        <main class="container">
            <div class="bg-light p-5 rounded">
                <p class="fs-3">Relatório Geral dos dados obtidos de sensores de uma <span class="text-decoration-underline">Casa Inteligente</span> do período de <span class='fw-bold'><?= $datas[0]['de'] ?? "" ?></span> até <span class='fw-bold'><?= $datas[0]['ate'] ?? "" ?>.</p>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    <p class="fw-bold fs-4 text-center">Filtrar Mês</p>
                    <div id="menu_principal" class="accordion">
                    <?php
                        foreach ($meses as $mes) {
                            echo '<div class="accordion-item">';
                                echo '<h2 class="accordion-header" id="heading' . $mes['id'] . '">';
                                    echo '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' . $mes['id'] . '" aria-expanded="false" aria-controls="collapse' . $mes['id'] . '">' . $mes['mes'] . '</button>';
                                echo '</h2>';
                                echo '<div id="collapse' . $mes['id'] . '" data-mes="' . $mes['id'] . '" data-nome="' . $mes['mes'] . '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#menu_principal">';
                                    echo '<div class="accordion-body">';

                                        echo '<div id="lista_dias_' . $mes['id'] . '" class="list-group">';

                                            foreach($mes['dias'] as $dia) {
                                                echo '<a href="#" class="list-group-item list-group-item-action" data-value="' . $dia['value'] . '">' . $dia['data'] . '</a>';
                                            }

                                        echo '</div>';

                                    echo '</div>';
                                echo '</div>';
                            echo '</div>';
                        }
                    ?>   
                    </div>                 
                </div>
                <div class="col-sm-10">
                    <div id="conteudo_grafico" class="row">
                        <div class="col-sm-6">
                            <p class="fs-4 text-center" id="title_eletro_graf">Média por dia do consumo em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o período</p>
                            <canvas id="uso_wh_grafico"></canvas>
                        </div>
                        <div class="col-sm-6">
                            <p class="fs-4 text-center" id="title_eletro_graf_total">Total do consumo em <span class="text-danger fw-bold">Wh</span> de <span class="fw-bold">Eletrodomésticos</span> e <span class="fw-bold">Luz</span> durante todo o período</p>
                            <canvas id="uso_wh_grafico_total"></canvas>
                        </div>                                                                      
                    </div>
                </div>
            </div>

        </main>
            <script src="js/jquery-3.6.0.min.js"></script>                                
            <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="js/chart.js"></script>
            <script src="index.js"></script>
            <script type="text/javascript">

            $(document).ready(function() {
                var uso_wh = JSON.parse('<?= json_encode($uso_wh) ?>');

                var lbs = [];
                var vals1 = [];
                var vals2 = [];
                var vals3 = [];
                var vals4 = [];
                
                //console.log(uso_wh);

                for (var i = 0; i < uso_wh.length; i++) {
                    lbs.push(uso_wh[i]['mes']);
                    vals1.push(uso_wh[i]['media_eletro']);
                    vals2.push(uso_wh[i]['media_luz']);
                    vals3.push(uso_wh[i]['total_eletro']);
                    vals4.push(uso_wh[i]['total_luz']);
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
            });              

            </script>
    </body>
</html>