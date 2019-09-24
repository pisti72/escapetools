<!doctype html>
<html>

<head>
    <title>Control Center</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="w3.css">
</head>

<body>
    <h1>Control center</h1>
    <h2 id="name"></h2>
    <p id="timestring"></p>
    <button>Pause</button>
    <button>Play</button>
    <button>Stop</button>
    <button onclick="setOneHour()">Start 1 hour</button>
    <button onclick="addFiveMins()">Add 5 mins</button>
    <script>
    var id = '<?php echo ($_GET['id']); ?>';
    </script>
    <script src="control.js"></script>
</body>

</html>