import React from 'react'
import * as styles from "./feed.module.css";

const Feed = (props) => {
    const { id, caption, media_type, media_url} = props.feed
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <video
                    // className={styles.root}
                    width='100%'
                    height='auto' 
                    src={media_url} 
                    type="video/mp4" 
                    controls playsinline>
                </video>
            )
            break;
        case "CAROUSEL_ALBUM":
            post = (
                <img 
                    // className={styles.root}
                    width='100%'
                    height='auto'
                    id={id} 
                    src={media_url} 
                    alt={caption} 
                />
            );
            break;
        default:
            post = (
                <img 
                    // className={styles.root}
                    width='100%'
                    height='auto'
                    id={id} 
                    src={media_url} 
                    alt={caption} 
                />
            );
    }       

    return (
        <React.Fragment>
            <a className={styles.root} href={"https://instagram.com/tobe__named"}>{post}</a>
        </React.Fragment>
    );
}

export default Feed;