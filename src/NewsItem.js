import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgURL, newsURL,date} = this.props
    return (
      <div>
        <div className="card">
            <img src={!imgURL? "https://cdn.wionews.com/sites/default/files/2024/07/06/442008-northern-lights.png" : imgURL} className="card-img-top" alt="..."/>
            <div  div className="card-body">
               <h5 className="card-title">{title}...</h5>
               <p className="card-text">{description}...</p>
               <p className="card-text"><small className="text-body-secondary">Last updated on {new Date(date).toGMTString()}</small></p>
               <a rel= "noreferrer" href={newsURL} target="_blank" className="btn btn-sm btn-primary">Read more</a>
           </div>
       </div>
      </div>
    )
  }
}

export default NewsItem
