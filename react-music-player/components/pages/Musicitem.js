import React, {Component} from 'react'

class MusicItem extends Component {	
   
	render() {
        let item = this.props.item;        
        
        return (
           <li className="music-item" key={this.props.index}>
               <span className="music-title"><strong>歌曲: </strong>{item.title}</span>
               <span><strong>演唱: </strong>{item.artist}</span>
               <span onClick={this.props.deleteMusic}><icon className="iconfont icon-guanbi"></icon></span>
           </li>
        )
	}
}

export default MusicItem