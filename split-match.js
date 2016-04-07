var Transform = require('stream').Transform;
var util = require("util");
var fileSystem = require("fs");
var program = require('commander');
var PatternMatch = function () {
	Transform.call(
		this,
		{	
			objectMode: true
		}
	);

}

util.inherits(PatternMatch, Transform);

PatternMatch.prototype._transform = function (chunk, encoding, getNextChunk) {

	var data = chunk.toString();
	if(this._lastLineData) data = this._lastLineData + data;
	
	var lines = data.split(program.pattern);
	this._lastLineData = lines.splice(lines.length-1,1)[0];

	lines.forEach(this.push.bind(this));
	done();	

};

PatternMatch.prototype._flush = function (flushCompleted) {

};

program
	.option('-p, --pattern <pattern>', 'Input Pattern such as . ,')
	.parse(process.argv)

var inputStream = fileSystem.createReadStream( "input-sensor.txt" );
var patternStream = inputStream.pipe( new PatternMatch());

patternStream.on();
