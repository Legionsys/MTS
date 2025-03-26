<!DOCTYPE html>
<html lang="en">
<!--
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
-->

<head>
    <meta charset="UTF-8">
    <title>Clickable Multi-Select Lists</title>
    <style>
        #Conlink {
            margin: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            width: 550px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #CNL-wrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .lnk-container {
            width: 250px;
        }

        .CNL-list {
            height: 100px;
            overflow-y: auto;
            border: 1px solid #ddd;
            padding: 5px;
        }

        .CNL-list label {
            display: block;
            margin: 5px 0;
            cursor: pointer;
            padding: 5px;
            /* Add padding for better appearance */
            transition: background-color 0.3s;
            /* Smooth color transition */
        }

        /* Hide the checkbox */
        .CNL-list input[type="checkbox"] {
            display: none;
        }

        /* Change background color when checkbox is checked */
        .CNL-list input[type="checkbox"]:checked+label {
            background-color: #CC5500;
            /* Light blue when selected */
        }

        /* Optional: Hover effect for better UX */
        .CNL-list label:hover {
            background-color: #fff;
            /* Light gray on hover */
        }

        #CNL-Button {
            height: 40px;
            padding: 5px 10px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <!-- Parent Div Containing Both Lists and Button -->
    <div class="parent-container">
        <!-- Wrapper for the two lists -->
        <div class="lists-wrapper">
            <!-- First Selection -->
            <div class="select-container">
                <h3>List 1</h3>
                <div class="checkbox-list" id="list1">
                    <input type="checkbox" name="choices1" value="a1" id="a1">
                    <label for="a1">Apple</label>
                    <input type="checkbox" name="choices1" value="a2" id="a2">
                    <label for="a2">Banana</label>
                    <input type="checkbox" name="choices1" value="a3" id="a3">
                    <label for="a3">Cherry</label>
                    <input type="checkbox" name="choices1" value="a4" id="a4">
                    <label for="a4">Dragon Fruit</label>
                    <input type="checkbox" name="choices1" value="a5" id="a5">
                    <label for="a5">Elderberry</label>
                </div>
            </div>

            <!-- Second Selection -->
            <div class="select-container">
                <h3>List 2</h3>
                <div class="checkbox-list" id="list2">
                    <input type="checkbox" name="choices2" value="b1" id="b1">
                    <label for="b1">Red</label>
                    <input type="checkbox" name="choices2" value="b2" id="b2">
                    <label for="b2">Blue</label>
                    <input type="checkbox" name="choices2" value="b3" id="b3">
                    <label for="b3">Green</label>
                    <input type="checkbox" name="choices2" value="b4" id="b4">
                    <label for="b4">Yellow</label>
                    <input type="checkbox" name="choices2" value="b5" id="b5">
                    <label for="b5">Purple</label>
                </div>
            </div>
        </div>

        <!-- Single Button -->
        <button onclick="getSelectedOptions()">Get Selections</button>
    </div>

    <!-- Output Area -->
    <div id="output" style="margin: 20px;"></div>

    <script>
        function getSelectedOptions() {
            // Get selected options from both lists
            const list1 = document.querySelectorAll('#list1 input[name="choices1"]:checked');
            const list2 = document.querySelectorAll('#list2 input[name="choices2"]:checked');

            // Map selected options to text and value
            const selected1 = Array.from(list1).map(input => ({
                text: input.nextElementSibling.textContent.trim(),
                value: input.value
            }));
            const selected2 = Array.from(list2).map(input => ({
                text: input.nextElementSibling.textContent.trim(),
                value: input.value
            }));

            // Prepare output
            let outputText = '<h4>Selected Options:</h4>';
            outputText += '<p><strong>List 1:</strong> ';
            outputText += selected1.length > 0 ?
                selected1.map(opt => `${opt.text} (${opt.value})`).join(', ') :
                'None selected';
            outputText += '</p>';
            outputText += '<p><strong>List 2:</strong> ';
            outputText += selected2.length > 0 ?
                selected2.map(opt => `${opt.text} (${opt.value})`).join(', ') :
                'None selected';
            outputText += '</p>';

            // Display the output
            document.getElementById('output').innerHTML = outputText;
        }
    </script>
</body>

</html>