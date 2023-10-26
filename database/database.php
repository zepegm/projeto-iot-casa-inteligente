<?php

require 'config.php';

require 'connection.php';



// DELETAR REGISTROS

function DBDelete($table, $where = null) {

    //$table = DB_PREFIX . '_' . $table;

    $where = ($where) ? " WHERE {$where}" : null;

    $query = "DELETE FROM {$table}{$where}";

    return DBExecute($query);

}



// ALTERAR REGISTRO

function DBUpDate($table, array $data, $where = null) {

    $data = DBEscape($data);

    foreach ($data as $key => $value) {

        if ($value != "null" && $key != 'via_impressao' && $value != 'CURDATE()') {

            $fields[] = "{$key} = '{$value}'";

        } else {

            $fields[] = "{$key} = {$value}";

        }

    }

    $fields = implode(', ', $fields);

    //$table = DB_PREFIX . '_' . $table;

    $where = ($where) ? " WHERE {$where}" : null;

    $query = "UPDATE {$table} SET {$fields}{$where}";

    //echo '<script>console.log("'. $query . '")</script>';

    return DBExecute($query);

}



// LER REGISTROS

function DBRead_Simple($query) {

    $result = DBExecute($query);

    if (!mysqli_num_rows($result)) {

        return false;

    } else {

        while ($res = mysqli_fetch_assoc($result)) {

            $data[] = $res;

        }

        return $data;

    }    
}

function DBRead($table, $params = null, $fields = '*') {

    //$table = DB_PREFIX . '_' . $table;

    $params = ($params) ? " {$params}" : null;

    $query = "SELECT {$fields} FROM {$table}{$params}";

    //echo '<script>console.log("'. $query . '")</script>';

    $result = DBExecute($query);

    if (!mysqli_num_rows($result)) {

        return false;

    } else {

        while ($res = mysqli_fetch_assoc($result)) {

            $data[] = $res;

        }

        return $data;

    }

}



function DBReadUnion($sql1, $sql2) {

    $query = "({$sql1}) UNION ({$sql2})";

    $result = DBExecute($query);

    if (!mysqli_num_rows($result)) {

        return false;

    } else {

        while ($res = mysqli_fetch_assoc($result)) {

            $data[] = $res;

        }

        return $data;

    }    

}



// GRAVAR REGISTROS

function DBCreate($table, array $data, $insertId = false) {

    //$table = DB_PREFIX . '_' . $table;

    $data = DBEscape($data);

    $fields = implode(', ', array_keys($data));

    $values = "'" . implode("', '", $data) . "'";

    $query = "INSERT INTO {$table} ( {$fields} ) VALUES ( {$values} )";

    //echo '<script>console.log("'. $query . '")</script>';

    return DBExecute($query, $insertId);

}



function DBCreateIfNotExistsUpdate($table, array $data) {

    $data = DBEscape($data);

    $fields = implode(', ', array_keys($data));

    $values = "'" . implode("', '", $data) . "'";



    foreach ($data as $key => $value) {

        $fieldsUpdate[] = "{$key} = '{$value}'";

    }

    $fieldsUpdate = implode(', ', $fieldsUpdate);



    $query = "INSERT INTO {$table} ( {$fields} ) VALUES ( {$values} ) ON DUPLICATE KEY UPDATE {$fieldsUpdate}";

    return DBExecute($query);

}



// EXECUTA QUERY

function DBExecute($query, $insertId = false) {

    $link = DBConnect();

    $result = @mysqli_query($link, $query) or die(mysqli_error($link));

    if ($insertId) {

        $result = mysqli_insert_id($link);

    }

    DBClose($link);

    return $result;

}



function resetId($table) {

    $id = DBRead($table, '', 'max(id) as last')[0]['last'] + 1;

    DBExecute('alter table membro auto_increment = ' . $id);

}



?>