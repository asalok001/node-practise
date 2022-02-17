const rectangle = require('./rectangle');
var rect= require('./rectangle');

// var rect= {
//     permeter: (x,y) => (2*(x+y)),
//     area : (x,y) => (x*y)
// }

function solveRect(l,b) {
    console.log("Length and Breadth Respectively  "+l +"  &  " +b);

    // if(l<=0 || b<=0){
    //     console.log("Must be Greater than 0");
    // }
    // else{
    //     console.log("Area =" +rect.area(l,b));
    //     console.log("Perimeter = "+rect.perimeter(l,b));
    // }

    rect(l,b, (err, rectangle) =>{
        if(err){
            console.log("Error :", err.message)
        }
        else{
            console.log("The area of rectangle = " + rectangle.area());
            console.log("The Perimeter of rectangle = " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
};

solveRect(3,3);
solveRect(2,5);
solveRect(0,4);
solveRect(-4, 3);