import './pubg_art.css'

interface PubgArtProps {
  username: string | null
}

function Pubg_art({ username }: PubgArtProps) {
  return (
    <section className='pubg_container'>
        <div className='pubg_art'></div>
        {username && <p className="welcome_message">Hello, {username}</p>}
        <p className='message'>The Erangel Classic is back!<br/><a href='https://www.pubg.com/en/news/7282' target='_blank' rel='noopener noreferrer'>Original info could be found here</a></p>
        <audio autoPlay loop controls>
          <source src="https://wstatic-prod-boc.krafton.com/common/content/news/20240418/ihwLEeOI/BGM_A01_EarlyAccess_Lobby.mp3">
          </source>
        </audio>
        <div className='video_container'>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/cvApAW-weEE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
          <div className="video second_video">
            <iframe
              src="https://www.youtube.com/embed/huwYjpXfyA0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
        </div>
    </section>
  )
}

export default Pubg_art
