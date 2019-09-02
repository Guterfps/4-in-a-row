import React, { Component }  from 'react';
import InsertCoin from './InsertCoin'

class Table extends Component{
    constructor(){
        super()
        this.state={
            table:this.Createtable(6,7),
            currentplyer: 1,
            victory:null
        }
    }

    Createtable(x,y){
        let table=[]
        for(let i=0;i<x;i++){
            table.push([])
            for(let t=0;t<y;t++){
                table[i].push('.')
            }
        }
        return table
    }

    insertCoin=(colnum,rownum=this.state.table.length-1)=>{
        let table=this.state.table
        let plyer=this.state.currentplyer
        
        if(rownum!== -1){
        if( table[rownum][colnum]==='.'){
        table[rownum][colnum]=plyer
        this.checkvictory(plyer,colnum,rownum)
        if(plyer===1){
            this.setState({currentplyer:2})
        }else{
            this.setState({currentplyer:1})
        }
    }else{
        this.insertCoin(colnum,rownum-1)
    }
}
}

checkvictory(plyer,colnum,rownum){
    let table=this.state.table
    let victory=false
    if(rownum<3){
        victory=true
        for(let y=rownum;y<=rownum+3;y++){
           
            if(table[y][colnum]!==plyer){
                victory=false
                break
            }
        }
        if(victory){
            this.setState({victory:` ${plyer===1 ? 'red': 'yellow'} won! by colnum`})
          return victory
        }
    }
   for(let x=0;x<table[rownum].length;x++){
       if(table[rownum][x+3]!==undefined){
           
       if(table[rownum].slice(x,x+4).every((val, i, arr) => val === arr[0] && val !=='.')){
        victory=true
       }
        if(victory){
            this.setState({victory:` ${plyer===1 ? 'red': 'yellow'} won! by row`})
          return victory
        }
       }
   }
   for(let y=0;y<table.length;y++){
       for(let x=0;x<table[y].length;x++){
           if(table[y+3]!==undefined && table[y+3][x+3]!==undefined){
            if(table[y][x]===plyer && table[y+1][x+1]===plyer && table[y+2][x+2]===plyer && table[y+3][x+3]===plyer){
                victory=true
                break
            }
           }
           if(table[y+3]!==undefined && table[y+3][x-3]!==undefined){
            if(table[y][x]===plyer && table[y+1][x-1]===plyer && table[y+2][x-2]===plyer && table[y+3][x-3]===plyer){
                victory=true
                break
            }
           }
           if(table[y-3]!==undefined && table[y-3][x+3]!==undefined){
            if(table[y][x]===plyer && table[y-1][x+1]===plyer && table[y-2][x+2]===plyer && table[y-3][x+3]===plyer){
                victory=true
                break
            }
           }
           if(table[y-3]!==undefined && table[y-3][x-3]!==undefined){
            if(table[y][x]===plyer && table[y-1][x-1]===plyer && table[y-2][x-2]===plyer && table[y-3][x-3]===plyer){
                victory=true
                break
            }
           }
       }
   }
   if(victory){
   this.setState({victory:`${plyer===1 ? 'red': 'yellow'} won!  diagonally`})
  return victory
}
}

restart=()=>{
    this.setState({
        table:this.Createtable(6,7),
        victory:null
    })
}

    render(){
        return(
            <div className='container'>
                {this.state.victory ? <button onClick={this.restart} >Restart</button> : null}
                {this.state.victory ? <h1>{this.state.victory}</h1> : null}
                <div className='row'>{this.state.table[0].map((b,index)=>this.state.currentplyer===1 ? <InsertCoin col={index} insertCoin={this.insertCoin} class={'red'} /> : <InsertCoin col={index} insertCoin={this.insertCoin} class={'yellow'} /> )}</div>
                {this.state.table.map(r=><div className='row table'>{r.map(c=>c==='.' ?<div className='box '></div> : c===1 ? <div className='red'></div> : <div className='yellow'></div>)}</div>)}
            </div>
        )
    }
}

export default Table