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
    <button onclick="setToZero()">Set to zero</button>
    <button onclick="setOneHour()">Start 1 hour</button>
    <button onclick="addFiveMins()">Add 5 mins</button>
    <button onclick="setToRed()">Set to red</button>
    <button onclick="setToGreen()">Set to green</button>
    <button onclick="setToBlue()">Set to blue</button>
    <button onclick="setToWhite()">Set to white</button>
    <script>
    var id = '<?php echo ($_GET['id']); ?>';
    </script>
    <script src="control.js"></script>
</body>

</html>