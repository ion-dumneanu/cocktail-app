import { Component } from 'react';
import './AddComponent.css';

class AddComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      strDrink:'name',
      strIngredient1:'ingredient 1',
      strIngredient2:'ingredient 2'
    };

    this.handleChange = (event) => {
      console.log(event)
      if (event.target.name === 'strDrinkThumb') {
        this.setState({ [event.target.name]: window.URL.createObjectURL(event.target.files[0]) });
        return;
      }
      this.setState({ [event.target.name]: event.target.value });
    }

    this.handleSubmit = (event) => {
      event.preventDefault();
      console.log({ ...this.state })
      this.props.onAddClick({ ...this.state, idDrink: [...Object.values(this.state), new Date().getTime()].join('') });
    };
  }

  
  render() {

    return (
      <>
        <form onSubmit={this.handleSubmit} method="post">
          <div className='addFormContainer'>
            <div style={{width:'49%'}}>

              <input id="actual-btn" hidden type="file" name="strDrinkThumb" required value={this.state['strDstrDrinkThumbrink']} onChange={this.handleChange} />
              
              {
              this.state.strDrinkThumb?
                <img src={this.state.strDrinkThumb} height="400" width="400"/>
              :
              <label className='addProductUploadBtlLabel' for="actual-btn">Upload Image</label>
              }


            </div>
            <div style={{width:'49%'}}>
              <table style={{marginTop:'100px'}}>
                <tr>
                  <td>
                        <input type="text" name="strDrink" required value={this.state['strDrink']} onChange={this.handleChange} />                        
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="text" name="strIngredient1" required value={this.state['strIngredient1']} onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>
                      <input type="text" name="strIngredient2" required value={this.state['strIngredient2']} onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" value="Cancel" onClick={() => this.props.onCancelClick()} />                    
                    <input type="submit" value="Submit" />
                  </td>
                </tr>
              </table>

            </div>
          </div>

        </form>
      </>
    );
  }
}

export default AddComponent;