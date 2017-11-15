import React, {Component} from 'react'
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom'
import Header from './Header'
import MusicList from './pages/Muscilist'
import Player from './Player'
import {MUSIC_LIST} from '../config/musiclist'

import '../static/css/iconfont.css'

// jplayer的使用
// 传递进度条参数

class App extends Component {
  
  constructor() {
      super();
      this.state = {
        musicList: MUSIC_LIST,
        currentIndex: 0,
        volume: 0,
        progress: 0,
        duration: 0,
        volume: 0,        
        play: true,
        musicTime: 0,
        playWay: 'order'
      }

      this.getCurrentIndex = this.getCurrentIndex.bind(this);
      this.deleteMusic = this.deleteMusic.bind(this);
      this.initPlayMusic = this.initPlayMusic.bind(this);
      this.onClickNext = this.onClickNext.bind(this);
      this.playMusic = this.playMusic.bind(this);
      this.getMusicListLength = this.getMusicListLength.bind(this);
      this.onChangeProgress = this.onChangeProgress.bind(this); // 一定要注意事件的this绑定
      this.onChangevolume = this.onChangevolume.bind(this);
      this.onTogglePlay = this.onTogglePlay.bind(this);   
      this.onClickPrev = this.onClickPrev.bind(this);   
      this.onHandleBGRotate = this.onHandleBGRotate.bind(this);
      this.changeWayPlay = this.changeWayPlay.bind(this);
  }

  componentDidMount() {
      this.initPlayMusic(); 
  }

  initPlayMusic() {
    let self = this;
    let musicIndex = this.state.currentIndex;   
    $('#player').jPlayer({
      ready: function() { // The $.jPlayer.event.ready event
         self.playMusic(musicIndex) // Attempt to auto play the media
      },
      supplied: 'mp3',
      wmode: 'window'
    });
      // 音乐播放完成
      $('#player').bind($.jPlayer.event.ended, () => {
         let nextIndex = 0;
         //this.onClickNext();
         switch(this.state.playWay) {
            case 'signal': 
              nextIndex = this.state.currentIndex;
              break;
            case 'random':
              nextIndex = Math.floor(Math.random() * self.getMusicListLength());
              break;
            default: 
               self.onClickNext();
               return; 
         }
         self.playMusic(nextIndex);
      })

      // 更新的,设置音量和播放进度条
      $('#player').bind($.jPlayer.event.timeupdate, (e) => { 
          if (this.state.duration == 0) {
              this.setState({
                 duration: e.jPlayer.status.duration                   
              });             
          }            
          this.setState({
            progress: e.jPlayer.status.currentPercentAbsolute,
              musicTime: $.jPlayer.convertTime(e.jPlayer.status.currentTime)
          })
        });
      
      // 设置一个初始音量
      this.setState({volume: 1 * 100});
      this.onHandleBGRotate();    
  }

  playMusic(musicIndex) {    
    this.getCurrentIndex(musicIndex);
    this.setState({
      duration: 0
    })
    this.setState({
      progress: 0,
      play: true
    })    
      let self = this;        
        $('#player').jPlayer("setMedia", { // Set the media
        mp3: self.state.musicList[musicIndex]['file']
    }).jPlayer("play");
  }

  onClickNext() {
        let current = this.state.currentIndex;
        let length = this.getMusicListLength();
        let next = (current + 1) % length;        
        this.setState({
          currentIndex: next,
            progress: 0
        });
        this.playMusic(next);       
    }
  
  getCurrentIndex(index) {    
    this.setState({currentIndex: index});
     
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
    $('#player').unbind($.jPlayer.event.ended);
  } 

  onChangeProgress(progress) {        
        this.setState({
          progress: progress
        });
        if (this.state.play) {
           $('#player').jPlayer('play', this.state.duration * progress);
        } else {
           $('#player').jPlayer('pause', this.state.duration * progress);
        }
        
        
  }
    
  onChangevolume(progress) {    
    $('#player').jPlayer('volume', progress);    
    this.setState({volume: progress * 100});

  }

  onTogglePlay() {       
     //return this.state.play;
     if (this.state.play) {
         // 暂停播放
         $('#player').jPlayer('pause');
     } else {
         // 重新播放
         $('#player').jPlayer('play');
     }     

     this.setState({play: !this.state.play}, () => {
        this.onHandleBGRotate();
     });
       
    }    

    onClickPrev() {
      let current = this.state.currentIndex;
        let length = this.getMusicListLength();
        let prev = (current - 1 + length) % length;       
        this.setState({
          currentIndex: prev,
          progress: 0
        });
        this.playMusic(prev);
    }

   
    // 处理北京图片旋转
    onHandleBGRotate() {
      let img = document.querySelectorAll('.artist-img')[0];

        if (this.state.play) {
          // 旋转         
          img.classList.add('image-rotate');          
        } else {          
          img.style.animationFillMode='forwards';
          img.classList.remove('image-rotate');
        }
    }

  getMusicListLength() {
      return this.state.musicList.length;
    }

  deleteMusic(index) {
      let musicList = this.state.musicList;
      musicList.splice(index, 1);
      this.setState({
         musicList: musicList
      })
  }
  
  changeWayPlay(type='order') {
     let self = this;
     switch(type) {
        case 'signal': 
          // 单曲循环
          self.setState({
            playWay: 'signal'
          });
          break;
        case 'random':
          // 产生随机数
          self.setState({
             playWay: 'random'
          });
          break;
        default:
          self.setState({
             playWay: 'order'
          }); 
      }   
  }
  
  render() {
    return (
       <Router>
          <div>
            <Header></Header>
            <div id="player"></div>
            <Route exact path='/' render={(props) => 
              <Player {...props} 
                  musicList={this.state.musicList} 
                  currentIndex={this.state.currentIndex}
                  getCurrentIndex={this.getCurrentIndex}
                  onClickNext={this.onClickNext}
                  onClickPrev={this.onClickPrev}
                  progress = {this.state.progress}
                  volume = {this.state.volume} 
                  onChangeProgress = {this.onChangeProgress}                   
                  onChangeVolume = {this.onChangevolume}
                  play = {this.state.play}
                  musicTime = {this.state.musicTime}
                  playWay = {this.state.playWay}
                  musicList = {this.state.musicList}
                  onTogglePlay = {this.onTogglePlay}
                  onClickNext = {this.onClickNext}
                  onClickPrev = {this.onClickPrev}
                  changeWayPlay = {this.changeWayPlay}

              />}></Route>
            <Route path='/musiclist' render={(props) => 
               <MusicList 
                  {...props} 
                  musicList={this.state.musicList} 
                  currentIndex={this.state.currentIndex}
                  deleteMusic={this.deleteMusic}
              />}></Route>
          </div>
       </Router>
    )
    
  }
}


export default App;