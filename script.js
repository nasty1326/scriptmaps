const $leftLinks = document.querySelectorAll('.left-menu a'), // элементы левого меню
			$mapLinks = document.querySelectorAll('.map a'), //все элементы карты
			$info = document.querySelector('.info'); // текст пояснения

const requestData = (id = 1) => {
	fetch('data.json')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		var count = Object.keys(data[id-1].info).length;
		console.log(count);
		$info.innerHTML = `
			<h2>${data[id - 1].district}</h2>
		`
		var step;
		for (step=0;step<count;step++){
			$info.innerHTML = $info.innerHTML+`		
			<img src="${data[id - 1]['info'][step]}"  > 
		`
		}
	});
};

requestData();



$mapLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let color = self.dataset.color;
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);

	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let id = parseInt(currentElement.dataset.id);
		requestData(id);
	});
});