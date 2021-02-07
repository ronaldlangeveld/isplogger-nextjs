

export const Grading = (maxUp, maxDown, avgUp, avgDown) => {

    var upPerc = avgUp/maxUp*100;
    console.log(upPerc);
    var downPerc = avgDown/maxDown*100;
    console.log(downPerc);
    var score = upPerc + downPerc;
    var totPerc = score / 2;
    console.log(totPerc);

    if(totPerc >= 90){
        return "A"
    }
    if(totPerc >= 80){
        return "B"
    }
    if(totPerc >= 70){
        return "C"
    }
    if(totPerc >= 60){
        return "D"
    }
    if(totPerc < 60){
        return "F"
    }


    
};

