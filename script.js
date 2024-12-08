document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cargar el archivo JSON con las credenciales
    fetch('uss.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);
            
            if (user) {
                alert('Inicio de sesión exitoso');
                window.location.href = "editar.html"; // Redirigir a la página de edición
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        })
        .catch(error => {
            alert('Error al cargar las credenciales');
            console.error('Error:', error);
        });
});

document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const score = document.getElementById('score').value;
    const balance = document.getElementById('balance').value;

    // Preparar el cuerpo de la solicitud para enviar los datos al API de AWS
    const requestBody = {
        id: id,
        score: score,
        balance: balance
    };

    // Enviar los datos al endpoint de la API de AWS
    fetch('https://8qfccpvdw4.execute-api.us-east-2.amazonaws.com/PODL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)  // Convertimos el cuerpo de la solicitud en JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
        alert('Datos actualizados correctamente');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al actualizar los datos');
    });
});

