import { Component } from 'react';
import './App.css';
import SearchComponent from './component/SearchComponent';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('App: constructor, props: ', props);

    this.state = { 
      data: [],
      ownProducts:[],
      categories:[],
      searchCriteria: null, 
      selectedCategory: null, 
      page:'search',
      selectedProductId:null       
    }

    this.onSelectCategory = (value) => {
      const that = this;
      this.setState({selectedCategory:value, searchCriteria:null});
    };

    this.onSearchChange = (value)=> {
      console.log('onSearchChange >>', value)
      
      const that = this;
      this.setState({searchCriteria:value});
    };

  }

  componentDidMount() {    
    console.log('App: componentDidMount')
    const that = this;
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
      .then(resp => resp.json())
      .then(json => {
        const sortedCategories = json['drinks'].map(item=>item.strCategory).sort(); 
        const selectedCategory = sortedCategories[0]; 
        that.setState({categories: sortedCategories, selectedCategory: selectedCategory});
      });
  }

  loadCocktails(category) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.replaceAll(' ', '_')}`)
      .then(resp => resp.json())
      .then(json => this.setState({ data: json['drinks'] }));
  }

  render() {

    const categories = this.state.categories.map(item => <div key={item} className={`item ${this.state.selectedCategory===item? ' selected':''}`} onClick={() => this.onSelectCategory(item)}>{item}</div>)

    return (
      <div className="App">

        <header>
          <div className='app-header'>Cocktails</div>
        </header>

        <nav>
          <div className='app-navigation-menu'>
            {categories}
          </div>
        </nav>

        <section>
                  <SearchComponent 
                            ownProducts={this.state.ownProducts}
                            selectedCategory={this.state.selectedCategory} 
                            onItemClick={(selectedProductId)=>this.setState({page:'view', selectedProductId})} 
                            // onAddClick={()=>this.setState({page:'add'})} 
                            onAddOwnProduct={(item)=>this.setState({ownProducts:[...this.state.ownProducts,item]})}
                            />
        </section>

        <footer>
          <div className='app-footer'></div>
        </footer>

      </div>
    );
  }
}

export default App;