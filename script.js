// URL de invocación de tu API de AWS
const apiUrl = 'https://8qfccpvdw4.execute-api.us-east-2.amazonaws.com/PODL';

// Función para obtener los usuarios de la base de datos
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl + '/getUsers');
        const data = await response.json();

        // Llenar la tabla con los usuarios
        const tableBody = document.querySelector('#users-table tbody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar datos

        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.Id}</td>
                <td>${user.Name}</td>
                <td>${user.Score}</td>
                <td>${user.Balance}</td>
                <td>${user.Rango}</td>
                <td><button onclick="editUser(${user.Id})">Editar</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

// Función para cargar los datos del usuario en el formulario de edición
function editUser(id) {
    const userRow = document.querySelector(`#users-table tbody tr:nth-child(${id})`);
    const cells = userRow.querySelectorAll('td');

    document.getElementById('id').value = cells[0].textContent;
    document.getElementById('score').value = cells[2].textContent;
    document.getElementById('balance').value = cells[3].textContent;
}

// Función para actualizar los datos del usuario
document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const score = document.getElementById('score').value;
    const balance = document.getElementById('balance').value;

    try {
        const response = await fetch(apiUrl + '/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                score,
                balance
            })
        });

        const data = await response.json();
        if (data.success) {
            alert('Usuario actualizado correctamente');
            fetchUsers(); // Recargar la lista de usuarios
        } else {
            alert('Error al actualizar el usuario');
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
});

// Cargar los datos de los usuarios cuando la página se carga
window.onload = fetchUsers;
