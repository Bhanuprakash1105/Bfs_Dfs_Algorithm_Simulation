var canvas = document.getElementById('frameCanvas');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.9;

var c = canvas.getContext('2d');

var operationsTab = document.getElementById("operations");
operationsTab.style.width = "15vw";
var myButtons = document.getElementsByClassName("myButtons");
for(let i = 0; i < myButtons.length; ++i)
{
	myButtons[i].style['font-size'] = "3vh";
	myButtons[i].style['padding'] = "1vh";
}

function drawCircles(c, radius) {
	var diameter = 2 * radius;
	var rows = Math.floor(canvas.height / diameter);
	var cols = Math.floor(canvas.width / diameter);
	var arr = new Array(rows);
	var x = 0, y = 0;
	for(let i = 0; i < rows; ++i)
	{
		arr[i] = new Array(cols);
		x = 0
		for(let j = 0; j < cols; ++j)
		{
			arr[i][j] = [x + radius, y + radius];
			c.beginPath();
			// c.strokeStyle = "rgb(255, 128, 0)";
			c.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
			c.fillStyle = "white";
			c.fill();
			c.stroke();
			x += diameter;
		}
		y += diameter;
	}
	return arr;
}

var radius = 10;
var arr_circles = drawCircles(c, radius);
var loc = [-1, -1, -1, -1];
var ind = [-1, -1, -1, -1];
var count = 1;
var removeColor = false;

function canvasResize()
{
	canvas = null;
	canvas = document.getElementById('frameCanvas');
	canvas.width = window.innerWidth * 0.75;
	canvas.height = window.innerHeight * 0.9;
	arr_circles = drawCircles(c, radius);
	loc = [-1, -1, -1, -1];
	ind = [-1, -1, -1, -1];
	count = 1;
	if(removeColor == true)
	{
		for(let i = 0; i < arr_circles.length; ++i)
		{
			for(let j = 0; j < arr_circles[i].length; ++j)
			{
				colorCircle(arr_circles[i][j][0], arr_circles[i][j][1], "white");
			}
		}
		removeColor = false;
	}
};

function clickedCircle(x, y) {
	let ret1 = -1, ret2 = -1; 
	for(let i = 0; i < arr_circles.length; ++i)
	{
		for(let j = 0; j < arr_circles[i].length; ++j)
		{
			let a = arr_circles[i][j][0];
			let b = arr_circles[i][j][1];
			let dist = Math.sqrt((x - a)*(x - a) + (y - b)*(y - b));
			if(dist <= radius) { ret1 = a; ret2 = b; return [ret1, ret2, i, j]; }
		}
	}
	return [-1, -1, -1, -1];
}

function colorCircle(x, y, colorStr) {
	c.beginPath();
	// c.strokeStyle = "rgb(255, 128, 0)";
	c.arc(x, y, radius, 0, Math.PI * 2);
	c.fillStyle = colorStr;
	c.fill();
	c.stroke();
}

function surrBfs(i, j, queue, ind, visited) {
	let arri = [i + 1, i, i - 1];
	let arrj = [j + 1, j, j - 1];
	for(let x = 0; x < 3; ++x)
	{
		for(let y = 0; y < 3; ++y)
		{
			if(arri[x] == i && arrj[y] == j) { continue; }
			if(arri[x] < 0 || arrj[y] < 0 || arri[x] >= arr_circles.length || arrj[y] >= arr_circles[arri[x]].length)
			{
				continue;
			}
			if(visited[arri[x]][arrj[y]] == true) { continue; }
			if(arri[x] == ind[2] && arrj[y] == ind[3]) {
				colorCircle(arr_circles[arri[x]][arrj[y]][0], arr_circles[arri[x]][arrj[y]][1], "rgb(204, 0, 255)");
				alert("Finished");
				removeColor = true;
				return;
			}
			queue.push([arri[x], arrj[y]]);
			colorCircle(arr_circles[arri[x]][arrj[y]][0], arr_circles[arri[x]][arrj[y]][1], "rgb(255, 128, 0)");
		}
	}
	return queue;
}

function goBfs() {
	if(removeColor == true)
	{
		loc = [-1, -1, -1, -1];
		ind = [-1, -1, -1, -1];
		count = 1;
		for(let i = 0; i < arr_circles.length; ++i)
		{
			for(let j = 0; j < arr_circles[i].length; ++j)
			{
				colorCircle(arr_circles[i][j][0], arr_circles[i][j][1], "white");
			}
		}
		removeColor = false;
	}
	for(let i = 0; i < 4; ++i)
	{
		if(ind[i] == -1) { alert("Error: Select two points"); return; }
	}
	let i = ind[0];
	let j = ind[1];
	let visited = new Array(arr_circles.length);
	for(let x = 0; x < visited.length; ++x)
	{
		visited[x] = new Array(arr_circles[x].length);
		for(let y = 0; y < visited[x].length; ++y)
		{
			visited[x][y] = false;
		}
	}
	var queue = [];
	queue.push([i, j]);
	while(queue.length != 0)
	{
		var curr = queue.shift();
		if(curr[0] == ind[2] && curr[1] == ind[3]) {
			colorCircle(arr_circles[curr[0]][curr[1]][0], arr_circles[curr[0]][curr[1]][1], "rgb(204, 0, 255)");
			alert("Finished");
			removeColor = true;
			return;
		}
		if(visited[curr[0]][curr[1]] == true) { continue; }
		visited[curr[0]][curr[1]] = true;
		queue = surrBfs(curr[0], curr[1], queue, ind, visited);
	}
}

function goDfs() {
	if(removeColor == true)
	{
		loc = [-1, -1, -1, -1];
		ind = [-1, -1, -1, -1];
		count = 1;
		for(let i = 0; i < arr_circles.length; ++i)
		{
			for(let j = 0; j < arr_circles[i].length; ++j)
			{
				colorCircle(arr_circles[i][j][0], arr_circles[i][j][1], "white");
			}
		}
		removeColor = false;
	}
	for(let i = 0; i < 4; ++i)
	{
		if(ind[i] == -1) { alert("Error: Select two points"); return; }
	}
	let visited2 = new Array(arr_circles.length);
	for(let x = 0; x < arr_circles.length; ++x)
	{
		visited2[x] = new Array(arr_circles[x].length);
		for(let y = 0; y < arr_circles[x].length; ++y)
		{
			visited2[x][y] = false;
		}
	}
	var i = ind[0], j = ind[1];
	var stack = []
	stack.push([i, j]);
	while(stack.length != 0)
	{
		var curr = stack.pop();
		if(curr[0] == ind[2] && curr[1] == ind[3]) {
			colorCircle(arr_circles[ind[0]][ind[1]][0], arr_circles[ind[0]][ind[1]][1], "rgb(0, 204, 255)");
			colorCircle(arr_circles[curr[0]][curr[1]][0], arr_circles[curr[0]][curr[1]][1], "rgb(204, 0, 255)");
			alert("Finished");
			removeColor = true;
			break;
		}
		visited2[curr[0]][curr[1]] = true;
		colorCircle(arr_circles[curr[0]][curr[1]][0], arr_circles[curr[0]][curr[1]][1], "rgb(255, 128, 0)");
		i = curr[0];
		j = curr[1];
		let arri = [i + 1, i, i - 1];
		let arrj = [j + 1, j, j - 1];
		for(let x = 0; x < 3; ++x)
		{
			for(let y = 0; y < 3; ++y)
			{
				if(arri[x] < 0 || arrj[y] < 0 || arri[x] >= arr_circles.length || arrj[y] >= arr_circles[arri[x]].length)
				{
					continue;
				}
				if(visited2[arri[x]][arrj[y]] != true) { stack.push([arri[x], arrj[y]]); }
			}
		}
	}
}

canvas.addEventListener('click', (event) => {
	if(removeColor == true)
	{
		loc = [-1, -1, -1, -1];
		ind = [-1, -1, -1, -1];
		count = 1;
		for(let i = 0; i < arr_circles.length; ++i)
		{
			for(let j = 0; j < arr_circles[i].length; ++j)
			{
				colorCircle(arr_circles[i][j][0], arr_circles[i][j][1], "white");
			}
		}
		removeColor = false;
	}
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	let ans = clickedCircle(x, y);
	if(ans[0] != -1 && ans[1] != -1) { 
		let colorStr = "";
		if(count % 2 == 0) {
			colorStr = "red";
			if(loc[2] != -1 && loc[3] != -1)
			{
				colorCircle(loc[2], loc[3], "white");
			}
			loc[2] = ans[0]; loc[3] = ans[1];
			ind[2] = ans[2]; ind[3] = ans[3];
		}
		else {
			colorStr = "rgb(0, 204, 255)";
			if(loc[0] != -1 && loc[1] != -1)
			{
				colorCircle(loc[0], loc[1], "white");
			}
			loc[0] = ans[0]; loc[1] = ans[1];
			ind[0] = ans[2]; ind[1] = ans[3];
		}
		colorCircle(ans[0], ans[1], colorStr);
		count++;
	}
});