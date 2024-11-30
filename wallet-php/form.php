<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Transaction Form</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }

        .form-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            max-width: 100%;
        }

        .form-wrapper {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h2 {
            text-align: center;
            color: #111439;
            font-weight: 700;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            font-size: 14px;
            margin-bottom: 5px;
            color: #333;
            font-weight: 500;
        }

        input[type="text"], input[type="number"], input[type="password"], input[type="submit"], input[type="date"], input[type="time"], select {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
        }

        input[type="submit"] {
            background-color: #111439;
            color: white;
            border: none;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
            background-color: #333;
        }

        .conditional-fields {
            display: none; /* Hide by default */
        }

        @media only screen and (max-width: 600px) {
            .form-wrapper {
                width: 90%;
            }

            input[type="text"], input[type="number"], input[type="password"], input[type="submit"], select {
                font-size: 14px;
            }
        }

        .note {
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="form-container">
        <div class="form-wrapper">
            <h2>Transaction Form</h2>
            <form action="transaction.php" method="get" id="transactionForm">
                <input type="text" id="title" name="title" placeholder="Enter title" >
                
                <input type="number" id="amount" name="amount" placeholder="Enter amount" >
                
                <select id="type" onchange="showFields()">
                    <option value="" disabled selected>Select Type</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank">Bank</option>
                </select>
                
                <select id="type" name="type">
                    <option value="" disabled selected>Select Type</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                </select>

                <div id="upiFields" class="conditional-fields">
                    <h3>UPI Details</h3>
                    <input type="text" id="toname" name="toname" placeholder="Receiver's Name" >
                  
                    <input type="text" id="toupi" name="toupi" placeholder="Receiver's UPI" >
                </div>

                <div id="bankFields" class="conditional-fields">
                    <h3>Bank Details</h3>
                    <input type="text" id="tonameb" name="tonameb" placeholder="Receiver's Bank Name" >
                    
                    <input type="text" id="tobank" name="tobank" placeholder="Receiver's Bank Account" >
                    
                    <input type="text" id="toifsc" name="toifsc" placeholder="Receiver's IFSC Code" >
                </div>

                <input type="text" id="user" name="user" placeholder="User Mobile Number" >

                <input type="text" id="tref" name="tref" placeholder="Transaction Reference">

                <input type="password" id="password" name="password" placeholder="Enter password" >

                <input type="submit" value="Submit">
            </form>
        </div>
    </div>

    <script>
        function showFields() {
            const type = document.getElementById('type').value;
            const upiFields = document.getElementById('upiFields');
            const bankFields = document.getElementById('bankFields');

            // Hide both sections by default
            upiFields.style.display = 'none';
            bankFields.style.display = 'none';

            // Show fields based on selection
            if (type === 'UPI') {
                upiFields.style.display = 'block';
            } else if (type === 'Bank') {
                bankFields.style.display = 'block';
            }
        }
    </script>
</body>
</html>