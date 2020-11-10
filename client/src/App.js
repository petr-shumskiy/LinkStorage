import React, { Component } from 'react'
// import {Switch, Route} from 'react-router-dom';
import Header from './components/Header/Header'
// import Main from './pages/Main/Main';
import Folder from './components/pages/folders/folders'
import Aside from './components/Aside/Aside'

class App extends Component {
    state = {
      // clicked: false,
      userData: {
        userName: 'PopovDmitriy',
        userEmail: '447591834dp@gmail.com',
        userPassword: 1234567890,
        id: 0
      },
      linkData: [
        {
          linkImg: 'https://cofix.by/local/templates/main/img/logo.svg',
          linkTitle: 'Cofix',
          linkUrl: 'https://cofix.by/',
          linkText: 'Международная сеть Cofix открыла уже более 180 кофеен! Ароматный свежесваренный кофе, лимонады, апельсиновый и морковный фреш, выпечка, сэндвичи, салаты, суп, пицца и десерты – все по фиксированной цене.'
        },
        {
          linkImg: 'https://static.fix-price.by/images/adaptive/logo.png',
          linkTitle: 'FixPrice',
          linkUrl: 'https://fix-price.by/',
          linkText: 'Магия HALLOWEEN '
        },
        {
          linkImg: 'https://pngimg.com/uploads/github/github_PNG40.png',
          linkTitle: 'GitHub',
          linkUrl: 'https://github.com/',
          linkText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the '
        }
      ]
    }

    // onClickHandler = () => {
    //     this.setState({
    //         clicked: !this.state.clicked
    //     })

    //     if (this.state.clicked) {
    //         console.log(this.state.clicked)
    //     }
    // }
    checkLink = (link) => {
      if (link.length > 150) {
        return link.slice(0, 150) + '...'
      }
    }

    render() {
      return (
            <>
                <Header
                    // onClickHandler={this.onClickHandler}
                    userData={this.state.userData}
                />
                <Aside />
                <Folder />
                {/* <button onClick={this.onClickHandler}>Click</button> */}
                {/* <Main
                linkData={this.state.linkData}
            /> */}
                {/* <Switch>
                <Route exact path='/header' component={Header} />
                <Route exact path='/main' component={Main} />
            </Switch> */}
            </>
      )
    }
}

export default App
