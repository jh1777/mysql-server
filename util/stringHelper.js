'use strict';
exports.appendZero = function (num) {

    if (num<10) {
        return `0${num}`;
    } else {
        return `${num}`;
    }
}