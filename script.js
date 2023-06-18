document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var dobInput = document.getElementById('dob');
    var maritalStatusInput = document.getElementById('maritalStatus');
    var submitButton = document.querySelector('input[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var isValid = true;

        // Validar o campo de nome
        if (nameInput.value.length < 15) {
            showError(nameInput, 'O nome deve ter no mínimo 15 caracteres');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        // Validar o campo de e-mail
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'O e-mail deve ser válido e ter no mínimo 10 caracteres');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        // Validar o campo de data de nascimento
        if (!isValidDate(dobInput.value)) {
            showError(dobInput, 'A data de nascimento deve ser válida (dd/mm/aaaa)');
            isValid = false;
        } else {
            hideError(dobInput);
        }

        // Validar o campo de estado civil e idade
        if (maritalStatusInput.value === 'S') {
            var age = calculateAge(dobInput.value);
            if (age < 15) {
                showError(dobInput, 'Para o estado civil "Solteiro(a)", a idade mínima é de 15 anos');
                isValid = false;
            } else {
                hideError(dobInput);
            }
        }

        // Verificar se pelo menos uma área de interesse foi selecionada
        var interestsSelect = document.getElementById('interests');
        var selectedInterests = Array.from(interestsSelect.options)
            .filter(option => option.selected)
            .map(option => option.value);

        if (selectedInterests.length === 0) {
            showError(interestsSelect, 'Selecione pelo menos uma área de interesse');
            isValid = false;
        } else {
            hideError(interestsSelect);
        }

        if (isValid) {
            alert('Dados enviados com sucesso!');
            // form.submit(); // Descomente esta linha para enviar o formulário
        } else {
            alert('Por favor, corrija os erros no formulário');
        }
    });

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length >= 10;
    }

    function isValidDate(dateString) {
        var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }

        var parts = dateString.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        var date = new Date(year, month - 1, day);
        return (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
        );
    }

    function calculateAge(dateString) {
        var parts = dateString.split('/');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        var today = new Date();
        var birthDate = new Date(year, month - 1, day);
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function showError(inputElement, errorMessage) {
        var errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;

        var parentElement = inputElement.parentNode;
        parentElement.appendChild(errorElement);
    }

    function hideError(inputElement) {
        var parentElement = inputElement.parentNode;
        var errorElement = parentElement.querySelector('.error-message');
        if (errorElement) {
            parentElement.removeChild(errorElement);
        }
    }
});
