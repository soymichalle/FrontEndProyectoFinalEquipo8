        
        // Hacemos llamada del ID del form de registro
        document.getElementById('formulario-registro').addEventListener('input', function () {
            validateForm();
        });

        function validateForm() {
            const username = document.getElementById('registro-nombre').value;
            // const emailForm = document.getElementById('registro-email').value;
            // const telefonoForm = document.getElementById('registro-telefono').value;
            const password = document.getElementById('registro-contraseña').value;
            const confirmPassword = document.getElementById('registro-confirmar-contraseña').value;
            const submitForm = document.getElementById('btn-registrar');
            const errorElement = document.getElementById('passwordError');

            let isValid = true;

            if (!username || !password || !confirmPassword) {
                isValid = false;
            }

            if (password !== confirmPassword) {
                errorElement.textContent = 'Passwords do not match';
                errorElement.classList.remove('success');
                errorElement.classList.add('error');
                isValid = false;
            } else {
                errorElement.textContent = 'Passwords match';
                errorElement.classList.remove('error');
                errorElement.classList.add('success');
            }

            if (password.length < 8){
                errorElement.textContent = 'La contraseña debe tener al menos 8 carácteres';
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