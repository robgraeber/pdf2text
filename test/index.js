var fs = require('fs');
var ok = require('okay');
var pdf2text = require('../');
var assert = require('assert');

var checkResult = function() {
    it('returns array of pages', function() {
        console.log(this.pages);
        assert(Array.isArray(this.pages));
        assert(Array.isArray(this.pages[0]));
        assert(Array.isArray(this.pages[1]));
    });

    it('returns correct text', function() {
        assert.equal(this.pages[0].indexOf('Form W-4 (2013)'), 0);
        assert(this.pages[0].indexOf('Additional amount, if any, you want withheld from each paycheck'));
        assert(this.pages[1].indexOf('See the instructions for your income tax return.'));
    });
};

describe('pdf2text', function() {
    before(function(done) {
        var self = this;

        pdf2text(__dirname + '/w4.pdf', ok(done, function(pages) {
            self.pages = pages;
            done();
        }));
    });
    checkResult.call(this);
});

describe('pdf2text from buffer', function() {
    before(function(done) {
        var self = this;
        var buffer = fs.readFileSync(__dirname + '/w4.pdf');

        pdf2text(buffer, ok(done, function(pages) {
            self.pages = pages;
            done();
        }));
    });
    checkResult.call(this)
});
