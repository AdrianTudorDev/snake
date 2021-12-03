document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div')
	const scoreDyisplay = document.querySelector('span')
	const startBtn = document.querySelector('.start')

	const width = Math.sqrt(squares.length)
	let currentIndex = 0 //first div in our grid
	let appleIndex = 0 //first div in our grid
	let currentSnake = [2, 1, 0]// the div in our grid being 2 is head and 0 being tail the rest is body
	let direction = 1
	let score = 0
	let speed = 0.95
	let intervalTime = 0
	let interval = 0

	// start the game

	function startGame(){
		currentSnake.forEach(index => squares[index].classList.remove('snake'))
		squares[appleIndex].classList.remove('apple')
		clearInterval(interval)
		score = 0
		randomApple()
		direction = 1
		scoreDyisplay.innerText = score
		intervalTime = 800
		currentSnake = [2, 1, 0]
		currentIndex = 0
		currentSnake.forEach(index => squares[index].classList.add('snake'))
		interval = setInterval(moveOutcomes, intervalTime)
	}

	//outcomes hitting walls
	function moveOutcomes(){
		if(
			((currentSnake[0] + width >= width * width) && (direction === width))|| // snake hit bottom wall
			((currentSnake[0] % width === width - 1) && (direction === 1))|| // snake hit left wall
			((currentSnake[0] % width === 0) && (direction === -1))|| // snake hit right wall
			((currentSnake[0] - width <0) && (direction === -width))|| // snake hit top wall
			(squares[currentSnake[0] + direction].classList.contains('snake'))// snake hit itself
		){
			alert('You lose!')
			location.reload()	
			return clearInterval(interval)	
		}

		const tail = currentSnake.pop()//remove last item of the array and shows it
		squares[tail].classList.remove('snake')
		currentSnake.unshift(currentSnake[currentIndex] + direction)

		if(squares[currentSnake[currentIndex]].classList.contains('apple')){
			squares[currentSnake[currentIndex]].classList.remove('apple')
			squares[tail].classList.add('snake')
			currentSnake.push(tail)
			randomApple()
			score++
			scoreDyisplay.textContent = score
			clearInterval(interval)
			intervalTime = intervalTime * speed
			interval = setInterval(moveOutcomes, intervalTime)
		}
		squares[currentSnake[0]].classList.add('snake')
	}

	// random apple
	function randomApple(){
		do{
			appleIndex = Math.floor(Math.random() * squares.length)
		} while(squares[appleIndex].classList.contains('snake'))
		squares[appleIndex].classList.add('apple')
	}

	// assing the keyboard on snake
	function control(e) {
		squares[currentIndex].classList.remove('snake')

		if(e.keyCode === 39 && direction !== -1) {direction = 1}
		else if(e.keyCode === 38 && direction !== +width) {direction = -width}
		else if(e.keyCode === 37 && direction !== +1) {direction = -1}
		else if(e.keyCode === 40 && direction !== -width) {direction = +width}
	}

	document.addEventListener('keyup', control)
	startBtn.addEventListener('click', startGame)
})