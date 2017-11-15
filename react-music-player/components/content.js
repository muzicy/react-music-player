import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Progress from './Progress'
import Musicinfo from './Musicinfo'
import Control from './Contorl.js'
import './content.css'

class Content extends Component {
    constructor() {
    	super()
    	this.state = {
    		backgrounColor: '#037D39',
    		MUSIC_LIST: []
    	}
    	this.changeWayPlay = this.changeWayPlay.bind(this);   	
    }

    changeWayPlay(e) {

    	let icon = document.querySelectorAll('.music-bofang')[0];
        let play = null;        
    	let playWay = this.props.playWay;    	
    	switch (playWay){
    		case 'order':
                icon.classList.remove('icon-shunxubofang');
                icon.classList.add('icon-danquxunhuan1');
                play = 'signal';
                break
            case 'signal':
                icon.classList.remove('icon-danquxunhuan1');
                icon.classList.add('icon-suijibofang');
                play = 'random';
                break;
            default:
                icon.classList.remove('icon-danquxunhuan1','icon-suijibofang');
                icon.classList.add('icon-shunxubofang');
                play = 'order';
                break;
    	}

    	this.props.changeWayPlay && this.props.changeWayPlay(play);
    	e.stopPropagation();
    }

	render() {
	    let MUSIC_LIST = this.props.musicList;	
        return (
			<div className="content">
			    <p className="title">
			    <Link 
			        to="/musiclist" 
			        className="music-list"
			    >
			        我的私人音乐坊
			    </Link>
			    </p>
			    <Musicinfo currentMusic={MUSIC_LIST[this.props.musicIndex]}></Musicinfo>
			    <Control 
			        onChangeVolume = {this.props.onChangeVolume} 
			        volume={this.props.volume}
                    play = {this.props.play}
                    onTogglePlay = {this.props.onTogglePlay}
                    onClickPrev = {this.props.onClickPrev}
                    onClickNext = {this.props.onClickNext}
			    >
			    </Control>
			    <p 
			       className="music-left"
			    >
			       播放时间: {this.props.musicTime}
                    <i 
                       className="iconfont icon-shunxubofang music-bofang"
                       onClick={this.changeWayPlay}
                    ></i>
			    </p>
		        <Progress 
		            progress={this.props.progress} 
		            onChangeProgress={this.props.onChangeProgress}
		            bgColor = {this.state.backgrounColor}		            
		        >
		        </Progress>
		        <div className="bgImage">
                    <img
                        className='artist-img' 
                        src={MUSIC_LIST[this.props.musicIndex]['cover']} 
                        alt='歌手图片' 
                        width='150' 
                        height='150'                        
                    />
		        </div>
			</div>
		)		
	}
}

export default Content