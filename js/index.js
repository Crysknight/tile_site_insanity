/* Конструктор поля выбора цвета */

function ColorOptions(colors, colorInput, priceForOne, counter, sum) {
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
				continue;
			}
			onlyIteration = false;
			this.options.append($('<div></div>')
				.addClass('input-option')
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
					newColors.push(this.colors[i]);
				}
			}
			for (let i = 0; i < this.colors.length; i++) {
				if (this.colors[i].name === colorName) {
					continue;
				}
				newColors.push(this.colors[i]);
			}
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

	$('.damper button').click(function(){
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
			name: 'Арктика',
			palette: 'rgb(100, 141, 159)',
			image: 'images/arktika.png',
			price: 720
		},
  	{
  		name: 'Зеленый мох',
			palette: 'rgb(58, 78, 79)',
			image: 'images/mokh.png',
			price: 530
		},
  	{
			name: 'Изумруд',
			palette: 'rgb(132, 180, 157)',
			image: 'images/izumrud.png',
			price: 720
		},
  	{
			name: 'Вишня',
			palette: 'rgb(150, 100, 100)',
			image: 'images/vishnya.png',
			price: 700
		},
  	{
			name: 'Лимон',
			palette: 'rgb(215, 168, 73)',
			image: 'images/limon.png',
			price: 690
		},
  	{
			name: 'Апельсин',
			palette: 'rgb(211, 132, 70)',
			image: 'images/apelsin.png',
			price: 690
		},
  	{
			name: 'Гавана',
			palette: 'rgb(116, 102, 92)',
			image: 'images/gavana.png',
			price: 480
		},
  	{
			name: 'Каштан',
			palette: 'rgb(143, 119, 108)',
			image: 'images/kashtan.png',
			price: 480
		},
  	{
			name: 'Горчица',
			palette: 'rgb(213, 178, 105)',
			image: 'images/gorchitsa.png',
			price: 500
		},
  	{
			name: 'Сурик',
			palette: 'rgb(151, 84, 67)',
			image: 'images/surik.png',
			price: 450
		},
  	{
			name: 'Жемчужина',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchuzhina.png',
			price: 690
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 430
  	}
  ];

  colors_1 = colors_1.sort(function(a, b) {
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

  var colors_2 = [
  	{
			name: 'Арктика',
			palette: 'rgb(100, 141, 159)',
			image: 'images/arktika.png',
			price: 770
		},
  	{
  		name: 'Зеленый мох',
			palette: 'rgb(58, 78, 79)',
			image: 'images/mokh.png',
			price: 580
		},
  	{
			name: 'Изумруд',
			palette: 'rgb(132, 180, 157)',
			image: 'images/izumrud.png',
			price: 780
		},
  	{
			name: 'Вишня',
			palette: 'rgb(150, 100, 100)',
			image: 'images/vishnya.png',
			price: 750
		},
  	{
			name: 'Лимон',
			palette: 'rgb(215, 168, 73)',
			image: 'images/limon.png',
			price: 750
		},
  	{
			name: 'Апельсин',
			palette: 'rgb(211, 132, 70)',
			image: 'images/apelsin.png',
			price: 760
		},
  	{
			name: 'Гавана',
			palette: 'rgb(116, 102, 92)',
			image: 'images/gavana.png',
			price: 530
		},
  	{
			name: 'Каштан',
			palette: 'rgb(143, 119, 108)',
			image: 'images/kashtan.png',
			price: 530
		},
  	{
			name: 'Горчица',
			palette: 'rgb(213, 178, 105)',
			image: 'images/gorchitsa.png',
			price: 550
		},
  	{
			name: 'Сурик',
			palette: 'rgb(151, 84, 67)',
			image: 'images/surik.png',
			price: 500
		},
  	{
			name: 'Жемчужина',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchuzhina.png',
			price: 750
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 440
  	}
  ];

  colors_2 = colors_2.sort(function(a, b) {
  	if (a.price > b.price) return 1;
  	if (a.price < b.price) return -1;
  });

  var colors_3 = [
  	{
			name: 'Арктика',
			palette: 'rgb(100, 141, 159)',
			image: 'images/arktika.png',
			price: null
		},
  	{
  		name: 'Зеленый мох',
			palette: 'rgb(58, 78, 79)',
			image: 'images/mokh.png',
			price: null
		},
  	{
			name: 'Изумруд',
			palette: 'rgb(132, 180, 157)',
			image: 'images/izumrud.png',
			price: null
		},
  	{
			name: 'Вишня',
			palette: 'rgb(150, 100, 100)',
			image: 'images/vishnya.png',
			price: null
		},
  	{
			name: 'Лимон',
			palette: 'rgb(215, 168, 73)',
			image: 'images/limon.png',
			price: null
		},
  	{
			name: 'Апельсин',
			palette: 'rgb(211, 132, 70)',
			image: 'images/apelsin.png',
			price: null
		},
  	{
			name: 'Гавана',
			palette: 'rgb(116, 102, 92)',
			image: 'images/gavana.png',
			price: null
		},
  	{
			name: 'Каштан',
			palette: 'rgb(143, 119, 108)',
			image: 'images/kashtan.png',
			price: null
		},
  	{
			name: 'Горчица',
			palette: 'rgb(213, 178, 105)',
			image: 'images/gorchitsa.png',
			price: null
		},
  	{
			name: 'Сурик',
			palette: 'rgb(151, 84, 67)',
			image: 'images/surik.png',
			price: null
		},
  	{
			name: 'Жемчужина',
			palette: 'rgb(99, 99, 99)',
			image: 'images/zhemchuzhina.png',
			price: null
		},
  	{
			name: 'Графит',
  		palette: 'rgb(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: null
  	}
  ];

  var colors_4 = [
  	{
  		name: 'Графит',
  		palette: 'rbg(55, 55, 55)',
  		image: 'images/grafit.png',
  		price: 60
  	}
  ];

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
});

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