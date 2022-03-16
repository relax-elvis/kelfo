$("form").validate({
	rules: {
		name: {
			required: true,
			minlength: 2
		},
		phone: {
			required: true,
			minlength: 5,
			digits: true
		},
		email: {
			required: true,
			email: true
		},
		check_form: {
			required: true
		}
	},
	messages: {
		name: "Introduzca su nombre",
		phone: "Introduza un teléfono",
		email: "Introduzca un E-mail"
	}
});

$("form input[name='check_form']").change(function() {
	$(this).removeClass('error');
});
$('#contactForm').submit(function(e){
	e.preventDefault();
	if($("form input[name='check_form']").prop("checked") === false) {
		$("form input[name='check_form']").addClass('error');
	} else {
		if($("form").valid() === true) {
			$.ajax({
				type: "POST",
				url: "php/contact-form.php",
				data: {
					name: $("#contactForm #name").val(),
					email: $("#contactForm #email").val(),
					phone: $("#contactForm #phone").val(),
					hora_contacto: $("#contactForm #hora_contacto").val(),
					comments: $("#contactForm #comments").val()
				},
				dataType: "json",
				success: function(e) {

					console.log(e.response);

					if (e.response == "success") {

						var dataLayer = window.dataLayer || [];
						dataLayer.push({ 'event': 'cfsend' });

						$('#contactForm').hide();
						$('.es-contact-form__form__error').hide();
						$('.es-contact-form__form__success').show();


					} else {
						
						$('#contactForm').hide();
						$('.es-contact-form__form__success').hide();
						$('.es-contact-form__form__error').show();
					}
				}
			   
			});
		}
	}
	
});