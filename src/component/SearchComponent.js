import { Component } from 'react';
import './SearchComponent.css';
import AddComponent from './AddComponent';
import ViewComponent from './ViewComponent';

class SearchComponent extends Component {

  constructor(props) {    
    super(props);

    this.state = { 
      data: [],
      searchCriteria: null,
      viewProductId:null,    
      page: 'search'
    }

    this.onSearchChange = (value)=> {    
      this.setState({searchCriteria:value});
    };

  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.selectedCategory===this.props.selectedCategory){
      return;
    }
    
    this.loadByCategory(this.props.selectedCategory);
  } 

 componentDidMount(){
  if(!this.props.selectedCategory) return;

  this.loadByCategory(this.props.selectedCategory);
}

  loadByCategory(category) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
      .then(resp => resp.json())
      .then(json => this.setState({ data: json['drinks'] }));
  }

  render() {
    
    const results = [...this.state.data, ...this.props.ownProducts].filter(item=>!this.state.searchCriteria || item.strDrink.includes(this.state.searchCriteria)); 

    const resultRender = results.map(item =>
      <figure className='item' key={item.idDrink} onClick={()=>this.setState({viewProductId: item.idDrink, page: 'view'})}>
        <img src={item.strDrinkThumb} alt={item.strDrink} height="130" width="130" />
        <figcaption>{item.strDrink}</figcaption>
      </figure>
    );

    return (
        this.state.page === 'search' ?
          (<>
            <div className='app-search-widget'>
              <input type='text' onChange={({target:{value}}) => this.onSearchChange(value)}></input>
            </div>

            <div className='result-category'>{`----------------------------------  ${this.props.selectedCategory || 'No category'}  ----------------------------------`}</div>
            
            <div className='result-category-container'>
              {resultRender}
            </div>
            <div style={{textAlign: 'left', paddingLeft:'280px'}}>
              <input type="button" value="Add Product" onClick={()=>this.setState({page:'add'})}/>
            </div>
          </>): this.state.page === 'view' ?

          <ViewComponent product={[...this.state.data, ...this.props.ownProducts].filter(item=>this.state.viewProductId===item.idDrink)[0]} onBack={()=>this.setState({page:'search', viewProductId:null})}/>
          :    
          <AddComponent onCancelClick={()=>this.setState({page:'search'})} onAddClick={(item)=>{this.setState({page:'search'});this.props.onAddOwnProduct({...item, strCategory:this.state.selectedCategory})}}/>

    );
  }
}

export default SearchComponent;