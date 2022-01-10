const gellaryItems = document.querySelector('[data-gellaryItems]');
const popups = document.querySelector('[data-popups]');
const singlePhoto = document.querySelector('[data-singlePhoto]');
const popupItems = document.querySelector('[data-popupItems]');
const krn = 'krn';
const gellary = {
	a: ['a-0.jpg', 'a-1.jpg', 'a-2.jpg', 'a-3.jpg'],
	b: ['b-0.jpg', 'b-1.jpg', 'b-2.jpg', 'b-3.jpg'],
	c: ['c-0.jpg', 'c-1.jpg', 'c-2.jpg', 'c-3.jpg'],
	d: ['d-0.jpg', 'd-1.jpg', 'd-2.jpg', 'd-3.jpg'],
	e: ['e-0.jpg', 'e-1.jpg', 'e-2.jpg', 'e-3.jpg'],
	f: ['f-0.jpg', 'f-1.jpg', 'f-2.jpg', 'f-3.jpg'],
	g: ['g-0.jpg', 'g-1.jpg', 'g-2.jpg', 'g-3.jpg'],
	h: ['h-0.jpg', 'h-1.jpg', 'h-2.jpg', 'h-3.jpg'],
	i: ['i-0.jpg', 'i-1.jpg', 'i-2.jpg', 'i-3.jpg'],
	j: ['j-0.jpg', 'j-1.jpg', 'j-2.jpg', 'j-3.jpg'],
};

/**
 *
 * @param {string} obj
 * @returns
 */
function getThamnilImg(obj, key = null, ckey = null) {
	let img = {};
	if (key == null) {
		for (let val in obj) {
			img[val] = obj[val][0];
		}
	} else if (!Number.isInteger(Number(key)) && ckey == null) {
		obj = obj[key];
		for (let val in obj) {
			if (val == 0) continue;
			img[val] = obj[val];
		}
	} else if (Number.isInteger(Number(key)) && ckey != null) {
		img[ckey] = obj[ckey][Number(key)];
	} else {
		return false;
	}

	return img;
}

function creatThamnile(imgs) {
	let el = '';
	for (let kye in imgs) {
		el += `
		<div class="gellary-item">
			<img data-img = '${kye}' onclick = 'handelClick(event)' src="img/${imgs[kye]}" alt="" />
		</div>`;
	}
	return el;
}

function handelClick(e, key = null) {
	const imgKey = e.target.dataset.img;
	const el = creatPopup(getThamnilImg(gellary, imgKey, key), imgKey);
	if (el) {
		popups.innerHTML += el;
	} else {
		showSinglePhoto(e);
	}

	const popCon = document.querySelector(`[data-popupContainer = ${krn}${imgKey}]`);
	popCon.style.display = 'flex';
	setTimeout(() => {
		popCon.classList.add('animat');
	});
}

function creatPopup(imgs, key) {
	if (!imgs) return false;
	let el = `
		<div class="popup-container" data-popupContainer = '${krn}${key}' >
			<div class="popup-items" data-popupItems='${key}'>`;
	for (let img in imgs) {
		el += `
			<div class="popup-item">
				<img data-img= ${img} onclick = "handelClick(event,'${key}')" src="img/${imgs[img]}" alt="" />
			</div>	
		`;
	}
	el += `<span class="close" data-colse='${key}' onclick = ' closePopup(event)'>&cross;</span> 
		</div>
	</div>`;
	return el;
}

function showSinglePhoto(img) {
	const imgEl = img.target;
	singlePhoto.querySelector('img').src = imgEl.src;
	singlePhoto.style.display = 'flex';
	setTimeout(() => {
		singlePhoto.style.opacity = '1';
	});
}
function closeSingelPopup(e) {
	singlePhoto.style.opacity = '0';
	setTimeout(() => {
		singlePhoto.style.display = 'none';
	}, 400);
}

function closePopup(e) {
	const closeEl = e.target;
	const closeElKey = e.target.dataset.colse;
	closeEl.closest(`[data-popupContainer=${krn}${closeElKey}]`).classList.remove('animat');
	setTimeout(() => {
		closeEl.closest(`[data-popupContainer=${krn}${closeElKey}]`).remove();
	}, 500);
}

gellaryItems.innerHTML = creatThamnile(getThamnilImg(gellary));
