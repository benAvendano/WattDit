emailjs.init('OVU_YIV8_eY0HFr0D');  // Reemplaza por tu Public Key

        const form = document.getElementById('sugerencia-form');
        const respuesta = document.getElementById('respuesta');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del formulario

            const formData = new FormData(form);

            const emailParams = {
                from_name: formData.get('nombre'),
                from_email: formData.get('email'),
                message: formData.get('sugerencia'),
            };

            // Enviar el correo utilizando el service_id y template_id correctos
            emailjs.send('service_mtd684m', 'template_zzzhjk5', emailParams)
                .then(function(response) {
                    console.log('Correo enviado exitosamente:', response);
                    respuesta.style.display = 'block';
                    respuesta.innerHTML = '¡Gracias por tu sugerencia! Hemos recibido tu mensaje.';
                    form.reset(); // Resetea el formulario después de enviarlo
                }, function(error) {
                    console.log('Error al enviar el correo:', error);
                    respuesta.style.display = 'block';
                    respuesta.innerHTML = 'Lo sentimos, hubo un error al enviar tu sugerencia. Por favor, inténtalo nuevamente.';
                });
        });