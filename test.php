<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File and Directory Information</title>
</head>

<body>
    <h1>File and Directory Information</h1>

    <p><strong>File Name:</strong> <?php echo basename(__FILE__); ?></p>
    <p><strong>Full Path of File:</strong> <?php echo realpath(__FILE__); ?></p>
    <p><strong>Containing Folder:</strong> <?php echo basename(dirname(__FILE__)); ?></p>
    <p><strong>Full Path of Containing Folder:</strong> <?php echo dirname(realpath(__FILE__)); ?></p>
</body>

</html>