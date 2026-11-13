        
        // Hacemos llamada del ID del form de registro
        document.getElementById('formulario-registro').addEventListener('input', function () {
            validateForm();
        });

        function validateForm() {
            const username = document.getElementById('registro-nombre').value;
            const emailForm = document.getElementById('registro-email').value.trim();
            const telefonoForm = document.getElementById('registro-telefono').value.trim();
            const password = document.getElementById('registro-contraseña').value;
            const confirmPassword = document.getElementById('registro-confirmar-contraseña').value;
            const submitForm = document.getElementById('btn-registrar');
            const errorElement = document.getElementById('passwordError');

            let isValid = true;

            if (password === '' && confirmPassword === ''){
                errorElement.textContent = '';
                errorElement.classList.remove('error', 'success');
            }   else if (password.length < 8){
                errorElement.textContent = 'La contraseña debe tener más de 8 carácteres.';
                errorElement.classList.add('error');
                isValid = false;
            }   else if (password !== confirmPassword) {
                errorElement.textContent = 'Las contraseñas no coinciden';
                errorElement.classList.remove('success');
                errorElement.classList.add('error');
                isValid = false;
            } else {
                errorElement.textContent = 'Las constraseñas coinciden';
                errorElement.classList.remove('error');
                errorElement.classList.add('success');
            }

            if (!username || !password || !confirmPassword || !emailForm || !telefonoForm) {
                isValid = false;
            }

            if (isValid) {
                submitForm.classList.add('enabled');
                submitForm.disabled = false;
            } else {
                submitForm.classList.remove('enabled');
                submitForm.disabled = true;
            }
        }
       
        // Función para recuperar los usuarios guardados en localStorage
        function obtenerUsuarios() {
           return JSON.parse(localStorage.getItem('usuarios')) || [];
        }

       document.getElementById('formulario-registro').addEventListener('submit', function (e) {
          e.preventDefault();

          const nombre = document.getElementById('registro-nombre').value.trim();
          const email = document.getElementById('registro-email').value.trim().toLowerCase();
          const telefono = document.getElementById('registro-telefono').value.trim();
          const password = document.getElementById('registro-contraseña').value;
          const errorElement = document.getElementById('passwordError');
          const submitForm = document.getElementById('btn-registrar');

       // Recuperar lista de usuarios desde localStorage
          let usuarios = obtenerUsuarios();

       // Validar que el correo no esté repetido
          const existeCorreo = usuarios.some(usuario => usuario.email === email);

          if (existeCorreo) {
          errorElement.textContent = 'Este correo electrónico ya está registrado.';
          errorElement.classList.remove('success');
          errorElement.classList.add('error');
          return;
        }

       // Crear objeto del nuevo usuario
          const nuevoUsuario = {
          nombre: nombre,
          email: email,
          telefono: telefono,
          password: password
        };

       // Guardar en localStorage
          usuarios.push(nuevoUsuario);
          localStorage.setItem('usuarios', JSON.stringify(usuarios));

          errorElement.textContent = '¡Usuario registrado con éxito!';
          errorElement.classList.remove('error');
          errorElement.classList.add('success');

          this.reset();
          submitForm.classList.remove('enabled');
          submitForm.disabled = true;
       });