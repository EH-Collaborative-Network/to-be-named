// ExternalLinkRenderer.js
import React from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'


const MediaRenderer = props => {
    return(
   <span style={{"border":"1px solid", "padding":"5px", "background":"black","color": "white"}}>~Inline Media 🏞 Click to Edit~ </span>
)}

MediaRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default MediaRenderer