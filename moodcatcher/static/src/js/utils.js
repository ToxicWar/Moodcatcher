function squarifyImage(image, forceSize) {
	var canvas = document.createElement("canvas");
	var whmin = Math.min(image.width, image.height);
	var size = forceSize || whmin;
	var scale = size / whmin;
	canvas.width = canvas.height = size;
	
	var rc = canvas.getContext("2d");
	rc.drawImage(
		image,
		-(image.width*scale-size)/2, -(image.height*scale-size)/2,
		image.width*scale, image.height*scale);
	
	return canvas;
}
