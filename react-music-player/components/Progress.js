import React, {Component} from 'react'
import './progress.css'

// 控制progress的进度条

class Progress extends Component {
	constructor() {
		super();						
		this.changeProgress = this.changeProgress.bind(this);
		this.getProgress = this.getProgress.bind(this);	
	}

	getProgress(e) {
	    let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        return progress;
	} 
	
	changeProgress(e) {
		
       // 将这个progress传递到符组件
       let progress = this.getProgress(e);
       console.log(progress);
       
       this.props.onChangeProgress && this.props.onChangeProgress(progress);
       // 改变声音      
       this.props.onChangeVolume && this.props.onChangeVolume(progress);
	}


	render() {
		return (
           <div className='components-progess' onClick={this.changeProgress} ref='progressBar'>               
               <div className='progress-line' style={{width: `${this.props.progress}%`, backgroundColor: `${this.props.bgColor}`}}></div>
           </div>
		)
	}
}

export default Progress