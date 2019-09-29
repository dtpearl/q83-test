import React from "react";
import PostPreview from "../PostPreview";
import axios from 'axios';

class PostListing extends React.Component {
  constructor () {
    super();
    this.state = {
      postList: []
    }
  }

  componentDidMount() {
    const postList = [];

    this.props.postEdges.forEach(postEdge => {
      // console.log(`Existing data: ${postEdge.node.fields.slug}`);
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });

    axios.get('https://9ss7bxey8k.execute-api.ap-southeast-2.amazonaws.com/default/dummy_service').then(json => {
      let postData = json.data;
      //console.log(postData.Data[8]);
      postData.Data.forEach(postInformation => {
        // console.log(`New Data: ${postInformation.node.fields.slug}`);
        postList.push({
          path: postInformation.node.fields.slug,
          tags: postInformation.node.frontmatter.tags,
          cover: postInformation.node.frontmatter.cover,
          title: postInformation.node.frontmatter.title,
          date: postInformation.node.fields.date,
          excerpt: postInformation.node.excerpt,
          timeToRead: postInformation.node.timeToRead
        });
      });
      this.setState({postList});
    });


  }

  render() {
    const { postList } = this.state;
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {postList.map(post => (
            <PostPreview key={post.title} postInfo={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostListing;
