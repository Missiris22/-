const obj = {
    birth: 2000,
    getAge: function() {
        const b =  this.birth;
        console.log('get:::', this, b);
    },
    getArrowAge: () => {
        const b = this.birth;
        console.log('arrow::', this,b);
    }
}


function commonFunc() {

}

// arrowFunc();
// console.log('obj', obj);
obj.getAge();
obj.getArrowAge();
