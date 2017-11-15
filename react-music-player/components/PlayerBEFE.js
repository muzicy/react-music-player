import React, {Component} from 'react'
import Content from './content'

// jplayer的使用
// 传递进度条参数

class Player extends Component{

	constructor() {
		super();
		this.state = {
			progress: 0,
			duration: 0,
			volume: 0,
			musicIndex: 0,
			play: true,
			musicTime: 0,
			musicList: null
		}
		this.onChangeProgress = this.onChangeProgress.bind(this);	// 一定要注意事件的this绑定
		this.onChangevolume = this.onChangevolume.bind(this);
		this.onTogglePlay = this.onTogglePlay.bind(this);
		this.getMusicListLength = this.getMusicListLength.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.onClickPrev = this.onClickPrev.bind(this);
		this.playMusic = this.playMusic.bind(this);
		this.initPlayMusic = this.initPlayMusic.bind(this);
		this.onHandleBGRotate = this.onHandleBGRotate.bind(this);
	}

	componentDidMount() {
		this.setState({
			musicList: this.props.musicList
		},() => {
			console.log(this.state.musicList)
			this.initPlayMusic();
		})	    
        
    }

	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	}

	initPlayMusic() {
		let self = this;
		let musicIndex = this.state.musicIndex;		
		$('#player').jPlayer({
		  ready: function() { // The $.jPlayer.event.ready event
		     self.playMusic(musicIndex) // Attempt to auto play the media
		  },
		  supplied: 'mp3',
		  wmode: 'window'
		});
        // 更新的,设置音量和播放进度条
        $('#player').bind($.jPlayer.event.timeupdate, (e) => { 
            if (this.state.duration == 0) {
                this.setState({
               	   duration: e.jPlayer.status.duration                   
               	});
               console.log(this.state.duration);
            }            
       	    this.setState({
       	    	progress: e.jPlayer.status.currentPercentAbsolute,
                musicTime: $.jPlayer.convertTime(e.jPlayer.status.currentTime)
       	    })
        });

        // 音乐播放完成
        $('#player').bind($.jPlayer.event.ended, () => {
        	this.onClickNext();
        })
        
        // 设置一个初始音量
        this.setState({volume: 0.3 * 100});
        this.setState({play: true});

        // 设置图片旋转
        console.log(this.state.play) 
        this.onHandleBGRotate();
	}

	playMusic(musicIndex) {
		this.setState({
      progress: 0
    })
		this.props.getCurrentIndex(musicIndex);    
	    let self = this;				
        $('#player').jPlayer("setMedia", { // Set the media
		    mp3: self.state.musicList[musicIndex]['file']
		}).jPlayer("play");
	}

	onChangeProgress(progress) {
    this.setState({
      progress: progress
    })
    if (this.state.play) {
      $('#player').jPlayer('play', this.state.duration * progress);
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
           this.setState({
              play: false
           })
       } else {
       	   // 重新播放
       	   $('#player').jPlayer('play');
           this.setState({
              play: true
           })
       }
       

       this.setState({play: !this.state.play}, () => {
       	  this.onHandleBGRotate();
       });
       
    }

    // 上一首和下一首的逻辑功能
    onClickNext() {
        let current = this.state.musicIndex;
        let length = this.getMusicListLength();
        let next = (current + 1) % length;        
        this.setState({
        	musicIndex: next,
            progress: 0
        }, () => {
          this.playMusic(next); 
        });
              
    }

    onClickPrev() {
    	let current = this.state.musicIndex;
        let length = this.getMusicListLength();
        let prev = (current - 1 + length) % length;       
        this.setState({
        	musicIndex: prev,
            progress: 0
        }, () => {
          this.playMusic(prev);
        });
        
    }

    getMusicListLength() {
    	return this.state.musicList.length;
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

	render() {
		return (
            <div className='contanier'>
                <Content 
                   progress = {this.state.progress}
                   volume = {this.state.volume} 
                   onChangeProgress = {this.onChangeProgress} 
                   musicIndex = {this.state.musicIndex}
                   onChangeVolumn = {this.onChangevolume}
                   play = {this.state.play}
                   musicTime = {this.state.musicTime}
                   musicList = {this.state.musicList}
                   onTogglePlay = {this.onTogglePlay}
                   onClickNext = {this.onClickNext}
                   onClickPrev = {this.onClickPrev}
                >
                </Content>
            </div>
		)
	}
}
z
export default Player;
