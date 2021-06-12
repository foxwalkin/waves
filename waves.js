var initialize = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var fps = 60;
	var num_p = 5;
	var speed = 5;
	var fadeSpeed = 3;

	var t = new Array();
	var p = new Array();

	for (i=0;i<num_p;i++) {
		p[i] = new Array();
		p[i].x = Math.random() * canvas.width;
		p[i].y = Math.random() * canvas.height;
		p[i].a = Math.random() * (Math.PI*2);
	}

	var drawFrame = function() {
		context.beginPath();
		context.strokeStyle = "#0feDb7";
		context.clearRect(0, 0, canvas.width, canvas.height);
		dat = new Array();
		for (i=0;i<p.length;i++) {
			if (i==0) context.moveTo(p[i].x,p[i].y);
			else context.lineTo(p[i].x,p[i].y);
			var speedx = Math.cos(p[i].a)*speed; 
			var speedy = Math.sin(p[i].a)*speed;
			if (p[i].x + speedx >= canvas.width || p[i].x + speedx <= 0) { var mod = 0; var hitWall = true; }
			if (p[i].y + speedy >= canvas.height || p[i].y + speedy <= 0) { var mod = Math.PI; var hitWall = true; }
				if (hitWall) {
					p[i].a = ((p[i].a + Math.PI) - (p[i].a * 2)) + mod;
					if (p[i].a > Math.PI*2 ) p[i].a -= Math.PI*2;
					else if (p[i].a < 0) p[i].a += Math.PI*2;
					var speedx = Math.cos(p[i].a)*speed; 
					var speedy = Math.sin(p[i].a)*speed;
					hitWall = false;
				}
			p[i].x += speedx;
			p[i].y += speedy;
			dat.push(p[i].x,p[i].y);
		}
		dat.push(100);
		t.push(dat);
		context.closePath();
		context.stroke();
		for (i=0;i<t.length;i++) {
			var alpha = t[i][num_p*2];
			if (alpha <= 0) t.splice(i,1);
			context.beginPath();
			context.strokeStyle = "rgba(15,237,183," + alpha / 100 + ")";
			for (j=0;j<num_p*2;j+=2) {
				if (j==0) context.moveTo(t[i][j],t[i][j+1]);
				else context.lineTo(t[i][j],t[i][j+1]);
			}
			context.closePath();
			context.stroke();
			t[i][num_p*2] -= fadeSpeed;
		}
	}

	setInterval(function() { drawFrame() }, 1000 / fps)
}
