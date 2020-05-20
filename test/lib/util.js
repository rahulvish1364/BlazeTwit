const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon')
const util = require('../../lib/util')

describe('the util module', () => {
    context('the notEmpty function', () => {
        it('should return true when given a string', () => {
            expect(util.notEmpty('foo')).to.be.true

        });
        it('should return an error when given an empty string', () => {
            expect(util.notEmpty('')).to.equal('This value is required');
        });
    });

    context('the handleError function', () => {
        it('should set exit code to 1', () => {
            sinon.stub(console, 'error')
            util.handleError('foo')
            expect(process.exitCode).to.equal(1)
            console.error.restore()
        });
        it('should print a console.error message', () => {
            sinon.stub(console, 'error')
            util.handleError('bar')
            expect(console.error.calledWith('bar'))
            console.error.restore()

        });
    });
})

