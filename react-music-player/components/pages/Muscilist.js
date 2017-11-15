import React, {Component} from 'react'
import MusicItem from './Musicitem'

import './musiclist.css'

class MusicList extends Component {
    
    constructor() {
    	super();
    	this.getMusicList = this.getMusicList.bind(this);
    	this.deleteMusic = this.deleteMusic.bind(this);
    }

	componentDidMount() {
        let currentIndex = this.props.currentIndex;
        let list = this.getMusicList();
        
        for (let i = 0, len = list.length; i < len; i++) {
        	list[i].classList.remove('active');
        }
        list[currentIndex].classList.add('active');
	}

	getMusicList() {
		return document.querySelectorAll('.music-item');
	}

	deleteMusic(e) {        
	    let target = e.target && e.target.parentNode;   

	    while(target.nodeName.toLowerCase() !== 'li') {
           target = target.parentNode;
           
	    }
        
        console.log(target);

	    let list = this.getMusicList();
        list.forEach((item, index) => {
        	if (item == target) {
               this.deleteMusic(index);               
        	}
        })

	}
	
    render() {
      	let musicList = this.props.musicList;      

        return (
            <ul className="music-list">
                {  
                	musicList.map((item, index) => {                		
                		return (
                			<MusicItem
                			    item = {item}
                			    key = {index}
                			    deleteMusic={this.deleteMusic}
                			>
                			</MusicItem>
                	    )
                	})
                }
            </ul>
        )

    }

}

export default MusicList