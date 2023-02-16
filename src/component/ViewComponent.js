import { Component } from 'react';

class ViewComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.product);

    return (
          <>                      
            <figure>
              <figcaption>{this.props.product.strDrink}</figcaption>
              <img src={this.props.product.strDrinkThumb} alt={this.props.product.strDrink} height="600" width="500" />
            </figure>            
            <input type="button" value="Back" onClick={()=>this.props.onBack()}/>
          </>
    );
  }
}

export default ViewComponent;