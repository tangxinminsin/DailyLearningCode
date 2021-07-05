var regex = /hello/;
console.log(regex.test("hello"));
// => true
var regex = /ab{2,5}c/g;
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
console.log(string.match(regex));
// => ["abbc", "abbbc", "abbbbc", "abbbbbc"]
var regex = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
console.log(string.match(regex));
// => ["a1b", "a2b", "a3b"]
var regex = /\d\D\w\W\s\S.[^]/g;
var string = "a0b a1b a2b a3b a4b";
console.log(string.match(regex));
// => ["a1b", "a2b", "a3b"]
