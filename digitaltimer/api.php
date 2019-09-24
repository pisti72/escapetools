<?php
/*

INSERT INTO `b14304`.`remotetimer_timers` (`id`, `name`, `command`, `token`) VALUES ('1', 'Kocka', 'NOPE', 'P3LSCD9R4MWGACHC');

*/



$response = array();

//$mysqli = new mysqli("localhost", "expense", "Start123", "expense");
global $mysqli;
$mysqli = new mysqli("c199um.forpsi.com", "b14304", "H3MFdnN","b14304","3306");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}else{
    //printf("Connected");
}

/*
Request timer 
called by timer
*/
$response['result'] = 'invalid';

if (isset($_GET['timer'])) {
    $token = $_GET['timer'];
    $query = "SELECT name, command, timestring, color FROM remotetimer_timers WHERE token = '$token'";
    if ($result = $mysqli->query($query)) {
        /* fetch object array */
        if ($row = $result->fetch_row()) {
            $response['result'] = 'success';
            $response['name'] = $row[0];
            $response['command'] = $row[1];
            $response['timestring'] = $row[2];
            $response['color'] = $row[3];
            $result->close();
        } else {
            $response['result'] = 'failed';
        }
    }
}

if (isset($_GET['timestring'],$_GET['token'])) {
    $token = $_GET['token'];
    $timestring = $_GET['timestring'];
    $query = "UPDATE remotetimer_timers SET timestring = '$timestring', command='NOPE' WHERE token ='$token'";
    $success = $mysqli->query($query);
    if ($success) {
        $response['result'] = 'success';
    } else {
        $response['result'] = 'failed';
    }
}

if (isset($_GET['command'],$_GET['token'])) {
    $token = $_GET['token'];
    $command = $_GET['command'];
    $query = "UPDATE remotetimer_timers SET command = '$command' WHERE token ='$token'";
    $success = $mysqli->query($query);
    if ($success) {
        $response['result'] = 'success';
    } else {
        $response['result'] = 'failed';
    }
}

if (isset($_GET['color'],$_GET['token'])) {
    $token = $_GET['token'];
    $color = $_GET['color'];
    $query = "UPDATE remotetimer_timers SET color = '$color' WHERE token ='$token'";
    $success = $mysqli->query($query);
    if ($success) {
        $response['result'] = 'success';
    } else {
        $response['result'] = 'failed';
    }
}

/* send back the result */
echo json_encode($response);

/* close connection */
$mysqli->close();

?>