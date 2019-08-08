import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quaters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      changeDue: 0,
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }
  
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  
  handleClick(){
    let amountDue=Number(this.state.amountDue);
    let amountReceived=Number(this.state.amountReceived);
    let totalChange=(amountReceived-amountDue).toFixed(2);
    let dollars=Math.floor(totalChange-totalChange%1)
    let twentyDollars = Math.floor(dollars / 20);
    let tenDollars = Math.floor((dollars - twentyDollars*20)/10);
    let fiveDollars = Math.floor((dollars - twentyDollars*20 - tenDollars*10)/5); 
    let oneDollars = Math.floor((dollars - twentyDollars*20 - tenDollars*10 - fiveDollars*5));
    let quaterCents = Math.floor(((totalChange - dollars).toFixed(2))/0.25);
    let dimeCentes = Math.floor((totalChange - dollars - quaterCents*0.25).toFixed(2)*10);
    let nickelCents = Math.floor(((totalChange - dollars - quaterCents*0.25 - dimeCentes*0.1).toFixed(2))/0.05);
    let pennieCents = (totalChange - dollars - quaterCents*0.25 - dimeCentes*0.1 - nickelCents*0.05).toFixed(2)*100;
    
    this.setState({
      changeDue: totalChange,
      twenties: twentyDollars,
      tens: tenDollars,
      fives: fiveDollars,
      ones: oneDollars,
      quaters: quaterCents,
      dimes: dimeCentes,
      nickels: nickelCents,
      pennies: pennieCents,
    })
  }
  
  render() {
    
    return(
      <div className="container-fluid">
        <br/>
        <div className='form-group border-bottom'>
          <h3 className='text-white'>Change Calculator</h3>
        </div>
        
        <div className='row'>
            <div className ='col-sm-4'>
              <div className ='card'>
                <div className='card-header'>
                  Enter information
                </div>
                <div className='card-body'>
                  <label className="control-label"><strong>How much is due?</strong></label>
                  <input name="amountDue" type="number" className="form-control" value={this.state.amountDue} onChange={this.handleChange}/>
                </div>
                <div className='card-body'>
                  <label className="control-label"><strong>How much was received?</strong></label>
                  <input name="amountReceived" type="number" className="form-control" value={this.state.amountReceived} onChange={this.handleChange}/>
                </div>
                <div className='card-footer'>
                  <button name='submit' className="btn btn-primary btn-block " onClick={this.handleClick}>
                    Calculate
                  </button>
                </div>
              </div>
          </div>

          <div className ='col-sm-8'>
            <div className ='p-3 mb-2 bg-white rounded'>
              <div>
                <div name='changeDue' role='alert' className="alert alert-success" value={this.state.changeDue}>The total change due is ${this.state.changeDue}</div>
              </div>
                  <div className='row'>
                    <Changes name="twenties" title="Twenties" number={this.state.twenties}/>
                    <Changes name="tens" title="Tens" number={this.state.tens}/>
                    <Changes name="fives" title="Fives" number={this.state.fives}/>
                    <Changes name="ones" title="Ones" number={this.state.ones}/>
                    <Changes name="quaters" title="Quaters" number={this.state.quaters}/>
                    <Changes name="dimes" title="Dimes" number={this.state.dimes}/>
                    <Changes name="nickels"title="Nickels" number={this.state.nickels}/>
                    <Changes name="pennies" title="Pennies" number={this.state.pennies}/>
                  </div>
            </div>
          </div> 
        </div>    

      </div> 
    );
  }
}
class Changes extends Component {
  render(){
    return(
    <div className='col-sm-3'>
      <div className='alert alert-info' role="alert">
        <p className="text-center"><strong>{this.props.title}</strong></p>
        <p className="text-center change" name="{this.props.name}">{this.props.number}</p>
      </div>
    </div>  
    )
  }
}

export default App;
