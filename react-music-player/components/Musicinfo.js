import React, {Component} from 'react'
import './Musicinfo.css'

class MusicInfo extends Component {
    
	render() {
		return (
           <div className="music-info">
               <p className="music-name"><strong>歌曲名称:</strong> {this.props.currentMusic.title}</p>
               <p className="music-author"><strong>歌手:</strong> {this.props.currentMusic.artist} </p>
           </div>
		)
	}
}

export default MusicInfo