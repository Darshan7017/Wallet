<?php
include './assets/data.php';

$response = [
    'status' => 'error',
    'message' => 'Invalid request'
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'] ?? null;

    if ($token) {
        $query = "SELECT name, number, balance, tgid FROM `user` WHERE token='$token'";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);
            $response = [
                'status' => 'success',
                'message' => 'User data retrieved successfully',
                'user' => [
                    'name' => $user_data['name'],
                    'number' => $user_data['number'],
                    'balance' => $user_data['balance'],
                    'tgid' => $user_data['tgid']
                ]
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Invalid token or user not found'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Token is required'
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>