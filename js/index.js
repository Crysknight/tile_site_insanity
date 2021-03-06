/* Конструктор поля выбора цвета */

function ColorOptions(colors, colorInput, priceForOne, counter, sum, basisOptions) {
	this.colors = colors;
	this.colorInput = colorInput;
	this.priceForOne = priceForOne.find('div:last-child');
	this.options = colorInput.find('.input-options');
	this.counter = counter;
	this.sum = sum;
	this.myRender = function () {
		this.options.empty();
		var firstIteration = true;
		var onlyIteration = true;
		var regardingColumns = 0;
		for (i = 0; i < this.colors.length; i++) {
			if (this.colors[i].price === null) {
				this.priceForOne.parents('.price-for-one').empty();
				this.sum.empty();	
			}
			if (firstIteration == true) {
				this.colorInput.find('input').val(this.colors[i].name).css({'color': this.colors[i].palette});
				this.colorInput.find('.input-color-point').css({'background-image': 'url(' + this.colors[i].image + ')'});
				this.priceForOne.text(this.colors[i].price)
					.append($('<span></span>')
						.addClass('rouble'));
				firstIteration = false;
				regardingColumns++;
				continue;
			}
			onlyIteration = false;
			if (i === 1 || this.colors[i].basis !== this.colors[i - 1].basis) {
				this.options.append($('<div></div>')
					.addClass('options-column')
				);
				this.options.append($('<div></div>')
					.addClass('basis-delimiter')
					.text('Основа: ' + this.colors[i].basis)
				);
				regardingColumns = 1;
			}
			var oddOrEven = regardingColumns % 2 === 0 ? ' even' : ' odd';
			this.options.append($('<div></div>')
				.addClass('input-option' + oddOrEven)
				.text(this.colors[i].name)
				.css({'color': this.colors[i].palette})
				.append($('<span></span>')
					.addClass('color-point')
					.css({'background-image': 'url(' + this.colors[i].image + ')'}))
				);
		}
		if (onlyIteration) {
			this.colorInput.find('.input-caret').css({ display: 'none' });
			this.colorInput.find('.input-damper').css({ cursor: 'default' });
		}
		this.colorInput.find('.input-option').click((function(e){
			var colorName = e.target.className == 'color-point' ? 
					e.target.parentElement.innerText :
					e.target.innerText;
			var colorValue = e.target.className == 'color-point' ?
					e.target.parentElement.style.color :
					e.target.style.color;
			var newColors = [];
			for (let i = 0; i < this.colors.length; i++) {
				if (this.colors[i].name === colorName) {
					continue;
				}
				newColors.push(this.colors[i]);
			}
			newColors = newColors.sort(function(a, b) {
		  	if (a.basis > b.basis) return -1;
		  	if (a.basis < b.basis) return 1;
		  	if (a.price > b.price) return 1;
		  	if (a.price < b.price) return -1;
			});
			for (let i = 0; i < this.colors.length; i++) {
				if (this.colors[i].name === colorName) {
					newColors.unshift(this.colors[i]);
				}
			}
			newColors
			this.colors = newColors;

			for (let i = 0; i < this.colors.length; i++) {
				if (this.colors[i].name === colorName) {
					var sum = this.sum.find('div:last-child');
					var sumText = ((this.colors[i].price * this.counter.find('input').val()).toFixed(1)).slice(-1) == 0 ?
					Math.round(this.colors[i].price * this.counter.find('input').val()) :
					(this.colors[i].price * this.counter.find('input').val()).toFixed(1);
					sum.text(sumText)
						.append($('<span></span>')
							.addClass('rouble'));
					if (sum.text().length >= 7 && sum.text().length < 9) {
						sum.removeClass('sm-font exsm-font');
						sum.addClass('med-font');
					}
					if (sum.text().length >= 9 && sum.text().length < 11) {
						sum.removeClass('med-font exsm-font');
						sum.addClass('sm-font');
					}
					if (sum.text().length >= 11) {
						sum.removeClass('sm-font med-font');
						sum.addClass('exsm-font');
					}
				}
			}
			this.myRender();
			this.colorInput.find('.input-options').slideUp(0);
			this.colorInput.children('.input-caret').removeClass('upside');
		}).bind(this));
	};

	this.myRender();

	this.colorInput.find('.input-damper').click(function(){
		var options = $(this).parents('.color-input').children('.input-options');
		var caret = $(this).parents('.color-input').children('.input-caret');
		if (options.css('display') == 'none') {
			options.slideDown(300);
			caret.addClass('upside');
		} else {
			options.slideUp();
			caret.removeClass('upside');
		}
	});
}

/* Конструктор поля выбора размера */

function SizeOptions(sizes, sizeInput) {
	this.sizes = sizes;
	this.sizeInput = sizeInput;
	this.product = sizeInput.parents('.product');
	this.options = sizeInput.find('.input-options');
	this.myRender = function () {
		this.options.empty();
		var firstIteration = true;
		var singleOption = true;
		var customPrice = false;
		for (i = 0; i < this.sizes.length; i++) {
			if (firstIteration == true) {
				sizeInput.find('input').val(this.sizes[i]);
				firstIteration = false;
				continue;
			}
			this.options.append($('<div></div>')
				.addClass('input-option')
				.text(key));
			singleOption = false;
		}
		if (singleOption) {
			this.sizeInput.find('.input-caret').css({ display: 'none' });
			this.sizeInput.find('.input-damper').css({ cursor: 'default' });
		}
		this.sizeInput.find('.input-option').click((function(e){
			var size = e.target.innerText,
				newSizes = [ size ];
			for (i = 0; i < this.sizes.length; i++) {
				if (this.sizes[i] === size) {
					continue;
				}
				newSizes.push(this.sizes[i]);
			}
			this.sizes = newSizes;
			this.myRender();
			this.sizeInput.find('.input-options').slideUp(0);
			this.sizeInput.children('.input-caret').removeClass('upside');
		}).bind(this));
	};

	this.myRender();

	sizeInput.find('.input-damper').click(function(){
		var options = $(this).parents('.size-input').children('.input-options');
		var caret = $(this).parents('.size-input').children('.input-caret');
		if (options.css('display') == 'none') {
			options.slideDown(300);
			caret.addClass('upside');
		} else {
			options.slideUp();
			caret.removeClass('upside');
		}
	});
}

/* Конструктор поля выбора количества */

function Counter(counter, priceForOne, sum) {
	Object.defineProperty(this, 'setQuantity', {
		get: function() {
			return this.quantity;
		},
		set: function(val) {
			this.priceForOne = +priceForOne.find('div:last-child').text();
			this.quantity = val;
			var sum = this.sum.find('div:last-child');
			sum.text(((val * this.priceForOne).toFixed(1)).slice(-1) == 0 ? Math.round(val * this.priceForOne) : (val * this.priceForOne).toFixed(1))
			.append($('<span></span>')
				.addClass('rouble'));
			this.counter.find('input').val(val);
			if (sum.text().length >= 7 && sum.text().length < 9) {
				sum.removeClass('sm-font exsm-font');
				sum.addClass('med-font');
			}
			if (sum.text().length >= 9 && sum.text().length < 11) {
				sum.removeClass('med-font exsm-font');
				sum.addClass('sm-font');
			}
			if (sum.text().length >= 11) {
				sum.removeClass('sm-font med-font');
				sum.addClass('exsm-font');
			}
		}
	});
	this.quantity = 1;
	this.counter = counter;
	this.counterInput = counter.find('input');
	this.priceForOne = +priceForOne.find('div:last-child').text();
	this.sum = sum;
	this.minusButton = counter.find('.minus');
	this.plusButton = counter.find('.plus');
	this.minusButton.click((function(e){
			e.preventDefault();
			if (this.setQuantity > 0) {
				this.setQuantity--;
			}
		}).bind(this));
	this.plusButton.click((function(e){
			e.preventDefault();
			this.setQuantity++;
		}).bind(this));
	this.counterInput.on('input', (function(e){
		e.target.value = e.target.value.replace(/\D/g, '');
		if (e.target.value.length > 5) {
			e.target.value = this.setQuantity;
		}
		if (e.target.value.length > 1 && e.target.value[0] == 0) {
			e.target.value = e.target.value.slice(1);
		}
		this.setQuantity = e.target.value;
	}).bind(this));
	this.setQuantity = 0;
}

/* Создание заказанных товаров в форме подтверждения заказа */

/*function orderedWare(name, quantity, color, colorValue, size, sum) {
	var base = $('<div></div>').addClass('ordered-ware col-lg-3 col-md-4 col-sm-6 col-xs-12');
	var form = $('#send_tile .wrapper');
	var confirmation = $('#send_tile .order-wrapper');
	base.append($('<h3><span class="name">' + name + '</span> &mdash; <b>' + quantity + 'м<sup>2</sup></b></h3>'));
	base.append($('<div>Цвет: ' + color + '</div>').css({'color': colorValue}));
	base.append($('<div>Размер: ' + size + '</div'));
	base.append($('<div>На сумму: <b>' + sum + '</b> <span class="rouble"></span></div>'));
	base.append($('<button class="delete">УБРАТЬ</button>'));
	base.find('.delete').click(function(){

		console.log('hello');

		var ware = $(this).parents('.ordered-ware');
		var wareName = ware.find('h3 .name').text();
		for (i = 0; i < postObject.wares.length; i++) {
			if (wareName = postObject.wares[i].name) {
				postObject.wares.splice(i, 1);
			}
		}

		// $('.ordered-ware').each(function(indx, el){
		// 	if ($(this).find('h3').text() == name + ' — ' + quantity + 'шт.') {
		// 		for (i = 0; i < postObject.wares.length; i++) {
		// 			if (name == postObject.wares[i].name) {
		// 				postObject.wares.splice(i, 1);
		// 			}
		// 		}
		// 		$('.product').each(function(i, el) {
		// 			if (name == $(this).find('h3.product-name').text()) {
		// 				$(this).find('.damper').fadeOut(50);
		// 			}
		// 		});
		// 		$(this).remove();
		// 		if (postObject.wares.length == 0) {
		// 			$('body').animate({
		// 				scrollTop: ($('h3.product-name').get(0).offsetTop + $('h3.product-name').get(0).parentElement.offsetTop - 100)
		// 			}, 300);
		// 		$('#send_tile .confirm-button').parent('div').remove();
		// 		form.toggleClass('active');
		// 		confirmation.parent('.order-wrapper').toggleClass('active');
		// 		}
		// 	}
		// });
	});
	return base;
}*/

function send() {
	postObject = JSON.stringify(postObject);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/send.php', true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
	}
	xhr.send(postObject);
}

var postObject = {
	infos: {
		name: '',
		phone: ''
	}, 
	wares: [],
	toInitial: function() {
		this.infos = { name: '', phone: '' };
		this.wares = [];
	}
};

$(document).ready(function(){

	//---------------------------------------
	/* Обработчики */
	//---------------------------------------

	/* Обработчик выпадающего описания технологий работы */

	$('.tile-dropdown > p:first-child').click(function(){
		var dropdownText = $(this).parents('.tile-dropdown').children('.dropdown-text');
		var dropdownCross = $(this).children('.cross-icon');
		if (dropdownText.css('display') == 'none') {
			dropdownText.slideDown();
			dropdownCross.css({'transform': 'rotate(45deg)'});
			$(this).toggleClass('selected');
		} else {
			dropdownText.slideUp();
			dropdownCross.css({'transform': 'rotate(0deg)'});
			$(this).toggleClass('selected');
		}
	});

	/* Обработчик скрытия всех drop-down меню */

	$(document).click(function(e) {
		var target = e.target;
		var dampers = $('.input-damper');
		var toHide = true;
		var options = $('.input-options');
		var carets = $('.input-caret');
		for (i = 0; i < dampers.length; i++) {
			if (target == dampers.get(i)) {
				toHide = false;
			}
		}
		if (toHide == true) {
			options.slideUp();
			carets.removeClass('upside');
		}
	});

	/* Обработчик добавления товара к заказу */

	$('.product form .submit input').click(function(e){
		e.preventDefault();
		var product = $(this).parents('.product');
		// var productId = product.attr('id');
		var quantity = product.find('.counter input').val();
		var damper = product.find('.damper');
		if (quantity == 0) {
			var qntError = product.find('.counter .qnt-error');
			var input = product.find('.counter input');
			qntError.fadeIn(150);
			input.css({'color':'#f18c8c'});
			setTimeout(function(){
				qntError.fadeOut(2000);
				input.css({'transition': 'all 2s'});
				input.css({'color': '#666'});
				input.on('transitionend', function(){
					input.css({'transition': 'none'});
				});
			}, 1500);
			return;
		}
		var name = product.find('h3.product-name').text();
		var color = product.find('.color-input input').val();
		var colorValue = product.find('.color-input input').css('color');
		var size = product.find('.size-input input').val();
		var sum = product.find('.sum div:last-child').text();
		postObject.wares.push({
			name: name,
			color: color,
			colorValue: colorValue,
			size: size,
			quantity: quantity,
			sum: sum
		});
		$('body').animate({
			scrollTop: ($(product).offset().top - 50)
		}, 200);
		damper.fadeIn(200);
	});

	/* Обработчик возврата к заказу товара */

	$('.damper button.cancel').click(function(){
		var name = $(this).parents('.product').find('h3.product-name').text();
		var confirmation = $('#send_tile .order-wrapper .row');
		$(this).parents('.damper').fadeOut(200);
		for (i = 0; i < postObject.wares.length; i++) {
			if (name == postObject.wares[i].name) {
				postObject.wares.splice(i, 1);
			}
		}
		// for (i = 0; i < postObject.wares.length; i++) {
		// 	var ware = postObject.wares[i];
		// 	confirmation.empty();
		// 	confirmation.append(orderedWare(ware.name, ware.quantity, ware.color, ware.colorValue, ware.size, ware.sum));
		// }
		// if (postObject.wares.length == 0) {
		// 	form.toggleClass('active');
		// 	confirmation.parent('.order-wrapper').toggleClass('active');
		// }
	});

	/* Обработчик перехода к подтверждению заказа */

	$('.confirm-order').click(function(e){
		e.preventDefault();
		var inputWidth = $('#send_tile input.name').width();
		$('body').animate({
			scrollTop: $('#send_tile h2').offset().top
		});
		$('#send_tile input.name').focus().animate({
			width: 0
		}, 300, function(){
			$(this).animate({
				width: (inputWidth + 12)
			});
		});
	});

	$('.product .ask-for-price').click(function(e){
		e.preventDefault();
		var inputWidth = $('#send_tile input.name').width();
		$('body').animate({
			scrollTop: $('#send_tile h2').offset().top
		});
		$('#send_tile input.name').focus().animate({
			width: 0
		}, 300, function(){
			$(this).animate({
				width: (inputWidth + 12)
			});
		});
	});

	/* Обработчик формы подтверждения заказа */

	$('#send_tile .submit').click(function(e){
		e.preventDefault();
		var form = $('#send_tile .wrapper');
		var confirmation = $('#send_tile .order-wrapper .row');
		var nameInput = form.find('#send_form .name');
		var numberInput = form.find('#send_form .number');
		var commentInput = form.find('#send_form .comment textarea');
		var confirmationError = form.find('.confirmation-error');
		if (nameInput.val() == '' || numberInput.val() == '') {
			confirmationError.slideDown(300, function(){
				setTimeout(function(){
					confirmationError.fadeOut(1000)
				}, 1000);
			});
			if (nameInput.val() == '') {
				nameInput.css({'transition': 'all 1s'})
					.css({'background-color': '#f18c8c'});
				nameInput.on('transitionend', function(){
					$(this).css({'background-color': '#eeeeee'})
						.css({'transition': 'none'});
				});
			}
			if (numberInput.val() == '') {
				numberInput.css({'transition': 'all 1s'})
					.css({'background-color': '#f18c8c'});
				numberInput.on('transitionend', function(){
					$(this).css({'background-color': '#eeeeee'})
						.css({'transition': 'none'});
				});
			}
			return;
		}
		// if (postObject.wares.length == 0) {
		confirmation.find('h2').html('Благодарим за обращение!<br>Наши специалисты свяжутся с Вами в ближайшее время');
		form.toggleClass('active');
		confirmation.parent('.order-wrapper').toggleClass('active');
		postObject.infos.name = nameInput.val();
		postObject.infos.phone = numberInput.val();
		if (commentInput.val()) {
			postObject.infos.comment = commentInput.val();	
		}
		send();
		$(this).unbind('click');
		$(this).click(function(e){
			e.preventDefault();
		});
		// 	return;
		// }
  /*	for (i = 0; i < postObject.wares.length; i++) {
			var ware = postObject.wares[i];
			if (i == 0) {
				confirmation.empty();
				confirmation.append('<h2>Вы заказали:</h2>');
			}
			confirmation.append(orderedWare(ware.name, ware.quantity, ware.color, ware.colorValue, ware.size, ware.sum));
		}
		confirmation.append($('<div></div>')
			.addClass('col-lg-3 col-md-4 col-sm-6 col-xs-12')
			.append($('<button>ВСЕ ВЕРНО</button>')
				.addClass('confirm-button')
				.click(function(){
					send();
					postObject.toInitial();
					$('.product .damper').fadeOut(300);
					form.html('<h2>Благодарим за обращение!<br>Наши специалисты свяжутся с Вами в ближайшее время.</h2>');
					form.toggleClass('active');
					confirmation.parent('.order-wrapper').toggleClass('active');
		// 		})));*/
		// form.toggleClass('active');
		// confirmation.parent('.order-wrapper').toggleClass('active');
		// postObject.infos.name = nameInput.val();
		// postObject.infos.phone = numberInput.val();
	});

	/* Раскрытие карты */

	$('#contacts-map .contacts .show-map, #contacts-map .contacts .show-map-href').click(function(e){
		e.preventDefault();
		$(this).parents('.contacts').toggleClass('slided');
	});

	/* Обработчик верхнего меню */

	$('.nav.navbar-nav li').click(function(){
		var title = $(this).text();
		var wantedTitleOffset = undefined;
		$('h2').each(function(i, el){
			if ($(this).attr('data-name') == title) {
				wantedTitleOffset = $(this).offset().top;
			}
		});
		$('body').animate({
			scrollTop: wantedTitleOffset - 50
		}, 700);
	});

	//---------------------------------------
	/* Создание объектов формы */
	//---------------------------------------

  var colors_1 = [
  	{
			name: 'Арктика (Россия)',
			palette: 'rgb(1, 47, 121)',
			image: 'images/arktika.png',
			price: 760,
			basis: 'Белый цемент'
		},
  	{
  		name: 'Зеленый мох (Россия)',
			palette: 'rgb(91, 103, 71)',
			image: 'images/mokh.png',
			price: 560,
			basis: 'Серый цемент'
		},
  	{
			name: 'Изумруд (Россия)',
			palette: 'rgb(7, 115, 108)',
			image: 'images/izumrud.png',
			price: 760,
			basis: 'Белый цемент'
		},
  	{
			name: 'Лимонад (Россия)',
			palette: 'rgb(236, 183, 4)',
			image: 'images/limonad.png',
			price: 730,
			basis: 'Белый цемент'
		},
  	{
			name: 'Гавана (Чехия)',
			palette: 'rgb(81, 62, 56)',
			image: 'images/gavana.png',
			price: 570,
			basis: 'Серый цемент'
		},
  	{
			name: 'Горчица (Россия)',
			palette: 'rgb(202, 158, 87)',
			image: 'images/gorchitsa.png',
			price: 480,
			basis: 'Серый цемент'
		},
  	{
			name: 'Жемчуг (Россия)',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchug.png',
			price: 755,
			basis: 'Белый цемент'
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 435,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Портвейн (Россия)',
  		palette: 'rgb(150, 84, 64)',
  		image: 'images/portvein.png',
  		price: 475,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Черри (Россия)',
  		palette: 'rgb(151, 63, 41)',
  		image: 'images/cherry.png',
  		price: 480,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Кокос (Россия)',
  		palette: 'rgb(113, 89, 72)',
  		image: 'images/kokos.png',
  		price: 480,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Венге (Россия)',
  		palette: 'rgb(92, 67, 47)',
  		image: 'images/venge.png',
  		price: 490,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Миндаль (Россия)',
  		palette: 'rgb(171, 149, 121)',
  		image: 'images/mindal.png',
  		price: 545,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ротанг (Чехия)',
  		palette: 'rgb(218, 161, 81)',
  		image: 'images/rotang.png',
  		price: 595,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ваниль (Россия)',
  		palette: 'rgb(224, 197, 113)',
  		image: 'images/vanil.png',
  		price: 675,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Малина (Чехия)',
  		palette: 'rgb(124, 62, 52)',
  		image: 'images/malina.png',
  		price: 710,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Куба (Чехия)',
  		palette: 'rgb(97, 53, 26)',
  		image: 'images/kuba.png',
  		price: 760,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Угольный (Чехия)',
  		palette: 'rgb(15, 19, 22)',
  		image: 'images/coal.png',
  		price: 775,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Мимоза (Чехия)',
  		palette: 'rgb(205, 152, 10)',
  		image: 'images/mimoza.png',
  		price: 785,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Осень (Чехия)',
  		palette: 'rgb(171, 74, 4)',
  		image: 'images/osen.png',
  		price: 785,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Винный (Чехия)',
  		palette: 'rgb(104, 58, 45)',
  		image: 'images/vinniy.png',
  		price: 520,
  		basis: 'Серый цемент'
  	}
  ];

  colors_1 = colors_1.sort(function(a, b) {
  	if (a.basis > b.basis) return -1;
  	if (a.basis < b.basis) return 1;
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

  var colors_2 = [
  	{
			name: 'Арктика (Россия)',
			palette: 'rgb(1, 47, 121)',
			image: 'images/arktika.png',
			price: 685,
			basis: 'Белый цемент'
		},
  	{
  		name: 'Зеленый мох (Россия)',
			palette: 'rgb(91, 103, 71)',
			image: 'images/mokh.png',
			price: 505,
			basis: 'Серый цемент'
		},
  	{
			name: 'Изумруд (Россия)',
			palette: 'rgb(7, 115, 108)',
			image: 'images/izumrud.png',
			price: 680,
			basis: 'Белый цемент'
		},
  	{
			name: 'Лимонад (Россия)',
			palette: 'rgb(236, 183, 4)',
			image: 'images/limonad.png',
			price: 665,
			basis: 'Белый цемент'
		},
  	{
			name: 'Гавана (Чехия)',
			palette: 'rgb(81, 62, 56)',
			image: 'images/gavana.png',
			price: 520,
			basis: 'Серый цемент'
		},
  	{
			name: 'Горчица (Россия)',
			palette: 'rgb(202, 158, 87)',
			image: 'images/gorchitsa.png',
			price: 440,
			basis: 'Серый цемент'
		},
  	{
			name: 'Жемчуг (Россия)',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchug.png',
			price: 685,
			basis: 'Белый цемент'
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 420,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Портвейн (Россия)',
  		palette: 'rgb(150, 84, 64)',
  		image: 'images/portvein.png',
  		price: 435,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Черри (Россия)',
  		palette: 'rgb(151, 63, 41)',
  		image: 'images/cherry.png',
  		price: 440,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Кокос (Россия)',
  		palette: 'rgb(113, 89, 72)',
  		image: 'images/kokos.png',
  		price: 440,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Венге (Россия)',
  		palette: 'rgb(92, 67, 47)',
  		image: 'images/venge.png',
  		price: 450,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Миндаль (Россия)',
  		palette: 'rgb(171, 149, 121)',
  		image: 'images/mindal.png',
  		price: 495,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ротанг (Чехия)',
  		palette: 'rgb(218, 161, 81)',
  		image: 'images/rotang.png',
  		price: 545,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ваниль (Россия)',
  		palette: 'rgb(224, 197, 113)',
  		image: 'images/vanil.png',
  		price: 610,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Малина (Чехия)',
  		palette: 'rgb(124, 62, 52)',
  		image: 'images/malina.png',
  		price: 640,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Куба (Чехия)',
  		palette: 'rgb(97, 53, 26)',
  		image: 'images/kuba.png',
  		price: 685,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Угольный (Чехия)',
  		palette: 'rgb(15, 19, 22)',
  		image: 'images/coal.png',
  		price: 700,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Мимоза (Чехия)',
  		palette: 'rgb(205, 152, 10)',
  		image: 'images/mimoza.png',
  		price: 710,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Осень (Чехия)',
  		palette: 'rgb(171, 74, 4)',
  		image: 'images/osen.png',
  		price: 710,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Винный (Чехия)',
  		palette: 'rgb(104, 58, 45)',
  		image: 'images/vinniy.png',
  		price: 480,
  		basis: 'Серый цемент'
  	}
  ];

  colors_2 = colors_2.sort(function(a, b) {
  	if (a.basis > b.basis) return -1;
  	if (a.basis < b.basis) return 1;
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

  var colors_3 = [
  	{
			name: 'Арктика (Россия)',
			palette: 'rgb(1, 47, 121)',
			image: 'images/arktika.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
  		name: 'Зеленый мох (Россия)',
			palette: 'rgb(91, 103, 71)',
			image: 'images/mokh.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Изумруд (Россия)',
			palette: 'rgb(7, 115, 108)',
			image: 'images/izumrud.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Вишня',
			palette: 'rgb(150, 100, 100)',
			image: 'images/vishnya.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Лимон',
			palette: 'rgb(215, 168, 73)',
			image: 'images/limon.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Апельсин',
			palette: 'rgb(211, 132, 70)',
			image: 'images/apelsin.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Гавана (Чехия)',
			palette: 'rgb(81, 62, 56)',
			image: 'images/gavana.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Каштан',
			palette: 'rgb(143, 119, 108)',
			image: 'images/kashtan.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Горчица (Россия)',
			palette: 'rgb(202, 158, 87)',
			image: 'images/gorchitsa.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Сурик',
			palette: 'rgb(151, 84, 67)',
			image: 'images/surik.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Жемчужина',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchug.png',
			price: null,
			basis: 'Стандарт'
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: null,
  		basis: 'Стандарт'
  	}
  ];

  var colors_4 = [
  	{
  		name: 'Зеленый мох (Россия)',
			palette: 'rgb(91, 103, 71)',
			image: 'images/mokh.png',
			price: 45,
  		basis: 'Серый цемент'
		},
  	{
			name: 'Гавана (Чехия)',
			palette: 'rgb(81, 62, 56)',
			image: 'images/gavana.png',
			price: 45,
  		basis: 'Серый цемент'
		},
  	{
			name: 'Горчица (Россия)',
			palette: 'rgb(202, 158, 87)',
			image: 'images/gorchitsa.png',
			price: 40,
  		basis: 'Серый цемент'
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 40,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Портвейн (Россия)',
  		palette: 'rgb(150, 84, 64)',
  		image: 'images/portvein.png',
  		price: 40,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Черри (Россия)',
  		palette: 'rgb(151, 63, 41)',
  		image: 'images/cherry.png',
  		price: 40,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Кокос (Россия)',
  		palette: 'rgb(113, 89, 72)',
  		image: 'images/kokos.png',
  		price: 40,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Венге (Россия)',
  		palette: 'rgb(92, 67, 47)',
  		image: 'images/venge.png',
  		price: 40,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Миндаль (Россия)',
  		palette: 'rgb(171, 149, 121)',
  		image: 'images/mindal.png',
  		price: 45,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Винный (Чехия)',
  		palette: 'rgb(104, 58, 45)',
  		image: 'images/vinniy.png',
  		price: 45,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ротанг (Чехия)',
  		palette: 'rgb(218, 161, 81)',
  		image: 'images/rotang.png',
  		price: 50,
  		basis: 'Серый цемент'
  	}
  ];

  colors_4 = colors_4.sort(function(a, b) {
  	if (a.basis > b.basis) return -1;
  	if (a.basis < b.basis) return 1;
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

  var colors_5 = [
  	{
			name: 'Арктика (Россия)',
			palette: 'rgb(1, 47, 121)',
			image: 'images/arktika.png',
			price: 645,
			basis: 'Белый цемент'
		},
  	{
  		name: 'Зеленый мох (Россия)',
			palette: 'rgb(91, 103, 71)',
			image: 'images/mokh.png',
			price: 480,
			basis: 'Серый цемент'
		},
  	{
			name: 'Изумруд (Россия)',
			palette: 'rgb(7, 115, 108)',
			image: 'images/izumrud.png',
			price: 645,
			basis: 'Белый цемент'
		},
  	{
			name: 'Лимонад (Россия)',
			palette: 'rgb(236, 183, 4)',
			image: 'images/limonad.png',
			price: 625,
			basis: 'Белый цемент'
		},
  	{
			name: 'Гавана (Чехия)',
			palette: 'rgb(81, 62, 56)',
			image: 'images/gavana.png',
			price: 490,
			basis: 'Серый цемент'
		},
  	{
			name: 'Горчица (Россия)',
			palette: 'rgb(202, 158, 87)',
			image: 'images/gorchitsa.png',
			price: 420,
			basis: 'Серый цемент'
		},
  	{
			name: 'Жемчуг (Россия)',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchug.png',
			price: 640,
			basis: 'Белый цемент'
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 395,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Портвейн (Россия)',
  		palette: 'rgb(150, 84, 64)',
  		image: 'images/portvein.png',
  		price: 410,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Черри (Россия)',
  		palette: 'rgb(151, 63, 41)',
  		image: 'images/cherry.png',
  		price: 420,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Кокос (Россия)',
  		palette: 'rgb(113, 89, 72)',
  		image: 'images/kokos.png',
  		price: 420,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Венге (Россия)',
  		palette: 'rgb(92, 67, 47)',
  		image: 'images/venge.png',
  		price: 420,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Миндаль (Россия)',
  		palette: 'rgb(171, 149, 121)',
  		image: 'images/mindal.png',
  		price: 480,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ротанг (Чехия)',
  		palette: 'rgb(218, 161, 81)',
  		image: 'images/rotang.png',
  		price: 515,
  		basis: 'Серый цемент'
  	},
  	{
  		name: 'Ваниль (Россия)',
  		palette: 'rgb(224, 197, 113)',
  		image: 'images/vanil.png',
  		price: 575,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Малина (Чехия)',
  		palette: 'rgb(124, 62, 52)',
  		image: 'images/malina.png',
  		price: 610,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Куба (Чехия)',
  		palette: 'rgb(97, 53, 26)',
  		image: 'images/kuba.png',
  		price: 645,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Угольный (Чехия)',
  		palette: 'rgb(15, 19, 22)',
  		image: 'images/coal.png',
  		price: 656,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Мимоза (Чехия)',
  		palette: 'rgb(205, 152, 10)',
  		image: 'images/mimoza.png',
  		price: 665,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Осень (Чехия)',
  		palette: 'rgb(171, 74, 4)',
  		image: 'images/osen.png',
  		price: 665,
  		basis: 'Белый цемент'
  	},
  	{
  		name: 'Винный (Чехия)',
  		palette: 'rgb(104, 58, 45)',
  		image: 'images/vinniy.png',
  		price: 450,
  		basis: 'Серый цемент'
  	}
  ];

  colors_5 = colors_5.sort(function(a, b) {
  	if (a.basis > b.basis) return -1;
  	if (a.basis < b.basis) return 1;
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

	var tile_1_ColorInput = new ColorOptions(
		colors_1, 
		$('#tile1 .color-input'), 
		$('#tile1 .price-for-one'), 
		$('#tile1 .counter'), 
		$('#tile1 .sum'));
	var tile_1_SizeInput = new SizeOptions(
		['200x100x70мм'], 
		$('#tile1 .size-input'));
	var tile_1_Counter = new Counter(
		$('#tile1 .counter'), 
		$('#tile1 .price-for-one'), 
		$('#tile1 .sum'));

	var tile_2_ColorInput = new ColorOptions(
		colors_2, 
		$('#tile2 .color-input'), 
		$('#tile2 .price-for-one'), 
		$('#tile2 .counter'),
		$('#tile2 .sum'));
	var tile_2_SizeInput = new SizeOptions(
		['Состоит из 4-х элементов'], 
		$('#tile2 .size-input'));
	var tile_2_Counter = new Counter(
		$('#tile2 .counter'), 
		$('#tile2 .price-for-one'), 
		$('#tile2 .sum'));

	var tile_3_ColorInput = new ColorOptions(
		colors_3, 
		$('#tile3 .color-input'), 
		$('#tile3 .price-for-one'),
		$('#tile3 .counter'),
		$('#tile3 .sum'));
	var tile_3_SizeInput = new SizeOptions(
		['Цена по запросу'], 
		$('#tile3 .size-input'));
	var tile_3_Counter = new Counter(
		$('#tile3 .counter'), 
		$('#tile3 .price-for-one'), 
		$('#tile3 .sum'));

	var tile_4_ColorInput = new ColorOptions(
		colors_4, 
		$('#tile4 .color-input'), 
		$('#tile4 .price-for-one'),
		$('#tile4 .counter'),
		$('#tile4 .sum'));
	var tile_4_SizeInput = new SizeOptions(
		['500х200х80 мм'], 
		$('#tile4 .size-input'));
	var tile_4_Counter = new Counter(
		$('#tile4 .counter'), 
		$('#tile4 .price-for-one'), 
		$('#tile4 .sum'));

	var tile_5_ColorInput = new ColorOptions(
		colors_5, 
		$('#tile5 .color-input'), 
		$('#tile5 .price-for-one'),
		$('#tile5 .counter'),
		$('#tile5 .sum'));
	var tile_5_SizeInput = new SizeOptions(
		['500х200х80 мм'], 
		$('#tile5 .size-input'));
	var tile_5_Counter = new Counter(
		$('#tile5 .counter'), 
		$('#tile5 .price-for-one'), 
		$('#tile5 .sum'));

	//---------------------------------------
	/* Задание формата полям формы */
	//---------------------------------------

	$('#send_form input.number').mask("+7 (999) 999-99-99");

	$('#tile_header').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		fade: true,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
		]
	});

	$('.right-column').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		fade: true,
		cssEase: 'linear'
	});

	/* Kitten hey */

	// setTimeout(function() {
	// 	$('#kitten_hey').addClass('hey');
	// }, 10000);

});
//---------------------------------------
/* JS-Верстка */
//---------------------------------------

$(window).on('load resize', function() {
	var height;
	if ($(window).width() >= 1200) {
		height = $('.product').height();
	} else if ($(window).width() >= 900) {
		height = Math.round($('.product').height() / 1.5);
	} else if ($(window).width() >= 768) {
		height = Math.round($('.product').height() / 1.5);
	} else if ($(window).width() >= 550) {
		height = Math.round($('.product').height() / 1.5);
	} else if ($(window).width() >= 450) {
		height = Math.round($('.product').height() / 1.5);
	} else {
		height = Math.round($('.product').height() / 1.35);
	}
	$('.product .unique-wrapper, .product .ukladka-wrapper').height(height);
	$('.product .unique-header').css({'margin-top': Math.round(height / 4)});
	if ($(window).width() <= 508) {
		$('.product .unique-header').css({'margin-top': Math.round(height / 5.5)});
	}

	if ($(window).width() > 767) {
		$('div.comment').width(
			$('input.name').outerWidth(true) +
			$('input.number').outerWidth(true) +
			$('input.submit').outerWidth() + 8
		);	
	}
});

//---------------------------------------
/* Обработчики */
//---------------------------------------

$(window).scroll(function(){
	if($('body').scrollLeft() > 0) {
		$('body').scrollLeft(0);
	}
});

// if ($('.description'))
$('.description').each(function(elem, index) {
	if ($(this).height() >= $(this).find('p').height()) {
		$(this).next('.more-about').css({ display: 'none' });
	}
});
$('.more-about').click(function() {
	if ($(this).prev('.description').hasClass('unfolded')) {
		$(this).html('Подробнее...');
	} else {
		$(this).html('Свернуть');
	}
	$(this).prev('.description').toggleClass('unfolded');
});


//---------------------------------------
/* Инициализация гугл карт */
//---------------------------------------

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('google_map'), {
      center: {lat: 55.445880, lng: 37.981980},
      zoom: 15
    });
    var marker = new google.maps.Marker({
			position: {lat: 55.445880, lng: 37.981980},
			map: map
		});
}