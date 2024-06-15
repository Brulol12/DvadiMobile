(function() {
    // Incluir la biblioteca nipplejs
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/nipplejs/0.9.0/nipplejs.min.js';
    window.onload = function() {
        // Mostrar solo el div del juego
        document.addEventListener('DOMContentLoaded'), (event) => {
        var gameContainer = document.getElementById('game-container');
        var bodyChildren = document.body.children;
        for (var i = 0; i < bodyChildren.length; i++) {
            bodyChildren[i].style.display = 'none';
        }
        gameContainer.style.display = 'block';
    }
        // Crear el joystick en el contenedor
        var joystick = nipplejs.create({
            zone: document.querySelector('#game-container'),
            mode: 'static',
            position: {top: '450px', left: '750px'},
            color: 'white',
            size: 100,
            lockX: true
        });

        // Función para emular las teclas
        function simulateKey(keyCode, type) {
            var event = new KeyboardEvent(type, {
                bubbles: true,
                cancelable: true,
                keyCode: keyCode,
                which: keyCode
            });
            document.dispatchEvent(event);
        }

        // Variables para mantener el estado de las teclas
        var keys = { 'up': false, 'down': false, 'left': false, 'right': false };

        // Manejar los movimientos del joystick
        joystick.on('move', function(evt, data) {
            var direction = data.direction;
            if (direction) {
                if (direction.angle === 'up' && !keys['up']) {
                    simulateKey(87, 'keydown'); // W
                    keys['up'] = true;
                } else if (direction.angle === 'down' && !keys['down']) {
                    simulateKey(83, 'keydown'); // S
                    keys['down'] = true;
                } else if (direction.angle === 'left' && !keys['left']) {
                    simulateKey(65, 'keydown'); // A
                    keys['left'] = true;
                } else if (direction.angle === 'right' && !keys['right']) {
                    simulateKey(68, 'keydown'); // D
                    keys['right'] = true;
                }
            }
        });

        joystick.on('end', function() {
            // Resetear el estado de las teclas al soltar el joystick
            if (keys['up']) {
                simulateKey(87, 'keyup'); // W
                keys['up'] = false;
            }
            if (keys['down']) {
                simulateKey(83, 'keyup'); // S
                keys['down'] = false;
            }
            if (keys['left']) {
                simulateKey(65, 'keyup'); // A
                keys['left'] = false;
            }
            if (keys['right']) {
                simulateKey(68, 'keyup'); // D
                keys['right'] = false;
            }
        });
        // Crear botones
        function createButton(label, keyCode) {
            var button = document.createElement('button');
            button.textContent = label;
            button.style.width = '80px';
            button.style.height = '45px';
            button.style.margin = '5px';
            button.style.fontSize = '20px';
            button.style.cursor = 'pointer';
            button.style.borderRadius = '25%';
            button.style.backgroundColor = 'white';
            button.style.border = '2px solid white';
            button.style.opacity = '0.3';

            button.onmousedown = function() {
                simulateKey(keyCode, 'keydown');
            };

            button.onmouseup = function() {
                simulateKey(keyCode, 'keyup');
            };

            button.ontouchstart = function() {
                simulateKey(keyCode, 'keydown');
            };

            button.ontouchend = function() {
                simulateKey(keyCode, 'keyup');
            };

            return button;
        }

        // Crear y añadir los botones al contenedor
        var buttonW = createButton('W', 87); // W
        var buttonK = createButton('K', 75); // K

        gameContainer.appendChild(buttonW);
        gameContainer.appendChild(buttonK);
    };
    document.head.appendChild(script);
})();
