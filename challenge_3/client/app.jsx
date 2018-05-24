//hey
// import react, {Component} from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      enteredData: {}
    };
    this.nextClicked = this.nextClicked.bind(this);
    this.goBack = this.goBack.bind(this);
    this.confirmPurchase = this.confirmPurchase.bind(this);
  }

  nextClicked(event, childState) {
    if (this.state.currentPage === 1) {
      this.postRequest('order', childState);
    } else if (this.state.currentPage === 2) {
      this.postRequest('shipping', childState);
    } else if (this.state.currentPage === 3) {
      this.postRequest('payment', childState);
    }
    let newData = Object.assign({}, this.state.enteredData, childState);
    this.setState((prevState, props) => ({
      currentPage: ++prevState.currentPage,
      enteredData: newData
    }));
  }

  postRequest(endpoint, data) {
    fetch(`http://127.0.0.1:1337/${endpoint}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  }

  goBack() {
    this.setState((prevState, props) => ({
      currentPage: --prevState.currentPage
    }));
  }

  onInputChange(e) {
    let inputId = e.target.id;
    let value = e.target.value;
    this.setState({
      [inputId]: value
    });
  }
  confirmPurchase() {
    console.log('purchase confirmed');
    this.setState({ currentPage: 0 });
  }

  render() {
    return (
      <div>
        <h4>Amazon, but by Grant</h4>
        {this.state.currentPage === 0 ? (
          <input
            type="submit"
            value="Go to Checkout"
            onClick={event => {
              this.nextClicked(event);
            }}
          />
        ) : (
          <div>
            <F1
              goBack={this.goBack}
              nextClicked={this.nextClicked}
              onInputChange={this.onInputChange}
              currentPage={this.state.currentPage}
            />
            <F2
              goBack={this.goBack}
              nextClicked={this.nextClicked}
              onInputChange={this.onInputChange}
              currentPage={this.state.currentPage}
            />
            <F3
              goBack={this.goBack}
              nextClicked={this.nextClicked}
              onInputChange={this.onInputChange}
              currentPage={this.state.currentPage}
            />
            <Review
              goBack={this.goBack}
              confirmPurchase={this.confirmPurchase}
              enteredData={this.state.enteredData}
              currentPage={this.state.currentPage}
            />
          </div>
        )}
      </div>
    );
  }
}

class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    };
    this.onInputChange = this.props.onInputChange.bind(this);
  }

  render() {
    if (this.props.currentPage === 1) {
      return (
        <div>
          <h4>F1</h4>
          <form>
            <input
              id="firstName"
              type="input"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="lastName"
              type="input"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
          </form>
          <input type="submit" value="Go Back" onClick={this.props.goBack} />
          <input
            type="submit"
            value="Next Page"
            onClick={event => {
              this.props.nextClicked(event, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email
              });
            }}
          />
        </div>
      );
    }
    return null;
  }
}

class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      state: '',
      shippingZip: '',
      phone: ''
    };
    this.onInputChange = this.props.onInputChange.bind(this);
  }

  render() {
    if (this.props.currentPage === 2) {
      return (
        <div>
          <h4>F2</h4>
          <form>
            <input
              id="address1"
              type="input"
              placeholder="Address Line 1"
              value={this.state.address1}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="address2"
              type="input"
              placeholder="Address Line 2"
              value={this.state.address2}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="state"
              type="input"
              placeholder="State"
              value={this.state.state}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="shippingZip"
              type="input"
              placeholder="Zip Code"
              value={this.state.shippingZip}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="phone"
              type="input"
              placeholder="Phone"
              value={this.state.phone}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
          </form>
          <input type="submit" value="Go Back" onClick={this.props.goBack} />
          <input
            type="submit"
            value="Next Page"
            onClick={event => {
              this.props.nextClicked(event, {
                address1: this.state.address1,
                address2: this.state.address2,
                state: this.state.state,
                shippingZip: this.state.shippingZip,
                phone: this.state.phone
              });
            }}
          />
        </div>
      );
    }
    return null;
  }
}

class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: '',
      expiration: '',
      cvv: '',
      billingZip: ''
    };
    this.onInputChange = this.props.onInputChange.bind(this);
  }

  render() {
    if (this.props.currentPage === 3) {
      return (
        <div>
          <h4>F3</h4>
          <form>
            <input
              id="creditCard"
              type="input"
              placeholder="Credit Card"
              value={this.state.creditCard}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="expiration"
              type="input"
              placeholder="Expiration Date"
              value={this.state.expiration}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="cvv"
              type="input"
              placeholder="CVV"
              value={this.state.cvv}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
            <input
              id="billingZip"
              type="email"
              placeholder="Billing Zip"
              value={this.state.billingZip}
              onChange={e => {
                this.onInputChange(e);
              }}
            />
          </form>
          <input type="submit" value="Go Back" onClick={this.props.goBack} />
          <input
            type="submit"
            value="Review Purchase"
            onClick={event => {
              this.props.nextClicked(event, {
                creditCard: this.state.creditCard,
                expiration: this.state.expiration,
                cvv: this.state.cvv,
                billingZip: this.state.billingZip
              });
            }}
          />
        </div>
      );
    }
    return null;
  }
}

class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let entries = Object.entries(this.props.enteredData);
    if (this.props.currentPage === 4) {
      return (
        <div>
          <h4>Review your Purchase</h4>
          <ul>
            {entries.map(dataTuple => {
              return (
                <li key={dataTuple[0]}>{`${dataTuple[0]}: ${dataTuple[1]}`}</li>
              );
            })}
          </ul>
          <input type="submit" value="Go Back" onClick={this.props.goBack} />
          <input
            type="submit"
            value="Confirm Purchase"
            onClick={this.props.confirmPurchase}
          />
        </div>
      );
    }
    return null;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
