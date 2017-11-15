import React, {Component} from 'React'
import './Control.css'
import Progress from './Progress'

class Control extends Component {
    constructor() {
    	super();
    	this.state = {
    		bgcolor: '#FBBD29'
    	}
    	this.onTogglePlay = this.onTogglePlay.bind(this);
    	this.onClickPrev = this.onClickPrev.bind(this);
    	this.onClickNext = this.onClickNext.bind(this);
    }

    onTogglePlay() {    	
    	this.props.onTogglePlay();
    }

    onClickNext() {
    	console.log('click from next');
    	this.props.onClickNext();
    }

    onClickPrev() {
    	console.log('click from prev');
    	this.props.onClickPrev();
    }

	render() {
		return (
           <div className="music-control">
              <i 
                   className="iconfont icon-shangyishou"
                   onClick = {this.onClickPrev}
              ></i>
              <i 
                  className={`iconfont ${this.props.play ?  'icon-zanting' : 'icon-bofang'}`} 
                  onClick = {this.onTogglePlay}
              >
              </i>
              <i 
                  className="iconfont icon-xiayishou"
                  onClick = {this.onClickNext} 
               ></i>
              <div className="music-volumn">
                   <Progress onChangeVolume={this.props.onChangeVolume} bgColor={this.state.bgcolor} progress={this.props.volume}></Progress>
                   <i className="iconfont icon-yinliang"></i>
              </div>
                            
           </div>
		)
	}
}

export default Control
