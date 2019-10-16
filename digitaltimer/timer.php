<!doctype html>
<html>

<head>
    <title>Timer</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <meta charset="UTF-8">
    <style>
    html{
        cursor:none;
    }
    </style>
</head>

<body class="bg-black">
    <div id="container">
        <div id="time"></div>
    </div>
    <img id="connection" src="assets/sad_cloud_01.svg"/>
    <script>
    var id = '<?php echo ($_GET['id']); ?>';
    </script>
    <script src="timer.js"></script>
</body>

</html>