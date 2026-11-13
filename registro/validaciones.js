        
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