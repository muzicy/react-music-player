import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
	render() {
		return (<div className='component-header'>
			      <img src='../static/images/logo.png' width='40' alt='music logo'/>
                  <h1> Music Player </h1>
		        </div>)
	}
}

export default Header