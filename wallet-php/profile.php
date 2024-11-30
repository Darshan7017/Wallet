<?php
require_once './assets/data.php'; 

header('Content-Type: application/json');

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the token, name, and tgid from the request body
    $token = $_GET['token'] ?? null;
    $name = $_GET['name'] ?? null;
    $tgid = $_GET['tgid'] ?? null;

    if (empty($token) || empty($name) || empty($tgid)) {
        $response = ["status" => "error", "message" => "Token, name, and tgid are required."];
        echo json_encode($response);
        exit;
    }

    // Prepare the SQL statement to update the user
    $sql = "UPDATE user SET name = ?, tgid = ? WHERE token = ?";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bind_param("sss", $name, $tgid, $token);
    
    // Execute the statement
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $response = ["status" => "success", "message" => "User updated successfully."];
        } else {
            $response = ["status" => "error", "message" => "No user found with the provided token."];
        }
    } else {
        $response = ["status" => "error", "message" => "Failed to update user: " . $stmt->error];
    }

    // Close the statement
    $stmt->close();
} else {
    $response = ["status" => "error", "message" => "Invalid request method."];
}

// Close the database connection
$conn->close();

// Return the response as JSON
echo json_encode($response);
?>