<?Php

if (isset($_POST['dia']))
{
    require "./database/database.php";

    $sql = "SELECT
	            DATE_FORMAT(`date`, '%Hh') AS hora,
	            SUM(Appliances) as eletro,
                SUM(lights) as luz,
                ROUND(AVG(T1), 2) as cozinha_temp,
                ROUND(AVG(RH_1), 2) as cozinha_umid,
                ROUND(AVG(T2), 2) as sala_temp,
                ROUND(AVG(RH_2), 2) as sala_umid,
                ROUND(AVG(T3), 2) as lava_temp,
                ROUND(AVG(RH_3), 2) as lava_umid,
                ROUND(AVG(T4), 2) as escritorio_temp,
                ROUND(AVG(RH_4), 2) as escritorio_umid,
                ROUND(AVG(T5), 2) as banheiro_temp,
                ROUND(AVG(RH_5), 2) as banheiro_umid,
                ROUND(AVG(T6), 2) as externo_temp,
                ROUND(AVG(RH_6), 2) as externo_umid,
                ROUND(AVG(T7), 2) as passar_temp,
                ROUND(AVG(RH_7), 2) as passar_umid,
                ROUND(AVG(T8), 2) as quarto_crianca_temp,
                ROUND(AVG(RH_8), 2) as quarto_crianca_umid,
                ROUND(AVG(T9), 2) as quarto_pais_temp,
                ROUND(AVG(RH_9), 2) as quarto_pais_umid
            FROM HOUSE
            WHERE DATE(`date`) = '" . $_POST['dia'] . "'
            GROUP BY hora";

            $dados = DBRead_Simple($sql);
    
            echo json_encode($dados);            
}

if(isset($_POST['id_mes']))
{
    require "./database/database.php";

    $sql = "SELECT
                DATE_FORMAT(`date`, '%d') as dia, 
                SUM(Appliances) as eletro, 
                SUM(lights) as luz,
                ROUND(AVG(T1), 2) as cozinha_temp,
                ROUND(AVG(RH_1), 2) as cozinha_umid,
                ROUND(AVG(T2), 2) as sala_temp,
                ROUND(AVG(RH_2), 2) as sala_umid,
                ROUND(AVG(T3), 2) as lava_temp,
                ROUND(AVG(RH_3), 2) as lava_umid,
                ROUND(AVG(T4), 2) as escritorio_temp,
                ROUND(AVG(RH_4), 2) as escritorio_umid,
                ROUND(AVG(T5), 2) as banheiro_temp,
                ROUND(AVG(RH_5), 2) as banheiro_umid,
                ROUND(AVG(T6), 2) as externo_temp,
                ROUND(AVG(RH_6), 2) as externo_umid,
                ROUND(AVG(T7), 2) as passar_temp,
                ROUND(AVG(RH_7), 2) as passar_umid,
                ROUND(AVG(T8), 2) as quarto_crianca_temp,
                ROUND(AVG(RH_8), 2) as quarto_crianca_umid,
                ROUND(AVG(T9), 2) as quarto_pais_temp,
                ROUND(AVG(RH_9), 2) as quarto_pais_umid
            FROM house 
            WHERE MONTH(`date`) = " . $_POST['id_mes'] . " GROUP BY dia";
    
    $dados = DBRead_Simple($sql);
    
    echo json_encode($dados);

}

if(isset($_POST['reset']))
{
    require "./database/database.php";

    $sql = "SELECT MONTH(`date`) AS mes_id, MONTHNAME(`date`) AS mes, ROUND(SUM(Appliances) / COUNT(DISTINCT(DATE(`date`))), 0) AS media_eletro, ROUND(SUM(lights) / COUNT(DISTINCT(DATE(`date`))), 0) AS media_luz, SUM(Appliances) AS total_eletro, SUM(lights) AS total_luz FROM house GROUP BY mes ORDER BY mes_id";
    $dados = DBRead_Simple($sql);
    
    echo json_encode($dados);

}

?>