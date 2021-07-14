// funForFetching = async() =>{
//     let level=(Math.floor(Math.random()*3))%3;
//     let dat =await fetch(
//         `http://cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1`
//     )
//     console.log(dat);
// }

// window.addEventListener(`load`,funForFetching);


isValid = (mat,i) =>{
    let l=0,m=0,x=0,y=0,t1,t2;
    t1=Number(i);
    //check for rows
    l=i/9;m=i%9;
    t1=l*9;
    for(t2=t1;t2<t1+9;t2++){
        if(t2!=i && mat[t2]==mat[i]){
            return false;
        }
    }
    //check for columns
    t1=m;
    while(t1<81){
        if(t1!=i && mat[t1]==mat[i])
            return false;
        t1 += 9;
    }
    

    //check for same block
    x=(i/27);
    y=i%9;
    x=x*27+(y/3);
    l=x;
    while(l<x+27){
        m=l;
        while(m<l+3){
            if(i!=m && mat[m]==mat[i])
                return false;
            m++;
        }
        l+=9;
    }
    return true;
}

generateAux = (mat,i) =>{
    if(i==81)
        return true;
    let k=(Math.ceil(Math.random()*1000))%9+1,l;
    for(l=k;l<9;l++){
        let t=((k+l)%9)+1;
        mat[i]=t;
        console.log(t);
        if(isValid(mat,i) && generateAux(mat,i+1));
            return true;
    }
    mat[i]=0;
    return false;
}

removeK = (mat,k) => {
    let t=k;
    while(t!=0){
        let temp=(Math.ceil(Math.random()*1000))%81;
        let i=temp;
        if(mat[i] != 0){
            mat[i]=0;
            t--;
        }
    }
}

copy = (mat) =>{
    let i;
    let dom=document.getElementsByClassName(`grid`);
    for(i=0;i<81;i++){
        if(mat[i]!=0)
            dom[i]=mat[i];
    }
}

generate = async() =>{
    let k=Math.floor((Math.random())*60),i=0,j=0;
    let mat = [];
    for(i=0;i<81;i++){
        mat[i]=0;
    }
    // console.log(mat[0][0]);
    i=0;
    await generateAux(mat,i);
    await removeK(mat,k);
    await copy(mat);
}

onclickGenerate = () =>{
    let dom=document.getElementById(`generate`);
    dom.addEventListener(`click`,generate);
}

window.addEventListener(`load`,onclickGenerate);