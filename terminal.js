// URL de invocación de tu API de AWS
const apiUrl = 'https://8qfccpvdw4.execute-api.us-east-2.amazonaws.com/PODL';

// Obtener los elementos del DOM
const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command');
const outputDiv = document.getElementById('output');

// Manejar la entrada del comando
commandInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim();
        if (command) {
            // Agregar el comando a la terminal
            addToTerminal(`> ${command}`, 'input');

            // Ejecutar el comando
            await executeCommand(command);

            // Limpiar el campo de entrada
            commandInput.value = '';
        }
    }
});

// Función para agregar contenido a la terminal
function addToTerminal(content, className) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.textContent = content;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight; // Mantener el scroll al final
}

// Función para manejar los comandos
async function executeCommand(command) {
    try {
        if (command.startsWith('getUsers')) {
            // Obtener los usuarios desde la API
            const response = await fetch(`${apiUrl}/getUsers`);
            const data = await response.json();
            if (data && Array.isArray(data)) {
                addToTerminal('Usuarios obtenidos:', 'output');
                data.forEach(user => {
                    addToTerminal(`ID: ${user.Id}, Nombre: ${user.Name}, Puntos: ${user.Score}, Saldo: ${user.Balance}, Rango: ${user.Rango}`, 'output');
                });
            } else {
                addToTerminal('Error: No se encontraron usuarios.', 'output');
            }
        } else if (command.startsWith('updateUser')) {
            // Comando para actualizar un usuario
            const parts = command.split(' ');
            if (parts.length === 4) {
                const [_, id, score, balance] = parts;
                const response = await fetch(`${apiUrl}/updateUser`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, score, balance })
                });
                const result = await response.json();
                if (result.success) {
                    addToTerminal(`Usuario ${id} actualizado exitosamente.`, 'output');
                } else {
                    addToTerminal(`Error al actualizar el usuario ${id}.`, 'output');
                }
            } else {
                addToTerminal('Uso: updateUser <id> <score> <balance>', 'output');
            }
        } else {
            addToTerminal(`Comando desconocido: ${command}`, 'output');
        }
    } catch (error) {
        addToTerminal(`Error: ${error.message}`, 'output');
    }
}
