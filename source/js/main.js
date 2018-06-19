let setNumbers = () => {
	let numbers = {
		a: Math.floor(Math.random() * 4 + 6),
		sum: Math.floor(Math.random() * 4 + 11),
	}
	numbers.b = numbers.sum - numbers.a;
	return numbers;
}


//Отрисовка стрелок и отображение форм для ввода числа
let drawArrow = (arrowNumber, values) => {
	let axisWidth = parseInt($('#axis-img').css('width'), 10),
		axisHeight = parseInt($('#axis-img').css('height'), 10);
	if (arrowNumber === 1) {
		let leftPoint = axisWidth / 875 * 36 + 30;
		let arrowWidth = axisWidth / 875 * 39 * values.a;
		let bottomIndent = axisHeight / 83 * 63 + 100;
		$('#first-arrow').css('left', `${leftPoint}px`);
		$('#first-arrow').css('bottom', `${bottomIndent}px`);
		$('#first-arrow').css('width', `${arrowWidth}px`);
		$('#first-arrow').fadeIn('slow'); 
		let formLeft = arrowWidth / 2 + leftPoint - 12;
		let formBottom = bottomIndent + parseInt($('#first-arrow').css('height'), 10) + 10;
		$('#first-form').css('left', `${formLeft}px`);
		$('#first-form').css('bottom', `${formBottom}px`);
		$('#first-form').fadeIn('slow');
	} else if (arrowNumber === 2) {
		let leftPoint = (axisWidth / 875 * 36 + 30) + (axisWidth / 875 * 39 * values.a);
		let arrowWidth = axisWidth / 875 * 39 * values.b;
		let bottomIndent = axisHeight / 83 * 63 + 100;
		$('#second-arrow').css('left', `${leftPoint}px`);
		$('#second-arrow').css('bottom', `${bottomIndent}px`);
		$('#second-arrow').css('width', `${arrowWidth}px`);
		$('#second-arrow').fadeIn('slow');
		let formLeft = arrowWidth / 2 + leftPoint - 12;
		let formBottom = bottomIndent + parseInt($('#second-arrow').css('height'), 10) + 10;
		$('#second-form').css('left', `${formLeft}px`);
		$('#second-form').css('bottom', `${formBottom}px`);
		$('#second-form').fadeIn('slow');
	}
}

// Проверка результата
let compareNumbers = (stepNumber, currentValue, numbers) => {
	if(stepNumber === 1) {
		if(currentValue == numbers.a) {
			$('#first-input').fadeOut('slow', () => {
				$('#number-a').css('background-color', '#fff');
				$('#first-text').html(currentValue);
				$('#first-text').fadeIn('slow', () => {
					drawArrow(2, numbers);
				});	
			});
		} else {
			$('#first-input').css('color', 'red');	
			$('#number-a').css('background-color', 'yellow');
		}
	} else if(stepNumber === 2) {
		if(currentValue == numbers.b) {
			$('#second-input').fadeOut('slow', () => {
				$('#number-b').css('background-color', '#fff');
				$('#second-text').html(currentValue);
				$('#second-text').fadeIn('slow', () => {
					$('#number-sum').fadeOut('slow', () => {
						$("#expression__input").fadeIn('slow');
					})
				});	
			});
		} else {
			$('#second-input').css('color', 'red');	
			$('#number-b').css('background-color', 'yellow');
		}
	} else if(stepNumber === 3) {
		if(currentValue == numbers.sum) {
			$('#expression__input').fadeOut('slow', () => {
				$('#number-sum').css('background-color', '#fff');
				$('#number-sum').html(currentValue);
				$('#number-sum').fadeIn('slow');	
			});
		} else {
			$('#expression__input').css('color', 'red');
		}
	}
}

const numbers = setNumbers();
$('#number-a').html(numbers.a);
$('#number-b').html(numbers.b);
$('#number-sum').html("?");

drawArrow(1, numbers);

$(window).resize( () => {
		drawArrow(1, numbers);
		if ($('#second-arrow').css('display') != 'none') {
			drawArrow(2, numbers);
		}
	});

$('#first-input').change(function(event) {
	compareNumbers(1, $(this).val(), numbers);
});

$('#second-input').change(function(event) {
	compareNumbers(2, $(this).val(), numbers);
});

$('#expression__input').change(function(event) {
	compareNumbers(3, $(this).val(), numbers);
})

$('.visualisation__form').submit(function(event) {
	event.preventDefault();
})

$('.expression__form').submit(function(event) {
	event.preventDefault();
})