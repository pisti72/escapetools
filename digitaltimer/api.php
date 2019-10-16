<?php

$response = array();

global $mysqli;
//$mysqli = new mysqli("c199um.forpsi.com", "b14304", "H3MFdnN","b14304","3306");
$mysqli = new mysqli("localhost", "root", "", "remotetimer", "3306");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
} else {
    //printf("Connected");
}

/*
Request timer
called by timer
 */
$response['result'] = 'failed';

//called by control
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
//called by timer
if (isset($_GET['timestring'], $_GET['receivedcommand'], $_GET['color'], $_GET['token'])) {
    $token = $_GET['token'];
    $timestring = $_GET['timestring'];
    $command = $_GET['receivedcommand'];
    $color = $_GET['color'];
    $query = "SELECT command FROM remotetimer_timers WHERE token = '$token'";
    if ($result = $mysqli->query($query)) {
        if ($row = $result->fetch_row()) {
            $response['result'] = 'success';
            if ($row[0] == $command) {
                $query = "UPDATE remotetimer_timers SET timestring = '$timestring', command='NOPE', color = '$color' WHERE token ='$token'";
                $success = $mysqli->query($query);
                if ($success) {
                    $response['result'] = 'success';
                } else {
                    $response['result'] = 'failed';
                }
            } else {
                $response['result'] = 'failed';
            }
            $result->close();
        } else {
            $response['result'] = 'failed';
        }
    }
}

if (isset($_GET['command'], $_GET['token'])) {
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

/* send back the result */
echo json_encode($response);

/* close connection */
$mysqli->close();
