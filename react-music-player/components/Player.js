import React, {Component} from 'react'
import Content from './content'

// jplayer的使用
// 传递进度条参数

class Player extends Component{

  render() {    
    return (
            <div className='contanier'>                
                <Content 
                   progress = {this.props.progress}
                   volume = {this.props.volume} 
                   onChangeProgress = {this.props.onChangeProgress} 
                   musicIndex = {this.props.currentIndex}
                   onChangeVolume = {this.props.onChangeVolume}
                   play = {this.props.play}
                   playWay = {this.props.playWay}
                   musicTime = {this.props.musicTime}
                   musicList = {this.props.musicList}
                   onTogglePlay = {this.props.onTogglePlay}
                   onClickNext = {this.props.onClickNext}
                   onClickPrev = {this.props.onClickPrev}
                   changeWayPlay = {this.props.changeWayPlay}
                >
                </Content>
            </div>
    )
  }
}

export default Player;
