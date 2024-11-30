<?php
// Include the connection file
require("assets/data.php");

// Set the content type to JSON

// Initialize an array for the response
$response = array();

// Check if both 'notify' and 'token' values are received via GET method
if (isset($_GET['notify']) && isset($_GET['token'])) {
    $notify = $_GET['notify']; // Get the 'notify' value
    $token = $_GET['token'];   // Get the 'token' value

    // Update query: Set notify where token matches
    $sql = "UPDATE user SET notify = '$notify' WHERE token = '$token'";

    // Execute the query
    if (mysqli_query($conn, $sql)) {
        // If update is successful
        $response['status'] = "success";
        $response['message'] = "Notification updated successfully";
    } else {
        // If there is an error in the update
        $response['status'] = "error";
        $response['message'] = "Error updating record: " . mysqli_error($conn);
    }
} else {
    // If 'notify' or 'token' parameters are missing
    $response['status'] = "error";
    $response['message'] = "Required parameters 'notify' and 'token' not found in the GET request.";
}

// Close connection
mysqli_close($conn);

// Output the response in JSON format
echo json_encode($response);
?>