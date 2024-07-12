import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }
    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84875b85654a4e589c8df2c07e543861&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30)
        let parseData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles:parseData.articles,
            loading:false,
            totalResults: parseData.totalResults
        })
        this.props.setProgress(100)
    }
    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84875b85654a4e589c8df2c07e543861&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parseData = await data.json(); 
        // this.setState({
        //     articles:parseData.articles,
        //     loading:false
        // })
        this.updateNews();
    }
    handleNextClick= async()=>{
        // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84875b85654a4e589c8df2c07e543861&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true})
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     this.setState({
        //     page:this.state.page+1,
        //     articles:parseData.articles,
        //     loading:false
        // })
        // }
        this.setState({page:this.state.page+1})
        this.updateNews()
    }
    handlePrevClick= async()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84875b85654a4e589c8df2c07e543861&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parseData.articles,
        //     loading:false
        // })
        this.setState({page:this.state.page-1})
        this.updateNews()
    }
    fetchMoreData= async()=>{
        // this.setState({page: this.state.page +1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84875b85654a4e589c8df2c07e543861&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({page: this.state.page +1})
        // this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles:this.state.articles.concat(parseData.articles),
            // loading:false,
            totalResults: parseData.totalResults
        })
    }
  render() {
    return (
      <div className="container my-3">
        <h1 className="my-5 text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
               return <div className="col-md-4">
               <NewsItem title={element.title} description={element.description} imgURL={element.urlToImage} newsURL={element.url} date={element.publishedAt}/>  
               </div>
            })}
            </div>
            </div>
        </InfiniteScroll>
        {/* <div className=" container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News
